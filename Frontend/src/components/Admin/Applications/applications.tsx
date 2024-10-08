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
  Container,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ApplicationDetailsModal from "../Applications/view";
import { LoanApplications } from "./type";
import * as Yup from "yup";
import { registerAdmin } from "../../../app/admin/adminSlice";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { GetDataAllApplications } from "../../../api/admin";
import ChatComponent from "../../../chat/chat";
import { useSelector } from "react-redux";
export interface LoanApplication {
  _id: any;
  user: any;
  name: string;
  status: string;
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
    .min(3, "Comment must be at least 3 characters"),
  interestRate: Yup.number()
    .required("Interest rate is required")
    .min(0, "Interest rate must be positive")
    .max(100, "Interest rate must not exceed 100%"),
});

const statusOptions = [
  { value: "Progress", label: "In Progress", color: "#FFA726" },
  {
    value: "ReviewingDocuments",
    label: "Reviewing Docs",
    color: "#29B6F6",
  },
  { value: "Loan Disbursed", label: "Loan Disbursed", color: "#009688" },
  { value: "PendingApproval", label: "Pending Approval", color: "#AB47BC" },
  { value: "Approved", label: "Approved", color: "#4CAF50" },
  { value: "Rejected", label: "Rejected", color: "#E53935" },
];

const LoanApplicationTable: React.FC = () => {
  const { user } = useSelector((state: any) => state.verify);
  const dispatch = useDispatch<AppDispatch>();
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<LoanApplications | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat]: any = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetDataAllApplications();
        setApplications(
          response.loanApplications.map((app: any) => ({
            ...app,
            user: app.user,
            status: app.status || "Progress",
            isSubmitted: app.adminResponse,
            Bank: user?.BankName,
            interestRate: "" || 0,
            comment: app.adminComments,
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

  const handleStatusChange = (id: number, event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    setApplications(
      applications.map((app) =>
        app.user === id ? { ...app, status: newStatus } : app
      )
    );
    setSnackbar({
      open: true,
      message: `Application status updated to ${newStatus}`,
      severity: "success",
    });
  };

  const handleCommentChange = (id: number, comment: string) => {
    setApplications(
      applications.map((app) => (app.user === id ? { ...app, comment } : app))
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

  const handleChatNowClick = (application: any) => {
    setActiveChat({ id: application.user, name: application.name });
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(
      (option) => option.value === status
    );
    return statusOption ? statusOption.color : "#E8F5E9";
  };
  const message = `
  Hi ${applications[0]?.name},

  We've received your loan application At StudyNpay (ID: ${applications[0]?._id}).
  I'm from ${user?.BankName} and need some additional information to move forward.
  Please share any relevant documents or details at your earliest convenience.
  
  Thank you!
  Best,
  ${user.firstName}
  `;

  const encodedMessage = encodeURIComponent(message);
  const renderDesktopView = () => (
    <>
      {" "}
      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        fontWeight="bold"
        sx={{
          borderBottom: "2px solid",
          borderColor: "#C9E7CB",
          paddingBottom: 2,
          marginBottom: 3,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          color: "#007A33", // Example darker green
        }}
      >
        Total Applications{" "}
      </Typography>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ borderRadius: 2, overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4CAF50" }}>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
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
                    backgroundColor: "#E8F5E9",
                  },
                }}
              >
                <TableCell>{app.user}</TableCell>
                <TableCell>{app.name}</TableCell>
                <TableCell>
                  <Select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.user, e)}
                    size="small"
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: getStatusColor(app.status),
                      color: "white",
                      "&:before": { borderColor: "white" },
                      "&:after": { borderColor: "white" },
                      "& .MuiSvgIcon-root": { color: "white" },
                    }}
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{app.Bank}</Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <TextField
                      required
                      id={`comment-${app.user}`}
                      label="Add Comments"
                      value={app.comment}
                      onChange={(e) =>
                        handleCommentChange(app.user, e.target.value)
                      }
                      disabled={
                        app.status === "Loan Disbursed" || app.isSubmitted
                      }
                      error={!!errors[app.user]}
                      helperText={errors[app.user]}
                      variant="outlined"
                      size="small"
                      sx={{ flexGrow: 1, minWidth: "100px" }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => handleSubmit(app.user)}
                        disabled={app.isSubmitted}
                        sx={{
                          borderRadius: "50%",
                          padding: 1,
                        }}
                      >
                        <SendIcon />
                      </IconButton>
                      <IconButton
                        color="info"
                        onClick={() => handleViewClick(app)}
                        sx={{
                          borderRadius: "50%",
                          padding: 1,
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <Tooltip title="Chat Now">
                        <Button
                          variant="contained"
                          // onClick={() => handleChatNowClick(app)}
                          href={`https://wa.me/+91${app?.phoneNumber}?text=${encodedMessage}`}
                          sx={{
                            bgcolor: "#45a049",
                            borderRadius: "12px",
                            padding: "10px 20px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                            textTransform: "none",
                            fontWeight: "bold",
                            "&:hover": {
                              bgcolor: "#06a972",
                              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                            },
                            transition: "all 0.3s ease",
                          }}
                          target="_blank" // Ensure the link opens in a new tab
                          rel="noopener noreferrer" // Security best practice
                        >
                          Chat Now
                        </Button>
                      </Tooltip>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  const renderMobileView = () => (
    <Box sx={{ padding: 2, height: "80vh", overflowY: "auto" }}>
      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        fontWeight="bold"
        sx={{
          borderBottom: "2px solid",
          borderColor: "#C9E7CB",
          paddingBottom: 2,
          marginBottom: 3,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          color: "#007A33", // Example darker green
        }}
      >
        Total Applications{" "}
      </Typography>
      {applications.map((app) => (
        <Card
          key={app.user}
          sx={{
            marginBottom: 2,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#E8F5E9",
          }}
        >
          <CardContent>
            <Typography variant="h6" color="#4CAF50">
              {app.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              ID: {app.user}
            </Typography>
            <Select
              value={app.status}
              onChange={(e) => handleStatusChange(app.user, e)}
              size="small"
              fullWidth
              sx={{
                borderRadius: "10px",
                backgroundColor: getStatusColor(app.status),
                color: "white",
                marginBottom: 1,
                "&:before": { borderColor: "white" },
                "&:after": { borderColor: "white" },
                "& .MuiSvgIcon-root": { color: "white" },
              }}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
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
              disabled={app.status === "Loan Disbursed" || app.isSubmitted}
              label="Comment"
            />
            <Typography variant="body1" color="text.secondary">
              {app.Bank}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 1,
                marginTop: 1,
              }}
            >
              <IconButton
                color="primary"
                onClick={() => handleSubmit(app.user)}
                disabled={app.isSubmitted}
                sx={{
                  borderRadius: "50%",
                  padding: 1,
                }}
              >
                <SendIcon />
              </IconButton>
              <IconButton
                color="info"
                onClick={() => handleViewClick(app)}
                sx={{
                  borderRadius: "50%",
                  padding: 1,
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 1,
              }}
            >
              <Tooltip title="Chat Now">
                <Button
                  variant="contained"
                  onClick={() => handleChatNowClick(app)}
                  sx={{
                    bgcolor: "#45a049",
                    borderRadius: "12px",
                    padding: "10px 20px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      bgcolor: "#06a972",
                      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Chat Now
                </Button>
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {isMobile || isMedium ? renderMobileView() : renderDesktopView()}
          {selectedApplication && (
            <ApplicationDetailsModal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              application={selectedApplication}
            />
          )}
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
        </>
      )}
      {activeChat && (
        <ChatComponent
          applicationId={activeChat.id}
          applicantName={activeChat.name}
        />
      )}
    </Container>
  );
};

export default LoanApplicationTable;
