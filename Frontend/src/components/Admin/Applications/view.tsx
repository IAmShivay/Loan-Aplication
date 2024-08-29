
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Grid,
  Paper,
  Divider,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";

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
    maxHeight: "95vh",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  color: "#4caf50",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const DetailItem = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

const DocumentButton = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
  color: "#4caf50",
  "&:hover": {
    textDecoration: "underline",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

const ApplicationDetailsModal: React.FC<ApplicationDetailsProps> = ({
  open,
  onClose,
  application,
  primaryColor = "#4caf50",
}) => {
  const [activeDocument, setActiveDocument] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (application) {
      setActiveDocument(null);
      setActiveTab(0);
    }
  }, [application]);

  if (!application) return null;
console.log(application)
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
      <DescriptionIcon sx={{ marginRight: 1, color: primaryColor }} />
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
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
            color: primaryColor,
            mb: 3,
            display: "flex",
            alignItems: "center",
          }}
        >
          <AssignmentIcon sx={{ marginRight: 1 }} />
          <span>Loan Application Form</span>
        </Typography>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
          sx={{ mb: 3 }}
        >
          <Tab
            label={
              <SectionTitle>
                <PersonIcon sx={{ marginRight: 1 }} />
                <span>{isMobile ? "Personal" : "Personal Details"}</span>
              </SectionTitle>
            }
          />
          <Tab
            label={
              <SectionTitle>
                <ReceiptIcon sx={{ marginRight: 1 }} />
                <span>{isMobile ? "Borrower" : "Borrower Details"}</span>
              </SectionTitle>
            }
          />
          <Tab
            label={
              <SectionTitle>
                <SchoolIcon sx={{ marginRight: 1 }} />
                <span>{isMobile ? "Education" : "Education Details"}</span>
              </SectionTitle>
            }
          />
        </Tabs>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {activeTab === 0 && (
              <Box>
                <SectionTitle>
                  <PersonIcon sx={{ marginRight: 1 }} />
                  <span>Personal Information</span>
                </SectionTitle>
                <DetailItem>
                  <strong>Name:</strong> {application.name}
                </DetailItem>
                <DetailItem>
                  <strong>Email:</strong> {application.email}
                </DetailItem>
                <DetailItem>
                  <strong>Phone Number:</strong> {application.phoneNumber}
                </DetailItem>
                <DetailItem>
                  <strong>Age:</strong> {application.age}
                </DetailItem>
                <DetailItem>
                  <strong>Address:</strong> {application.address}
                </DetailItem>
              </Box>
            )}
            {activeTab === 1 && (
              <Box>
                <SectionTitle>
                  <ReceiptIcon sx={{ marginRight: 1 }} />
                  <span>Borrower Details</span>
                </SectionTitle>
                <DetailItem>
                  <strong>Loan Amount:</strong> {application.loanAmount}
                </DetailItem>
                <DetailItem>
                  <strong>Comment:</strong>{" "}
                  {application.comment || "No comment provided"}
                </DetailItem>
              </Box>
            )}
            {activeTab === 2 && (
              <Box>
                <SectionTitle>
                  <SchoolIcon sx={{ marginRight: 1 }} />
                  <span>Education Details</span>
                </SectionTitle>
                <DetailItem>
                  <strong>Education:</strong> {application.education}
                </DetailItem>
              </Box>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box>
              <SectionTitle>
                <DescriptionIcon sx={{ marginRight: 1 }} />
                <span>Documents</span>
              </SectionTitle>
              {application.idProof &&
                renderDocumentButton(application.idProof, "ID Proof")}
              {application.addressProof &&
                renderDocumentButton(application.addressProof, "Address Proof")}
              {application.incomeProof &&
                renderDocumentButton(application.incomeProof, "Income Proof")}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                height: { xs: "300px", sm: "400px", md: "500px" },
                p: 2,
                mt: { xs: 3, md: 0 },
                bgcolor: "rgba(0, 0, 0, 0.03)",
              }}
            >
              <SectionTitle>
                <DescriptionIcon sx={{ marginRight: 1 }} />
                <span>Document Viewer</span>
              </SectionTitle>
              {renderDocumentViewer()}
            </Paper>
          </Grid>
        </Grid>
      </StyledPaper>
    </Modal>
  );
};

export default ApplicationDetailsModal;
