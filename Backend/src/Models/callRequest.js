const mongoose = require('mongoose');

const callRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Canceled'],
    default: 'Pending',
  },
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This would be the agent assigned to handle the call
    required: false,
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('CallRequest', callRequestSchema);
