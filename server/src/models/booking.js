import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    booking_id: {
      type: String,
      required: true,
      unique: true,
      default: () => Date.now().toString().slice(0, 10),  // Generate booking ID
    },
    userId: { 
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,  // Typically required for a booking
    },
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    hotelName: {
      type: String,  // Hotel name as string instead of ObjectId
      required: true,
    },
    place: {
      type: String,  // Place name or address as string instead of ObjectId
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,  // Price should be a number
      required: true,
    },
    status: {
      type: String,
      // required: true,
      enum: ['pending', 'confirmed', 'cancelled'],  // Define allowed status values
      default: 'pending',
    },
    name:{
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
    },
    mobile:{
      type: String,
      required: true,
    },
    image:{
      type: String,
      required: true,
    }

  },
  { timestamps: true }  // Automatically manage createdAt and updatedAt fields
);

export const Booking = mongoose.model("Booking", bookingSchema);
   