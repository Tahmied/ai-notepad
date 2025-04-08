class apiError extends Error {
    constructor( status, message = "something went wrong", errors = [] , stack = ""){
        super(message)
        this.statusCode = status
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors
        this.stack = stack
    }
}
export { apiError };
