import React from 'react';
import { Typography, Grid, Link } from '@mui/material';
import { motion } from 'framer-motion';

const Footer = () => {
  // Replace with actual dynamic data or fetch from API if needed
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: '#E5E5E5', color: '#000', padding: '30px 20px', marginTop: '20px' }}
      >
        <Grid container justifyContent="space-between">
          {sections.map((section, index) => (
            <Grid item xs={12} md={3} key={index} style={{ marginBottom: '20px' }}>
              <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                {section.title}
              </Typography>
              {section.links.map((link, idx) => (
                <Typography variant="body2" gutterBottom key={idx}>
                  <Link href={link.href} color="inherit" underline="hover">
                    {link.text}
                  </Link>
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: '20px' }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>Follow Us</Typography>
            <Grid container justifyContent="flex-start" alignItems="center">
              <Grid item>
                <motion.img
                  src="/facebook.png"
                  alt="Facebook"
                  style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => window.open('https://www.facebook.com/yourpage', '_blank')}
                />
              </Grid>
              <Grid item>
                <motion.img
                  src="/twitter.png"
                  alt="Twitter"
                  style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => window.open('https://twitter.com/yourhandle', '_blank')}
                />
              </Grid>
              <Grid item>
                <motion.img
                  src="/instagram.png"
                  alt="Instagram"
                  style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => window.open('https://www.instagram.com/youraccount', '_blank')}
                />
              </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', marginTop: '20px' }}>Download Our App</Typography>
            <Grid container justifyContent="flex-start" alignItems="center">
              <Grid item>
                <motion.img
                  src="/appstore.png"
                  alt="App Store"
                  style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => window.open('https://link-to-your-appstore', '_blank')}
                />
              </Grid>
              <Grid item>
                <motion.img
                  src="/playstore.png"
                  alt="Play Store"
                  style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => window.open('https://link-to-your-playstore', '_blank')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </motion.div>
      <Typography variant="body2" align="center" style={{ padding: '10px 0', backgroundColor: '#E5E5E5', color: '#000' }}>
        © 2024 Student Loan Provider. All rights reserved.
      </Typography>
    </>
  );
};

export default Footer;
