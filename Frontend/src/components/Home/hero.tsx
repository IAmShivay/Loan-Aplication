import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const handleApplyNow = () => {
    navigate("/apply-form");
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box
      sx={{
        height: { xs: "100vh", md: "100vh" },
        position: "relative",
        overflow: "hidden",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 20, mb: 20}}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  color: "#fff",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Transform Your Future
              </Typography>
            </motion.div>
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: "#e0e0e0",
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  lineHeight: 1.6,
                  maxWidth: "600px",
                }}
              >
                Empower your journey towards success with our tailored education
                loans. Let us help you build a brighter future today
              </Typography>
            </motion.div>
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                variant="contained"
                size="large"
                href="/apply-form"
                onClick={handleApplyNow}
                sx={{
                  backgroundColor: "#4caf50",
                  "&:hover": {
                    backgroundColor: "#45a049",
                    transform: "translateY(-2px)",
                  },
                  borderRadius: "50px",
                  padding: "12px 36px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                }}
              >
                Apply Now
              </Button>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Box
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  padding: "30px",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ mb: 3, color: "#fff", fontWeight: "bold" }}
                >
                  Key Highlights
                </Typography>
                {[
                  "24/7 Dedicated Support",
                  "Trusted Banking Partners",
                  "Empowering Thousands of Students",
                  "Unlock Global Opportunities",
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: "#4caf50",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ color: "#fff", fontWeight: "bold" }}
                      >
                        {index + 1}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: "#fff" }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
