import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username"],
            unique: true
        },
        email: {
            type: String,
            required: [true, "Please provide a email address"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: [true, "Please provide a full name"],

        },
        avatar: {
            type: String,
            // required: true,
            default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        },
        coverImage: {
            type: String,
        },
        watchHistory: {
            type: Schema.Types.ObjectId,
            ref: "video",
        },
        password: {
            type: String,
            required: [true, 'password is required']
        },
        // accountType:{
        //     type: String,
        //     enum:[
        //         'Admin',
        //         'User'
        //     ],
        //     // required:true
        // },
        // refreshToken: 
        // {
        //     type: String,
        // },
        otp:{
            type: String,
            default: null,
            
        },
        token:{
            type: String,
            default: null,
        },
        loyaltyPoints:{
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}



userSchema.methods.generateAccessToken = function () {
    return jwt.sign(            
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "30d"
        }
    )
}
// userSchema.methods.generateRefreshToken = function () {
//     return jwt.sign(
//         {
//             _id: this._id, 
//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// };
export const User = mongoose.model("User", userSchema);

