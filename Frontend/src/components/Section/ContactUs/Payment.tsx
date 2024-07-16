import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

interface FeePaymentProps {
  prevStep: () => void;
}
const token = sessionStorage.getItem("token")
const FeePayment: React.FC<FeePaymentProps> = ({ prevStep }) => {
  const form = useSelector((state: RootState) => state.form);
  const documents = useSelector((state: RootState) => state.document);
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("age", form.age);
      formData.append("address", form.address);
      formData.append("education", form.education);
      formData.append("loanAmount", form.loanAmount);
      formData.append("paymentStatus", "Pending");
  
      if (documents.idProof?.file) {
        formData.append("idProof", documents.idProof.file);
      }
  
      if (documents.addressProof?.file) {
        formData.append("addressProof", documents.addressProof.file);
      }
  
      if (documents.incomeProof?.file) {
        formData.append("incomeProof", documents.incomeProof.file);
      }
  
      formData.append("cardNumber", data.cardNumber);
      formData.append("expiryDate", data.expiryDate);
      formData.append("cvv", data.cvv);

      // Log formData contents for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
      const response = await axios.post(
        "http://localhost:3000/api/v1/loan-application",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization":token
          },
        }
      );
      
      console.log("Server Response:", response.data);
      // Handle success, e.g., show a success message or navigate to next step

    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Server Error:", error.response.data);
          console.error("Status:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
      // Handle error, e.g., show an error message to the user
    }
  };
  
  return (
    <Box mt={4} mb={4} textAlign="center">
      <Typography variant="h4" component="h2" gutterBottom>
        Processing Fee Payment
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Controller
            name="cardNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Card Number"
                variant="outlined"
                margin="normal"
                style={{ marginBottom: "1rem" }}
              />
            )}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Controller
            name="expiryDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Expiry Date"
                variant="outlined"
                margin="normal"
                style={{ marginBottom: "1rem" }}
              />
            )}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Controller
            name="cvv"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="CVV"
                variant="outlined"
                margin="normal"
                style={{ marginBottom: "1rem" }}
              />
            )}
          />
        </motion.div>
        <Box mt={2} style={{ textAlign: "center" }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={prevStep}
              style={{
                backgroundColor: "#1a237e",
                color: "#ffffff",
                marginRight: "1rem",
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ backgroundColor: "#1a237e", color: "#ffffff" }}
            >
              Submit
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default FeePayment;