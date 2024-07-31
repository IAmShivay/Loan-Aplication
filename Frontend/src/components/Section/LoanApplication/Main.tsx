// import React, { useState } from "react";
// import { Container, Stepper, Step, StepLabel, Box, Paper, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import BasicDetails from "./BasicDetails";
// import DocumentUpload from "./DocumentUpload";
// import FeePayment from "./Payment";
// import InfoIcon from '@mui/icons-material/Info';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import PaymentIcon from '@mui/icons-material/Payment';
// import { StepIconProps } from '@mui/material/StepIcon';
// import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

// const steps = ["Basic Details", "Document Upload", "Fee Payment"];

// const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 22,
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         'linear-gradient( 95deg, #006400 0%, #228B22 50%, #013220 100%)',
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         'linear-gradient( 95deg, #006400 0%, #228B22 50%, #013220 100%)',
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 3,
//     border: 0,
//     backgroundColor:
//       theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
//     borderRadius: 1,
//   },
// }));

// const ColorlibStepIconRoot = styled('div')<{
//   ownerState: { completed?: boolean; active?: boolean };
// }>(({ theme, ownerState }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
//   zIndex: 1,
//   color: '#fff',
//   width: 50,
//   height: 50,
//   display: 'flex',
//   borderRadius: '50%',
//   justifyContent: 'center',
//   alignItems: 'center',
//   ...(ownerState.active && {
//     backgroundImage:
//       'linear-gradient( 136deg, #006400 0%, #228B22 50%, #013220 100%)',
//     boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
//   }),
//   ...(ownerState.completed && {
//     backgroundImage:
//       'linear-gradient( 136deg, #006400 0%, #228B22 50%, #013220 100%)',
//   }),
// }));

// function ColorlibStepIcon(props: StepIconProps) {
//   const { active, completed, className } = props;

//   const icons: { [index: string]: React.ReactElement } = {
//     1: <InfoIcon />,
//     2: <UploadFileIcon />,
//     3: <PaymentIcon />,
//   };

//   return (
//     <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
//       {icons[String(props.icon)]}
//     </ColorlibStepIconRoot>
//   );
// }

// const LoanApplicationForm: React.FC = () => {
//   const [activeStep, setActiveStep] = useState(0);

//   const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
//   const prevStep = () => setActiveStep((prevStep) => prevStep - 1);

//   return (
//     <Container maxWidth="lg">
//       <Box mt={4} mb={4}>
//         <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: '#DCE4E6' }}>
//           <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#006400', mb: 4 }}>
//             Loan Application Process
//           </Typography>
//           <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />}>
//             {steps.map((label, index) => (
//               <Step key={label}>
//                 <StepLabel StepIconComponent={ColorlibStepIcon} sx={{ color: '#006400' }}>
//                   {label}
//                 </StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//           <Box mt={4}>
//             {activeStep === 0 && <BasicDetails nextStep={nextStep} />}
//             {activeStep === 1 && <DocumentUpload nextStep={nextStep} prevStep={prevStep} />}
//             {activeStep === 2 && <FeePayment prevStep={prevStep} />}
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default LoanApplicationForm;

import React, { useState } from "react";
import { Container, Stepper, Step, StepLabel, Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BasicDetails from "./BasicDetails";
import DocumentUpload from "./DocumentUpload";
import FeePayment from "./Payment";
import AcademicDetails from "./AcademicDetails";
import CoBorrowerDetails from "./CoBorrowerDetails"; // Import the new component
import EKYCVerification from "./EKYCVerification"; // Import the new component
import InfoIcon from '@mui/icons-material/Info';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PaymentIcon from '@mui/icons-material/Payment';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group'; // Import icon for Co-borrower Details
import VerifiedIcon from '@mui/icons-material/Verified'; // Import icon for eKYC Verification
import { StepIconProps } from '@mui/material/StepIcon';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

// Updated steps array
const steps = ["Basic Details", "Academic Details", "Co-borrower Details", "eKYC Verification", "Document Upload", "Fee Payment"];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg, #006400 0%, #228B22 50%, #013220 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg, #006400 0%, #228B22 50%, #013220 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, #006400 0%, #228B22 50%, #013220 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, #006400 0%, #228B22 50%, #013220 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <InfoIcon />,
    2: <SchoolIcon />,
    3: <GroupIcon />, // Icon for Co-borrower Details
    4: <VerifiedIcon />, // Icon for eKYC Verification
    5: <UploadFileIcon />,
    6: <PaymentIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const LoanApplicationForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
  const prevStep = () => setActiveStep((prevStep) => prevStep - 1);

  return (
    <Container maxWidth="lg">
      <Box mt={4} mb={4}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: '#DCE4E6' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#006400', mb: 4 }}>
            Loan Application Process
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon} sx={{ color: '#006400' }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box mt={4}>
            {activeStep === 0 && <BasicDetails nextStep={nextStep} />}
            {activeStep === 1 && <AcademicDetails nextStep={nextStep} prevStep={prevStep} />}
            {activeStep === 2 && <CoBorrowerDetails nextStep={nextStep} prevStep={prevStep} />}
            {activeStep === 3 && <EKYCVerification nextStep={nextStep} prevStep={prevStep} />}
            {activeStep === 4 && <DocumentUpload nextStep={nextStep} prevStep={prevStep} />}
            {activeStep === 5 && <FeePayment prevStep={prevStep} />}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoanApplicationForm;
