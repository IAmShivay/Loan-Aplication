// ReturnRefundPolicy.tsx
import React from 'react';
import { Box, Typography, Container, Paper, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ReturnRefundPolicy: React.FC = () => {
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
          <Typography color="text.primary">Return & Refund Policy</Typography>
        </Breadcrumbs>

        <Paper elevation={0} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h3" sx={{ color: '#006400', mb: 4, fontWeight: 'bold' }}>
            Return & Refund Policy
          </Typography>
          
          <Typography variant="body1" paragraph>
            This Return and Refund Policy applies specifically to the platform fee paid for loan applications on Studynpay.com.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            1. Refund Conditions
          </Typography>
          <Typography variant="body1" paragraph>
            Refunds are available under the following conditions:
            <ul>
              <li>If you do not receive any response from us within 5 business days after submitting your loan application.</li>
              <li>If the loan application is not approved due to reasons related to your credit history or other personal reasons, a refund will not be granted.</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            2. How to Request a Refund
          </Typography>
          <Typography variant="body1" paragraph>
            To request a refund, you must:
            <ul>
              <li>Send an email to <a href="mailto:support@studynpay.com">support@studynpay.com</a>.</li>
              <li>Include your registered email ID and transaction ID in the refund request.</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            3. Refund Processing Time
          </Typography>
          <Typography variant="body1" paragraph>
            If your refund request is approved, the refund will be processed within 7 business days.
          </Typography>

          <Typography variant="body2" sx={{ mt: 4, color: '#006400' }}>
            Last updated: August 29, 2024
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ReturnRefundPolicy;
