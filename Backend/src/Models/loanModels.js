const mongoose = require('mongoose');

const LoanApplicationSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    default: 'Pending',
  },
  paymentId: {
    type: String,
    required: true,
  },
  idProof: {
    uploaded: {
      type: Boolean,
      default: false,
      required: true,
    },
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  addressProof: {
    uploaded: {
      type: Boolean,
      default: false,
      required: true,
    },
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  incomeProof: {
    uploaded: {
      type: Boolean,
      default: false,
      required: true,
    },
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
});

const LoanApplication = mongoose.model('LoanApplication', LoanApplicationSchema);

module.exports = LoanApplication;
