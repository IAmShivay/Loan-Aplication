// src/components/UnauthorizedPage.tsx
import React from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Fade } from '@mui/material';

const UnauthorizedPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Ensure full height
        width: '100%', // Ensure full width
        background: `url(${theme.palette.background.default}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        padding: 0,
      }}
    >
      <Fade in={true} timeout={500}>
        <Paper
          elevation={6}
          style={{
            padding: theme.spacing(4),
            width: '100%', // Allow full width of the container
            maxWidth: '600px', // Set a maxWidth to avoid being too wide
            textAlign: 'center',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '15px',
          }}
        >
          <Typography variant="h1" color="error" gutterBottom>
            403
          </Typography>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Unauthorized Access
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            You do not have permission to access this page. Please contact your administrator if you believe this is an error.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoHome}
            style={{ marginTop: theme.spacing(2) }}
          >
            Go Home
          </Button>
        </Paper>
      </Fade>
    </Container>
  );
};

export default UnauthorizedPage;
