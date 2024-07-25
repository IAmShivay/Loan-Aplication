// import React from 'react';
// import { Typography, Grid, Link } from '@mui/material';
// import { motion } from 'framer-motion';

// const Footer = () => {
//   // Replace with actual dynamic data or fetch from API if needed
//   const sections = [
//     {
//       title: 'About Us',
//       links: [
//         { text: 'Mission & Values', href: '/mission' },
//         { text: 'Team', href: '/team' },
//         { text: 'Careers', href: '/careers' },
//         { text: 'Press', href: '/press' },
//       ],
//     },
//     {
//       title: 'Student Loans',
//       links: [
//         { text: 'Undergraduate Loans', href: '/undergraduate-loans' },
//         { text: 'Graduate Loans', href: '/graduate-loans' },
//         { text: 'Refinancing Options', href: '/refinancing-options' },
//         { text: 'Loan Calculator', href: '/loan-calculator' },
//       ],
//     },
//     {
//       title: 'Support',
//       links: [
//         { text: 'Contact Us', href: '/contact' },
//         { text: 'FAQs', href: '/faqs' },
//         { text: 'Loan Repayment', href: '/loan-repayment' },
//         { text: 'Customer Service', href: '/customer-service' },
//       ],
//     },
//     {
//       title: 'Legal',
//       links: [
//         { text: 'Privacy Policy', href: '/privacy-policy' },
//         { text: 'Terms of Use', href: '/terms-of-use' },
//         { text: 'Licensing Information', href: '/licensing' },
//         { text: 'Disclosures', href: '/disclosures' },
//       ],
//     },
//   ];

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         // transition={{ duration: 0.5 }}
//         // style={{ backgroundColor: '#E5E5E5', color: '#000', padding: '30px 20px', marginTop: '20px' }}
//       >
//         <Grid container justifyContent="space-between">
//           {sections.map((section, index) => (
//             <Grid item xs={12} md={3} key={index} style={{ marginBottom: '20px' }}>
//               <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
//                 {section.title}
//               </Typography>
//               {section.links.map((link, idx) => (
//                 <Typography variant="body2" gutterBottom key={idx}>
//                   <Link href={link.href} color="inherit" underline="hover">
//                     {link.text}
//                   </Link>
//                 </Typography>
//               ))}
//             </Grid>
//           ))}
//         </Grid>
//         <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: '20px' }}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>Follow Us</Typography>
//             <Grid container justifyContent="flex-start" alignItems="center">
//               <Grid item>
//                 <motion.img
//                   src="/facebook.png"
//                   alt="Facebook"
//                   style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }}
//                   whileHover={{ scale: 1.1 }}
//                   onClick={() => window.open('https://www.facebook.com/yourpage', '_blank')}
//                 />
//               </Grid>
//               <Grid item>
//                 <motion.img
//                   src="/twitter.png"
//                   alt="Twitter"
//                   style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }}
//                   whileHover={{ scale: 1.1 }}
//                   onClick={() => window.open('https://twitter.com/yourhandle', '_blank')}
//                 />
//               </Grid>
//               <Grid item>
//                 <motion.img
//                   src="/instagram.png"
//                   alt="Instagram"
//                   style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }}
//                   whileHover={{ scale: 1.1 }}
//                   onClick={() => window.open('https://www.instagram.com/youraccount', '_blank')}
//                 />
//               </Grid>
//             </Grid>
//             <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', marginTop: '20px' }}>Download Our App</Typography>
//             <Grid container justifyContent="flex-start" alignItems="center">
//               <Grid item>
//                 <motion.img
//                   src="/appstore.png"
//                   alt="App Store"
//                   style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }}
//                   whileHover={{ scale: 1.1 }}
//                   onClick={() => window.open('https://link-to-your-appstore', '_blank')}
//                 />
//               </Grid>
//               <Grid item>
//                 <motion.img
//                   src="/playstore.png"
//                   alt="Play Store"
//                   style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }}
//                   whileHover={{ scale: 1.1 }}
//                   onClick={() => window.open('https://link-to-your-playstore', '_blank')}
//                 />
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </motion.div>
//       <Typography variant="body2" align="center" style={{ marginTop:"5px",padding: '10px 0', backgroundColor: '#E5E5E5', color: '#000',borderRadius:'10px' }}>
//         © 2024 Student Loan Provider. All rights reserved.
//       </Typography>
//     </>
//   );
// };

// export default Footer;

import React from 'react';
import { Typography, Grid, Link, Container, Box, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Apple, Android } from '@mui/icons-material';

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
        { text: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Student Loans',
      links: [
        { text: 'Undergraduate Loans', href: '/undergraduate-loans' },
        { text: 'Graduate Loans', href: '/graduate-loans' },
        { text: 'Refinancing Options', href: '/refinancing-options' },
        { text: 'Loan Calculator', href: '/loan-calculator' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Contact Us', href: '/contact' },
        { text: 'FAQs', href: '/faqs' },
        { text: 'Loan Repayment', href: '/loan-repayment' },
        { text: 'Customer Service', href: '/customer-service' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: '/privacy-policy' },
        { text: 'Terms of Use', href: '/terms-of-use' },
        { text: 'Licensing Information', href: '/licensing' },
        { text: 'Disclosures', href: '/disclosures' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, url: 'https://www.facebook.com/yourpage' },
    { icon: Twitter, url: 'https://twitter.com/yourhandle' },
    { icon: Instagram, url: 'https://www.instagram.com/youraccount' },
  ];

  const appLinks = [
    { icon: Apple, url: 'https://link-to-your-appstore', label: 'App Store' },
    { icon: Android, url: 'https://link-to-your-playstore', label: 'Play Store' },
  ];

  return (
    <Box sx={{ backgroundColor: '#f0f4f8', color: '#333', mt: 4 }}>
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
                    <Link href={link.href} color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
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
                    <Typography variant="body2">1234 Loan Street, Financial District</Typography>
                    <Typography variant="body2">New York, NY 10001</Typography>
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