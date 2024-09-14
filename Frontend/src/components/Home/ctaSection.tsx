import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { SchoolRounded, EmojiEventsRounded } from "@mui/icons-material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
const CtaSection = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #4caf50 30%, #45a049 90%)",
        color: "white",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                fontWeight: "bold",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Ready to Start Your Educational Journey?
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
              Take the first step towards your academic goals today.
            </Typography>
            <Button
              href="/apply-form"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "white",
                color: "#4caf50",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 10px rgba(0,0,0,0.2)",
                },
                borderRadius: "50px",
                padding: "12px 36px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                textTransform: "none",
                transition: "all 0.3s ease-in-out",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              Apply Now
            </Button>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                mt: { xs: 4, md: 0 },
              }}
            >
              {[
                { icon: SchoolRounded, label: "Quality Education" },
                { icon: CurrencyRupeeIcon, label: "Affordable Loans" },
                { icon: EmojiEventsRounded, label: "Achieve Goals" },
              ].map((item, index) => (
                <Box key={index} sx={{ textAlign: "center" }}>
                  <item.icon sx={{ fontSize: 60, mb: 1 }} />
                  <Typography variant="body1">{item.label}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      />
    </Box>
  );
};

export default CtaSection;
