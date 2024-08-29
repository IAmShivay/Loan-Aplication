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
            Welcome to Studynpay.com. Our website provides a platform for students to apply for education loans. By using our website, you agree to comply with and be bound by these Terms and Conditions.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            1. Use of Website
          </Typography>
          <Typography variant="body1" paragraph>
            You agree to use this website only for lawful purposes. Prohibitions include:
            <ul>
              <li>No illegal activities: You must not use our website for any unlawful purposes.</li>
              <li>Single application: Users may not submit more than one loan application.</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            2. Loan Application Process
          </Typography>
          <Typography variant="body1" paragraph>
            To apply for a loan on our website:
            <ul>
              <li>Apply for Loan: Visit our platform and click on "Apply for Loan."</li>
              <li>Complete Application: Fill out and submit the loan application form.</li>
              <li>Pay Platform Fee: Pay the applicable platform fee.</li>
              <li>Processing: Once the application is submitted and the fee is paid, your application will be processed by our trusted loan providers.</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            3. Fees and Payments
          </Typography>
          <Typography variant="body1" paragraph>
            Our service is provided as follows:
            <ul>
              <li>Platform Fee: Users must pay a platform fee to apply for a loan.</li>
              <li>Service Provision: We provide our services only after the loan provider approves the application.</li>
              <li>Document Verification: Users will be informed to provide necessary documents for verification.</li>
              <li>Disbursement: The loan amount will be disbursed following the approval and verification process.</li>
            </ul>
            The platform fee is non-refundable unless no confirmation is received within 5 business days.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            4. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            We are not liable for any delays or issues arising from the loan provider’s approval process or document verification. The platform fee is non-refundable except if no confirmation is received within 5 business days.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            5. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            All content on Studynpay.com, including text, images, and other materials, is owned by our company. You may not use, reproduce, or distribute any content from our website without our prior written consent.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            6. Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We will notify users of any changes to these Terms and Conditions via email.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            7. Governing Law
          </Typography>
          <Typography variant="body1" paragraph>
            These Terms and Conditions are governed by the laws of the jurisdiction of Paschim Bardhaman. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in Paschim Bardhaman.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            8. Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            For any questions regarding these Terms and Conditions, please contact us at <a href="mailto:support@studynpay.com">support@studynpay.com</a>.
          </Typography>

          <Typography variant="body2" sx={{ mt: 4, color: '#006400' }}>
            Last updated: August 29, 2024
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsAndConditions;
