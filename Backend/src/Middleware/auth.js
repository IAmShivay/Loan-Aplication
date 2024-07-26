const ErrorHandler = require("../Utils/ErrorHandler");
const User = require("../Models/userModels");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("../Middleware/catchAsyncError");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.header('Authorization').replace("Bearer","");
  console.log(token)
  if (!token) {
    return next(new ErrorHandler("Please Login To access The Resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} Is not Allowed To Acess This Resource`,
          403
        )
      );
    }
    next();
  };
};
