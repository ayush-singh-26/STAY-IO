import Stripe from 'stripe';
import ApiError from '../utils/ApiError.js';
import { Hotel } from '../models/hotel.model.js';
import { Booking } from '../models/booking.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.user._id;
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId)
        
        const hotel = await Hotel.findById(booking.hotel._id);
        if (!hotel) {
            throw new Error('Hotel not found');
        }
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: hotel.name,
                            images: [hotel.images[0]],
                        },
                        unit_amount: hotel.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.BASE_URL}/my-bookings`,
            cancel_url: `${process.env.BASE_URL}/hotel/${booking.hotel._id}/booking`,
            metadata: {
                purchaseId: booking._id.toString(),
            },
            shipping_address_collection: {
                allowed_countries: ["IN"],
            },
        });

        if (!session.url) {
            throw new ApiError(403, "Error while creating session")
        }        

        booking.paymentId = session.id;
        await booking.save();

        return res.status(200).json({
            url: session.url,
            message: "Payment session created successfully"
        });

    }
    catch (error) {
        console.error("Error in createCheckoutSession:", error);
        return res.status(500).json({
            message: "Failed to create Stripe checkout session",
            error: error.message
        });
    }
}

const stripeWebhook = async (req, res) => {   
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.WEBHOOK_SECRET_KEY);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            const paymentId = paymentIntent.id;

            const session = await stripe.checkout.sessions.list({
                payment_intent : paymentId,
            })

            const {purchaseId} = session.data[0].metadata;

            const purchaseData = await Booking.findById(purchaseId);
            purchaseData.status = 'completed'
            await purchaseData.save()
            break;
        }
        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object;
            const paymentId = paymentIntent.id;
            
            const session = await stripe.checkout.sessions.list({
                payment_intent : paymentId,
            })
            
            const {purchaseId} = session.data[0].metadata;
            const purchaseData = await Booking.findById(purchaseId);

            purchaseData.status = 'failed';
            await purchaseData.save();

            break;
        }
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};

export {
    createCheckoutSession,
    stripeWebhook,
}