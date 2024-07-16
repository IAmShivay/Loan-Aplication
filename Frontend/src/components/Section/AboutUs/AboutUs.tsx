import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";

const AboutUs: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4} textAlign="center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/path/to/your/logo.png"
            alt="Company Logo"
            style={{ width: "150px", marginBottom: "20px" }}
          />
        </motion.div>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          style={{ color: "#3f51b5", marginBottom: "20px" }}
        >
          About Us
        </Typography>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/path/to/hero/image.jpg"
            alt="Hero"
            style={{
              width: "100%",
              height: "auto",
              marginBottom: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </motion.div>
        <Typography
          variant="body1"
          paragraph
          style={{ color: "#757575", fontSize: "1.1rem", lineHeight: "1.6" }}
        >
          Welcome to our company! We are dedicated to providing the best service
          possible. Our team is passionate about what we do and we strive to
          exceed expectations in every project we undertake.
        </Typography>
        <Typography
          variant="body1"
          paragraph
          style={{ color: "#757575", fontSize: "1.1rem", lineHeight: "1.6" }}
        >
          Our mission is to deliver high-quality products and services that meet
          the needs of our clients. We believe in innovation, integrity, and
          customer satisfaction. Thank you for choosing us and we look forward
          to working with you.
        </Typography>
        <Grid container spacing={4} mt={4}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Card style={{ backgroundColor: "#ffffff" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://via.placeholder.com/300?text=Team+Member+${
                      index + 1
                    }`}
                    alt={`Team Member ${index + 1}`}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ textAlign: "center", color: "#3f51b5" }}
                    >
                      Team Member {index + 1}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ textAlign: "center", color: "#757575" }}
                    >
                      Description of team member {index + 1}. They play a vital
                      role in our company.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs;
