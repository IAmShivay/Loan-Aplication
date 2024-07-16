import React, { useState} from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { HeroMain } from "../../assets/images";

interface Carousel {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

const Carousel: Carousel[] = [
  {
    id: 1,
    title: "Welcome to Our Institution",
    description: "Discover world-class education and opportunities for growth.",
    image: HeroMain,
    link: "/about",
  },
];

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const CarouselComponent: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate('/apply-form');
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "100vh", sm: "100vh" },
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Carousel.map((item) => (
        <Box
          key={item.id}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <Container maxWidth="lg" sx={{ height: "100%", position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                textAlign: "left",
                maxWidth: { xs: "100%", sm: "70%", md: "50%" },
              }}
            >
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography
                  variant={isMobile ? "h4" : isTablet ? "h3" : "h2"}
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  {item.title}
                </Typography>
              </motion.div>
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  sx={{ mb: 4 }}
                >
                  {item.description}
                </Typography>
              </motion.div>
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size={isMobile ? "medium" : "large"}
                    onClick={handleApplyNow}
                  >
                    Apply Now
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    size={isMobile ? "medium" : "large"}
                    href={item.link}
                  >
                    Learn More
                  </Button>
                </Box>
              </motion.div>
            </Box>
          </Container>
        </Box>
      ))}
    </Box>
  );
};

export default CarouselComponent;