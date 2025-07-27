import { Booking } from '../models/booking.model.js';
import { Hotel } from '../models/hotel.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js'

const checkAvailability = async ({ checkIn, checkOut, hotelId }) => {
    try {
        const booking = await Booking.find({
            hotel: hotelId,
            checkInDate: { $lte: checkOut },
            checkOutDate: { $gte: checkIn },
        });

        const isAvailable = booking.length === 0;
        return isAvailable;
    } catch (error) {
        console.log(error);
    }
}

const checkAvailabilityApi = asyncHandler(async (req, res) => {
    try {
        const { hotel, checkIn, checkOut } = req.body;
        const isAvailable = await checkAvailability({ checkIn, checkOut, hotel });

        return res.status(200).json(
            new ApiResponse(
                200,
                isAvailable,
                "User logged in Successfully"
            )
        )
    } catch (error) {
        throw new ApiError(400, "Something went wrong");
    }
})

const createBooking = asyncHandler(async (req, res) => {
    try {
        const { hotelId } = req.params;
        const { checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;

        const isAvailable = await checkAvailability({ checkIn: checkInDate, checkOut: checkOutDate, hotelId });

        const hotel = await Hotel.findById(hotelId);
        let totalPrice = hotel.price;

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;

        const booking = await Booking.create({
            user,
            hotel,
            guests: +guests,
            totalPrice,
            checkInDate,
            checkOutDate,
        })

        return res.status(200).json(
            new ApiResponse(
                200,
                booking,
                "Booking created successfully"
            )
        )
    } catch (error) {
        throw new ApiError(400, "Failed to create booking", error)
    }
})

const getUserBookings = asyncHandler(async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({ user }).populate("hotel").sort({ createdAt: -1 })

        return res.status(200).json(
            new ApiResponse(
                200,
                bookings,
                "Booking fetched successfully"
            )
        )
    } catch (error) {
        throw new ApiError(400, "Something went wrong");
    }
})

const getHotelBooking = asyncHandler(async (req, res) => {
    const hotel = await Hotel.findOne(req.user._id);

    const booking = await Booking.find({ hotel: hotel._id }).populate("hotel").sort({ createdAt: -1 });
    const totalBooking = booking.length;
    const totalRevenue = booking.reduce((acc, booking) => acc + booking.hotelPrice, 0);

    return res.status(200).json(
        200,
        totalBooking,
        totalRevenue,
    )
})

const cancelBooking = asyncHandler(async (req, res) => {
    try {

        const { bookingId } = req.params;

        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { status : "cancelled" },
            { new: true }
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                booking,
                "Booking cancelled successfully"
            )
        )
    } catch (error) {
        throw new ApiError(400, "Error during cancel booking", error);
    }
})

export {
    createBooking,
    getUserBookings,
    getHotelBooking,
    checkAvailabilityApi,
    cancelBooking
}