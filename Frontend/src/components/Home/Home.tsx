
import {
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Grid,
} from "@mui/material";
import {
  SchoolRounded,
  AccountBalanceRounded,
  HomeWorkRounded,
} from "@mui/icons-material";
import AssociatedBanks from "../Section/AssociatesBanks/NetworkBanks";
import WhyChooseUs from "../Section/whyChooseUs/whyChooseUs";
import HeroSection from "./hero";

const CarouselComponent = () => {

  return (
    <Box sx={{ backgroundColor: "#f0f4f8" }}>
      <HeroSection/>
      {/* Loan Types Section */}
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
          Our Education Loan Solutions
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
              title: "Tuition Loan",
              icon: SchoolRounded,
              description:
                "Cover your tuition fees and focus on your studies without financial stress.",
            },
            {
              title: "Academic Loan",
              icon: AccountBalanceRounded,
              description:
                "Finance your academic pursuits, including books, equipment, and research expenses.",
            },
            {
              title: "Living Expense Loan",
              icon: HomeWorkRounded,
              description:
                "Support your living costs while you concentrate on achieving your educational goals.",
            },
          ].map((loan, index) => (
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
                <loan.icon sx={{ fontSize: 60, color: "#4caf50", mb: 2 }} />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ mb: 2, color: "#2e7d32", fontWeight: "bold" }}
                >
                  {loan.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {loan.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
      <WhyChooseUs />
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
              role: "Education Loan Specialist",
              image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc.pxhere.com%2Fphotos%2F93%2Fc7%2Fbusinessman_man_portrait_male_costume_business_office_office_style-815849.jpg!d&f=1&nofb=1&ipt=b61f550d08d9b91407e624821bdd7b13162001d88896c7b3d8a9d4e0251da941&ipo=imagese",
              description:
                "John has over 10 years of experience in providing top-notch advice on education financing.",
            },
            {
              name: "Jane Smith",
              role: "Student Support Manager",
              image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc.pxhere.com%2Fphotos%2F44%2Fdc%2Fsmiling_boy_man_professional_happy_people_young_portrait-865531.jpg!d&f=1&nofb=1&ipt=c4c57c0940859763478b86f424ebfa49a4ca07630fa28d12bf9fbb86d219fe8b&ipo=images",
              description:
                "Jane leads our support team with a focus on helping students navigate their financial journey.",
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
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
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
