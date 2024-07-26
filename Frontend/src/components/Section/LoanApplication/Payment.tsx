// import React, { useEffect } from "react";
// import { Box, Button, Typography } from "@mui/material";
// import { motion } from "framer-motion";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

// // Define the Window interface to include Razorpay
// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// interface FeePaymentProps {
//   prevStep: () => void;
// }

// const token = sessionStorage.getItem("token");

// const FeePayment: React.FC<FeePaymentProps> = ({ prevStep }) => {
//   const form = useSelector((state: RootState) => state.form);
//   const documents = useSelector((state: RootState) => state.document);
//   const { handleSubmit } = useForm();
//   const navigate = useNavigate(); // Hook for navigation

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const initiatePayment = async (amount: number) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/v1/create-order",
//         { amount },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWY1NDdiMzUwODI0ZDAyYzQyMTRlNyIsImlhdCI6MTcyMTg4MzU0NiwiZXhwIjoxNzIyMTQyNzQ2fQ.oUGtyefz7MJ0_z83UV6zeZreBAY_1f9FSv4HVRt23m1jZqWmtUxLJqUUg81l_Od9QTJIXDsFyInO-Ha2A95WZw",
//           },
//         }
//       );

//       const options = {
//         key: "rzp_test_Lhf5YHFOs9Begr",
//         amount: response.data.amount,
//         currency: "INR",
//         name: "Your Company Name",
//         description: "Loan Application Fee",
//         order_id: response.data.id,
//         handler: async (response: any) => {
//           try {
//             await submitForm(response.razorpay_payment_id);
//             navigate('/'); // Redirect to home page after successful payment
//           } catch (error:any) {
//             console.error("Error submitting form:", error);
//             alert(`Form submission failed: ${error.message}`);
//           }
//         },
//         prefill: {
//           name: form.name,
//           email: form.email,
//           contact: form.phoneNumber,
//         },
//         theme: {
//           color: "#1a237e",
//         },
//       };

//       if (typeof window.Razorpay === 'undefined') {
//         console.error("Razorpay SDK is not loaded. Please check your internet connection and try again.");
//         return;
//       }

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error:any) {
//       console.error("Error initiating payment:", error);
//       alert(`Error initiating payment: ${error.message}`);
//     }
//   };

//   const submitForm = async (paymentId: string) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("email", form.email);
//       formData.append("phoneNumber", form.phoneNumber);
//       formData.append("age", form.age);
//       formData.append("address", form.address);
//       formData.append("education", form.education);
//       formData.append("loanAmount", form.loanAmount);
//       formData.append("paymentStatus", "Paid");
//       formData.append("paymentId", paymentId);

//       if (documents.idProof?.file) {
//         formData.append("idProof", documents.idProof.file);
//       }

//       if (documents.addressProof?.file) {
//         formData.append("addressProof", documents.addressProof.file);
//       }

//       if (documents.incomeProof?.file) {
//         formData.append("incomeProof", documents.incomeProof.file);
//       }

//       await axios.post(
//         "http://localhost:3000/api/v1/loan-application",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OThhMjE3NDE5NDYyNDM0MjQ5ZTJmZiIsImlhdCI6MTcyMTg5MDQ0NSwiZXhwIjoxNzIyMzIyNDQ1fQ.0LqWfVPODqj2yypjhkF2g5qFunZUmL9B7KSNo0Rd9-w"}`,
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       throw new Error("Form submission failed.");
//     }
//   };

//   const onSubmit = () => {
//     initiatePayment(100); // Amount in paise (1000 INR)
//   };

//   return (
//     <Box mt={4} mb={4} textAlign="center">
//       <Typography variant="h4" component="h2" gutterBottom>
//         Processing Fee Payment
//       </Typography>
//       <Box
//         component="form"
//         noValidate
//         autoComplete="off"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Typography variant="body1" gutterBottom>
//             Click the button below to proceed with the payment of ₹1000
//           </Typography>
//         </motion.div>
//         <Box mt={2} style={{ textAlign: "center" }}>
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={prevStep}
//               style={{
//                 backgroundColor: "#1a237e",
//                 color: "#ffffff",
//                 marginRight: "1rem",
//               }}
//             >
//               Back
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               type="submit"
//               style={{ backgroundColor: "#1a237e", color: "#ffffff" }}
//             >
//               Pay Now
//             </Button>
//           </motion.div>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default FeePayment;

import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface FeePaymentProps {
  prevStep: () => void;
}

const token = sessionStorage.getItem("token");

const FeePayment: React.FC<FeePaymentProps> = ({ prevStep }) => {
  const form = useSelector((state: RootState) => state.form);
  const documents = useSelector((state: RootState) => state.document);
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initiatePayment = async (amount: number) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/create-order",
        { amount },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const options = {
        key: "rzp_test_Lhf5YHFOs9Begr",
        amount: response.data.amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Loan Application Fee",
        order_id: response.data.id,
        handler: async (response: any) => {
          try {
            await submitForm(response.razorpay_payment_id);
            setPaymentSuccessful(true);
            alert("Payment successful! You can now track your application.");
          } catch (error: any) {
            console.error("Error submitting form:", error);
            alert(`Form submission failed: ${error.message}`);
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phoneNumber,
        },
        theme: {
          color: "#006400",
        },
      };

      if (typeof window.Razorpay === 'undefined') {
        console.error("Razorpay SDK is not loaded. Please check your internet connection and try again.");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("Error initiating payment:", error);
      alert(`Error initiating payment: ${error.message}`);
    }
  };

  const submitForm = async (paymentId: string) => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("age", form.age);
      formData.append("address", form.address);
      formData.append("education", form.education);
      formData.append("loanAmount", form.loanAmount);
      formData.append("paymentStatus", "Paid");
      formData.append("paymentId", paymentId);

      if (documents.idProof?.file) {
        formData.append("idProof", documents.idProof.file);
      }

      if (documents.addressProof?.file) {
        formData.append("addressProof", documents.addressProof.file);
      }

      if (documents.incomeProof?.file) {
        formData.append("incomeProof", documents.incomeProof.file);
      }

      await axios.post(
        "http://localhost:3000/api/v1/loan-application",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      throw new Error("Form submission failed.");
    }
  };

  const onSubmit = () => {
    initiatePayment(100000); // Amount in paise (1000 INR)
  };

  const handleTrackApplication = () => {
    navigate('/track-application');
  };

  return (
    <Box mt={4} mb={4} textAlign="center">
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="#388E3C">
        Processing Fee Payment
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="body1" gutterBottom color="#2E7D32">
            {paymentSuccessful
              ? "Payment successful! You can now track your application."
              : "Click the button below to proceed with the payment of ₹1000"}
          </Typography>
        </motion.div>
        <Box mt={2} style={{ textAlign: "center" }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              onClick={paymentSuccessful ? handleTrackApplication : prevStep}
              style={{
                background: "linear-gradient(45deg, #388E3C 30%, #2E7D32 90%)",
                color: "#ffffff",
                marginRight: "1rem",
              }}
            >
              {paymentSuccessful ? "Track Application" : "Back"}
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={paymentSuccessful}
              style={{
                background: "linear-gradient(45deg, #388E3C 30%, #2E7D32 90%)",
                color: "#ffffff",
                opacity: paymentSuccessful ? 0.5 : 1,
              }}
            >
              Pay Now
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default FeePayment;
