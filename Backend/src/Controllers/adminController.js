
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
