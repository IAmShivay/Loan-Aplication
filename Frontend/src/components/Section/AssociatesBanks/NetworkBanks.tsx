import React, { useState, useRef } from 'react';
import { Box, Typography, IconButton, useTheme, useMediaQuery, Card, CardContent, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const associatedBanks = [
  { id: 1, name: 'Global Finance', logo: '/global-finance-logo.png', description: 'International banking with a presence in over 50 countries.', specialty: 'Global Transactions' },
  { id: 2, name: 'Secure Trust', logo: '/secure-trust-logo.png', description: 'Specializing in high-security banking solutions for businesses.', specialty: 'Cyber Security' },
  { id: 3, name: 'Community Savings', logo: '/community-savings-logo.png', description: 'Supporting local businesses and community development projects.', specialty: 'Microfinance' },
  { id: 4, name: 'Tech Innovate', logo: '/tech-innovate-logo.png', description: 'Pioneering digital banking solutions for the modern era.', specialty: 'Fintech Integration' },
  { id: 5, name: 'Green Earth', logo: '/green-earth-logo.png', description: 'Focused on sustainable banking and eco-friendly investments.', specialty: 'Green Investments' },
  { id: 6, name: 'Prosperity Partners', logo: '/prosperity-partners-logo.png', description: 'Wealth management and long-term financial planning experts.', specialty: 'Wealth Management' },
];

const AssociatedBanks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === associatedBanks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? associatedBanks.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box sx={{ bgcolor: '#f0f4f8', py: 8, overflow: 'hidden' }}>
      <Typography
        variant="h3"
        sx={{
          mb: 6,
          textAlign: 'center',
          color: '#2e7d32',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}
      >
        Our Banking Network
      </Typography>
      <Box sx={{ position: 'relative', height: 400, mx: 'auto', maxWidth: '100%' }}>
        <Box
          ref={containerRef}
          sx={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            transition: 'transform 0.5s ease',
            transform: `translateX(-${currentIndex * (100 / (isMobile ? 1 : 3))}%)`,
          }}
        >
          {associatedBanks.map((bank, index) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                flex: `0 0 ${100 / (isMobile ? 1 : 3)}%`,
                padding: '0 10px',
                boxSizing: 'border-box',
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '15px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={bank.logo}
                  alt={bank.name}
                  sx={{
                    height: 120,
                    objectFit: 'contain',
                    bgcolor: '#fff',
                    p: 2,
                  }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
                    {bank.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {bank.description}
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                      Specialty:
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {bank.specialty}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
        <IconButton
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
            bgcolor: 'rgba(76, 175, 80, 0.7)',
            '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.9)' },
          }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
            bgcolor: 'rgba(76, 175, 80, 0.7)',
            '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.9)' },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AssociatedBanks;