import React from 'react';
import { 
  Typography, Box, Grid, Card, CardContent, CardMedia, 
  useTheme, useMediaQuery, Avatar, Chip
} from '@mui/material';
import { 
  AccountBalance as AccountBalanceIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  People as PeopleIcon
} from '@mui/icons-material';

const aboutUsData = {
  companyName: "GreenLoan Financial",
  slogan: "Empowering Your Financial Future",
  description: "GreenLoan Financial is a leading innovator in the loan industry, committed to providing accessible, transparent, and sustainable financial solutions. With over two decades of experience, we've helped millions of customers achieve their dreams through smart financing options.",
  mission: "Our mission is to democratize access to credit, enabling individuals and businesses to thrive through responsible lending practices and cutting-edge financial technology.",
  vision: "We envision a world where financial empowerment is within everyone's reach, fostering economic growth and personal success.",
  keyFeatures: [
    { 
      icon: <AccountBalanceIcon />, 
      title: "Competitive Rates", 
      description: "Our algorithms ensure you always get the best possible interest rates." 
    },
    { 
      icon: <SecurityIcon />, 
      title: "Secure Process", 
      description: "Bank-level encryption and security protocols protect your sensitive information." 
    },
    { 
      icon: <SpeedIcon />, 
      title: "Fast Approval", 
      description: "Get approved in minutes, not days, with our streamlined application process." 
    },
    { 
      icon: <PeopleIcon />, 
      title: "Personalized Service", 
      description: "Our AI-powered system adapts to your unique financial situation." 
    }
  ],
  stats: [
    { label: "Customers Served", value: "2M+" },
    { label: "Loan Volume", value: "$10B+" },
    { label: "Average Savings", value: "15%" },
    { label: "Customer Satisfaction", value: "4.8/5" }
  ],
  team: [
    { name: "Jane Doe", position: "CEO", image: "/api/placeholder/100/100" },
    { name: "John Smith", position: "CTO", image: "/api/placeholder/100/100" },
    { name: "Alice Johnson", position: "CFO", image: "/api/placeholder/100/100" }
  ]
};

const AboutUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', bgcolor: '#E8F5E9', py: 8 }}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
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
          {aboutUsData.companyName}
        </Typography>
        
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ 
            fontStyle: 'italic', 
            color: 'text.secondary',
            mb: 6
          }}
        >
          {aboutUsData.slogan}
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              {aboutUsData.description}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: '#4CAF50', mt: 4 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              {aboutUsData.mission}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: '#4CAF50', mt: 4 }}>
              Our Vision
            </Typography>
            <Typography variant="body1" paragraph>
              {aboutUsData.vision}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="300"
                image="/api/placeholder/600/300"
                alt="GreenLoan Financial office"
              />
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, color: '#4CAF50' }}>
          Why Choose GreenLoan Financial?
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {aboutUsData.keyFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                elevation={3}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: theme.shadows[10],
                  },
                  bgcolor: '#FFFFFF',
                }}
              >
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Box sx={{ color: '#4CAF50', fontSize: 40, mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h6" component="div">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mb: 8, bgcolor: '#FFFFFF', borderRadius: 2, p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, color: '#4CAF50' }}>
            Our Impact
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {aboutUsData.stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Card 
                  elevation={3}
                  sx={{ 
                    textAlign: 'center', 
                    py: 3,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    bgcolor: '#E8F5E9',
                  }}
                >
                  <Typography variant="h4" color="#4CAF50">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, color: '#4CAF50' }}>
            Meet Our Leadership
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {aboutUsData.team.map((member, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card 
                  elevation={3}
                  sx={{ 
                    textAlign: 'center', 
                    py: 3,
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: theme.shadows[10],
                    },
                    bgcolor: '#FFFFFF',
                  }}
                >
                  <Avatar
                    alt={member.name}
                    src={member.image}
                    sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                  />
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.position}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ bgcolor: '#FFFFFF', borderRadius: 2, p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, color: '#4CAF50' }}>
            Our Commitment
          </Typography>
          <Typography variant="body1" paragraph align="center">
            At GreenLoan Financial, we're more than just a loan provider. We're your partner in financial success. Our commitment to transparency, innovation, and customer satisfaction drives everything we do. Join us in building a brighter financial future for all.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mt: 4 }}>
            <Chip label="Responsible Lending" sx={{ bgcolor: '#4CAF50', color: 'white' }} />
            <Chip label="Financial Education" sx={{ bgcolor: '#4CAF50', color: 'white' }} />
            <Chip label="Community Support" sx={{ bgcolor: '#4CAF50', color: 'white' }} />
            <Chip label="Environmental Sustainability" sx={{ bgcolor: '#4CAF50', color: 'white' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;