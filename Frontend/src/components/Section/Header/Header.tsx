import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ArrowDropDown,
  School,
  TrendingUp,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { logoutUser } from "../../../app/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../../../app/errors/errorSlice";
import { Link } from 'react-router-dom';
export const StudyAndPayLogo = ({ size = 'small' }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { icon: 36, fontSize: '1.5rem', spacing: 1 };
      case 'medium':
        return { icon: 48, fontSize: '2rem', spacing: 1.5 };
      case 'large':
        return { icon: 64, fontSize: '2.5rem', spacing: 2 };
      default:
        return { icon: 36, fontSize: '1.5rem', spacing: 1 };
    }
  };

  const { icon, fontSize, spacing } = getSize();

  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Box
        component={motion.div}
        display="flex"
        alignItems="center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <School
              sx={{
                fontSize: icon,
                color: '#1565c0',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))',
              }}
            />
          </motion.div>
          <TrendingUp
            sx={{
              fontSize: icon * 0.5,
              color: '#4caf50',
              position: 'absolute',
              right: -icon * 0.25,
              bottom: -icon * 0.1,
              transform: 'rotate(-30deg)',
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))',
            }}
          />
        </Box>
        <Typography
          variant="h6"
          component="span"
          sx={{
            fontSize,
            fontWeight: 700,
            letterSpacing: '0.05em',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            fontFamily: '"Poppins", sans-serif',
            marginLeft: spacing,
            background: 'linear-gradient(45deg, #1565c0 30%, #4caf50 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          STUDY
          <span style={{ color: '#4caf50' }}>N</span>
          PAY
        </Typography>
      </Box>
    </Link>
  );
};
const ResponsiveAppBar = () => {
  const navigate = useNavigate();

  const pages = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    { name: "EMI Calculator", link: "/loan-calculator" },
    { name: "FAQ", link: "/faq" },
  ];

  const signInSignUpPage = { name: "LOGIN", link: "/user/login" };

  const dispatch = useDispatch<any>();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(
      showSnackbar({
        message: "You have been logged out successfully.",
        severity: "error",
      })
    );
  };
  const { isAuthenticated, user } = useSelector((state: any) => state?.verify);
  const settings = [
    { name: "Profile", link: "/app/v1/user/profile" },
    user?.role === "lendingPartner"
      ? { name: "Admin Dashbord", link: "/app/v1/admin/dashboard" }
      : { name: "User Dashboard", link: "/app/v1/user/dashboard" },
    { name: "Logout", onClick: handleLogout },
  ].filter(Boolean); // This removes any `null` values from the array

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenNavMenu = (event: any) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: any) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleMenuItemClick = (setting: any) => {
    if (setting.onClick) {
      setting.onClick();
    } else if (setting.link) {
      navigate(setting.link);
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="static"
      elevation={3}
      sx={{
        background: "linear-gradient(145deg, #ffffff 0%, #e8f5e9 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <StudyAndPayLogo size="small" />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile ? (
              <>
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon sx={{ color: "#2e7d32" }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.name}
                      onClick={() => {
                        navigate(page.link);
                        handleCloseNavMenu();
                      }}
                    >
                      <Typography textAlign="center" sx={{ color: "#2e7d32" }}>
                        {page.name}
                      </Typography>
                    </MenuItem>
                  ))}
                  <MenuItem
                    key={signInSignUpPage.name}
                    onClick={() => {
                      navigate(signInSignUpPage.link);
                      handleCloseNavMenu();
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        width: "100%",
                        color: "#ffffff",
                        // fontWeight: "bold",
                        backgroundColor: "#2e7d32",
                        "&:hover": {
                          backgroundColor: "#1b5e20",
                        },
                      }}
                    >
                      {signInSignUpPage.name}
                    </Button>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {pages.map((page) => (
                  <motion.div
                    key={page.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => navigate(page.link)}
                      sx={{
                        my: 2,
                        color: "#2e7d32",
                        display: "block",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor: "rgba(76, 175, 80, 0.1)",
                        },
                      }}
                    >
                      {page.name}
                    </Button>
                  </motion.div>
                ))}
                <motion.div
                  key={signInSignUpPage.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ marginLeft: "8px" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(signInSignUpPage.link)}
                    sx={{
                      my: 2,
                      // fontWeight: "bold",
                      backgroundColor: "#2e7d32",
                      "&:hover": {
                        backgroundColor: "#1b5e20",
                      },
                    }}
                  >
                    {signInSignUpPage.name}
                  </Button>
                </motion.div>
              </Box>
            )}

            {isAuthenticated && (
              <Box sx={{ flexGrow: 0, ml: 2 }}>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User Avatar"
                      src="/static/images/avatar/2.jpg"
                      sx={{ width: 32, height: 32 }}
                    />
                    <ArrowDropDown sx={{ color: "#2e7d32", ml: 0.5 }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={() => handleMenuItemClick(setting)}
                    >
                      <Typography textAlign="center" sx={{ color: "#2e7d32" }}>
                        {setting.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
