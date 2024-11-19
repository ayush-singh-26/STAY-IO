import connectDB from './src/db/index.js';
import {Hotel} from './src/models/hotel.model.js';
import hotelJson from './hotels.json' assert { type: 'json' };

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        await Hotel.deleteMany()
        await Hotel.create(hotelJson);
        console.log("Hotel Added Successfully");
    } catch (error) {
        console.error(error);
    }
}

start();