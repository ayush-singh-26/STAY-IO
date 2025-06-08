import { Router } from "express";
import { bookHotel, cancelBooking, createHotel, getBookings, getHotel, getHotelById,updateHotel,deleteHotel,loyaltyPoints } from "../controllers/hotel.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router=new Router();

router.route('/getHotel').get(getHotel)
router.route('/bookHotel/:id').post(verifyJWT,bookHotel)
router.route('/getHotelById/:id').get(getHotelById)
router.route('/getBookings').get(verifyJWT,getBookings);
router.route('/cancelBookings/:id').delete(verifyJWT,cancelBooking);
router.route('/addHotel').post(
    upload.fields([
        {
            name: "image",
            maxCount: 6

        },
    ]),    
    verifyJWT, createHotel);
router.route('/updateHotel/:id').patch(verifyJWT,updateHotel);
router.route('/deleteHotel/:id').delete(verifyJWT,deleteHotel);
router.route('/loyaltyPoints/:hotelId').patch(verifyJWT,loyaltyPoints);


export default router;