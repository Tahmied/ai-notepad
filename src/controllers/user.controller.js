import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req,res)=> {
    const {userName , email, password} = req.body

    if([userName,password].some((e)=> !e)) {
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

export { registerUser };

