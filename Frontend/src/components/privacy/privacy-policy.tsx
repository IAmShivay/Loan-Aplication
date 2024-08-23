// PrivacyPolicy.tsx
import React from 'react';
import { Box, Typography, Container, Paper, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
          <Typography color="text.primary">Privacy Policy</Typography>
        </Breadcrumbs>

        <Paper elevation={0} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h3" sx={{ color: '#006400', mb: 4, fontWeight: 'bold' }}>
            Privacy Policy
          </Typography>
          
          <Typography variant="body1" paragraph>
            Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            2. Use of Information
          </Typography>
          <Typography variant="body1" paragraph>
            We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            3. Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            We use cookies to remember your preferences and improve your browsing experience. You can choose to disable cookies through your individual browser options.
          </Typography>

          <Typography variant="body2" sx={{ mt: 4, color: '#006400' }}>
            Last updated: [Insert Date]
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;