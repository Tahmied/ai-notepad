import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

async function generateAccessAndRefreshToken(userId) {
    try {
        const user = await User.findById(userId).select('-password')
        if(!user) {
            throw new apiError(400 , 'unable to find the user for generating tokens')
        }
    
        const accessToken = await  user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
    
        if(!accessToken || !refreshToken) {
            throw new apiError(400, 'unable to generate tokens in token generation function')
        }
    
        user.refreshToken = refreshToken
        user.save({validateBeforeSave:false})
        return {accessToken , refreshToken}
    } catch (error) {
        console.error(error)
        throw new apiError( 400 ,'failed to generate tokens')
    }
}

const registerUser = asyncHandler( async (req,res)=> {
    const {userName , email, password} = req.body

    if([userName,password,email].some((e)=> !e)) {
        throw new apiError(400 , "all fields are required")
    }

    const user = await User.create({
        userName : userName,
        email : email,
        password: password
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200 , user , 'user registration successful')
    )

} )

const loginUser = asyncHandler( async (req,res)=> {
    const {userName , email , password} = req.body

    if([userName,password,email].some((e)=> !e)) {
        throw new apiError(400 , "all fields are required")
    }

    const user = await User.findOne( {email})
    if(!user) {
        throw new apiError(400 , 'unable to find the user')
    }

    const passCheck = await user.checkPassword(password)
    if(!passCheck) {
        throw new apiError(400 , 'wrong password')
    }

    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id)
    if(!accessToken || !refreshToken ) {
        throw new apiError(400 , 'couldnt find the access and refresh token in loginuser controler function')
    }

    const loggedInUser = await User.findById(user._id)

    const cookieOptions = {
        httpOnly : true,
        secure: true
    }

    return res
    .status(200)
    .cookie('accessToken' , accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken , cookieOptions)
    .json(
        new ApiResponse(200 , loggedInUser, 'user loggedin successfully' )
    )

})

export { loginUser, registerUser };

