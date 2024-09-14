import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
  Container,
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { HDFC, UNION, IDFC, BAJAJ, AXIS } from "../../../assets/images/index";

interface Bank {
  id: number;
  name: string;
  logo: string;
  description: string;
  specialty: string;
}

const associatedBanks: Bank[] = [
  {
    id: 1,
    name: "HDFC Bank",
    logo: HDFC,
    description: "International banking with a presence in over 50 countries.",
    specialty: "Global Transactions",
  },
  {
    id: 2,
    name: "IDFC First Bank",
    logo: IDFC,
    description: "Specializing in high-security banking solutions for businesses.",
    specialty: "Cyber Security",
  },
  {
    id: 3,
    name: "Axis Bank",
    logo: AXIS,
    description: "Supporting local businesses and community development projects.",
    specialty: "Microfinance",
  },
  {
    id: 4,
    name: "Union Bank",
    logo: UNION,
    description: "Pioneering digital banking solutions for the modern era.",
    specialty: "Fintech Integration",
  },
  {
    id: 5,
    name: "Bajaj Finserv",
    logo: BAJAJ,
    description: "Focused on sustainable banking and eco-friendly investments.",
    specialty: "Green Investments",
  },
];

const AssociatedBanks: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const itemsPerPage: number = isMobile ? 1 : isTablet ? 2 : 3;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= associatedBanks.length ? 0 : prevIndex + itemsPerPage
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(associatedBanks.length - itemsPerPage, 0) : Math.max(prevIndex - itemsPerPage, 0)
    );
  };

  return (
    <Box sx={{ bgcolor: "#f0f4f8", py: 12, overflow: "hidden" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            mb: 8,
            textAlign: "center",
            color: "#2e7d32",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
          }}
        >
          Our Banking Network
        </Typography>
        <Box sx={{ position: "relative", height: 450, mx: "auto" }}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {associatedBanks.slice(currentIndex, currentIndex + itemsPerPage).map((bank) => (
                  <Box
                    key={bank.id}
                    sx={{
                      width: `${100 / itemsPerPage}%`,
                      padding: "0 10px",
                      boxSizing: "border-box",
                    }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "20px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-10px)",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={bank.logo}
                        alt={bank.name}
                        sx={{
                          height: 180,
                          width: "80%",
                          objectFit: "contain",
                          bgcolor: "#fff",
                          p: 4,
                        }}
                      />
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          bgcolor: "#ffffff",
                        }}
                      >
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{ fontWeight: "bold", color: "#2e7d32", mb: 2 }}
                        >
                          {bank.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 3 }}
                        >
                          {bank.description}
                        </Typography>
                        <Chip
                          label={bank.specialty}
                          sx={{
                            alignSelf: "flex-start",
                            bgcolor: "#e8f5e9",
                            color: "#2e7d32",
                            fontWeight: "bold",
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </AnimatePresence>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: { xs: -20, md: -60 },
              top: "50%",
              transform: "translateY(-50%)",
              color: "#fff",
              bgcolor: "rgba(46, 125, 50, 0.8)",
              "&:hover": { bgcolor: "rgba(46, 125, 50, 1)" },
              zIndex: 2,
            }}
          >
            <ChevronLeft fontSize="large" />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: { xs: -20, md: -60 },
              top: "50%",
              transform: "translateY(-50%)",
              color: "#fff",
              bgcolor: "rgba(46, 125, 50, 0.8)",
              "&:hover": { bgcolor: "rgba(46, 125, 50, 1)" },
              zIndex: 2,
            }}
          >
            <ChevronRight fontSize="large" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default AssociatedBanks;