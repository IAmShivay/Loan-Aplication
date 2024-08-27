import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  Grid,
  useMediaQuery,
  Avatar,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { ExitToApp, AccountBalance } from "@mui/icons-material";
import { styled } from "@mui/system";
import axiosInstance from "../apiAxios/axiosInstance";
import Header from "../../components/Section/Header/Header.tsx";
import { useSelector } from "react-redux";
import { logoutUser } from "../../app/auth/authSlice";
import { showSnackbar } from "../../app/errors/errorSlice";
import { useDispatch } from "react-redux";
import Footer from "../Section/Footer/Footer.tsx";

// Create a theme for consistent styling
const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
      dark: "#388e3c",
    },
    secondary: {
      main: "#f44336", // Red color for logout button
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "25px",
          fontWeight: "bold",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          "&:hover": {
            boxShadow: "0 6px 8px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          },
        },
      },
    },
  },
});

// Styled components
const DashboardItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  height: "100%",
  transition: "transform 0.3s ease",
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.MuiLinearProgress-colorPrimary`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}));

// Interfaces
interface Loan {
  Bank: string;
  status: "in-progress" | "Approved" | "rejected";
  loanAmount: number;
  interestRate: number;
  term: number;
}

// LoanItem component
const LoanItem: React.FC<any> = React.memo(
  ({ bank, status, amount, onRequestCall, onViewDetails }) => {
    const getLoanProgress = (status: string): number => {
      switch (status) {
        case "in-progress":
          return 50;
        case "Approved":
          return 100;
        case "rejected":
          return 100;
        default:
          return 0;
      }
    };

    // Loan Progress
    const loanProgress = getLoanProgress(status);

    const getStatusColor = (status: string) => {
      switch (status) {
        case "Approved":
          return "#4caf50"; // Green
        case "rejected":
          return "#f44336"; // Red
        case "in-progress":
          return "#ff9800"; // Orange
        default:
          return "#2196f3"; // Blue
      }
    };

    return (
      <DashboardItem elevation={3}>
        <Box display="flex" alignItems="center" mb={2}>
          <AccountBalance color="primary" sx={{ fontSize: 32, mr: 1 }} />
          <Typography variant="h6" component="h2">
            {bank}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Loan Amount: ₹{amount.toLocaleString()}
        </Typography>
        <StyledLinearProgress
          variant="determinate"
          value={loanProgress}
          sx={{ mb: 2 }}
        />
        <Chip
          label={status.charAt(0).toUpperCase() + status.slice(1)}
          sx={{
            mb: 2,
            backgroundColor: getStatusColor(status),
            color: "#ffffff",
          }}
          size="small"
        />
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={onViewDetails}
          sx={{ mb: 1 }}
        >
          View Status
        </Button>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onRequestCall}
        >
          Request Call
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={onViewDetails}
          sx={{ mt: 1 }}
        >
          View Application
        </Button>
      </DashboardItem>
    );
  }
);

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [data, setData] = useState<Loan[]>([]);
  const { user } = useSelector((state: any) => state.verify);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/api/v1/details"
        );

        // Handle data based on actual response structure
        if (Array.isArray(response.data.data)) {
          setData(response.data.data); // Set the data array
        } else {
          console.error("API response data is not an array", response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRequestCall = (bank: string) => {
    alert(`Request call for ₹${bank}`);
  };

  const handleViewDetails = (loan: Loan) => {
    setSelectedLoan(loan);
  };

  const handleCloseDetails = () => {
    setSelectedLoan(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(
      showSnackbar({
        message: "You have been logged out successfully.",
        severity: "success",
      })
    );
  };

  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
          <Container maxWidth="lg">
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 4 },
                mb: 4,
                borderRadius: 4,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow: theme.shadows[3],
              }}
            >
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                mb={3}
              >
                <Box mb={{ xs: 2, sm: 0 }}>
                  <Typography
                    variant="h4"
                    component="h1"
                    color="primary"
                  >
                    Welcome back, {user.Name}! 😊
                  </Typography>
                </Box>
                <Avatar
                  src="https://th.bing.com/th/id/OIP.sQITeQsafh6osAKTB25AMgHaFj?w=247&h=186&c=7&r=0&o=5&pid=1.7"
                  sx={{
                    width: 80,
                    height: 80,
                    border: `2px solid ${theme.palette.primary.main}`,
                  }}
                />
              </Box>
            </Paper>

            <Grid container spacing={3}>
              {data.map((loan, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <LoanItem
                    bank={loan.Bank}
                    status={loan.status}
                    amount={loan.loanAmount}
                    onRequestCall={() => handleRequestCall(loan.Bank)}
                    onViewDetails={() => handleViewDetails(loan)}
                  />
                </Grid>
              ))}
            </Grid>

            <Box mt={4} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<ExitToApp />}
                size={isMobile ? "medium" : "large"}
                sx={{
                  borderRadius: "50px",
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1, sm: 1.5 },
                  fontWeight: "bold",
                  width: { xs: "100%", sm: "auto" },
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Container>

          <Dialog
            open={!!selectedLoan}
            onClose={handleCloseDetails}
            PaperProps={{
              style: {
                borderRadius: 16,
                padding: theme.spacing(2),
              },
            }}
          >
            <DialogTitle sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
              {selectedLoan?.Bank} Loan Details
            </DialogTitle>
            <DialogContent>
              {selectedLoan && (
                <Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography component="span" variant="body1">
                      Status:{" "}
                    </Typography>
                    <Chip
                      label={selectedLoan.status}
                      sx={{
                        backgroundColor: (() => {
                          switch (selectedLoan.status) {
                            case "Approved":
                              return "#4caf50";
                            case "rejected":
                              return "#f44336";
                            case "in-progress":
                              return "#ff9800";
                            default:
                              return "#2196f3";
                          }
                        })(),
                        color: "#ffffff",
                      }}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Loan Amount:{" "}
                    <strong>₹{selectedLoan.loanAmount.toLocaleString()}</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Interest Rate: <strong>{selectedLoan.interestRate}%</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Loan Term: <strong>{selectedLoan.term} years</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Estimated Monthly Payment:{" "}
                    <strong>
                      ₹
                      {(
                        (selectedLoan.loanAmount *
                          (selectedLoan.interestRate / 100 / 12)) /
                        (1 -
                          Math.pow(
                            1 + selectedLoan.interestRate / 100 / 12,
                            -selectedLoan.term * 12
                          ))
                      ).toFixed(2)}
                    </strong>
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDetails}
                color="primary"
                variant="contained"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default UserDashboard;
