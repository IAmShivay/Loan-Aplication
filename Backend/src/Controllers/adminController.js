// const Admin = require('../Models/adminModel');
// const catchAsyncError = require('../Middleware/catchAsyncError');
// const ErrorHandler = require('../Utils/ErrorHandler');

// exports.registerAdmin = catchAsyncError(async (req, res, next) => {
  
//   const {
//     Bank,
//     comment,
//     interestRate,
//     isSubmitted,
//     loanAmount,
//     phoneNumber,
//     status,
//     user
//   } = req.body;

//   const admin = await Admin.create({
//     Bank,
//     comment,
//     interestRate,
//     isSubmitted,
//     loanAmount,
//     phoneNumber,
//     status,
//     user,
//   });

//   res.status(201).json({
//     success: true,
//     data: admin,
//   });
// });

const Admin = require('../Models/adminModel');
const catchAsyncError = require('../Middleware/catchAsyncError');
const ErrorHandler = require('../Utils/ErrorHandler');

exports.registerAdmin = catchAsyncError(async (req, res, next) => {
  const {
    Bank,
    comment,
    interestRate,
    isSubmitted,
    loanAmount,
    phoneNumber,
    status,
    user
  } = req.body;

  // Check if an admin with the same Bank and user already exists
  const existingAdmin = await Admin.findOne({ Bank, user });

  if (existingAdmin) {
    return next(new ErrorHandler('Your Response Has Been Recorded Alredy', 400));
  }

  const admin = await Admin.create({
    Bank,
    comment,
    interestRate,
    isSubmitted,
    loanAmount,
    phoneNumber,
    status,
    user,
  });

  res.status(201).json({
    success: true,
    data: admin,
  });
});

