import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Snackbar,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import EngineeringIcon from '@mui/icons-material/Engineering';

interface TeamMember {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Alice Johnson',
    role: 'Lead Developer',
    email: 'alice.johnson@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Bob Smith',
    role: 'Backend Specialist',
    email: 'bob.smith@example.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Carol Davis',
    role: 'Frontend Expert',
    email: 'carol.davis@example.com',
    phone: '+1 (555) 345-6789',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'David Wilson',
    role: 'DevOps Engineer',
    email: 'david.wilson@example.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
];

const ContactsTechnicalTeam: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { name, email, message });
    setSnackbarOpen(true);
    // Reset form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        fontWeight="bold"
        sx={{
          borderBottom: '2px solid',
          borderColor: '#C9E7CB',
          paddingBottom: 2,
          marginBottom: 3,
          textTransform: 'uppercase',
          letterSpacing: 1.2,
          color: '#007A33',
        }}
      >
        Technical Team Contacts
      </Typography>

      <Grid container spacing={3}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{ width: 80, height: 80, mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                  >
                    {member.role}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mt={1}
                  >
                    <EmailIcon
                      fontSize="small"
                      sx={{ color: '#4CAF50', mr: 1 }}
                    />
                    <Typography variant="body2">{member.email}</Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mt={1}
                  >
                    <PhoneIcon
                      fontSize="small"
                      sx={{ color: '#2196F3', mr: 1 }}
                    />
                    <Typography variant="body2">{member.phone}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3, mt: 4 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <EngineeringIcon sx={{ fontSize: 40, color: '#FF9800', mr: 2 }} />
          <Typography variant="h5" fontWeight="bold">
            Need Technical Assistance?
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          Our technical team is available {isSmallScreen && <br />}
          Monday to Friday, 9 AM - 5 PM EST.
        </Typography>
        <Typography variant="body1" paragraph>
          For urgent matters, please contact our 24/7 support line at:
          <br />
          <strong>+1 (800) TECH-HELP</strong>
        </Typography>

        {/* Contact Form */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#4CAF50',
                  '&:hover': {
                    backgroundColor: '#45a049',
                  },
                }}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Message sent successfully!"
      />
    </Box>
  );
};

export default ContactsTechnicalTeam;