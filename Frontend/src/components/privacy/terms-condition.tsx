// TermsAndConditions.tsx
import React from 'react';
import { Box, Typography, Container, Paper, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const TermsAndConditions: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#F2F9F3', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/policies" color="inherit">
            Policies
          </Link>
          <Typography color="text.primary">Terms and Conditions</Typography>
        </Breadcrumbs>

        <Paper elevation={0} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h3" sx={{ color: '#006400', mb: 4, fontWeight: 'bold' }}>
            Terms and Conditions
          </Typography>
          
          <Typography variant="body1" paragraph>
            Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            1. Use of Website
          </Typography>
          <Typography variant="body1" paragraph>
            The content of the pages of this website is for your general information and use only. It is subject to change without notice.
          </Typography>

          {/* Add more sections as needed */}

          <Typography variant="body2" sx={{ mt: 4, color: '#006400' }}>
            Last updated: [Insert Date]
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsAndConditions;