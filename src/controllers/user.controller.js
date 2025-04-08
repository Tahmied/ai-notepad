import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req,res)=> {
    return res.json(
        {
            message : "ok"
        }
    )
} )

export { registerUser };

