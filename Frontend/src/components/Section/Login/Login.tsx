// // LoginPage.tsx
// import React, { useState, ChangeEvent } from "react";
// import {
//   TextField,
//   Button,
//   Container,
//   Box,
//   Typography,
//   Paper,
//   Link,
// } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../../../app/auth/authSlice";
// import { AppDispatch } from "../../../store";
// const LoginPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [submitting, setSubmitting] = useState(false);

//   interface FormState {
//     email: string;
//     password: string;
//   }

//   const [formData, setFormData] = useState<FormState>({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     setSubmitting(true);
//     try {
//       await dispatch(loginUser(formData));
//     } catch (err) {
//       console.log(err);
//       // Handle registration error here, you can set an error state and display it to the user
//     } finally {
//       setSubmitting(false);
//       setFormData({
//         email: "",
//         password: "",
//       });
//     }
//   };
//   return (
//     <Container
//       maxWidth="xs"
//       style={{
//         marginTop: "64px",
//       }}
//     >
//       <Paper
//         elevation={6}
//         style={{
//           padding: "32px",
//           borderRadius: "8px",
//         }}
//       >
//         <Box
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <ShoppingCartIcon
//             color="primary"
//             style={{
//               fontSize: "40px",
//               marginBottom: "16px",
//             }}
//           />
//           <Typography variant="h5" gutterBottom>
//             Welcome to E-Shop
//           </Typography>
//           <Typography variant="subtitle1" gutterBottom>
//             Please login to continue
//           </Typography>
//           <TextField
//             label="Email"
//             name="email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={formData.email}
//             onChange={handleChange}
//             style={{
//               marginBottom: "16px",
//             }}
//           />
//           <TextField
//             label="Password"
//             name="password"
//             variant="outlined"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={formData.password}
//             onChange={handleChange}
//             style={{
//               marginBottom: "16px",
//             }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             style={{
//               marginTop: "16px",
//               marginBottom: "16px",
//             }}
//             onClick={handleSubmit}
//           >
//             Login
//           </Button>

//           <Typography
//             variant="body2"
//             align="center"
//             style={{ marginTop: "16px" }}
//           >
//             Don,t have an account?{" "}
//             <Link component={RouterLink} to="/register">
//               Register Now
//             </Link>
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default LoginPage;

import React, { useState, ChangeEvent, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../app/auth/authSlice";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store"; // Import RootState

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.role);

  interface FormState {
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await dispatch(loginUser(formData));
    } catch (err) {
      console.log(err);
      // Handle registration error here, you can set an error state and display it to the user
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 'admin') {
        navigate('/app/v1/admin/dashboard');
      } else if(userRole === 'user') {
        navigate('/app/v1/user/dashboard');
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  return (
    <Container
      maxWidth="xs"
      style={{
        marginTop: "64px",
      }}
    >
      <Paper
        elevation={6}
        style={{
          padding: "32px",
          borderRadius: "8px",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ShoppingCartIcon
            color="primary"
            style={{
              fontSize: "40px",
              marginBottom: "16px",
            }}
          />
          <Typography variant="h5" gutterBottom>
            Welcome to E-Shop
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Please login to continue
          </Typography>
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            style={{
              marginBottom: "16px",
            }}
          />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            style={{
              marginBottom: "16px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{
              marginTop: "16px",
              marginBottom: "16px",
            }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Login"}
          </Button>

          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "16px" }}
          >
            Don't have an account?{" "}
            <Link component={RouterLink} to="/user/register">
              Register Now
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
