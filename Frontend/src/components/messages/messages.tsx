// snackbarMessages.js

const snackbarMessages = {
    success: {
      loanSubmitted: "Loan application submitted successfully.",
      loanApproved: "Your loan has been approved!",
      paymentProcessed: "Payment processed successfully.",
      accountUpdated: "Account details updated successfully.",
      loanCreated: "Loan account created successfully.",
    },
    error: {
      loanSubmitFailed: "Failed to submit loan application. Please try again.",
      loanProcessFailed: "Loan application could not be processed. Check your details and try again.",
      paymentFailed: "Payment failed. Please verify your payment method and try again.",
      accountUpdateError: "Error updating account details. Please try again later.",
      loanCreationFailed: "Could not create loan account. Please contact support.",
    },
    info: {
      reviewDetails: "Please review your loan details before submitting.",
      underReview: "Your application is under review. You will be notified once it is processed.",
      fillFields: "Ensure all required fields are filled before proceeding.",
      trackStatus: "You can track your loan application status in the dashboard.",
      contactSupport: "For any issues or queries, contact our support team.",
    }
  };
  
  export default snackbarMessages;
  