class ApiResponse {
   constructor(
    statusCode,
    message = "Success",
    data
   ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
   } 
}

export {ApiResponse}


// Example usage:
// const userData = {
//     id: 1,
//     username: 'john_doe',
//     email: 'john@example.com'
// };

// // Create an ApiResponse instance for successful response
// const successResponse = new ApiResponse(200, "User data retrieved successfully", userData);

// // Create an ApiResponse instance for error response
// const errorResponse = new ApiResponse(404, "User not found");

// console.log(successResponse);
// console.log(errorResponse);