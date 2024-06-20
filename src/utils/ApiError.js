//Custom error class to standardize API error responses.
class ApiError extends Error {
    constructor (
        statusCode,
        message= "Something went wrong",
        errors = [],
        stc = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
        
        if(stc) {
            this.stack = stc
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}


// Example usage:
// try {
//     // Simulate an error condition
//     throw new ApiError(404, 'Resource not found', [{ field: 'id', message: 'Invalid ID' }]);
// } catch (error) {
//     // Handle the error
//     console.error(`${error.name}: ${error.message}`);
//     console.error(`Status Code: ${error.statusCode}`);
//     console.error(`Errors:`, error.errors);
// } 