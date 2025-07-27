import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Hotel } from '../models/hotel.model.js'
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import MailSender from "../middlewares/sendMail.js";


const createHotel = asyncHandler(async (req, res) => {
    const {
        name,
        place,
        description,
        price,
        taxes,
        amenities,
    } = req.body;
    console.log(req.body);

    if (!req) {
        throw new ApiError(400, "Image is required");
    }

    const images = [];
    for (let i = 0; i < req.files.image.length; i++) {
        const image = await uploadOnCloudinary(req.files.image[i].path, 'Hotels');
        images.push(image.url);
    }

    const amenitie = Array.isArray(amenities) ? amenities : [amenities];



    // const hotelImagePath=req.files?.image[0]?.path;

    // if(!hotelImagePath){
    //     throw new ApiError(400, "Image required");
    // }

    // const image=await uploadOnCloudinary(hotelImagePath, 'Hotels');
    // if(!image){
    //     throw new ApiError(400, "Error while uploading on image");
    // }

    // console.log(image);






    const savedHotel = await Hotel.create({
        name,
        place,
        description,
        price,
        taxes,
        image: images,
        amenities: amenitie,
    });

    return res.status(201).json({
        status: 201,
        data: savedHotel,
        message: "Hotel created successfully"
    });
});

const updateHotel = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const hotel = await Hotel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    )
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                hotel,
                "Hotel updated successfully"
            )
        )
})

const deleteHotel = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedHotel = await Hotel.findByIdAndDelete(id);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Hotel deleted successfully"
            ))
})

const getHotel = asyncHandler(async (req, res) => {
    const { place, sort } = req.query;
    console.log("Query received:", { place, sort });

    if (!place) {
        throw new ApiError(400, "Search query (place) is required");
    }

    const placeQuery = {
        place: { $regex: place, $options: "i" }
    };

    let query = Hotel.find(placeQuery); 

    if (sort) {
        const sortOptions = {};
        sort.split(',').forEach((s) => {
            const [field, order] = s.split(':');
            sortOptions[field] = order === 'asc' ? 1 : -1;
        });

        console.log("Sorting options:", sortOptions);
        query = query.sort(sortOptions);
    } else {
        query = query.sort({ price: 1 });
    }

    try {
        const hotels = await query.exec(); 
        return res.status(200).json({
            status: 200,
            hotels,
            message: "Hotels fetched successfully"
        });

    } catch (error) {
        console.error("Fetch error:", error); 
        throw new ApiError(404, "Error fetching hotel data");
    }
});

const getHotelById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const hotel = await Hotel.findById(id);

    if (!hotel) {
        throw new ApiError(400, "Hotel not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                hotel,
                "Hotel fetched successfully"
            )
        )
})

const loyaltyPoints = asyncHandler(async (req, res) => {
    try {


        const { hotelId } = req.params;
        const { userId } = req.body;
        console.log(hotelId);
        const user = await User.findById(userId);
        const hotel = await Hotel.findById(hotelId);

        console.log(hotel);

        if (!hotel || !user) {
            throw new ApiError(400, "Hotel or user not found");
        }

        const loyaltyPoints = Math.floor((hotel.price + hotel.taxes) * 0.1);
        const userPoints = await User.findByIdAndUpdate(
            userId,
            { $inc: { loyaltyPoints } },
            { new: true }
        )

        res.status(200)
            .json(
                new ApiResponse(
                    200,
                    userPoints,
                    `Loyalty points added successfully. User now has ${user.loyaltyPoints} loyalty points`
                )
            )
    }
    catch (error) {
        throw new ApiError(400, "Error adding loyalty points");
    }
})




// const getBookings = asyncHandler(async (req, res) => {
//     try {
//         const userId = req.user._id;

//         const bookings = await Booking.find({ userId: userId }).populate({
//             path: 'hotelId',
//             select: 'name place image price',
//         });

//         return res.status(200).json(
//             new ApiResponse(200, bookings, "Bookings fetched successfully")
//         );
//     } catch (err) {
//         throw new ApiError(400, "Failed in fetching bookings", err);
//     }
// });

// const cancelBooking = asyncHandler(async (req, res, next) => {
//     const bookingId = req.params.id;
    
//     if (!bookingId) {
//         return next(new ApiError(400, "Booking ID is required"));
//     }

//     const booking = await Booking.findOneAndDelete(bookingId);
//     if (!booking) {
//         return next(new ApiError(404, "Booking not found"));
//     }

//     // await MailSender(
//     //     booking.email,
//     //     "Booking Cancelled",
//     //     `Your booking for the hotel ${booking.hotelName} has been cancelled.\nYour booking ID is ${booking._id}`
//     // )

//     return res.status(200).json(
//         new ApiResponse(
//             200,
//             "Booking cancelled successfully"
//         )
//     );
// });




export {
    getHotel,
    // bookHotel,
    getHotelById,
    // getBookings,
    // cancelBooking,
    createHotel,
    updateHotel,
    deleteHotel,
    loyaltyPoints

}
