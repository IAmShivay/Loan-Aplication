const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");
const User = require("../Models/userModels");
const sendToken = require("../Utils/StatusCode");
const sendEmail = require("../Utils/sendEmail");
const cloudinary = require("cloudinary");
const Admin = require("../Models/adminModel");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  console.log(req.body)
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  const { firstName, lastName, email, password, role } = req.body;
  const emails = await User.findOne({ email: req.body.email });
  if (emails) {
    return next(new ErrorHandler("User alredy registered", 400));
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
    // avatar: {
    //   public_id: myCloud.public_id,
    //   url: myCloud.secure_url,
    // },
  });
  sendToken(user, res, 201);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorHandler("Please Enter Your Password and Email Correctly", 400)
    );
  }

  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password", 401));
  }
  sendToken(user, res, 200);
});

exports.logOutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(201).json({
    sucess: true,
    message: "Logout Sucessfull",
  });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  const resetToken = user.resetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const restPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset${resetToken}`;

  const message = "Redy to change password";

  try {
    sendEmail({
      subject: "Password Change",
      message,
      email: user.email,
    });
    res.status({
      message: "",
      sucess: true,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("wrong", 400));
  }

  if (!req.body.password === req.body.confirmPassword) {
    return next(new ErrorHandler("rong", 400));
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    sucess: true,
    user,
  });
});

exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password Is Incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Confirm Password Is Does Not Match", 400));
  }
  user.password = req.body.newPassword;

  try {
    await user.save();
    console.log("User saved successfully:", user);
    sendToken(user, res, 200);
  } catch (error) {
    console.error("Error saving user:", error);
    return next(error);
  }
});

exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    sucess: true,
    user,
  });
});

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`User Does Not Exist :${req.params.id}`));
  }
  res.status(200).json({
    sucess: true,
    user,
  });
});

exports.getAllUserDetails = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new ErrorHandler(`User Does Not Exist :${req.params.id}`));
  }
  res.status(200).json({
    sucess: true,
    users,
  });
});

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    sucess: true,
    user,
  });
});

exports.deleteUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

// Get All Loan details Based on Application Id

exports.getUserDetailsA = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  console.log(userId);
  const admins = await Admin.find({ user: userId });
console.log(admins)
  if (admins.length === 0) {
    return next(
      new ErrorHandler("No admins found with the specified user field", 404)
    );
  }

  res.status(200).json({
    success: true,
    count: admins.length,
    data: admins,
  });
});
