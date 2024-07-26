import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
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
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PersonIcon from "@mui/icons-material/Person";
import Dashcard from "./Dashcard";
import LoanApplicationTable from "./Applications/applications";

const drawerWidth = 240;

const ModernAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow: "none",
  color: theme.palette.text.primary,
}));

const ModernDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    background: "#ffffff",
    color: theme.palette.text.primary,
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.05)",
  },
}));

const ColorfulListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: "12px",
  margin: "8px 0",
  "&:hover": {
    background: "rgba(0, 0, 0, 0.04)",
  },
  "&.Mui-selected": {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      background: theme.palette.primary.dark,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.contrastText,
    },
  },
}));

const Dashboard: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element | null>(<Dashcard />);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleMenuClick = (component: JSX.Element, itemName: string) => {
    setSelectedComponent(component);
    setSelectedItem(itemName);
    handleDrawerClose();
  };

  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, component: <Dashcard />, color: "#4CAF50" },
    { name: "Applications", icon: <AssignmentIcon />, component: <LoanApplicationTable />, color: "#2196F3" },
    { name: "Loans", icon: <AccountBalanceIcon />, component: <div>Loans Component</div>, color: "#FF9800" },
    { name: "Customers", icon: <PersonIcon />, component: <div>Customers Component</div>, color: "#E91E63" },
  ];

  const drawer = (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h6" sx={{ color: "#2c3e50", marginBottom: "20px", fontWeight: "bold" }}>
        Loan Admin
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ColorfulListItemButton
            key={item.name}
            onClick={() => handleMenuClick(item.component, item.name)}
            selected={selectedItem === item.name}
            sx={{
              "&.Mui-selected": {
                background: `${item.color}22`,
                color: item.color,
                "&:hover": {
                  background: `${item.color}33`,
                },
              },
            }}
          >
            <Box component="span" sx={{ color: item.color, marginRight: "16px" }}>
              {item.icon}
            </Box>
            <ListItemText primary={item.name} />
          </ColorfulListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ModernAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </ModernDrawer>
        <ModernDrawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
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