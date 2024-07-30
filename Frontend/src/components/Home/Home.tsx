
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Container,
  Card,
  CardContent,
  Avatar,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  MoneyOffCsredRounded,
  HomeRounded,
  DirectionsCarRounded,
  BusinessCenterRounded,
  LightbulbRounded,
  SupportAgentRounded,
} from "@mui/icons-material";
import AssociatedBanks from "../Section/AssociatesBanks/NetworkBanks";

const CarouselItems = [
  {
    id: 1,
    title: "Financial Solutions Tailored for You",
    description:
      "Discover loan options designed to help you achieve your dreams and secure your future.",
    image: "/student.mp4",
  },
];

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const CarouselComponent = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate("/apply-form");
  };

  return (
    <Box sx={{ backgroundColor: "#f0f4f8" }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: "60vh", md: "80vh" },
          position: "relative",
          overflow: "hidden",
          backgroundImage: `url(https://plus.unsplash.com/premium_photo-1663051238732-d6246f747dab?q=80&w=1723&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ color: "white", maxWidth: { xs: "100%", md: "60%" } }}>
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography
                  variant="h2"
                  sx={{ fontWeight: "bold", mb: 2, color: "#4caf50" }}
                >
                  {CarouselItems[0].title}
                </Typography>
              </motion.div>
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Typography variant="h5" sx={{ mb: 4, color: "#e0e0e0" }}>
                  {CarouselItems[0].description}
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
                  onClick={handleApplyNow}
                  sx={{
                    backgroundColor: "#4caf50",
                    "&:hover": { backgroundColor: "#45a049" },
                    borderRadius: "25px",
                    padding: "10px 30px",
                    fontSize: "1.1rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  Start Your Application
                </Button>
              </motion.div>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          sx={{
            mb: 6,
            textAlign: "center",
            color: "#2e7d32",
            fontWeight: "bold",
          }}
        >
          Our Financial Solutions
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {[
            {
              title: "Home Loans",
              icon: HomeRounded,
              description:
                "Make your dream home a reality with our flexible home loan options.",
            },
            {
              title: "Auto Loans",
              icon: DirectionsCarRounded,
              description:
                "Drive off in your new car with our competitive auto loan rates.",
            },
            {
              title: "Business Loans",
              icon: BusinessCenterRounded,
              description:
                "Fuel your business growth with our tailored financial solutions.",
            },
          ].map((service, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: 345,
                minHeight: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "15px",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <service.icon sx={{ fontSize: 60, color: "#4caf50", mb: 2 }} />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ mb: 2, color: "#2e7d32", fontWeight: "bold" }}
                >
                  {service.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Why Choose Us Section */}
      <Box sx={{ backgroundColor: "#e8f5e9", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              mb: 6,
              textAlign: "center",
              color: "#2e7d32",
              fontWeight: "bold",
            }}
          >
            Why Choose Us?
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              justifyContent: "center",
            }}
          >
            {[
              {
                title: "Expert Advice",
                icon: LightbulbRounded,
                description:
                  "Our financial experts provide personalized guidance to help you make informed decisions.",
              },
              {
                title: "Competitive Rates",
                icon: MoneyOffCsredRounded,
                description:
                  "Enjoy some of the most competitive interest rates in the market.",
              },
              {
                title: "24/7 Support",
                icon: SupportAgentRounded,
                description:
                  "Our dedicated support team is always ready to assist you, any time of day or night.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                sx={{
                  maxWidth: 345,
                  minHeight: 250,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "15px",
                  backgroundColor: "white",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <feature.icon
                    sx={{ fontSize: 60, color: "#4caf50", mb: 2 }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ mb: 2, color: "#2e7d32", fontWeight: "bold" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Customer Support Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          sx={{
            mb: 6,
            textAlign: "center",
            color: "#2e7d32",
            fontWeight: "bold",
          }}
        >
          Customer Support
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {[
            {
              name: "John Doe",
              role: "Customer Support Agent",
              image: "url_to_avatar_image",
              description:
                "John has over 10 years of experience in providing top-notch customer service.",
            },
            {
              name: "Jane Smith",
              role: "Customer Support Manager",
              image: "url_to_avatar_image",
              description:
                "Jane leads our support team with a focus on customer satisfaction and quick resolution.",
            },
          ].map((support, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: 345,
                minHeight: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "15px",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar
                  alt={support.name}
                  src={support.image}
                  sx={{ width: 60, height: 60, mb: 2 }}
                />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ mb: 2, color: "#2e7d32", fontWeight: "bold" }}
                >
                  {support.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  {support.role}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {support.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
      {/* Testimonials Section */}
      <Box sx={{ backgroundColor: "#e8f5e9", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              mb: 6,
              textAlign: "center",
              color: "#2e7d32",
              fontWeight: "bold",
            }}
          >
            Testimonials
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: "Emily R.",
                feedback:
                  "Thanks to their financial advice, I was able to buy my first home!",
                image: "url_to_avatar_image",
              },
              {
                name: "Michael B.",
                feedback:
                  "Their customer support team is exceptional. They helped me every step of the way.",
                image: "url_to_avatar_image",
              },
              {
                name: "Sophia L.",
                feedback:
                  "Great rates and fantastic service. I recommend them to all my friends.",
                image: "url_to_avatar_image",
              },
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "15px",
                    textAlign: "center",
                    padding: 3,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Avatar
                    alt={testimonial.name}
                    src={testimonial.image}
                    sx={{ width: 80, height: 80, mb: 2 }}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ mb: 1, color: "#2e7d32", fontWeight: "bold" }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {testimonial.feedback}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <AssociatedBanks/>
      {/* CTA Section */}
      <Box
        sx={{
          backgroundColor: "#4caf50",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ mb: 4, fontWeight: "bold" }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Take the first step towards your financial goals today.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleApplyNow}
            sx={{
              backgroundColor: "white",
              color: "#4caf50",
              "&:hover": { backgroundColor: "#e0e0e0" },
              borderRadius: "25px",
              padding: "10px 30px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            Apply Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default CarouselComponent;
