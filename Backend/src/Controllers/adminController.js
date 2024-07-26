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
