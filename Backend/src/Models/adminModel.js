const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  Bank: {
    type: String,
    required: true,
    default: 'SBI',
  },
  comment: {
    type: String,
  },
  isSubmitted: {
    type: Boolean,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
