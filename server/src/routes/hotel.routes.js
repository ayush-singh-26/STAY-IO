import { Router } from "express";
import { createHotel, getHotel, getHotelById,updateHotel,deleteHotel,loyaltyPoints } from "../controllers/hotel.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createCheckoutSession } from "../controllers/hotelPurchase.controller.js";
import { getDashboardStats } from "../controllers/dashboardController.js";


const router=new Router();

router.route('/getHotel').get(getHotel)
router.route('/getHotelById/:id').get(getHotelById)
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

//dashboard
router.route('/dashboard').get(verifyJWT, getDashboardStats);


//puchase
router.route('/checkout/create-checkout-session').post(verifyJWT,createCheckoutSession);



export default router;