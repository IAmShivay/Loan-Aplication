import { Box, Container, Typography, Grid, Card, Avatar, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';

const testimonials = [
  {
    name: "Emily R.",
    feedback: "Thanks to their education loan, I was able to pursue my dream course without financial worries!",
    image: "/api/placeholder/80/80",
    rating: 5
  },
  {
    name: "Michael B.",
    feedback: "Their customer support team is exceptional. They guided me through every step of the loan application process.",
    image: "/api/placeholder/80/80",
    rating: 5
  },
  {
    name: "Sophia L.",
    feedback: "I had an excellent experience. I highly recommend them to all my fellow students and anyone looking for reliable assistance.",
    image: "/api/placeholder/80/80",
    rating: 5
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  marginBottom: theme.spacing(2),
  border: `4px solid ${theme.palette.success.light}`,
}));

const TestimonialsSection = () => {
  return (
    <Box sx={{ backgroundColor: '#e8f5e9', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            mb: 8,
            textAlign: 'center',
            color: '#2e7d32',
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
          }}
        >
          What Our Customers Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <StyledCard elevation={3}>
                <StyledAvatar alt={testimonial.name} src={testimonial.image} />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ mb: 1, color: '#2e7d32', fontWeight: 'bold' }}
                >
                  {testimonial.name}
                </Typography>
                <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                <Typography variant="body1" color="text.secondary" align="center" sx={{ fontStyle: 'italic' }}>
                  "{testimonial.feedback}"
                </Typography>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;