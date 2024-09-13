import { Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const CustomerSupport = () => {
  const supportStaff = [
    {
      name: "John Doe",
      role: "Education Loan Specialist",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc.pxhere.com%2Fphotos%2F93%2Fc7%2Fbusinessman_man_portrait_male_costume_business_office_office_style-815849.jpg!d&f=1&nofb=1&ipt=b61f550d08d9b91407e624821bdd7b13162001d88896c7b3d8a9d4e0251da941&ipo=images",
      description: "John has over 10 years of experience in providing top-notch advice on education financing.",
    },
    {
      name: "Jane Smith",
      role: "Student Support Manager",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc.pxhere.com%2Fphotos%2F44%2Fdc%2Fsmiling_boy_man_professional_happy_people_young_portrait-865531.jpg!d&f=1&nofb=1&ipt=c4c57c0940859763478b86f424ebfa49a4ca07630fa28d12bf9fbb86d219fe8b&ipo=images",
      description: "Jane leads our support team with a focus on helping students navigate their financial journey.",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component={motion.h3}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          mb: 6,
          textAlign: "center",
          color: "#2e7d32",
          fontWeight: "bold",
        }}
      >
        Meet Our Customer Support Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {supportStaff.map((support, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: "15px",
                overflow: 'hidden',
                boxShadow: 3,
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  height: 200,
                  position: 'relative',
                  backgroundImage: `url(${support.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(46, 125, 50, 0.7)',
                    color: 'white',
                    padding: 2,
                  }}
                >
                  <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                    {support.name}
                  </Typography>
                  <Typography variant="body1">
                    {support.role}
                  </Typography>
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1, bgcolor: '#f5f5f5' }}>
                <Typography variant="body2" color="text.secondary">
                  {support.description}
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CustomerSupport;