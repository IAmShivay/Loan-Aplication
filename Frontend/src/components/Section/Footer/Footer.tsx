import { Typography, Grid, Link, Container, Box, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Apple, Android } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';  // Import RouterLink for client-side routing

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sections = [
    {
      title: 'About Us',
      links: [
        { text: 'Mission & Values', href: '/mission' },
        { text: 'Team', href: '/team' },
        { text: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Student Loans',
      links: [
        { text: 'Undergraduate Loans', href: '/apply-form' },
        { text: 'Graduate Loans', href: '/apply-form' },
        { text: 'Loan Calculator', href: '/Loan-calculator' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'FAQs', href: '/faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: '/privacy-policy' },
        { text: 'Terms of Use', href: '/terms-of-use' },
        { text: 'Refund Policy', href: '/refund-policy' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, url: '#' },
    { icon: Twitter, url: '#' },
    { icon: Instagram, url: '#' },
  ];

  const appLinks = [
    { icon: Apple, url: '#', label: 'App Store' },
    { icon: Android, url: '#', label: 'Play Store' },
  ];

  return (
    <Box sx={{ backgroundColor: '#f0f4f8', color: '#333' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={4} sx={{ py: 6 }}>
            {sections.map((section, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                  {section.title}
                </Typography>
                {section.links.map((link, idx) => (
                  <motion.div key={idx} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                    {/* Using RouterLink for internal routing */}
                    <Link component={RouterLink} to={link.href} color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
                      {link.text}
                    </Link>
                  </motion.div>
                ))}
              </Grid>
            ))}
          </Grid>

          <Box sx={{ borderTop: '1px solid #e0e0e0', pt: 4, pb: 6 }}>
            <Grid container spacing={4} justifyContent="space-between" alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  {socialLinks.map((social, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Link href={social.url} target="_blank" rel="noopener noreferrer">
                        <social.icon sx={{ fontSize: 30, color: '#4caf50' }} />
                      </Link>
                    </motion.div>
                  ))}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#4caf50', mt: 2 }}>
                  Download Our App
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {appLinks.map((app, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Link href={app.url} target="_blank" rel="noopener noreferrer">
                        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#4caf50', color: 'white', px: 2, py: 1, borderRadius: 1 }}>
                          <app.icon sx={{ mr: 1 }} />
                          <Typography variant="body2">{app.label}</Typography>
                        </Box>
                      </Link>
                    </motion.div>
                  ))}
                </Box>
              </Grid>
              {!isMobile && (
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                      Contact Us
                    </Typography>
                    <Typography variant="body2">1234 kolkatta Street, Financial District</Typography>
                    <Typography variant="body2">West Bengal, HI 713212</Typography>
                    <Typography variant="body2">Phone: (123) 456-7890</Typography>
                    <Typography variant="body2">Email: support@studentloanprovider.com</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </motion.div>
      </Container>
      <Box sx={{ bgcolor: '#4caf50', color: 'white', py: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Student Loan Provider. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
