import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Please provide a email address"],
        },
        fullname: {
            type: String,
            required: [true, "Please provide a full name"],

        },
        avatar: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        },
        password: {
            type: String,
            required: [true, 'password is required']
        },
        role:{
            type: String,
            enum: ['User', 'Admin', 'Instructor'],
            default: 'User'
        },
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
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "30d"
        }
    )
}
export const User = mongoose.model("User", userSchema);

