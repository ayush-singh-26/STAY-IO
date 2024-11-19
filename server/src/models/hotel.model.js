import mongoose from "mongoose";


// Define hotel schema
const hotelSchema = new mongoose.Schema({
    image: { type: [String] },
    rating: { type: Number }, 
    ratingText: { type: String }, 
    ratingComment: { type: String },
    name: { type: String }, 
    place: { type: String }, 
    description: { type: String },
    additional: { type: String },
    taxes: { type: Number },
    amenities: { type: [String] },
    price: { type: Number }, 
    additional1: { type: String }, 
    additional2: { type: String }, 
});

hotelSchema.index({ place: 'text' });

// Exporting the hotel model
export const Hotel = mongoose.model("Hotel", hotelSchema);
