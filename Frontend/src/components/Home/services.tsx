import  { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Tab,
  Tabs,
  Grid,
  useMediaQuery,
} from "@mui/material";
import {
  SchoolRounded,
  AccountBalanceRounded,
  HomeWorkRounded,
  PublicRounded,
  LocalAtmRounded,
  CheckCircleOutlineRounded,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";

const MotionBox = motion(Box);

// Create a custom theme
const greenTheme = createTheme({
  palette: {
    primary: {
      main: "#1C6021",
    },
  },
});

const LoanCard = ({ loan }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #1C6021",
      }}
    >
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 3 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <loan.icon sx={{ fontSize: 40, color: "#1C6021", mr: 2 }} />
          <Typography
            variant="h5"
            component="div"
            color="#1C6021"
            fontWeight="bold"
          >
            {loan.title}
          </Typography>
        </Box>
        <Typography variant="body2" color="#1C6021" paragraph sx={{ mb: 3 }}>
          {loan.description}
        </Typography>
        <Box sx={{ mt: "auto" }}>
          {loan.details.map((detail, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <CheckCircleOutlineRounded
                sx={{ color: "#1C6021", mr: 1, fontSize: 20 }}
              />
              <Typography variant="body2" color="#1C6021">
                {detail}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
      <Box sx={{ p: 2, bgcolor: "#1C6021" }}>
        <Button
          href="/apply-form"
          variant="contained"
          sx={{
            bgcolor: "#EAF6EB",
            color: "#1C6021",
            "&:hover": { bgcolor: "#FFFFFF" },
          }}
          fullWidth
          size={isMobile ? "medium" : "large"}
          startIcon={<LocalAtmRounded />}
        >
          Apply Now
        </Button>
      </Box>
    </Card>
  );
};

const EducationLoanSolutions = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event, newValue) => {
    setActiveTab(newValue);
  };

  const loanCategories = [
    {
      title: "Undergraduate Loans",
      loans: [
        {
          title: "Tuition Loan",
          icon: SchoolRounded,
          description:
            "Cover your tuition fees and focus on your studies without financial stress.",
          details: [
            "Up to ₹100,000,00 coverage",
            "Competitive interest rates from 3.5% p.a.",
            "Flexible repayment options",
            "No collateral required for loans under ₹50,000",
          ],
        },
        {
          title: "Living Expense Loan",
          icon: HomeWorkRounded,
          description:
            "Support your living costs while you concentrate on achieving your educational goals.",
          details: [
            "Monthly disbursements up to ₹20,000",
            "Low fixed interest rate of 4% p.a.",
            "No payments required until 3 months post-graduation",
            "Covers rent, food, and essential living expenses",
          ],
        },
      ],
    },
    {
      title: "Post Graduate Loans",
      loans: [
        {
          title: "Academic Loan",
          icon: AccountBalanceRounded,
          description:
            "Finance your academic pursuits, including books, equipment, and research expenses.",
          details: [
            "Loans from ₹5,000 to ₹25,000,00",
            "Interest-only payments while in school",
            "6-month grace period after graduation",
            "Option to include computer purchases",
          ],
        },
        {
          title: "International Student Loan",
          icon: PublicRounded,
          description:
            "Tailored financial support for international students pursuing education abroad.",
          details: [
            "Covers tuition and living expenses",
            "Low Interest rates from 3.5% p.a.",
            "Multi-currency disbursement options",
            "Visa and travel insurance support",
          ],
        },
      ],
    },
  ];

  return (
    <ThemeProvider theme={greenTheme}>
      <Box sx={{ bgcolor: "#EAF6EB", minHeight: "100vh", py: 8 }}>
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{
                color: "#1C6021",
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Empowering Your Education Journey
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{
                color: "#1C6021",
                fontWeight: 700,
                mb: 2,
                // fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Our Comprehensive Education Loan Solutions
            </Typography>
          </MotionBox>
          <Box
            sx={{
              width: "100%",
              bgcolor: "#FFFFFF",
              borderRadius: 2,
              mb: 4,
              overflow: "hidden",
              border: "1px solid #1C6021",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="loan category tabs"
              sx={{
                "& .MuiTab-root": { color: "#1C6021" },
                "& .Mui-selected": { color: "#1C6021" },
                "& .MuiTabs-indicator": { backgroundColor: "#1C6021" },
              }}
            >
              {loanCategories.map((category, index) => (
                <Tab
                  key={index}
                  label={category.title}
                  sx={{ minHeight: 64 }}
                />
              ))}
            </Tabs>
          </Box>
          <AnimatePresence mode="wait">
            <MotionBox
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Grid container spacing={4}>
                {loanCategories[activeTab].loans.map((loan, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <LoanCard loan={loan} />
                  </Grid>
                ))}
              </Grid>
            </MotionBox>
          </AnimatePresence>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            sx={{ mt: 8, textAlign: "center" }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{
                color: "#1C6021",
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Ready to Invest in Your Future?
            </Typography>
            <Button
              href="/apply-form"
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                bgcolor: "#1C6021",
                color: "#FFFFFF",
                "&:hover": { bgcolor: "#154D1A" },
              }}
              startIcon={<SchoolRounded />}
            >
              Start Your Application
            </Button>
          </MotionBox>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EducationLoanSolutions;
