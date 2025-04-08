import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

dotenv.config({
    path : './.env'
})


const userSchema = new Schema({
    userName : {
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index:true
    } , 
    email : {
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    }
})

// encrypt the password before saving
userSchema.pre('save' , async function (next) {
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password , 10)
    next()
})

// function to compare passwords for login
userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare( password , this.password)
}

// generate access and refresh Token
userSchema.methods.generateAccessToken = function () {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret) {
        console.error("ACCESS_TOKEN_SECRET is missing!");
        throw new apiError(400, "ACCESS_TOKEN_SECRET is missing!");
    }

    return jwt.sign(
        {
            _id: this._id,
            userName: this.userName,
            email: this.email
        },
        accessTokenSecret,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1h' // Default to 1 hour if not provided
        }
    );
}

userSchema.methods.generateRefreshToken = function () {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshTokenSecret) {
        console.error("REFRESH_TOKEN_SECRET is missing!");
        throw new apiError(400, "REFRESH_TOKEN_SECRET is missing!");
    }

    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        refreshTokenSecret,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' // Default to 7 days if not provided
        }
    );
}



export const User = mongoose.model('User' , userSchema)