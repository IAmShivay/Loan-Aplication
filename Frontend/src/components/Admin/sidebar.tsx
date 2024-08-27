import React, { useState } from "react";
import {
  AppBar,
  Drawer,
  List,
  ListItemText,
  Box,
  styled,
  ListItemButton,
  IconButton,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ChatIcon from "@mui/icons-material/Chat";
import MenuIcon from "@mui/icons-material/Menu";
import LoanApplicationTable from "./Applications/applications";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import LoanAnalytics from "../Section/LoanAnalytics/loanAnalytics";
import MyResponses from "../Section/LoanAnalytics/main";
import CallsRequested from "./CallRequests";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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

const ProfileBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: "auto",
}));

const ProfileAvatar = styled(Avatar)(() => ({
  width: 60,
  height: 60,
  marginBottom: "8px",
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

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [selectedComponent, setSelectedComponent] =
    useState<JSX.Element | null>(<LoanAnalytics />);
  const {user} = useSelector(
    (state: any) => state.verify
  );
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleMenuClick = (component: JSX.Element, itemName: string) => {
    setSelectedComponent(component);
    setSelectedItem(itemName);
    if (isMobile) {
      handleDrawerClose();
    }
  };

  const handleVisitSite = () => {
    window.open("https://studynpay.com", "_blank"); // Replace with your site URL
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add your logout logic here
  };

  const handleEditProfile = () => {
    navigate("/app/v1/user/profile");
    // Add your edit profile logic here
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      component: <LoanAnalytics />,
      color: "#4CAF50",
    },
    {
      name: "Applications",
      icon: <AssignmentIcon />,
      component: <LoanApplicationTable />,
      color: "#2196F3",
    },
    {
      name: "My Responses",
      icon: <AccountBalanceIcon />,
      component: <MyResponses />,
      color: "#FF9800",
    },
    {
      name: "Calls Requested",
      icon: <ChatIcon />,
      component: <CallsRequested />,
      color: "#E91E63",
    },
  ];

  const drawer = (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#E9F5EA",
      }}
    >
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
            <Box
              component="span"
              sx={{ color: item.color, marginRight: "16px" }}
            >
              {item.icon}
            </Box>
            <ListItemText primary={item.name} />
          </ColorfulListItemButton>
        ))}
      </List>
      <Profile
        name={`${user.firstName} ${user.lastName}`}
        email={user.email}
        avatarUrl={user.avatarUrl || "https://th.bing.com/th/id/OIP.QZFpakBNIoztU2ImGbkgHwHaLH?rs=1&pid=ImgDetMain"} 
      />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <ModernAppBar
        sx={{
          backgroundColor: "#E9F5EA",
          borderBottom: "1px solid #B0BEC5",
          justifyItems: "center",
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginRight: "20px", backgroundColor: "#E9F5EA" }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, height: "10vh" }}
          ></Typography>
          <Button
            variant="contained"
            sx={{
              margin: 1,
              padding: "4px 8px", // Smaller padding
              fontSize: "0.70rem", // Smaller font size
              minWidth: "auto", // Remove default minWidth to allow the button to shrink
              backgroundColor: "#4CAF50", // Primary green
              color: "#FFFFFF",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#388E3C", // Darker green on hover
              },
            }}
            onClick={handleVisitSite}
          >
            Visit Site
          </Button>

          <Button
            variant="contained"
            sx={{
              margin: 1,
              padding: "4px 8px", // Smaller padding
              fontSize: "0.70rem", // Smaller font size
              minWidth: "auto", // Remove default minWidth to allow the button to shrink
              backgroundColor: "#009688", // Light green
              color: "#FFFFFF",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#4CAF50", // Medium green on hover
              },
            }}
            onClick={handleEditProfile}
          >
            Edit Profile
          </Button>

          <Button
            variant="contained"
            sx={{
              margin: 1,
              padding: "4px 8px", // Smaller padding
              fontSize: "0.70rem", // Smaller font size
              minWidth: "auto", // Remove default minWidth to allow the button to shrink
              backgroundColor: "#E53935", // Red for logout
              color: "#FFFFFF",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#C62828", // Darker red on hover
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </ModernAppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <ModernDrawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
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
          marginTop: theme.spacing(8), // Adjust for AppBar height
        }}
      >
        {selectedComponent}
      </Box>
    </Box>
  );
};

export default Dashboard;
