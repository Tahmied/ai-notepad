export const asyncHandler = (handlerFn) => {
    return async (req, res,next) => {
        try {
            await handlerFn(req,res,next)
        } catch (err) {
            next(err)
        }
    }
}

