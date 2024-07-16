const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please Enter First Name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please Enter First Name"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter The Password"],
    select: false,
  },
  email: {
    type: String,
    required: [true, "Please Enter The E-mail"],
    validate: [validator.isEmail, "Please Provide A valid Email"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (Password) {
  return await bcrypt.compare(Password, this.password);
};
userSchema.methods.resetPasswordTokens = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
