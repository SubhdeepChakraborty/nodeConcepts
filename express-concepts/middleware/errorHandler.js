//Custom error class
//Why doing so? -> It will allow to use more consistent error responses in your api

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
    Error.captureStackTrace(this, this.constructor); // Clean stack trace
  }
}

//AsyncHanlder thing to handle errors in async route handlers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


//Global error handler
const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack); //log the error stack
  if (err instanceof ApiError)
    return res.status(err.statusCode).send({
      status: false,
      message: err.message,
    });

  //handle moongoose validation
  if (err.name === "validationError") {
    return res.status(400).send({
      status: false,
      message: err.message || "Validation failed",
    });
  }else{
    return res.status(500).send({
      status: false,
      message: err.message || "An unexpected error occuring",
    });
  }
};


export {ApiError, asyncHandler, globalErrorHandler}