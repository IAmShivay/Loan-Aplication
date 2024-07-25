// import React from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   Container,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { useNavigate } from 'react-router-dom';
// import { HeroMain } from "../../assets/images";
// import { MoneyOffCsredRounded, HomeRounded, ChairRounded, BusinessCenterRounded, LightbulbRounded, HelpOutlineRounded } from '@mui/icons-material';
// import { darken } from '@mui/system/colorManipulator';

// interface CarouselItem {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   link: string;
// }

// const CarouselItems: CarouselItem[] = [
//   {
//     id: 1,
//     title: "Welcome to Our Financial Solutions",
//     description: "Explore our tailored loan solutions designed to help you achieve your financial goals.",
//     image: HeroMain,
//     link: "/about",
//   },
// ];

// const variants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0 },
// };

// const CarouselComponent: React.FC = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const navigate = useNavigate();

//   const handleApplyNow = () => {
//     navigate('/apply-form');
//   };

//   return (
//     <Box>
//       {/* Carousel Section */}
//       <Box >
//         {CarouselItems.map((item) => (
//           <Box
//             key={item.id}
//             sx={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               backgroundImage: `url(${item.image})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               "&::before": {
//                 content: '""',
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundColor: "rgba(0, 0, 0, 0.5)",
//               },
//             }}
//           >
//             <Container maxWidth="lg" sx={{ height: "100%"}}>
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   color: "white",
//                   textAlign: "left",
//                   maxWidth: { xs: "100%", sm: "70%", md: "50%" },
//                   px: { xs: 2, sm: 4, md: 6 },
//                 }}
//               >
//                 <motion.div variants={variants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
//                   <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2, display: 'flex', alignItems: 'center', color: '#00A859' }}>
//                     {item.title} <MoneyOffCsredRounded sx={{ ml: 1 }} />
//                   </Typography>
//                 </motion.div>
//                 <motion.div variants={variants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.4 }}>
//                   <Typography variant="body1" sx={{ mb: 4, color: '#E0E0E0' }}>
//                     {item.description}
//                   </Typography>
//                 </motion.div>
//                 <motion.div variants={variants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.6 }}>
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <Button variant="contained" color="success" size="large" onClick={handleApplyNow} sx={{ boxShadow: '0px 8px 15px rgba(0,0,0,0.1)', backgroundColor: '#00A859', '&:hover': { backgroundColor: darken('#00A859', 0.1), }, }}>
//                       Apply Now
//                     </Button>
//                     <Button variant="outlined" color="success" size="large" href={item.link} sx={{ borderColor: '#00A859', color: '#00A859', '&:hover': { borderColor: darken('#00A859', 0.1), color: darken('#00A859', 0.1), }, }}>
//                       Learn More
//                     </Button>
//                   </Box>
//                 </motion.div>
//               </Box>
//             </Container>
//           </Box>
//         ))}
//       </Box>

//       {/* Why Choose Us */}
//       <Container maxWidth="lg" sx={{ py: 6 }}>
//         <Typography variant="h4" sx={{ mb: 2, textAlign: "center", color: '#00A859' }}>Why Choose Us?</Typography>
//         <Typography variant="body1" sx={{ textAlign: "center", mb: 4 }}>
//           We provide customized loan solutions that fit your financial needs. Enjoy competitive rates and outstanding customer service with us.
//         </Typography>

//         {/* Our Services */}
//         <Typography variant="h4" sx={{ mb: 2, textAlign: "center", color: '#00A859' }}>Our Services</Typography>
//         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, mb: 4 }}>
//           <Card sx={{ maxWidth: 345, bgcolor: 'background.paper', boxShadow: 2, minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//             <CardContent>
//               <Typography variant="h5" component="div" sx={{ mb: 1, display: 'flex', alignItems: 'center', color: '#00A859' }}>
//                 Home Loans <HomeRounded sx={{ ml: 1 }} />
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Secure your dream home with our competitive home loan rates and flexible terms.
//               </Typography>
//             </CardContent>
//           </Card>
//           <Card sx={{ maxWidth: 345, bgcolor: 'background.paper', boxShadow: 2, minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//             <CardContent>
//               <Typography variant="h5" component="div" sx={{ mb: 1, display: 'flex', alignItems: 'center', color: '#00A859' }}>
//                 Auto Loans <ChairRounded sx={{ ml: 1 }} />
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Drive away with confidence with our tailored auto loan options and easy application process.
//               </Typography>
//             </CardContent>
//           </Card>
//           <Card sx={{ maxWidth: 345, bgcolor: 'background.paper', boxShadow: 2, minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//             <CardContent>
//               <Typography variant="h5" component="div" sx={{ mb: 1, display: 'flex', alignItems: 'center', color: '#00A859' }}>
//                 Business Loans <BusinessCenterRounded sx={{ ml: 1 }} />
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Grow your business with our flexible business loan solutions designed to meet your needs.
//               </Typography>
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Expert Advice */}
//         <Typography variant="h4" sx={{ mb: 2, textAlign: "center", color: '#00A859' }}>Expert Advice</Typography>
//         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, mb: 4 }}>
//           <Card sx={{ maxWidth: 345, bgcolor: 'background.paper', boxShadow: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//             <CardContent>
//               <Typography variant="h5" component="div" sx={{ mb: 1, display: 'flex', alignItems: 'center', color: '#00A859' }}>
//                 Our Experts <LightbulbRounded sx={{ ml: 1 }} />
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Get personalized advice from our financial experts to make informed decisions and achieve your financial goals.
//               </Typography>
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Support */}
//         <Typography variant="h4" sx={{ mb: 2, textAlign: "center", color: '#00A859' }}>Support</Typography>
//         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, mb: 4 }}>
//           <Card sx={{ maxWidth: 345, bgcolor: 'background.paper', boxShadow: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//             <CardContent>
//               <Typography variant="h5" component="div" sx={{ mb: 1, display: 'flex', alignItems: 'center', color: '#00A859' }}>
//                 Continuous Support <HelpOutlineRounded sx={{ ml: 1 }} />
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 We provide ongoing support throughout the life of the loan to ensure your satisfaction.
//               </Typography>
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Customer Testimonials */}
//         <Typography variant="h4" sx={{ mb: 2, textAlign: "center", color: '#00A859' }}>Customer Testimonials</Typography>
//         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
//           <Card sx={{ maxWidth: 345, bgcolor: 'background.paper', boxShadow: 2, minHeight: 150 }}>
//             <CardContent>
//               <Typography variant="body2" color="text.secondary">
//                 "The loan application process was smooth and easy. The staff was incredibly helpful and professional. Highly recommend!" - Jane Doe
//               </Typography>
//             </CardContent>
//           </Card>
//           <Card sx={{ maxWidth: 345, bgcolor: 'background.paper', boxShadow: 2, minHeight: 150 }}>
//             <CardContent>
//               <Typography variant="body2" color="text.secondary">
//                 "Great experience from start to finish. I got the loan I needed quickly and with minimal hassle." - John Smith
//               </Typography>
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Contact Us */}
//         <Box sx={{ textAlign: "center", mt: 4 }}>
//           <Typography variant="h4" sx={{ mb: 2 }}>Contact Us</Typography>
//           <Button variant="contained" color="success" onClick={() => navigate('/contact')} sx={{ transition: 'transform 0.3s ease-in-out', backgroundColor: '#00A859', '&:hover': { transform: 'scale(1.05)', backgroundColor: darken('#00A859', 0.1) } }}>
//             Contact Us
//           </Button>
//         </Box>
//       </Container>
      
//       <Box sx={{ width: "Full", bgcolor: '#00A859', py: 6 }}>
//         <Container maxWidth="lg">
//           <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: 'white' }}>How We Process Loans</Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
//             <Box sx={{ bgcolor: '#f5f5f5', p: 4, borderRadius: 2, boxShadow: 1, minWidth: 300, textAlign: 'center' }}>
//               <Typography variant="h6" component="div" sx={{ mb: 1, color: '#00A859' }}>
//                 1. Application
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Submit your application online or in person with the required documentation.
//               </Typography>
//             </Box>
//             <Box sx={{ bgcolor: '#f5f5f5', p: 4, borderRadius: 2, boxShadow: 1, minWidth: 300, textAlign: 'center' }}>
//               <Typography variant="h6" component="div" sx={{ mb: 1, color: '#00A859' }}>
//                 2. Review
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Our team reviews your application, verifies your information, and assesses your eligibility.
//               </Typography>
//             </Box>
//             <Box sx={{ bgcolor: '#f5f5f5', p: 4, borderRadius: 2, boxShadow: 1, minWidth: 300, textAlign: 'center' }}>
//               <Typography variant="h6" component="div" sx={{ mb: 1, color: '#00A859' }}>
//                 3. Approval
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Once approved, we finalize the loan terms and disburse the funds to your account.
//               </Typography>
//             </Box>
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default CarouselComponent;

import React from "react";
import { Box, Button, Typography, useMediaQuery, Container, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { MoneyOffCsredRounded, HomeRounded, DirectionsCarRounded, BusinessCenterRounded, LightbulbRounded, SupportAgentRounded } from '@mui/icons-material';

const CarouselItems = [
  {
    id: 1,
    title: "Financial Solutions Tailored for You",
    description: "Discover loan options designed to help you achieve your dreams and secure your future.",
    image: "url_to_hero_image",
  },
];

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const CarouselComponent = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate('/apply-form');
  };

  return (
    <Box sx={{ backgroundColor: '#f0f4f8' }}>
      {/* Hero Section */}
      <Box sx={{
        height: { xs: '60vh', md: '80vh' },
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${CarouselItems[0].image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Container maxWidth="lg">
            <Box sx={{ color: 'white', maxWidth: { xs: '100%', md: '60%' } }}>
              <motion.div variants={variants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, color: '#4caf50' }}>
                  {CarouselItems[0].title}
                </Typography>
              </motion.div>
              <motion.div variants={variants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.4 }}>
                <Typography variant="h5" sx={{ mb: 4, color: '#e0e0e0' }}>
                  {CarouselItems[0].description}
                </Typography>
              </motion.div>
              <motion.div variants={variants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.6 }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={handleApplyNow}
                  sx={{
                    backgroundColor: '#4caf50',
                    '&:hover': { backgroundColor: '#45a049' },
                    borderRadius: '25px',
                    padding: '10px 30px',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  Start Your Application
                </Button>
              </motion.div>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ mb: 6, textAlign: "center", color: '#2e7d32', fontWeight: 'bold' }}>
          Our Financial Solutions
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {[
            { title: "Home Loans", icon: HomeRounded, description: "Make your dream home a reality with our flexible home loan options." },
            { title: "Auto Loans", icon: DirectionsCarRounded, description: "Drive off in your new car with our competitive auto loan rates." },
            { title: "Business Loans", icon: BusinessCenterRounded, description: "Fuel your business growth with our tailored financial solutions." },
          ].map((service, index) => (
            <Card key={index} sx={{ 
              maxWidth: 345, 
              minHeight: 250, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              borderRadius: '15px',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
              }
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <service.icon sx={{ fontSize: 60, color: '#4caf50', mb: 2 }} />
                <Typography variant="h5" component="div" sx={{ mb: 2, color: '#2e7d32', fontWeight: 'bold' }}>
                  {service.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Why Choose Us Section */}
      <Box sx={{ backgroundColor: '#e8f5e9', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ mb: 6, textAlign: "center", color: '#2e7d32', fontWeight: 'bold' }}>
            Why Choose Us?
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
            {[
              { title: "Expert Advice", icon: LightbulbRounded, description: "Our financial experts provide personalized guidance to help you make informed decisions." },
              { title: "Competitive Rates", icon: MoneyOffCsredRounded, description: "Enjoy some of the most competitive interest rates in the market." },
              { title: "24/7 Support", icon: SupportAgentRounded, description: "Our dedicated support team is always ready to assist you, any time of day or night." },
            ].map((feature, index) => (
              <Card key={index} sx={{ 
                maxWidth: 345, 
                minHeight: 250, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                borderRadius: '15px',
                backgroundColor: 'white',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <feature.icon sx={{ fontSize: 60, color: '#4caf50', mb: 2 }} />
                  <Typography variant="h5" component="div" sx={{ mb: 2, color: '#2e7d32', fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ backgroundColor: '#4caf50', color: 'white', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold' }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Take the first step towards your financial goals today.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleApplyNow}
            sx={{
              backgroundColor: 'white',
              color: '#4caf50',
              '&:hover': { backgroundColor: '#e0e0e0' },
              borderRadius: '25px',
              padding: '10px 30px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            Apply Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default CarouselComponent;