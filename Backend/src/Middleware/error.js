const ErrorHandler = require("../Utils/ErrorHandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  // wrong mongo db id error

  if (err.name === "CastError") {
    const message = `Resource not found Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate :${Object.keys(err.keyValue)}entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `invalid Json Web Token,Try again`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "Token Expired Error") {
    const message = `Token Expired, Try again`;
    err = new ErrorHandler(message, 400);
  }


  res.status(err.statusCode).json({
    success: false,
    error: err,
    message: err.message,
  });
};
