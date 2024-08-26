
// const Admin = require('../Models/adminModel');
// const catchAsyncError = require('../Middleware/catchAsyncError');
// const ErrorHandler = require('../Utils/ErrorHandler');

// exports.registerAdmin = catchAsyncError(async (req, res, next) => {
//   const {
//     Bank,
//     comment,
//     isSubmitted,
//     loanAmount,
//     phoneNumber,
//     status,
//     user
//   } = req.body;

//   // Check if an admin with the same Bank and user already exists
//   const existingAdmin = await Admin.findOne({ Bank, user });

//   if (existingAdmin) {
//     return next(new ErrorHandler('Your Response Has Been Recorded Alredy', 400));
//   }

//   const admin = await Admin.create({
//     Bank,
//     comment,
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

exports.registerAdmin = catchAsyncError(async (req, res, next) => {
  const {
    Bank,
    comment,
    isSubmitted,
    loanAmount,
    phoneNumber,
    status,
    user
  } = req.body;

  // Find and update the document if it exists, otherwise create a new one
  const admin = await Admin.findOneAndUpdate(
    { Bank, user }, // Filter criteria
    {
      Bank,
      comment,
      isSubmitted,
      loanAmount,
      phoneNumber,
      status,
      user,
    }, // Data to update
    { new: true, upsert: true } // Create a new document if none exists (upsert)
  );

  res.status(201).json({
    success: true,
    data: admin,
  });
});
