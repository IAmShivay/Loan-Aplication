const LoanApplication = require("../Models/loanModels");
const getDataUri = require("../Utils/dataUri");
const cloudinary = require("cloudinary");

exports.uploadDocuments = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      age,
      address,
      education,
      loanAmount,
      paymentId
    } = req.body;

    // Validate fields
    if (
      !name ||
      !email ||
      !phoneNumber ||
      !age ||
      !address ||
      !education ||
      !loanAmount ||
      !paymentId
    ) {
      return res.status(400).json({ msg: "Please enter all required fields" });
    }
    const existingApplication = await LoanApplication.findOne({
      user: req.user._id,
      paymentStatus: "Pending",
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ msg: "You already have a pending loan application" });
    }
    const uploadFile = async (file) => {
      const fileUri = getDataUri(file);
      const uploadedFile = await cloudinary.v2.uploader.upload(fileUri.content);
      return {
        public_id: uploadedFile.public_id,
        url: uploadedFile.secure_url,
      };
    };
    // Upload income proof
    const { incomeProof, addressProof, idProof } = req.files;

    const incomeFiles = await uploadFile(incomeProof);

    // Upload address proof
    const addressFiles = await uploadFile(addressProof);

    // Upload ID proof
    const idFiles = await uploadFile(idProof);
    const newLoanApplication = new LoanApplication({
      user: req.user._id,
      name,
      email,
      phoneNumber,
      age,
      address,
      education,
      paymentId,
      loanAmount,
      paymentStatus: "Pending",
      idProof: {
        public_id: incomeFiles.public_id,
        url: incomeFiles.url,
      },
      addressProof: {
        public_id: addressFiles.public_id,
        url: addressFiles.url,
      },
      incomeProof: {
        public_id: idFiles.public_id,
        url: idFiles.url,
      }
    });

    await newLoanApplication.save();

    res.json({ newLoanApplication });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get all loan applications
exports.getAllLoanApplications = async (req, res) => {
  try {
    const loanApplications = await LoanApplication.find();
    res.json({ loanApplications });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

