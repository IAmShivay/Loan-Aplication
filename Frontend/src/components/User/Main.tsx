import React from "react";
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
} from "@mui/material";
import {
  AccountBalance,
  Assessment,
  Folder,
  Chat,
  ExitToApp,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const DashboardItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  height: "100%",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const UserDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const user = useSelector((state: RootState) => state.auth.user);

  const getLoanProgress = (status: string) => {
    switch (status) {
      case "in-progress":
        return 50;
      case "approved":
        return 100;
      case "Rejected":
        return 100;
      default:
        return 0;
    }
  };

  const loanProgress = getLoanProgress("in-progress");
console.log(loanProgress)
  const menuItems = [
    { label: "LOAN STATUS", icon: <AccountBalance />, key: "loan-status" },
    { label: "DOCUMENTS", icon: <Folder />, key: "documents" },
    { label: "FAQ", icon: <Assessment />, key: "faq" },
    { label: "SUPPORT", icon: <Chat />, key: "support" },
  ];

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{ p: { xs: 2, sm: 4 }, mb: 4, borderRadius: 2 }}
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
                Welcome back, {user.Name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Loan Application #{user.loanApplicationNumber}
              </Typography>
            </Box>
            <Avatar
              sx={{ width: 64, height: 64 }}
              alt={user.name}
              src={user.avatar}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              Loan Progress
            </Typography>
            <LinearProgress
              variant="determinate"
              value={loanProgress}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Typography variant="body2" color="text.secondary">
              {loanProgress}%
            </Typography>
            <Chip
              label={
                user.loanStatus === "in-progress"
                  ? "In Progress"
                  : user.loanStatus === "approved"
                  ? "Approved"
                  : user.loanStatus === "Rejected"
                  ? "Submitted"
                  : "In Progress"
              }
              color="primary"
              size="small"
              sx={{ mt: { xs: 1, sm: 0 } }}
            />
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.key}>
              <DashboardItem elevation={1}>
                <IconWrapper>
                  {React.cloneElement(item.icon, {
                    color: "primary",
                    sx: { fontSize: 30, mr: 1 },
                  })}
                  <Typography variant="h6" component="h2">
                    {item.label}
                  </Typography>
                </IconWrapper>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {item.key === "loan-status"
                    ? "View your current loan status and details."
                    : item.key === "documents"
                    ? "Upload and manage your loan documents."
                    : item.key === "faq"
                    ? "Have questions? Check our FAQ for answers."
                    : "Get help from our support team and resolve your issues."}
                </Typography>
                <Button variant="outlined" color="primary" fullWidth>
                  Learn More
                </Button>
              </DashboardItem>
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
              textTransform: "none",
              fontWeight: "bold",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default UserDashboard;
