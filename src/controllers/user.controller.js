import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const registerUser = asyncHandler( (req,res)=> {
    res.json(
        ApiResponse(200 , {message : "ok"} , "successfully recieved")
    )
} )

export { registerUser };
