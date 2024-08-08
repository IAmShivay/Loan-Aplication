
import { Typography, Avatar} from "@mui/material";

const ProfileBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: 'auto',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  marginBottom: '8px',
}));

interface ProfileProps {
  name: string;
  email: string;
  avatarUrl: string;
}

const Profile: React.FC<ProfileProps> = ({ name, email, avatarUrl }) => {
  return (
    <ProfileBox>
      <ProfileAvatar src={avatarUrl} />
      <Typography variant="body2" color="textPrimary">
        {name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {email}
      </Typography>
    </ProfileBox>
  );
};

import React, { useState } from "react";
import {
  AppBar,
  Drawer,
  List,
  ListItemText,
  Box,
  styled,
  ListItemButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ChatIcon from "@mui/icons-material/Chat";
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
    { name: "My Responses", icon: <AccountBalanceIcon />, component: <div>Loans Component</div>, color: "#FF9800" },
    { name: "Chat Now", icon: <ChatIcon />, component: <div>Customers Component</div>, color: "#E91E63" },
  ];

  const drawer = (
    <Box sx={{ padding: "20px", display: 'flex', flexDirection: 'column', height: '100%' }}>
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
      <Profile name="John Doe" email="john.doe@example.com" avatarUrl="https://via.placeholder.com/60" />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
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
        {selectedComponent}
      </Box>
    </Box>
  );
};

export default Dashboard;
