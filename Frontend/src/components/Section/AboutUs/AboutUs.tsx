import { 
  Typography, Box, Grid, Card, CardContent, CardMedia, 
  useTheme,  Avatar, Chip
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
    { name: "Raya Melona", position: "CEO", image: "https://imgs.search.brave.com/C4rUzBhcWUE6FObfELwxURVhz6L7wHMMHadwwiwGGsA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQz/NzgxNjg5Ny9waG90/by9idXNpbmVzcy13/b21hbi1tYW5hZ2Vy/LW9yLWh1bWFuLXJl/c291cmNlcy1wb3J0/cmFpdC1mb3ItY2Fy/ZWVyLXN1Y2Nlc3Mt/Y29tcGFueS13ZS1h/cmUtaGlyaW5nLndl/YnA_Yj0xJnM9MTcw/NjY3YSZ3PTAmaz0y/MCZjPVlRX2o4M3Bn/OWZCLUhXT2QxUXVy/M19rQm1HX290X2ha/dHk4cHZvRmtyNkE9" },
    { name: "Julia Noman", position: "CTO", image: "https://imgs.search.brave.com/DIbClLwLJk-0VwHjf4vwNAq23PRAI2e7kPA_W8nqqbk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtZ2xvYmFsLndl/YnNpdGUtZmlsZXMu/Y29tLzVlYzdkYWQy/ZTZmNjI5NWE5ZTJh/MjNkZC82MGQ1OThk/MWZkNWI0M2MxM2Vl/NDY1ZWFfQW15X1Nl/cHQucG5n" },
    { name: "Richard Norchia", position: "CFO", image: "https://imgs.search.brave.com/r54pFbdF-qFEm8L6auZCZKSprWFwITCV1QSiOQlUMic/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9waG90b2dyYXBo/LXByb2Zlc3Npb25h/bC15b3VuZy1idXNp/bmVzcy1lY29ub21p/c3RfMTI4ODY1Ny01/MDEzLmpwZz9zaXpl/PTYyNiZleHQ9anBn" }
  ]
};

const AboutUs = () => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                image="https://imgs.search.brave.com/rlzRGdJJV3sKiJOuzHkBtRGPMHay2f30hDVMkyfNerE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMC8w/NS8yNy8xNy8wOC9i/dWlsZGluZy01MjI4/MTAxXzY0MC5qcGc"
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