// import React, { useState, useCallback } from "react";
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   IconButton,
//   Typography,
//   Menu,
//   Container,
//   Avatar,
//   Button,
//   Tooltip,
//   MenuItem,
// } from "@mui/material";
// import { Adb as AdbIcon, Menu as MenuIcon } from "@mui/icons-material";
// import { Logo } from "../../../assets/images";

// const pages = [
//   { name: "HOME", link: "/" },
//   { name: "ABOUT US", link: "about-us" },
//   { name: "EMI CALCULATOR", link: "emi-calculator" },
//   { name: "FAQ", link: "faq" },
// ];
// const settings = [
//   { name: "Profile", link: "/profile" },
//   { name: "Account", link: "/account" },
//   { name: "Dashboard", link: "/dashboard" },
//   { name: "Logout", link: "/logout" },
// ];

// const ResponsiveAppBar = React.memo(() => {
//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);

//   const handleOpenNavMenu = useCallback((event: any) => {
//     setAnchorElNav(event.currentTarget);
//   }, []);

//   const handleOpenUserMenu = useCallback((event: any) => {
//     setAnchorElUser(event.currentTarget);
//   }, []);

//   const handleCloseNavMenu = useCallback(() => {
//     setAnchorElNav(null);
//   }, []);

//   const handleCloseUserMenu = useCallback(() => {
//     setAnchorElUser(null);
//   }, []);

//   return (
//     <AppBar sx={{ backgroundColor: "#FFFFFF" }}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "#000000",
//               textDecoration: "none",
//             }}
//           >
//             <img
//               src={Logo}
//               alt="logo"
//               style={{ marginRight: "15px", height: "75px" }}
//             />{" "}
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon sx={{ color: "#000000" }} />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page.name} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center" sx={{ color: "#000000" }}>
//                     <a
//                       href={page.link}
//                       style={{ textDecoration: "none", color: "inherit" }}
//                     >
//                       {page.name}
//                     </a>
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon
//             sx={{
//               display: { xs: "flex", md: "none" },
//               mr: 1,
//               color: "#000000",
//             }}
//           />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "#000000",
//               textDecoration: "none",
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page.name}
//                 href={page.link}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: "#000000", display: "block" }}
//               >
//                 {page.name}
//               </Button>
//             ))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center" sx={{ color: "#000000" }}>
//                     <a
//                       href={setting.link}
//                       style={{ textDecoration: "none", color: "inherit" }}
//                     >
//                       {setting.name}
//                     </a>
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// });

// export default ResponsiveAppBar;

import React, { useState } from "react";
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
import { Menu as MenuIcon, ArrowDropDown } from "@mui/icons-material";
import { motion } from "framer-motion";

const pages = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about-us" },
  { name: "EMI Calculator", link: "/emi-calculator" },
  { name: "FAQ", link: "/faq" },
];

const settings = [
  { name: "Profile", link: "/profile" },
  { name: "Account", link: "/account" },
  { name: "Dashboard", link: "/dashboard" },
  { name: "Logout", link: "/logout" },
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
    <AppBar elevation={0} sx={{ backgroundColor: "#ffffff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <img
                src={Logo}
                alt="logo"
                style={{ height: "50px", marginRight: "10px" }}
              /> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  color: "#4caf50",
                  textDecoration: "none",
                }}
              >
                Study & Pay
              </Typography>
            </Box>
          </motion.div>

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
                  <MenuIcon sx={{ color: "#4caf50" }} />
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
                      <Typography textAlign="center" sx={{ color: "#4caf50" }}>
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
                        color: "#4caf50",
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
                  <ArrowDropDown sx={{ color: "#4caf50", ml: 0.5 }} />
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
                    <Typography textAlign="center" sx={{ color: "#4caf50" }}>
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