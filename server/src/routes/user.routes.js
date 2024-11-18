import { Router} from 'express';
import {loginUser,
    logoutUser,
    changeCurrentPassword, 
    getCurrentUser, 
    getUserChannelProfile, 
    getWatchHistory, 
    refreshAccessToken, 
    registerUser, 
    updateAccountDetails, 
    updateUserAvatar, 
    updateUserCoverimage, 
    deleteUser, 
    google, 
    sendEmail,
    sendVerificationCode,
    forgot_Password,
    reset_Password
} from "../controllers/user.controllers.js"
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = new Router();

router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1

        },
        {
            name:"coverImage",
            maxCount:1
        },
    ]),
    registerUser 
)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route('/deleteAccount').delete(verifyJWT,deleteUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)
router.route("/change-avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/cover-image").patch(verifyJWT,upload.single("coverImage"),updateUserCoverimage)
router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
router.route("/history").get(verifyJWT,getWatchHistory)
router.route("/google").post(google)

router.route("/sendEmail").patch(sendEmail)
router.route("/send-verification-code").patch(sendVerificationCode)
router.route("/forgot-password").patch(forgot_Password)
router.route("/reset-password").post(reset_Password)

export default  router;


