import mongoose,{Schema} from "mongoose";

const hotelSchema = new mongoose.Schema({
    images: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    ratingComment: {
        type: String
    },
    amenities: {
        type: [String],
        default: []
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    place: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    additionalInfo: {
        type: String,
        trim: true
    },
    taxes: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    bookedGuests: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    isAvailable: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

export const Hotel = mongoose.model("Hotel", hotelSchema);
