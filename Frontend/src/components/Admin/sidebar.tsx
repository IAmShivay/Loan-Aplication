import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Dashcard from "./Dashcard";
import LoanApplicationTable from "./Applications/applications";
const drawerWidth = 240;

const Dashboard: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] =
    useState<JSX.Element | null>(<Dashcard />);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleMenuClick = (component: JSX.Element) => {
    setSelectedComponent(component);
    handleDrawerClose();
  };

  const drawer = (
    <div style={{ paddingTop: "20vh" }}>
      <List>
        <ListItem button onClick={() => handleMenuClick(<Dashcard />)}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => handleMenuClick(<LoanApplicationTable/>)}>
          <ListItemText primary="Applications" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            {/* <img
              src={WhiteLogo}
              alt="SRIMS"
              style={{ width: "40vh", height: "auto" }} // Set the specific size for the logo
            /> */}
            <AdminPanelSettingsIcon sx={{ ml: 1 }} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {selectedComponent}
      </Box>
    </Box>
  );
};

export default Dashboard;
