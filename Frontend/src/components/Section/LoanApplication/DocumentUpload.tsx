import React from "react";
import { Box, Button, Typography, IconButton, Paper, Grid, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { uploadDocument, removeDocument } from "../../../app/LoanAppliation/DocumentSlice";

const DocumentUpload: React.FC<{ nextStep: () => void; prevStep: () => void }> = ({ nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const documents = useSelector((state: RootState) => state.document);

  const theme = useTheme();
  const isMobile:any = useMediaQuery(theme.breakpoints.down('sm'));

  const allDocumentsUploaded = documents.idProof.uploaded && documents.addressProof.uploaded && documents.incomeProof.uploaded;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const fileSize = file.size;
      if (fileType !== "application/pdf") {
        alert("Only PDF files are allowed.");
      } else if (fileSize > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB.");
      } else {
        const documentType = event.target.name as keyof typeof documents;
        dispatch(uploadDocument({ type: documentType, file }));
      }
    }
  };

  const removeProof = (type: keyof typeof documents) => {
    dispatch(removeDocument(type));
  };

  const UploadButton = ({ label, name, uploaded }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography variant="subtitle1" align="left">
              {label} <span style={{ color: "red" }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{ color: "#006400", borderColor: "#006400" }}
            >
              {uploaded ? "Change" : "Upload"}
              <input
                type="file"
                hidden
                name={name}
                onChange={handleFileChange}
              />
            </Button>
          </Grid>
        </Grid>
        {uploaded && (
          <Grid container justifyContent="flex-end" mt={1}>
            <IconButton onClick={() => removeProof(name)}>
              <CancelOutlinedIcon sx={{ color: "#FF0000" }} />
            </IconButton>
            <IconButton>
              <CheckCircleOutlineIcon sx={{ color: "#006400" }} />
            </IconButton>
          </Grid>
        )}
      </Paper>
    </motion.div>
  );

  return (
    <Box mt={4} mb={4} textAlign="center" width="100%" maxWidth="600px" mx="auto">
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="#006400">
        Document Upload
      </Typography>
      <Typography variant="body1" gutterBottom color="textSecondary">
        Please upload the following documents in PDF format (Max size: 5MB).
      </Typography>
      <Box mt={4}>
        <UploadButton
          label="Upload ID Proof"
          name="idProof"
          uploaded={documents.idProof.uploaded}
        />
        <UploadButton
          label="Upload Address Proof"
          name="addressProof"
          uploaded={documents.addressProof.uploaded}
        />
        <UploadButton
          label="Upload Income Proof"
          name="incomeProof"
          uploaded={documents.incomeProof.uploaded}
        />
        <Box mt={4} textAlign="center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              onClick={prevStep}
              sx={{ mr: 2, color: "#006400", borderColor: "#006400" }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={nextStep}
              disabled={!allDocumentsUploaded}
              sx={{ backgroundColor: "#006400", color: "#fff" }}
            >
              Next
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default DocumentUpload;
