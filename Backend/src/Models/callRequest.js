const mongoose = require("mongoose");

const callRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    preferredCallTime: {
      type: Date,
      required: false, // Optional if users don't specify a preferred time
    },
    reasonForCall: {
      type: String,
      required: true,
    },
    additionalNotes: {
      type: String,
      required: false,
    },
    ApplicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    bank: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Canceled"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model("CallRequest", callRequestSchema);
