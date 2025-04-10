import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const dashboard = asyncHandler(async function (req,res) {

    // find the user and display that

    const user = await req.user
    if(!user) {
        throw new apiError(400 , `You must logged in`)
    }
    
})

export { dashboard };

