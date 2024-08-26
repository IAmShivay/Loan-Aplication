const LoanApplication = require("../Models/loanModels");
const getDataUri = require("../Utils/dataUri");
const cloudinary = require("cloudinary");
const Admin = require("../Models/adminModel");

exports.uploadDocuments = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      age,
      tenthMarks,
      twelfthMarks,
      percentage,
      bachelorCgpa,
      university,
      college,
      coBorrowerName,
      coBorrowerRelation,
      coBorrowerDob,
      coBorrowerIncome,
      coBorrowerPhone,
      address,
      education,
      loanAmount,
      paymentId,
      paymentStatus,
    } = req.body;

    // Validate fields
    if (
      !paymentStatus ||
      !tenthMarks ||
      !twelfthMarks ||
      !percentage ||
      !bachelorCgpa ||
      !university ||
      !college ||
      !coBorrowerName ||
      !coBorrowerRelation ||
      !coBorrowerDob ||
      !coBorrowerIncome ||
      !coBorrowerPhone ||
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
      adminResponse: "",
      status: "",
      adminComments: "",
      paymentStatus,
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
      },
    });
    console.log(req);
    await newLoanApplication.save();

    res.json({ newLoanApplication });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.getAllLoanApplications = async (req, res) => {
  try {
    const loanApplications = await LoanApplication.find().lean();

    for (let loanApplication of loanApplications) {
      const admin = await Admin.findOne({ user: loanApplication.user }).lean();

      if (admin) {
        loanApplication.status = admin.status;
        loanApplication.adminResponse = admin.isSubmitted;
        loanApplication.adminComments = admin.comment;
      } else {
        loanApplication.adminResponse = false;
        loanApplication.adminComments = "";
      }
    }

    // Log the final array of loan applications
    console.log("Final Loan Applications Array:", loanApplications);

    // Return the modified loan applications in the response
    res.json({ loanApplications });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).send("Server Error");
  }
};
