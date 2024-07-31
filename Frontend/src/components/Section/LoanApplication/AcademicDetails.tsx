import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Grid,
  InputAdornment,
  Select,
  InputLabel,
  FormControl,
  Container,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { updateField } from "../../../app/loanAppliation/FormSlice";
import SchoolIcon from "@mui/icons-material/School";
import GradeIcon from "@mui/icons-material/Grade";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const universities = ["University A", "University B", "University C"];
const colleges = ["College X", "College Y", "College Z"];

const AcademicDetails: React.FC<{ nextStep: () => void; prevStep: () => void }> = ({ nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);

  const [errors, setErrors] = useState({
    tenthMarks: false,
    twelfthMarks: false,
    percentage: false,
    bachelorCgpa: false,
    university: false,
    college: false,
  });

  const validateForm = () => {
    const newErrors = {
      tenthMarks: form.tenthMarks.trim() === "" || isNaN(parseFloat(form.tenthMarks)),
      twelfthMarks: form.twelfthMarks.trim() === "" || isNaN(parseFloat(form.twelfthMarks)),
      percentage: form.percentage.trim() === "" || isNaN(parseFloat(form.percentage)),
      bachelorCgpa: form.bachelorCgpa.trim() === "" || isNaN(parseFloat(form.bachelorCgpa)),
      university: form.university.trim() === "",
      college: form.college.trim() === "",
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
    (field: string) => (e:any) => {
      const value = e.target.value;
      dispatch(updateField({ [field]: value }));
      setErrors((prev) => ({
        ...prev,
        [field]: value.trim() === "" || isNaN(parseFloat(value)),
      }));
    };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4, borderRadius: 2 }}>
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
            mb: 4,
          }}
        >
          Academic Details
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#388e3c" }}>
              School Information
            </Typography>
            {[
              { label: "10th Marks", field: "tenthMarks", icon: <GradeIcon /> },
              { label: "12th Marks", field: "twelfthMarks", icon: <GradeIcon /> },
            ].map((item, index) => (
              <motion.div
                key={item.field}
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
                  helperText={errors[item.field as keyof typeof errors] ? `${item.label} is required` : ""}
                  sx={{ mb: 2, backgroundColor: "white" }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{item.icon}</InputAdornment>,
                  }}
                />
              </motion.div>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#388e3c" }}>
              College Information
            </Typography>
            {[
              { label: "Percentage", field: "percentage", icon: <GradeIcon /> },
              { label: "Bachelor's CGPA", field: "bachelorCgpa", icon: <SchoolIcon /> },
            ].map((item, index) => (
              <motion.div
                key={item.field}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                <TextField
                  fullWidth
                  label={item.label}
                  variant="outlined"
                  value={form[item.field as keyof typeof form]}
                  onChange={handleChange(item.field)}
                  error={errors[item.field as keyof typeof errors]}
                  helperText={errors[item.field as keyof typeof errors] ? `${item.label} is required` : ""}
                  sx={{ mb: 2, backgroundColor: "white" }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{item.icon}</InputAdornment>,
                  }}
                />
              </motion.div>
            ))}
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#388e3c" }}>
            Institution Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <FormControl fullWidth>
                  <InputLabel>University</InputLabel>
                  <Select
                    value={form.university}
                    onChange={handleChange("university")}
                    error={errors.university}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountBalanceIcon />
                      </InputAdornment>
                    }
                  >
                    {universities.map((uni) => (
                      <MenuItem key={uni} value={uni}>
                        {uni}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <FormControl fullWidth>
                  <InputLabel>College</InputLabel>
                  <Select
                    value={form.college}
                    onChange={handleChange("college")}
                    error={errors.college}
                    startAdornment={
                      <InputAdornment position="start">
                        <SchoolIcon />
                      </InputAdornment>
                    }
                  >
                    {colleges.map((col) => (
                      <MenuItem key={col} value={col}>
                        {col}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
        <Box mt={4} display="flex" justifyContent="space-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={prevStep}
              size="large"
              startIcon={<SchoolIcon />}
              sx={{
                fontWeight: "bold",
                borderRadius: 2,
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                },
              }}
            >
              Back
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextStep}
              size="large"
              endIcon={<SchoolIcon />}
              sx={{
                backgroundColor: "#388e3c",
                color: "#ffffff",
                fontWeight: "bold",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#2e7d32",
                },
              }}
            >
              Next
            </Button>
          </motion.div>
        </Box>
      </Paper>
    </Container>
  );
};

export default AcademicDetails;