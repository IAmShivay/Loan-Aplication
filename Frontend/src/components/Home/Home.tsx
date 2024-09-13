
import {
  Box,
  Button,
  Typography,
  Container,
  Card,
  Avatar,
  Grid,
} from "@mui/material";

import AssociatedBanks from "../Section/AssociatesBanks/NetworkBanks";
import WhyChooseUs from "../Section/whyChooseUs/whyChooseUs";
import HeroSection from "./hero";
import EducationLoanSolutions from "./services";
import CustomerSupport from "./support";

const CarouselComponent = () => {

  return (
    <Box sx={{ backgroundColor: "#f0f4f8" }}>
      <HeroSection/>
      {/* Loan Types Section */}
      <EducationLoanSolutions/>
      {/* Why Choose Us Section */}
      <WhyChooseUs />
      {/* Customer Support Section */}
      <CustomerSupport/>
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
                  "Thanks to their education loan, I was able to pursue my dream course without financial worries!",
                image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              },
              {
                name: "Michael B.",
                feedback:
                  "Their customer support team is exceptional. They guided me through every step of the loan application process.",
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.imagefitz.com%2Fwp-content%2Fuploads%2F2019%2F02%2FProfessional-Headshot-Photography-1JF1398-Square.jpg&f=1&nofb=1&ipt=6db2624117c52d5277066a4f67eb48b56aa4706cc602d698031fabf5e3e4ab0a&ipo=images",
              },
              {
                name: "Sophia L.",
                feedback:
                  "I had an excellent experience. I highly recommend them to all my fellow students and anyone looking for reliable assistance.",
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fperson-suit-profile-male-portrait-young-professional-profession-hairstyle-social-media-elegant-cv-businessperson-white-collar-worker-459413.jpg&f=1&nofb=1&ipt=bbcf7bb0fd38f0f6b2eba48a8d4727cdfd7214a35400e1a2b410e781388a2633&ipo=images",
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

      <AssociatedBanks />

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
            Ready to Start Your Educational Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Take the first step towards your academic goals today.
          </Typography>
          <Button
          href="/apply-form"
            variant="contained"
            size="large"
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
