
import { Box, Container, Typography, Grid } from '@mui/material';
import { LightbulbOutlined, MoneyOffOutlined, SupportAgentOutlined, SchoolOutlined, AccessTimeOutlined, SecurityOutlined } from '@mui/icons-material';

const WhyChooseUs = () => {

  const features = [
    {
      icon: LightbulbOutlined,
      title: "Expert Guidance",
      description: "Get personalized advice from our certified financial experts",
      stat: "98%",
      statDescription: "Client Satisfaction"
    },
    {
      icon: MoneyOffOutlined,
      title: "Low Interest Rates",
      description: "Benefit from our competitive and flexible interest rates",
      stat: "3.5%",
      statDescription: "Starting APR"
    },
    {
      icon: SupportAgentOutlined,
      title: "24/7 Support",
      description: "Our dedicated team is always here to assist you",
      stat: "< 2min",
      statDescription: "Response Time"
    },
    {
      icon: SchoolOutlined,
      title: "Education Resources",
      description: "Access our vast library of financial education materials",
      stat: "1000+",
      statDescription: "Articles & Guides"
    },
    {
      icon: AccessTimeOutlined,
      title: "Flexible Repayment",
      description: "Choose from various repayment plans tailored to your needs",
      stat: "20 yrs",
      statDescription: "Max Repayment Term"
    },
    {
      icon: SecurityOutlined,
      title: "Secure Process",
      description: "Your data is protected by state-of-the-art security measures",
      stat: "256-bit",
      statDescription: "Encryption"
    }
  ];

  return (
    <Box sx={{
      bgcolor: '#F0F4F8',
      py: { xs: 6, md: 10 },
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="lg">
        <Box sx={{
          position: 'relative',
          zIndex: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -100,
            left: -100,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(76,175,80,0.1) 0%, rgba(76,175,80,0) 70%)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -150,
            right: -150,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(76,175,80,0.1) 0%, rgba(76,175,80,0) 70%)',
          }
        }}>
          <Typography variant="h2" align="center" sx={{
            color: '#1C6021',
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}>
            Why Choose Studynpay?
          </Typography>
          <Typography variant="h5" align="center" sx={{
            color: '#2E8B57',
            mb: 6,
            maxWidth: '800px',
            mx: 'auto',
            fontSize: { xs: '1.2rem', md: '1.5rem' }
          }}>
            Empowering your future with innovative financial solutions
          </Typography>

          <Grid container spacing={4} sx={{ rowGap: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Box sx={{
                  bgcolor: 'white',
                  borderRadius: '20px',
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  },
                  position: 'relative',
                  overflow: 'hidden',
                  mb: 2, // Add margin bottom to create gap between cards
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #1C6021, #4CAF50)',
                  }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{
                      bgcolor: '#E8F5E9',
                      borderRadius: '12px',
                      p: 1,
                      mr: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <feature.icon sx={{ fontSize: 28, color: '#1C6021' }} />
                    </Box>
                    <Typography variant="h6" sx={{ color: '#1C6021', fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: '#555', mb: 2, flexGrow: 1 }}>
                    {feature.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                    <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 700, mr: 1 }}>
                      {feature.stat}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#777' }}>
                      {feature.statDescription}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
