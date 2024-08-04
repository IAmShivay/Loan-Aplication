
import { useState } from "react";
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
import { Menu as MenuIcon, ArrowDropDown, School, Payment, TrendingUp } from "@mui/icons-material";
import { motion } from "framer-motion";

const StudyAndPayLogo = ({ variant = 'default', size = 'small' }) => {
  const getSize = () => {
    switch (size) {
      case 'small': return { icon: 28, fontSize: '1.3rem' };
      case 'medium': return { icon: 40, fontSize: '1.6rem' };
      case 'large': return { icon: 52, fontSize: '2.1rem' };
      default: return { icon: 28, fontSize: '1.3rem' };
    }
  };

  const { icon, fontSize } = getSize();

  return (
    <Box
      component={motion.div}
      display="flex"
      alignItems="center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <School sx={{ fontSize: icon, color: '#4caf50', marginRight: 1 }} />
        <Payment sx={{ 
          fontSize: icon * 0.7, 
          color: '#66bb6a', 
          position: 'absolute',
          right: -8,
          bottom: -5,
          filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.2))'
        }} />
      </Box>
      <Typography
        variant="h6"
        component="span"
        sx={{
          fontSize,
          fontWeight: 'bold',
          color: '#2e7d32',
          letterSpacing: '0.02em',
          textShadow: '1px 1px 1px rgba(0,0,0,0.1)',
          marginRight: 1,
        }}
      >
        {variant === 'default' ? 'Study & Pay' : 'Study and Pay'}
      </Typography>
      <TrendingUp 
        sx={{ 
          fontSize: icon * 0.6, 
          color: '#66bb6a', 
          transform: 'rotate(-45deg)',
        }} 
      />
    </Box>
  );
};

const pages = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about-us" },
  { name: "EMI Calculator", link: "/emi-calculator" },
  { name: "FAQ", link: "/faq" },
  { name: "CREDIT REPORT", link: "/app/v1/user/credit-report" },

];

const settings = [
  { name: "Profile", link: "/app/v1/user/profile" },
  { name: "Dashboard", link: "/app/v1/user/dashboard" },
  { name: "Logout", link: "/user/logout" },
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenNavMenu = (event:any) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event:any) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar position="static" elevation={3} sx={{ 
      background: 'linear-gradient(145deg, #ffffff 0%, #e8f5e9 100%)',
    }}>
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
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" sx={{ color: "#2e7d32" }}>
                        <a
                          href={page.link}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {page.name}
                        </a>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex" }}>
                {pages.map((page) => (
                  <motion.div
                    key={page.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      href={page.link}
                      sx={{
                        my: 2,
                        color: "#2e7d32",
                        display: "block",
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        },
                      }}
                    >
                      {page.name}
                    </Button>
                  </motion.div>
                ))}
              </Box>
            )}

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
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" sx={{ color: "#2e7d32" }}>
                      <a
                        href={setting.link}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {setting.name}
                      </a>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;