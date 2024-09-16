import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Link,
} from '@mui/material';

const PrivacyAndTermsComponent: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sections = [
    {
      title: 'Privacy Policy',
      content: 'Your privacy is important to us... ',
      link: '/privacy-policy',
    },
    {
      title: 'Terms of Service',
      content: 'By using our service, you agree... ',
      link: '/terms-of-use',
    },
    {
      title: 'Refund Policy',
      content: 'We collect certain information... ',
      link: '/refund-policy',
    },
    
  ];
  
  const now = new Date();
  const formattedDate = now.toLocaleString();

  return (
    <Box sx={{ bgcolor: '#F2F9F3', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{ color: '#006400', mb: 6, textAlign: 'center', fontWeight: 'bold' }}
        >
          Privacy & Terms
        </Typography>

        <Grid container spacing={4}>
          {sections.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,100,0,0.1)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: isMobile ? 3 : 4 }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ color: '#006400', mb: 2, fontWeight: 'bold' }}
                  >
                    {section.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333', lineHeight: 1.7, mb: 2 }}>
                    {section.content}
                  </Typography>
                  <Link
                    href={section.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: '#006400', fontWeight: 'bold', textDecoration: 'none' }}
                  >
                    Learn more
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#006400' }}>
            Last updated: {formattedDate}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyAndTermsComponent;
