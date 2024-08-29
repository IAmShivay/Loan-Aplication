import { 
    Typography, Box, TextField, Button, Grid, useTheme, Container 
  } from '@mui/material';
  import { useState } from 'react';
  
  const ContactForm = () => {
    const theme = useTheme();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Example validation
      if (!formData.name || !formData.email || !formData.message) {
        setError('Please fill in all fields.');
        return;
      }
      setError('');
      // Example submission logic
      setSuccess('Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    };
  
    return (
      <Box sx={{ width: '100%', bgcolor: '#E8F5E9', py: 8 }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#4CAF50',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
              mb: 4
            }}
          >
            Contact Us
          </Typography>
  
          <Box
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 2,
              p: 4,
              boxShadow: theme.shadows[3],
            }}
          >
            <Typography variant="h5" align="center" gutterBottom sx={{ mb: 4, color: '#4CAF50' }}>
              We’d Love to Hear from You!
            </Typography>
  
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography variant="body2" color="success" align="center" sx={{ mb: 2 }}>
                {success}
              </Typography>
            )}
  
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#388E3C' } }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Box>
    );
  };
  
  export default ContactForm;
  