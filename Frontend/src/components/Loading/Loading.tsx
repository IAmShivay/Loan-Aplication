import React from 'react';
import { Box, Typography } from '@mui/material';

const LoadingComponent: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      sx={{ bgcolor: 'transparent', p: 3 }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#006400', // Dark green color for text
          textTransform: 'uppercase',
          fontWeight: 'bold',
          letterSpacing: '1.5px',
          mb: 2,
        }}
      >
        Loading...
      </Typography>

      <Box
        sx={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '4px solid #f5f5f5', // Light gray color for the border
          borderTopColor: '#006400', // Green color for the animation
          animation: 'spin 1s linear infinite',
        }}
      />

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingComponent;
