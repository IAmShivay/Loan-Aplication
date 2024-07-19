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
  styled,
  Typography,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Dashcard from "./Dashcard";
import LoanApplicationTable from "./Applications/applications";

const drawerWidth = 240;

// Styled components with modern, minimal gradients
const ModernAppBar = styled(AppBar)(({ theme }) => ({
  background: "linear-gradient(to right, #2c3e50, #3498db)",
  boxShadow: "none",
}));

const ModernDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    background: "#f5f7fa",
    color: "#2c3e50",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
  },
}));

const ModernListItem = styled(ListItem)(({ theme }) => ({
  margin: "8px 0",
  borderRadius: "4px",
  "&:hover": {
    background: "linear-gradient(to right, #e0e0e0, #f5f5f5)",
  },
}));

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
    <Box sx={{ padding: "20px" }}>
      <Typography
        variant="h6"
        sx={{ color: "#2c3e50", marginBottom: "20px", fontWeight: "bold" }}
      >
        Loan Admin
      </Typography>
      <List>
        <ListItemButton onClick={() => handleMenuClick(<Dashcard />)}>
          <DashboardIcon sx={{ marginRight: "10px", color: "#3498db" }} />
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          onClick={() => handleMenuClick(<LoanApplicationTable />)}
        >
          <AssignmentIcon sx={{ marginRight: "10px", color: "#3498db" }} />
          <ListItemText primary="Applications" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ModernAppBar
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
          <Typography variant="h6" noWrap component="div">
            Loan Application Admin
          </Typography>
        </Toolbar>
      </ModernAppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <ModernDrawer
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
        </ModernDrawer>
        <ModernDrawer
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
        </ModernDrawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#f9fafb",
        }}
      >
        <Toolbar />
        {selectedComponent}
      </Box>
    </Box>
  );
};

export default Dashboard;
