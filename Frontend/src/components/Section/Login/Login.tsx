// import React, { useState, ChangeEvent } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Paper,
//   Link,
//   ThemeProvider,
//   createTheme,
//   InputAdornment,
//   IconButton,
//   useMediaQuery,
// } from "@mui/material";
// import { Link as RouterLink, Navigate } from "react-router-dom";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../../app/auth/authSlice";
// import { AppDispatch, RootState } from "../../../store";
// import EmailIcon from "@mui/icons-material/Email";
// import LockIcon from "@mui/icons-material/Lock";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#4CAF50",
//       light: "#81C784",
//     },
//     background: {
//       default: "#F4FAF5",
//       paper: "#FFFFFF",
//     },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//   },
//   components: {
//     MuiTextField: {
//       defaultProps: {
//         variant: "outlined",
//         fullWidth: true,
//         size: "small",
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 25,
//           textTransform: "none",
//           fontSize: "1rem",
//           padding: "10px 0",
//         },
//       },
//     },
//   },
// });

// const LoginPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [submitting, setSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { isAuthenticated, user } = useSelector((state: any) => state.verify);
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

//   interface FormState {
//     email: string;
//     password: string;
//   }

//   const [formData, setFormData] = useState<FormState>({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState<Partial<FormState>>({});

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Partial<FormState> = {};
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (validateForm()) {
//       setSubmitting(true);
//       try {
//         await dispatch(loginUser(formData));
//         window.location.reload();
//       } catch (err) {
//         console.error(err);
//         setErrors({ email: "Login failed. Please check your credentials." });
//       } finally {
//         setSubmitting(false);
//       }
//     }
//   };

//   if (isAuthenticated) {
//     if (user.role === "admin") {
//       return <Navigate to="/app/v1/admin/dashboard" replace />;
//     } else if (user.role === "user") {
//       return <Navigate to="/app/v1/user/dashboard" replace />;
//     }
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <form>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             minHeight: "100vh",
//             width: "100%",
//             bgcolor: "background.default",
//           }}
//         >
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               flex: 1,
//               justifyContent: "center",
//               alignItems: "center",
//               p: 3,
//               bgcolor: "primary.light",
//             }}
//           >
//             <svg
//               width="300"
//               height="300"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               stroke="#FFFFFF"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               style={{ width: "100%", maxWidth: "400px", height: "auto" }}
//             >
//               <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//               <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//             </svg>
//           </Box>
//           <Box
//             sx={{
//               flex: 1,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               p: { xs: 2, sm: 3 },
//               overflowY: "auto",
//             }}
//           >
//             <Paper
//               elevation={6}
//               sx={{
//                 p: { xs: 3, sm: 4 },
//                 borderRadius: 4,
//                 width: { xs: "100%", sm: "400px" },
//                 maxWidth: "400px",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 my: { xs: 2, md: "auto" },
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//               }}
//             >
//               <LockOpenIcon
//                 color="primary"
//                 sx={{ fontSize: { xs: 40, sm: 48 }, mb: 2 }}
//               />
//               <Typography
//                 variant={isMobile ? "h5" : "h4"}
//                 gutterBottom
//                 fontWeight="bold"
//               >
//                 Welcome Back
//               </Typography>
//               <Typography
//                 variant="body2"
//                 gutterBottom
//                 sx={{ mb: 3, color: "text.secondary", textAlign: "center" }}
//               >
//                 Login to your Loan App account
//               </Typography>

//               <TextField
//                 label="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={!!errors.email}
//                 helperText={errors.email}
//                 sx={{ mb: 2 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <EmailIcon color="primary" />
//                     </InputAdornment>
//                   ),
//                   inputProps: {
//                     autoComplete: "email",
//                     "aria-label": "email",
//                     required: true,
//                     minLength: 8,
//                     maxLength: 128,
//                   },
//                 }}
//               />
//               <TextField
//                 label="Password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password}
//                 onChange={handleChange}
//                 error={!!errors.password}
//                 helperText={errors.password}
//                 sx={{ mb: 3 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon color="primary" />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                       >
//                         {showPassword ? (
//                           <VisibilityOffIcon />
//                         ) : (
//                           <VisibilityIcon />
//                         )}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                   inputProps: {
//                     autoComplete: "current-password",
//                     "aria-label": "Password",
//                     required: true,
//                     minLength: 8,
//                     maxLength: 128,
//                   },
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 sx={{ mb: 2, height: { xs: "40px", sm: "48px" } }}
//                 onClick={handleSubmit}
//                 disabled={submitting}
//               >
//                 {submitting ? "Logging in..." : "Login"}
//               </Button>
//               <Typography variant="body2" align="center">
//                 Don't have an account?{" "}
//                 <Link
//                   component={RouterLink}
//                   to="/user/register"
//                   color="primary"
//                   fontWeight="bold"
//                 >
//                   Register Now
//                 </Link>
//               </Typography>
//             </Paper>
//           </Box>
//         </Box>
//       </form>
//     </ThemeProvider>
//   );
// };

// export default LoginPage;


import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Link,
  ThemeProvider,
  createTheme,
  InputAdornment,
  IconButton,
  useMediaQuery,
  CssBaseline,
  Container,
} from "@mui/material";
import { Link as RouterLink, Navigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../app/auth/authSlice";
import { AppDispatch, RootState } from "../../../store";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50",
      light: "#81C784",
    },
    background: {
      default: "#F4FAF5",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
        size: "small",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: "none",
          fontSize: "1rem",
          padding: "10px 0",
        },
      },
    },
  },
});

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, user }:any = useSelector((state: RootState) => state.verify);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  interface FormState {
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setSubmitting(true);
      try {
        await dispatch(loginUser(formData));
        window.location.reload();
      } catch (err) {
        console.error(err);
        setErrors({ email: "Login failed. Please check your credentials." });
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (isAuthenticated) {
    if (user.role === "admin") {
      return <Navigate to="/app/v1/admin/dashboard" replace />;
    } else if (user.role === "user") {
      return <Navigate to="/app/v1/user/dashboard" replace />;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} disableGutters sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            minHeight: '100%',
            width: "100%",
            bgcolor: "background.default",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              p: 3,
              bgcolor: "primary.light",
            }}
          >
            <svg
              width="300"
              height="300"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: "100%", maxWidth: "400px", height: "auto" }}
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: { xs: 2, sm: 3 },
              overflowY: "auto",
            }}
          >
            <Paper
              elevation={6}
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 4,
                width: { xs: "100%", sm: "400px" },
                maxWidth: "400px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                my: { xs: 2, md: "auto" },
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <LockOpenIcon
                color="primary"
                sx={{ fontSize: { xs: 40, sm: 48 }, mb: 2 }}
              />
              <Typography
                variant={isMobile ? "h5" : "h4"}
                gutterBottom
                fontWeight="bold"
              >
                Welcome Back
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ mb: 3, color: "text.secondary", textAlign: "center" }}
              >
                Login to your Loan App account
              </Typography>

              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                  inputProps: {
                    autoComplete: "email",
                    "aria-label": "email",
                    required: true,
                    minLength: 8,
                    maxLength: 128,
                  },
                }}
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  inputProps: {
                    autoComplete: "current-password",
                    "aria-label": "Password",
                    required: true,
                    minLength: 8,
                    maxLength: 128,
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2, height: { xs: "40px", sm: "48px" } }}
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Logging in..." : "Login"}
              </Button>
              <Typography variant="body2" align="center">
                Don't have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/user/register"
                  color="primary"
                  fontWeight="bold"
                >
                  Register Now
                </Link>
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;