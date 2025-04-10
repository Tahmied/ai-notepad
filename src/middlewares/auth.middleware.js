import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const findUserFromCookies = asyncHandler(async function (req,res,next) {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '')
        if(!token) {
            throw new apiError(400, 'unable to read the access token')
        }
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
        if(!decodedToken) {
            throw new apiError(400 , `unable to decode the token`)
        }
        const user = await User.findById(decodedToken._id)
        if(!user) {
            throw new apiError(400 , 'unable to find the user through decoded token')
        }
        req.user = user
        next()
    } catch (err) {
        throw new apiError(`unable to find user from cookiees due to ${err}`)
    }
})

export { findUserFromCookies };

