import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      // required: true,
    },
    fullName : {
      type: String,
    },
    email : { 
      type : String
    },
    phone : {
      type : String
    },
    checkIn: {
      type: Date,
      // required: true,
    },
    checkOut: {
      type: Date,
      // required: true,
    },
    guests: {
      type: Number,
      // required: true,
      min: 1,
    },
    status: {
      type: String,
      // required: true,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
      index: true,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
