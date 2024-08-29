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
            Welcome to Studynpay.com. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your data.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We collect the following personal information from users through forms on our website:
            <ul>
              <li>Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>ID</li>
            </ul>
            This information is collected through forms on our website.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use the collected information to:
            <ul>
              <li>Send your details to our trusted loan providers who will process your loan application.</li>
              <li>Communicate with you regarding the status of your application.</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            3. Sharing Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We may share your information with:
            <ul>
              <li>Third-party loan providers who process your loan application.</li>
              <li>Agents who assist in handling your application and related services.</li>
            </ul>
            We may also disclose your information if required by law.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            4. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We employ the following measures to protect your data:
            <ul>
              <li>Private servers for storing data.</li>
              <li>Full encryption of data using SSL RSA 256 certificates to ensure secure transmission and storage.</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            5. User Rights
          </Typography>
          <Typography variant="body1" paragraph>
            Users have the right to access, correct, or delete their personal data. To exercise these rights, please contact our technical team at <a href="mailto:shivaysharma77893@gmail.com">shivaysharma77893@gmail.com</a>.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            6. Changes to This Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We will notify users of any changes to this Privacy Policy via email.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            7. Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            For any questions about this Privacy Policy, please contact us at <a href="mailto:support@studynpay.com">support@studynpay.com</a>.
          </Typography>

          <Typography variant="body2" sx={{ mt: 4, color: '#006400' }}>
            Last updated: August 29, 2024
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
