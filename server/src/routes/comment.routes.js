import { Router } from "express";
import { addComment, updateComment, getHotelReviewComments, deleteComment } from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = new Router();

router.route('/getHotelReviewComments/:hotelId').get(getHotelReviewComments)

router.route('/addComment/:hotelId').post(verifyJWT,addComment)

router.route('/updateComment/:commentId').patch(updateComment)

router.route('/deleteComment/:commentId').delete(deleteComment)

export default router;