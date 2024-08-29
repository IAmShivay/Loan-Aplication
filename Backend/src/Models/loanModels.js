const mongoose = require("mongoose");

const LoanApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
    default: "Pending",
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
  coBorrowerName: {
    type: String,
    required: true,
  },
  coBorrowerRelation: {
    type: String,
    required: true,
  },
  coBorrowerDob: {
    type: Date,
    required: true,
  },
  coBorrowerIncome: {
    type: Number,
    required: true,
  },
  coBorrowerPhone: {
    type: String,
    required: true,
  },

  tenthMarks: {
    type: Number,
    required: true,
  },
  twelfthMarks: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  bachelorCgpa: {
    type: Number,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  adminResponse: {
    type: String,
    required: false,
    default:""
  },
  status: {
    type: String,
    required: false,
    default:""
  },
  adminComments: {
    type: String,
    required: false,
    default:""
  },
});

const LoanApplication = mongoose.model(
  "LoanApplication",
  LoanApplicationSchema
);

module.exports = LoanApplication;
