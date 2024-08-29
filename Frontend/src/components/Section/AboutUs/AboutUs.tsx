import { 
  Typography, Box, Grid, Card, CardContent, CardMedia, 
  useTheme, Avatar, Chip 
} from '@mui/material';

const aboutUsData = {
  companyName: "StudyNPay.com",
  slogan: "Empowering Education, Financing Futures",
  description: "At StudyNPay.com, we alleviate the stress of financing your education. We streamline the loan application process by partnering with trusted financial institutions, allowing you to submit one application and receive hassle-free approval and disbursement of funds. Our goal is to make financing your studies simple and stress-free, so you can focus on your education.",
  mission: "Our mission is to ensure that financial barriers do not hinder anyone's education. We are dedicated to providing seamless and accessible loan solutions so that every individual can pursue their studies without compromise. By supporting students through a smooth loan process, we aim to empower the future of our society.",
  vision: "We envision a world where every student has the opportunity to achieve their academic and career goals without the burden of financial obstacles. Our commitment is to transform the educational financing landscape, making it more accessible, efficient, and supportive for all learners, so they can focus on building a brighter future.",
  keyFeatures: [],
  stats: [
    { label: "Customers Served", value: "1K+" }
  ],
  team: [
    { name: "Pintu Das", position: "App Developer" },
    { name: "Pinki Paul", position: "Project Manager" }
  ],
  officeImage: null, // Skip for now
  commitmentText: "At StudyNPay.com, we're more than just a loan provider. We're your partner in financial success. Our commitment to transparency, innovation, and customer satisfaction drives everything we do. Join us in building a brighter financial future for all.",
  chips: [
    "Empowering Education",
    "Accessible Financing",
    "Student Support",
    "Innovative Solutions"
  ]
};

const AboutUs = () => {
  const theme = useTheme();

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
                alt="StudyNPay office"
              />
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, color: '#4CAF50' }}>
          Why Choose StudyNPay.com?
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
            {aboutUsData.commitmentText}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mt: 4 }}>
            {aboutUsData.chips.map((chip, index) => (
              <Chip key={index} label={chip} sx={{ bgcolor: '#4CAF50', color: 'white' }} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;