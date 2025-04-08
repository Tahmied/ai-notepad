import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

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
    return await bcrypt.compare(password,this.password)
}

// generate access and refresh Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id : this._id,
        userName : this.userName,
        email : this.email
    }), process.env.ACCESS_TOKEN_SECRET ,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id : this._id,
        email : this.email
    }), process.env.REFRRESH_TOKEN_SECRET ,
    {
        expiresIn : process.env.REFRRESH_TOKEN_EXPIRY
    }
}




export const User = mongoose.model('User' , userSchema)