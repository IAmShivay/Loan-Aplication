import React from 'react';
import { Box, Typography, Button,useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  width: '100%',
  backgroundColor: '#c9e7cb',
  color: '#388e3c',
  padding: theme.spacing(2),
}));

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '24px',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(56, 142, 60, 0.1)',
  maxWidth: '600px',
  width: '100%',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const StyledErrorIcon = styled(SentimentVeryDissatisfiedIcon)(({ theme }) => ({
  fontSize: '120px',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '80px',
  },
}));

const NotFoundPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledContainer>
      <ContentBox>
        <StyledErrorIcon />
        <Typography 
          variant={isMobile ? 'h4' : 'h2'} 
          component="h1" 
          gutterBottom 
          fontWeight="bold"
          sx={{ 
            background: 'linear-gradient(45deg, #388e3c 30%, #4caf50 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404 - Page Not Found
        </Typography>
        <Typography variant={isMobile ? 'body1' : 'h6'} paragraph sx={{ mb: 4 }}>
          Oops! The page you're looking for seems to have wandered off. 
          Don't worry, even the best explorers get lost sometimes.
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/"
          sx={{
            backgroundColor: '#388e3c',
            color: 'white',
            padding: '12px 24px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '50px',
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(56, 142, 60, 0.3)',
            '&:hover': {
              backgroundColor: '#2e7d32',
              boxShadow: '0 6px 16px rgba(56, 142, 60, 0.4)',
            },
          }}
        >
          Take Me Home
        </Button>
      </ContentBox>
    </StyledContainer>
  );
};

export default NotFoundPage;