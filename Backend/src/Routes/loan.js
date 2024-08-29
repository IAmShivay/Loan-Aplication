const express = require("express");
const router = express.Router();
const upload = require("../Config/multerConfig");
const loanApplicationController = require("../Controllers/loanController");
const { isAuthenticated, authorizedRoles } = require("../Middleware/auth");

// POST /api/v1/loan-application

router.post(
  "/loan-application",
  isAuthenticated,
  authorizedRoles("loanApplicant"),
  upload.fields([
    { name: "incomeProof", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
  ]),
  loanApplicationController.uploadDocuments
);

// To Get All Loan Applications

router.get(
  "/getAllapplications",
  isAuthenticated,
  authorizedRoles("lendingPartner"),
  loanApplicationController.getAllLoanApplications
);
router.get(
  "/getSingleApplication",
  isAuthenticated,
  authorizedRoles("loanApplicant"),
  loanApplicationController.getAllLoanApplications
);


module.exports = router;
