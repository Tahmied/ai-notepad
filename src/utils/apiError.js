class ApiError extends ApiError {
    constructor( status, message = "something went wrong", errors = [] , stack = ""){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors
        this.stack = stack
    }
}

export { ApiError };
