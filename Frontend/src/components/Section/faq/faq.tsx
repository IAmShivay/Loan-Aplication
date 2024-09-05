import React, { useState } from "react";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Container,
  Card,
  Divider,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  HelpOutline as HelpOutlineIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

interface FAQ {
  question: string;
  answer: string;
}

const faqData: FAQ[] = [
  {
    question: "What is StudyNpay?",
    answer:
      "GreenLoan Financial is a leading innovator in the loan industry, offering accessible, transparent, and sustainable financial solutions to help customers achieve their dreams.",
  },
  {
    question: "How do I apply for a loan?",
    answer:
      "You can apply for a loan by visiting our website and completing the online application form. Our streamlined process ensures fast approval, often within minutes.",
  },
  {
    question: "What types of loans do you offer?",
    answer:
      "We offer a variety of loan products including personal loans, business loans, and home loans, all designed to meet your specific financial needs.",
  },
  {
    question: "What are your interest rates?",
    answer:
      "Our interest rates are highly competitive, determined by advanced algorithms to ensure you get the best possible rate based on your financial profile.",
  },
  {
    question: "How secure is your application process?",
    answer:
      "We use bank-level encryption and robust security protocols to protect your sensitive information throughout the application process.",
  },
  {
    question: "Can I check my loan status online?",
    answer:
      "Yes, you can easily check the status of your loan application by logging into your account on our website.",
  },
  {
    question: "What should I do if I have trouble repaying my loan?",
    answer:
      "If you're experiencing difficulty with repayments, please contact our customer service team as soon as possible. We're here to help and can discuss alternative arrangements.",
  },
];

const FAQSection: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedPanel, setExpandedPanel] = useState<string | false>(false);

  const handleChange = (panel: any) => (isExpanded: any) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const filteredFAQs = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%", bgcolor: "#E8F5E9", py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#2E7D32",
              mb: 2,
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: 700,
              mx: "auto",
              mb: 4,
              fontWeight: 300,
            }}
          >
            Find quick answers to your questions about GreenLoan Financial
            services.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <TextField
              variant="outlined"
              placeholder="Search FAQs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#FFFFFF" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "100%",
                maxWidth: 500,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#4CAF50",
                  color: "#FFFFFF",
                  borderRadius: "50px",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#81C784",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#FFFFFF",
                  "&::placeholder": {
                    color: "#E8F5E9",
                    opacity: 1,
                  },
                },
                "& .MuiSvgIcon-root": {
                  color: "#FFFFFF",
                },
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          {filteredFAQs.map((item, index) => (
            <Card
              key={index}
              elevation={3}
              sx={{
                mb: 3,
                borderRadius: 4,
                bgcolor: "#FFFFFF",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[10],
                },
              }}
            >
              <Accordion
                expanded={expandedPanel === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  bgcolor: "transparent",
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#4CAF50" }} />}
                  sx={{
                    bgcolor: "#E8F5E9",
                    borderBottom: "1px solid #81C784",
                    borderRadius: "16px 16px 0 0",
                    minHeight: 72,
                    "&.Mui-expanded": {
                      minHeight: 72,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <HelpOutlineIcon sx={{ color: "#4CAF50", mr: 2 }} />
                    <Typography
                      sx={{
                        color: "#2E7D32",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      {item.question}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 3, bgcolor: "#FFFFFF" }}>
                  <Typography sx={{ color: "#424242", lineHeight: 1.6 }}>
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Card>
          ))}
        </Box>

        <Divider sx={{ mt: 8, mb: 6, bgcolor: "#81C784" }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ color: "#2E7D32", fontWeight: "bold", mb: 2 }}
          >
            Still have questions?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mb: 4, maxWidth: 600, mx: "auto" }}
          >
            Our dedicated support team is ready to assist you. Don't hesitate to
            reach out for personalized help.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#4CAF50",
              color: "#FFFFFF",
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              textTransform: "none",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#45a049",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 8px rgba(0,0,0,0.15)",
              },
            }}
          >
            Contact Support
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection;
