
import React, { useState, useMemo } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  Grid,
  useTheme,
  useMediaQuery,
  Avatar,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ThemeProvider,
} from "@mui/material";
import { ExitToApp, AccountBalance } from "@mui/icons-material";
import { styled } from "@mui/system";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

// Minimalistic Dashboard Item Style
const DashboardItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  height: "100%",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
  background: theme.palette.background.paper,
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  [`&.MuiLinearProgress-colorPrimary`]: {
    backgroundColor: theme.palette.grey[300],
  },
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

interface Loan {
  bank: string;
  status: "in-progress" | "approved" | "rejected";
  amount: number;
  interestRate: number;
  term: number;
}

interface LoanItemProps {
  bank: string;
  status: "in-progress" | "approved" | "rejected";
  amount: number;
  onRequestCall: () => void;
  onViewDetails: () => void;
}

const LoanItem: React.FC<LoanItemProps> = React.memo(
  ({ bank, status, amount, onRequestCall, onViewDetails }) => {
    const getLoanProgress = (status: string): number => {
      switch (status) {
        case "in-progress":
          return 50;
        case "approved":
          return 100;
        case "rejected":
          return 100;
        default:
          return 0;
      }
    };

    const loanProgress = getLoanProgress(status);

    return (
      <DashboardItem elevation={1}>
        <Box display="flex" alignItems="center" mb={2}>
          <AccountBalance color="primary" sx={{ fontSize: 32, mr: 1 }} />
          <Typography variant="h6" component="h2">
            {bank}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Loan Amount: ${amount.toLocaleString()}
        </Typography>
        <StyledLinearProgress
          variant="determinate"
          value={loanProgress}
          sx={{ mb: 2 }}
        />
        <Chip
          label={status.charAt(0).toUpperCase() + status.slice(1)}
          color={
            status === "approved"
              ? "success"
              : status === "rejected"
              ? "error"
              : "primary"
          }
          size="small"
          sx={{ mb: 2 }}
        />
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={onViewDetails}
          sx={{ mb: 1 }}
        >
          View Details
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onRequestCall}
          sx={{ mb: 1 }}
        >
          Request Call
        </Button>
      </DashboardItem>
    );
  }
);

// interface User {
//   name?: string;
//   avatar?: string;
// }

const UserDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // const user = useSelector<RootState, User>((state) => state.auth.user);
  // console.log(user)
  const loans: Loan[] = useMemo(
    () => [
      {
        bank: "Chase Bank",
        status: "in-progress",
        amount: 250000,
        interestRate: 3.5,
        term: 30,
      },
      {
        bank: "Bank of America",
        status: "approved",
        amount: 300000,
        interestRate: 3.2,
        term: 15,
      },
      {
        bank: "Wells Fargo",
        status: "rejected",
        amount: 200000,
        interestRate: 3.8,
        term: 30,
      },
      {
        bank: "Citibank",
        status: "in-progress",
        amount: 275000,
        interestRate: 3.4,
        term: 20,
      },
      {
        bank: "US Bank",
        status: "approved",
        amount: 225000,
        interestRate: 3.6,
        term: 30,
      },
      {
        bank: "PNC Bank",
        status: "in-progress",
        amount: 180000,
        interestRate: 3.7,
        term: 15,
      },
      {
        bank: "TD Bank",
        status: "rejected",
        amount: 320000,
        interestRate: 3.3,
        term: 30,
      },
      {
        bank: "Capital One",
        status: "approved",
        amount: 290000,
        interestRate: 3.5,
        term: 20,
      },
    ],
    []
  );

  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const handleRequestCall = (bank: string) => {
    alert(`Request call for ${bank}`);
  };

  const handleViewDetails = (loan: Loan) => {
    setSelectedLoan(loan);
  };

  const handleCloseDetails = () => {
    setSelectedLoan(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 4 },
              mb: 4,
              borderRadius: 4,
              backgroundColor: theme.palette.grey[200],
              color: theme.palette.text.primary,
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
                  fontWeight="bold"
                  gutterBottom
                >
                  Welcome back
                </Typography>
                <Typography variant="subtitle1">
                  Loan Application Dashboard
                </Typography>
              </Box>
              <Avatar
                sx={{ width: 80, height: 80, border: "2px solid grey" }}
                // alt={user?.Name}
                // src={user?.avatar}
              />
            </Box>
          </Paper>

          <Grid container spacing={3}>
            {loans.map((loan, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <LoanItem
                  bank={loan.bank}
                  status={loan.status}
                  amount={loan.amount}
                  onRequestCall={() => handleRequestCall(loan.bank)}
                  onViewDetails={() => handleViewDetails(loan)}
                />
              </Grid>
            ))}
          </Grid>

          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              startIcon={<ExitToApp />}
              size={isMobile ? "medium" : "large"}
              sx={{
                borderRadius: "50px",
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                fontWeight: "bold",
                width: { xs: "100%", sm: "auto" },
              }}
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
          <DialogTitle sx={{ fontWeight: "bold" }}>
            {selectedLoan?.bank} Loan Details
          </DialogTitle>
          <DialogContent>
            {selectedLoan && (
              <Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Status:{" "}
                  <Chip
                    label={selectedLoan.status}
                    color={
                      selectedLoan.status === "approved"
                        ? "success"
                        : selectedLoan.status === "rejected"
                        ? "error"
                        : "default"
                    }
                    size="small"
                  />
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Loan Amount:{" "}
                  <strong>${selectedLoan.amount.toLocaleString()}</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Interest Rate: <strong>{selectedLoan.interestRate}%</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Loan Term: <strong>{selectedLoan.term} years</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Estimated Monthly Payment:{" "}
                  <strong>
                    $
                    {(
                      (selectedLoan.amount *
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
    </ThemeProvider>
  );
};

export default UserDashboard;
