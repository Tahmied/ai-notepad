import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( (req,res)=> {
    res.json(
        ApiResponse(200 , {message : "ok"} , "successfully recieved")
    )
} )

export { registerUser };

