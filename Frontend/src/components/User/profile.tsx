import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Tabs,
  Tab,
  Avatar,
  IconButton,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useSelector } from "react-redux";
const GreenTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  "& .MuiTab-root": {
    color: theme.palette.success.main,
    fontSize: "0.9rem",
  },
  "& .Mui-selected": {
    color: theme.palette.success.dark,
  },
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.success.main,
  },
}));

const GreenTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: theme.palette.success.main,
  },
  "& .MuiInputBase-root": {
    color: theme.palette.success.main,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.success.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.success.dark,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.success.dark,
    },
  },
}));

interface FormData {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

const ProfileComponent: React.FC = () => {
  const { user } = useSelector((state: any) => state.verify);
  const [tab, setTab] = useState<"view" | "edit">("view");
  const [formData, setFormData] = useState<FormData>({
    firstName: user.firstName,
    lastName: user.lastName,
    password: "",
    email: user.email,
  });
  console.log(user)
  const [profilePic, setProfilePic] = useState<string | ArrayBuffer | null>(
    null
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {}, [formData]);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: "view" | "edit"
  ) => {
    setTab(newValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved data:", {
      ...formData,
      profilePic: profilePic ? "Image data present" : "No image",
    });
    setTab("view");
  };

  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        console.log("Profile picture updated");
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          bgcolor: theme.palette.background.paper,
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: isMobile ? "150px" : "200px",
            backgroundColor: theme.palette.success.light,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: isMobile ? "-50px" : "-60px",
              left: "50%",
              transform: "translateX(-50%)",
              "&:hover .camera-button": {
                opacity: 0.6,
              },
            }}
          >
            <Avatar
              src={profilePic as string}
              sx={{
                width: isMobile ? 100 : 120,
                height: isMobile ? 100 : 120,
                border: `4px solid ${theme.palette.background.paper}`,
                bgcolor: theme.palette.success.main,
                fontSize: isMobile ? "2rem" : "2.5rem",
              }}
            >
              {formData.firstName}
            </Avatar>
            <input
              accept="image/*"
              id="profile-pic-input"
              type="file"
              style={{ display: "none" }}
              onChange={handleProfilePicChange}
            />
            <label htmlFor="profile-pic-input">
              <IconButton
                color="primary"
                component="span"
                className="camera-button"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "#ffffff",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                }}
              >
                <CameraAltIcon />
              </IconButton>
            </label>
          </Box>
        </Box>

        <Box sx={{ width: "100%", mt: isMobile ? 8 : 10, px: 2 }}>
          <GreenTabs value={tab} onChange={handleTabChange} variant="fullWidth">
            <Tab label="View Profile" value="view" />
            <Tab label="Edit Profile" value="edit" />
          </GreenTabs>

          <Box sx={{ p: 3 }}>
            {tab === "view" ? (
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.success.main,
                    mb: 2,
                    textAlign: "center",
                  }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.success.main, mb: 1 }}
                >
                  email: {formData.email}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.success.main, mb: 2 }}
                >
                  Password: ********
                </Typography>
                <Button
                  startIcon={<EditIcon />}
                  variant="outlined"
                  onClick={() => setTab("edit")}
                  fullWidth
                  sx={{
                    color: theme.palette.success.main,
                    borderColor: theme.palette.success.main,
                    "&:hover": {
                      borderColor: theme.palette.success.dark,
                      backgroundColor: theme.palette.success.light,
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
            ) : (
              <Box>
                <GreenTextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <GreenTextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <GreenTextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <GreenTextField
                  label="Email"
                  type="tel"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    mt: 2,
                    width: "100%",
                    background: `linear-gradient(45deg, ${theme.palette.success.main} 30%, ${theme.palette.success.dark} 90%)`,
                    color: "white",
                    "&:hover": {
                      background: `linear-gradient(45deg, ${theme.palette.success.dark} 30%, ${theme.palette.success.main} 90%)`,
                    },
                  }}
                  endIcon={<SaveIcon />}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileComponent;
