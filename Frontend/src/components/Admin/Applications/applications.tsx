import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Chip,
  Container,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ApplicationDetailsModal from "../Applications/view";
import axios from "axios";
import { LoanApplications } from "./type";
import * as Yup from "yup";
import { registerAdmin } from "../../../app/admin/adminSlice";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";

export interface LoanApplication {
  id: any;
  user: any;
  name: string;
  status: "Progress" | "Approved" | "Rejected";
  comment: string;
  Bank: any;
  isSubmitted: boolean;
  interestRate: number | "";
  loanAmount: any;
  phoneNumber: any;
}

const validationSchema = Yup.object().shape({
  comment: Yup.string()
    .required("Comment is required")
    .min(3, "Comment must be at least 3 characters")
    .max(500, "Comment must not exceed 500 characters"),
  interestRate: Yup.number()
    .required("Interest rate is required")
    .min(0, "Interest rate must be positive")
    .max(100, "Interest rate must not exceed 100%"),
});

const LoanApplicationTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<LoanApplications | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const Bank = "UCO BANK";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/getAllapplications"
        );
        setApplications(
          response.data.loanApplications.map((app: any) => ({
            ...app,
            status: app.status || "Progress",
            isSubmitted: false,
            Bank: Bank,
            interestRate: app.interestRate || "",
            comment: app.comment || "",
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackbar({
          open: true,
          message: "Error fetching applications",
          severity: "error",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (id: number, status: "Approved" | "Rejected") => {
    setApplications(
      applications.map((app) => (app.user === id ? { ...app, status } : app))
    );
    setSnackbar({
      open: true,
      message: `Application ${status}`,
      severity: "success",
    });
  };

  const handleCommentChange = (id: number, comment: string) => {
    setApplications(
      applications.map((app) => (app.user === id ? { ...app, comment } : app))
    );
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleInterestRateChange = (id: number, interestRate: string) => {
    setApplications(
      applications.map((app) =>
        app.user === id
          ? { ...app, interestRate: parseFloat(interestRate) || "" }
          : app
      )
    );
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateApplication = async (id: number): Promise<boolean> => {
    const application = applications.find((app) => app.user === id);
    if (!application) return false;

    try {
      await validationSchema.validate(
        {
          comment: application.comment,
          interestRate: application.interestRate,
        },
        { abortEarly: false }
      );
      setErrors((prev) => ({ ...prev, [id]: "" }));
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [id]: error.message }));
      }
      return false;
    }
  };

  const handleSubmit = async (id: number) => {
    if (await validateApplication(id)) {
      const application = applications.find((app) => app.user === id);
      if (application) {
        console.log("Submitting application:", application);
        dispatch(registerAdmin(application));
        setApplications(
          applications.map((app) =>
            app.user === id ? { ...app, isSubmitted: true } : app
          )
        );
        setSnackbar({
          open: true,
          message: "Application submitted successfully",
          severity: "success",
        });
      }
    }
  };

  const handleViewClick = (application: any) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "error";
      default:
        return "default";
    }
  };

  const renderDesktopView = () => (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{ borderRadius: 2, overflow: "hidden" }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
            <TableCell sx={{ color: "white" }}>ID</TableCell>
            <TableCell sx={{ color: "white" }}>Name</TableCell>
            <TableCell sx={{ color: "white" }}>Status</TableCell>
            <TableCell sx={{ color: "white" }}>Comment</TableCell>
            <TableCell sx={{ color: "white" }}>Interest Rate</TableCell>
            <TableCell sx={{ color: "white" }}>Bank</TableCell>
            <TableCell sx={{ color: "white" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((app) => (
            <TableRow
              key={app.user}
              sx={{
                "&:nth-of-type(odd)": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <TableCell>{app.user}</TableCell>
              <TableCell>{app.name}</TableCell>
              <TableCell>
                <Chip
                  label={app.status}
                  color={getStatusColor(app.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  required
                  id={`comment-${app.user}`}
                  label="Add Comments"
                  value={app.comment}
                  onChange={(e) =>
                    handleCommentChange(app.user, e.target.value)
                  }
                  disabled={app.isSubmitted}
                  error={!!errors[app.user]}
                  helperText={errors[app.user]}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  required
                  id={`interest-rate-${app.user}`}
                  label="Interest Rate (%)"
                  type="number"
                  value={app.interestRate}
                  onChange={(e) =>
                    handleInterestRateChange(app.user, e.target.value)
                  }
                  disabled={app.isSubmitted}
                  error={!!errors[app.user]}
                  helperText={errors[app.user]}
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    endAdornment: "%",
                  }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body1">{app.Bank}</Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleStatusChange(app.user, "Approved")}
                    disabled={app.status !== "Progress" || app.isSubmitted}
                    startIcon={<CheckCircleIcon />}
                    fullWidth
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleStatusChange(app.user, "Rejected")}
                    disabled={app.status !== "Progress" || app.isSubmitted}
                    startIcon={<CancelIcon />}
                    fullWidth
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit(app.user)}
                    disabled={app.isSubmitted}
                    startIcon={<SendIcon />}
                    fullWidth
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleViewClick(app)}
                    startIcon={<VisibilityIcon />}
                    fullWidth
                  >
                    View
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderMobileView = () => (
    <Box sx={{ padding: 2 }}>
      {applications.map((app) => (
        <Card
          key={app.user}
          sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 3 }}
        >
          <CardContent>
            <Typography variant="h6" color="primary">
              {app.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              ID: {app.user}
            </Typography>
            <Chip
              label={app.status}
              color={getStatusColor(app.status)}
              size="small"
              sx={{ marginBottom: 1 }}
            />
            <TextField
              value={app.comment}
              onChange={(e) => handleCommentChange(app.user, e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={2}
              sx={{ marginBottom: 1 }}
              required
              error={!!errors[app.user]}
              helperText={errors[app.user] || "Comment is required"}
              disabled={app.isSubmitted}
              label="Comment"
            />
            <TextField
              value={app.interestRate}
              onChange={(e) =>
                handleInterestRateChange(app.user, e.target.value)
              }
              fullWidth
              variant="outlined"
              size="small"
              sx={{ marginBottom: 1 }}
              required
              error={!!errors[app.user]}
              helperText={errors[app.user] || "Interest rate is required"}
              disabled={app.isSubmitted}
              label="Interest Rate (%)"
              type="number"
              InputProps={{
                endAdornment: "%",
              }}
            />
            <Typography variant="body1" color="text.secondary">
              {app.Bank}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
                marginTop: 1,
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={() => handleStatusChange(app.user, "Approved")}
                disabled={app.status !== "Progress" || app.isSubmitted}
                startIcon={<CheckCircleIcon />}
                fullWidth
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleStatusChange(app.user, "Rejected")}
                disabled={app.status !== "Progress" || app.isSubmitted}
                startIcon={<CancelIcon />}
                fullWidth
              >
                Reject
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit(app.user)}
                disabled={app.isSubmitted}
                startIcon={<SendIcon />}
                fullWidth
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="info"
                onClick={() => handleViewClick(app)}
                startIcon={<VisibilityIcon />}
                fullWidth
              >
                View
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      {isMobile ? renderMobileView() : renderDesktopView()}
      <ApplicationDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        application={selectedApplication}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoanApplicationTable;
