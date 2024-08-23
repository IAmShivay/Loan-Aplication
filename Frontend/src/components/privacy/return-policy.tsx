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
            We want you to be completely satisfied with your purchase. If you're not entirely happy with your order, we're here to help.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            1. Returns
          </Typography>
          <Typography variant="body1" paragraph>
            You have 30 days from the date of delivery to return an item. To be eligible for a return, your item must be unused and in the same condition that you received it.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            2. Refunds
          </Typography>
          <Typography variant="body1" paragraph>
            Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.
          </Typography>

          <Typography variant="h5" sx={{ color: '#006400', mt: 4, mb: 2 }}>
            3. Shipping
          </Typography>
          <Typography variant="body1" paragraph>
            You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.
          </Typography>

          <Typography variant="body2" sx={{ mt: 4, color: '#006400' }}>
            Last updated: [Insert Date]
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ReturnRefundPolicy;