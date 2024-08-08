
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Slider,
  Paper,
  Grid,
  InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { updateField } from "../../../app/loanAppliation/FormSlice";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const BasicDetails: React.FC<{ nextStep: () => void }> = ({ nextStep }) => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phoneNumber: false,
    age: false,
    address: false,
    education: false,
    loanAmount: false,
  });

  const [isLoanAmountValid, setIsLoanAmountValid] = useState(true);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi]:any = useState(0);

  const validateForm = () => {
    const newErrors = {
      name: form.name.trim() === "",
      email: form.email.trim() === "",
      phoneNumber: form.phoneNumber.trim() === "",
      age: form.age.trim() === "",
      address: form.address.trim() === "",
      education: form.education.trim() === "",
      loanAmount:
        form.loanAmount.trim() === "" ||
        parseFloat(form.loanAmount) < 1 ||
        parseFloat(form.loanAmount) > 5000000,
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleNextStep = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (field === "loanAmount") {
        const amount = parseFloat(value);
        if (!isNaN(amount)) {
          if (amount <= 5000000) {
            setIsLoanAmountValid(true);
            dispatch(updateField({ [field]: value }));
          } else {
            setIsLoanAmountValid(false);
            dispatch(updateField({ [field]: "5000000" }));
          }
          setErrors((prev) => ({
            ...prev,
            loanAmount: value.trim() === "" || amount < 1 || amount > 5000000,
          }));
        } else {
          // Handle non-numeric input
          setIsLoanAmountValid(true);
          dispatch(updateField({ [field]: value }));
          setErrors((prev) => ({
            ...prev,
            loanAmount: true,
          }));
        }
      } else {
        dispatch(updateField({ [field]: value }));
      }
    };

  const calculateEMI = () => {
    const amount = parseFloat(form.loanAmount);
    if (amount >= 1 && amount <= 5000000) {
      const P = amount;
      const r = interestRate / 12 / 100;
      const n = 12 * tenure;
      const emi = P * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
      setEmi(`${emi.toFixed()}.00`);
    } else {
      setEmi(0);
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [form.loanAmount, interestRate, tenure]);

  return (
    <Box mt={4} mb={4}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#1a237e",
          background: "linear-gradient(to right, #4caf50, #81c784)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        Loan Application
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#388e3c" }}
          >
            Basic Details
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={3}>
              {[
                { label: "Name", field: "name" },
                { label: "Email", field: "email" },
                { label: "Phone Number", field: "phoneNumber" },
                { label: "Age", field: "age" },
                { label: "Address", field: "address" },
              ].map((item, index) => (
                <Grid item xs={12} sm={6} key={item.field}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <TextField
                      fullWidth
                      label={item.label}
                      variant="outlined"
                      value={form[item.field as keyof typeof form]}
                      onChange={handleChange(item.field)}
                      error={errors[item.field as keyof typeof errors]}
                      helperText={
                        errors[item.field as keyof typeof errors]
                          ? `${item.label} is required`
                          : ""
                      }
                      sx={{ backgroundColor: "white" }}
                    />
                  </motion.div>
                </Grid>
              ))}
              <Grid item xs={12} sm={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <TextField
                    fullWidth
                    select
                    label="Education"
                    variant="outlined"
                    value={form.education}
                    onChange={handleChange("education")}
                    error={errors.education}
                    helperText={errors.education ? "Education is required" : ""}
                    sx={{ backgroundColor: "white" }}
                  >
                    {["High School", "Bachelor's", "Master's", "PhD"].map(
                      (option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <TextField
                    fullWidth
                    label="Loan Amount"
                    variant="outlined"
                    value={form.loanAmount}
                    onChange={handleChange("loanAmount")}
                    error={errors.loanAmount}
                    helperText={
                      errors.loanAmount
                        ? "Loan Amount must be between ₹1 and ₹50,00,000"
                        : ""
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyRupeeIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ backgroundColor: "white" }}
                  />
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{ p: 3, borderRadius: 2, backgroundColor: "white" }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#388e3c" }}
            >
              EMI Calculator
            </Typography>
            <Typography variant="body2" gutterBottom>
              Loan Amount: ₹{form.loanAmount}
            </Typography>
            <Slider
              value={parseFloat(form.loanAmount) || 0}
              onChange={(_, newValue) =>
                dispatch(updateField({ loanAmount: newValue.toString() }))
              }
              aria-labelledby="loan-amount-slider"
              valueLabelDisplay="auto"
              step={10000}
              marks
              min={0}
              max={5000000}
              sx={{ color: "#388e3c" }}
            />
            <Typography variant="body2" gutterBottom>
              Interest Rate: {interestRate}%
            </Typography>
            <Slider
              value={interestRate}
              onChange={(_, newValue) => setInterestRate(newValue as number)}
              aria-labelledby="interest-rate-slider"
              valueLabelDisplay="auto"
              step={0.1}
              marks
              min={1}
              max={20}
              sx={{ color: "#388e3c" }}
            />
            <Typography variant="body2" gutterBottom>
              Tenure: {tenure} years
            </Typography>
            <Slider
              value={tenure}
              onChange={(_, newValue) => setTenure(newValue as number)}
              aria-labelledby="tenure-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={30}
              sx={{ color: "#388e3c" }}
            />
            <Typography
              variant="h6"
              sx={{ mt: 2, fontWeight: "bold", color: "#388e3c" }}
            >
              Monthly EMI: ₹{emi}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box mt={4} textAlign="center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextStep}
            size="large"
            sx={{
              backgroundColor: "#388e3c",
              color: "#ffffff",
              fontWeight: "bold",
              padding: "12px 24px",
              "&:hover": {
                backgroundColor: "#2e7d32",
              },
            }}
          >
            Next
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default BasicDetails;
