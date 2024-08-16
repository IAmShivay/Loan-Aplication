import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../../apiAxios/axiosInstance";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface FeePaymentProps {
  prevStep: () => void;
}

const FeePayment: React.FC<FeePaymentProps> = ({ prevStep }) => {
  const [payment, setPayment] = useState(""); // Corrected the useState initialization
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const form = useSelector((state: RootState) => state.form);
  const documents = useSelector((state: RootState) => state.document);
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  useEffect(() => {
    if (typeof window.Razorpay === "undefined") {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  const initiatePayment = async (amount: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axiosInstance.post(
        "http://localhost:3000/api/v1/create-order",
        { amount },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      setPayment("paid");
      const options = {
        key: "rzp_test_Lhf5YHFOs9Begr",
        amount: response.data.amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Loan Application Fee",
        order_id: response.data.id,
        handler: async (response: any) => {
          try {
            await submitForm(response.razorpay_payment_id);
            setPaymentSuccessful(true);
            setSnackbarMessage("Payment successful");
            setSnackbarOpen(true);
            alert("Payment successful! You can now track your application.");
          } catch (error: any) {
            console.error("Error submitting form:", error);
            setSnackbarMessage(
              error?.response?.data?.message || "Unknown error occurred."
            );
            setSnackbarOpen(true);
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phoneNumber,
        },
        theme: {
          color: "#006400",
        },
      };

      if (typeof window.Razorpay === "undefined") {
        console.error(
          "Razorpay SDK is not loaded. Please check your internet connection and try again."
        );
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      setSnackbarMessage(
        error?.response?.data?.message ||
          "An error occurred during payment initiation."
      );
      setSnackbarOpen(true);
    }
  };

  const submitForm = async (paymentId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("age", form.age);
      formData.append("address", form.address);
      formData.append("education", form.education);
      formData.append("loanAmount", form.loanAmount);
      formData.append("tenthMarks", form.tenthMarks);
      formData.append("percentage", form.percentage);
      formData.append("twelfthMarks", form.twelfthMarks);
      formData.append("university", form.university);
      formData.append("coBorrowerName", form.coBorrowerName);
      formData.append("coBorrowerRelation", form.coBorrowerRelation);
      formData.append("coBorrowerDob", form.coBorrowerDob);
      formData.append("coBorrowerIncome", form.coBorrowerIncome);
      formData.append("coBorrowerPhone", form.coBorrowerPhone);
      formData.append("bachelorCgpa", form.bachelorCgpa);
      formData.append("paymentStatus", payment);
      formData.append("paymentId", paymentId);

      formData.append("college", form.college);

      if (documents.idProof?.file) {
        formData.append("idProof", documents.idProof.file);
      }

      if (documents.addressProof?.file) {
        formData.append("addressProof", documents.addressProof.file);
      }

      if (documents.incomeProof?.file) {
        formData.append("incomeProof", documents.incomeProof.file);
      }

      await axiosInstance.post(
        "http://localhost:3000/api/v1/loan-application",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      throw new Error("Form submission failed.");
    }
  };

  const onSubmit = async () => {
    await initiatePayment(100); // Amount in paise (1000 INR)
  };

  const handleTrackApplication = () => {
    navigate("/track-application");
  };

  return (
    <Box mt={4} mb={4} textAlign="center">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        fontWeight="bold"
        color="#388E3C"
      >
        Processing Fee Payment
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)} // Properly connected onSubmit
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="body1" gutterBottom color="#2E7D32">
            {paymentSuccessful
              ? "Payment successful! You can now track your application."
              : "Click the button below to proceed with the payment of ₹1000"}
          </Typography>
        </motion.div>
        <Box mt={2} style={{ textAlign: "center" }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              onClick={paymentSuccessful ? handleTrackApplication : prevStep}
              style={{
                background: "linear-gradient(45deg, #388E3C 30%, #2E7D32 90%)",
                color: "#ffffff",
                marginRight: "1rem",
              }}
            >
              {paymentSuccessful ? "Track Application" : "Back"}
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={paymentSuccessful}
              style={{
                background: "linear-gradient(45deg, #388E3C 30%, #2E7D32 90%)",
                color: "#ffffff",
                opacity: paymentSuccessful ? 0.5 : 1,
              }}
            >
              Pay Now
            </Button>
          </motion.div>
        </Box>
        <Snackbar
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: "#4caf50", // Dark background for the snackbar
              color: "#FFFFFF", // White text color
              borderRadius: "8px", // Rounded corners
              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Subtle shadow
            },
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnackbarOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Box>
    </Box>
  );
};

export default FeePayment;
