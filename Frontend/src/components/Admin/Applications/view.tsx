
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Grid,
  Paper,
  Divider,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";

interface Document {
  uploaded: boolean;
  public_id: string;
  url: string;
}

interface ApplicationDetails {
  name: string;
  email: string;
  phoneNumber: string;
  age: number;
  address: string;
  education: string;
  loanAmount: number;
  comment?: string;
  incomeProof?: Document;
  addressProof?: Document;
  idProof?: Document;
}

interface ApplicationDetailsProps {
  open: boolean;
  onClose: () => void;
  application: ApplicationDetails | null;
  primaryColor?: string;
  secondaryColor?: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  maxWidth: 1200,
  maxHeight: "90vh",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  borderRadius: theme.shape.borderRadius,
  overflowY: "auto",
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const DetailItem = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const DocumentButton = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
  color: theme.palette.secondary.main,
  "&:hover": {
    textDecoration: "underline",
  },
}));

const ApplicationDetailsModal: React.FC<ApplicationDetailsProps> = ({
  open,
  onClose,
  application,
  primaryColor = "#1976d2",
}) => {
  const [activeDocument, setActiveDocument] = useState<string | null>(null);

  useEffect(() => {
    if (application) {
      setActiveDocument(null);
    }
  }, [application]);

  if (!application) return null;

  const renderDocumentViewer = () => {
    if (!activeDocument) return <Typography>NO DOCUMENT SELECTED</Typography>;

    return (
      <Box sx={{ height: "100%", width: "100%", overflow: "hidden" }}>
        <iframe
          src={`${activeDocument}#toolbar=1`}
          width="100%"
          height="90%"
          style={{ border: "none" }}
          title="Document Viewer"
        />
      </Box>
    );
  };

  const renderDocumentButton = (document: Document, label: string) => (
    <DocumentButton onClick={() => setActiveDocument(document.url)}>
      <DescriptionIcon sx={{ marginRight: 1 }} />
      {label}
    </DocumentButton>
  );

  return (
    <Modal open={open} onClose={onClose}>
      <StyledPaper elevation={5} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
            color: primaryColor,
            mb: 3,
          }}
        >
          Loan Application Form
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <SectionTitle>Personal Information</SectionTitle>
              <DetailItem><strong>Name:</strong> {application.name}</DetailItem>
              <DetailItem><strong>Email:</strong> {application.email}</DetailItem>
              <DetailItem><strong>Phone Number:</strong> {application.phoneNumber}</DetailItem>
              <DetailItem><strong>Age:</strong> {application.age}</DetailItem>
              <DetailItem><strong>Address:</strong> {application.address}</DetailItem>
              <DetailItem><strong>Education:</strong> {application.education}</DetailItem>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ mb: 3 }}>
              <SectionTitle>Loan Details</SectionTitle>
              <DetailItem><strong>Loan Amount:</strong> {application.loanAmount}</DetailItem>
              <DetailItem><strong>Comment:</strong> {application.comment || "No comment provided"}</DetailItem>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box>
              <SectionTitle>Documents</SectionTitle>
              {application.idProof && renderDocumentButton(application.idProof, "ID Proof")}
              {application.addressProof && renderDocumentButton(application.addressProof, "Address Proof")}
              {application.incomeProof && renderDocumentButton(application.incomeProof, "Income Proof")}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                height: { xs: "400px", sm: "500px", md: "600px" },
                p: 2,
                mt: { xs: 3, md: 0 },
                bgcolor: "rgba(0, 0, 0, 0.03)",
              }}
            >
              <SectionTitle>Document Viewer</SectionTitle>
              {renderDocumentViewer()}
            </Paper>
          </Grid>
        </Grid>
      </StyledPaper>
    </Modal>
  );
};

export default ApplicationDetailsModal;
