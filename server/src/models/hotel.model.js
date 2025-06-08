import mongoose, { Schema } from "mongoose";


// Define hotel schema
const hotelSchema = new mongoose.Schema({

    image: {
        type: [String],
    },
    rating : {
        type : Number,
    },
    ratingComment: {
        type : String,
    },
    amenities: { 
        type: [String]
    },
    name: { 
        type: String,
        required : true,
    }, 
    place: { 
        type: String,
        required : true,
    }, 
    description: { 
        type: String 
    },
    additional: { 
        type: String 
    },
    taxes: { 
        type: Number 
    },
    price: { 
        type: Number 
    }, 
    comments:{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});


export const Hotel = mongoose.model("Hotel", hotelSchema);
