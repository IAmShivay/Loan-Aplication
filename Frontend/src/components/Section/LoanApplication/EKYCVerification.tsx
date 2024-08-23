// import React, { useState } from 'react';
// import { 
//   TextField, 
//   Button, 
//   Box, 
//   Typography, 
//   Snackbar, 
//   CircularProgress, 
//   Grid, 
//   Paper,
//   Container
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../store';
// import { updateEkycDetails } from '../../../app/LoanAppliation/FormSlice';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

// // Mock function for OTP verification API
// const verifyOTP = async (aadhaarNo: string, otp: string): Promise<boolean> => {
//   await new Promise(resolve => setTimeout(resolve, 2000));
//   return Math.random() < 0.8;
// };

// interface EkycProps {
//   nextStep: () => void;
//   prevStep: () => void;
// }

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#4CAF50',
//     },
//     secondary: {
//       main: '#81C784',
//     },
//     background: {
//       default: '#E8F5E9',
//     },
//   },
// });

// const Ekyc: React.FC<EkycProps> = ({ nextStep, prevStep }) => {
//   const dispatch = useDispatch();
//   const ekycVerified = useSelector((state: RootState) => state.form.ekycVerified);

//   const [aadhaarNo, setAadhaarNo] = useState('');
//   const [otp, setOtp] = useState('');
//   const [showOtpField, setShowOtpField] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAadhaarNo(e.target.value);
//   };

//   const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setOtp(e.target.value);
//   };

//   const handleSendOtp = () => {
//     if (aadhaarNo.length === 12) {
//       setShowOtpField(true);
//       setSnackbarMessage('OTP sent successfully');
//       setSnackbarOpen(true);
//     } else {
//       setSnackbarMessage('Please enter a valid 12-digit Aadhaar number');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleVerify = async () => {
//     if (aadhaarNo && otp) {
//       setIsVerifying(true);
//       try {
//         const isVerified = await verifyOTP(aadhaarNo, otp);
//         dispatch(updateEkycDetails({ ekycVerified: isVerified }));
//         setSnackbarMessage(isVerified ? 'OTP verified successfully' : 'OTP verification failed');
//         setSnackbarOpen(true);
//       } catch (error) {
//         setSnackbarMessage('Error during OTP verification');
//         setSnackbarOpen(true);
//       } finally {
//         setIsVerifying(false);
//       }
//     } else {
//       setSnackbarMessage('Please enter Aadhaar number and OTP');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSubmit = () => {
//     if (ekycVerified) {
//       nextStep();
//     } else {
//       setSnackbarMessage('Please complete OTP verification before proceeding');
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 4 }}>
//         <Container maxWidth="md">
//           <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
//             <Typography variant="h4" component="h1" gutterBottom color="primary" align="center">
//               eKYC Verification
//             </Typography>
//             <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Aadhaar Number"
//                     value={aadhaarNo}
//                     onChange={handleAadhaarChange}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button 
//                     fullWidth 
//                     variant="contained" 
//                     color="primary" 
//                     onClick={handleSendOtp}
//                   >
//                     Send OTP
//                   </Button>
//                 </Grid>
                
//                 {showOtpField && (
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="OTP"
//                       value={otp}
//                       onChange={handleOtpChange}
//                     />
//                   </Grid>
//                 )}
                
//                 {showOtpField && (
//                   <Grid item xs={12}>
//                     <Button 
//                       fullWidth
//                       variant="contained" 
//                       color="primary" 
//                       onClick={handleVerify}
//                       disabled={isVerifying}
//                     >
//                       {isVerifying ? <CircularProgress size={24} /> : 'Verify OTP'}
//                     </Button>
//                   </Grid>
//                 )}
                
//                 <Grid item xs={6}>
//                   <Button 
//                     fullWidth
//                     variant="outlined" 
//                     color="secondary" 
//                     onClick={prevStep}
//                   >
//                     Back
//                   </Button>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Button 
//                     fullWidth
//                     variant="contained" 
//                     color="primary" 
//                     onClick={handleSubmit} 
//                     disabled={!ekycVerified}
//                   >
//                     Next
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Paper>
//         </Container>
        
//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={() => setSnackbarOpen(false)}
//           message={snackbarMessage}
//         />
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Ekyc;