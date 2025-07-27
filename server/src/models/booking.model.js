import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    checkInDate: {
        type: Date,
    },
    checkOutDate: {
        type: Date,
    },
    guests: {
        type: Number,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        default: "Pay At Hotel",
    },
    isPaid: {
        type: Boolean
    },
    paymentId: {
        type: String,
    }
}, { timestamps: true })

export const Booking = mongoose.model("Booking", bookingSchema);