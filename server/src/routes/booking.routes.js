import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkAvailabilityApi, createBooking, getHotelBooking, getUserBookings } from "../controllers/booking.controller.js";

const router = new Router();

router.route('/create-booking/:hotelId').post(verifyJWT,createBooking);

router.route('/getUser-booking').get(verifyJWT,getUserBookings);

router.route('/getHotel-booking').get(verifyJWT,getHotelBooking);

router.route('/checkAvailability').get(checkAvailabilityApi);

export default router;