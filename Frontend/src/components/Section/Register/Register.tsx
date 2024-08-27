import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Link,
  ThemeProvider,
  createTheme,
  CssBaseline,
  InputAdornment,
  IconButton,
  useMediaQuery,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../app/auth/authSlice";
import { AppDispatch, RootState } from "../../../store";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
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

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.auth.role);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  interface FormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }

  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "loanApplicant", // Default role
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (!formData.role) newErrors.role = "Role selection is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setSubmitting(true);
      try {
        await dispatch(registerUser(formData));
      } catch (err) {
        console.error(err);
        setErrors({ email: "Registration failed. Please try again." });
      } finally {
        setSubmitting(false);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === "admin") {
        navigate("/app/v1/admin/dashboard");
      } else if (userRole === "user") {
        navigate("/app/v1/user/dashboard");
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth={false}
        disableGutters
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <form>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              minHeight: "100vh",
              width: "100%",
              bgcolor: "background.default",
              overflow: "hidden",
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
                <path d="M16 11h6" />
                <path d="M19 8v6" />
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
                  p: { xs: 2, sm: 4 },
                  borderRadius: 4,
                  width: "100%",
                  maxWidth: "400px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  my: { xs: 2, md: "auto" },
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                <PersonAddIcon
                  color="primary"
                  sx={{ fontSize: { xs: 36, sm: 48 }, mb: 2 }}
                />
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  gutterBottom
                  fontWeight="bold"
                >
                  Create Account
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ mb: 3, color: "text.secondary" }}
                >
                  Join Loan App today
                </Typography>

                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                    inputProps: {
                      autoComplete: "first-name",
                      "aria-label": "First Name",
                      required: true,
                      minLength: 8,
                      maxLength: 128,
                    },
                  }}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                    inputProps: {
                      autoComplete: "last-name",
                      "aria-label": "Last Name",
                      required: true,
                      minLength: 8,
                      maxLength: 128,
                    },
                  }}
                />
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
                      "aria-label": "Email",
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
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
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

                <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.role}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    label="Role"
                  >
                    <MenuItem value="loanApplicant">Loan Applicant</MenuItem>
                    <MenuItem value="lendingPartner">Lending Partner</MenuItem>
                  </Select>
                  {errors.role && (
                    <Typography variant="caption" color="error">
                      {errors.role}
                    </Typography>
                  )}
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mb: 2, height: "48px" }}
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? "Registering..." : "Create Account"}
                </Button>
                <Typography variant="body2" align="center">
                  Already have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/user/login"
                    color="primary"
                    fontWeight="bold"
                  >
                    Login
                  </Link>
                </Typography>
              </Paper>
            </Box>
          </Box>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterPage;
