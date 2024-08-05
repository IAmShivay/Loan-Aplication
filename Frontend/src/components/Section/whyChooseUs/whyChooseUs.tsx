import React from 'react';
import { Box, Container, Typography, Card, CardContent, Grid } from '@mui/material';
import { LightbulbRounded, MoneyOffCsredRounded, SupportAgentRounded, SvgIconComponent } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  icon: SvgIconComponent;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon: Icon, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(45deg, #4caf50 30%, #81c784 90%)',
          py: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon sx={{ fontSize: 60, color: 'white' }} />
      </Box>
      <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
        <Typography variant="h5" component="div" sx={{ mb: 2, color: '#2e7d32', fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
);

const WhyChooseUs: React.FC = () => {
  const features: FeatureCardProps[] = [
    {
      title: "Expert Advice",
      icon: LightbulbRounded,
      description: "Our financial experts provide personalized guidance to help you make informed decisions about your education financing.",
    },
    {
      title: "Competitive Rates",
      icon: MoneyOffCsredRounded,
      description: "Enjoy some of the most competitive interest rates for education loans in the market.",
    },
    {
      title: "24/7 Support",
      icon: SupportAgentRounded,
      description: "Our dedicated support team is always ready to assist you with your education loan queries, any time of day or night.",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#f0f7f0", py: 10 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            mb: 8,
            textAlign: "center",
            color: "#1b5e20",
            fontWeight: "bold",
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              width: '60px',
              height: '4px',
              backgroundColor: '#4caf50',
              margin: '16px auto',
            }
          }}
        >
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
