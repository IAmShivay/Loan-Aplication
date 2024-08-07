import { useState } from "react";
import { Dialog, DialogContent, Button, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
      contrastText: "#ffffff",
    },
    background: {
      paper: "#ffffff",
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 24px",
        },
      },
    },
  },
});

const SessionExpiredPopup = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("warning", "true");
    window.location.href = "/";
  };
  const handleLogin = () => {
    setOpen(false);
    sessionStorage.setItem("warning", "true");
    window.location.href = "/user/login";
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogContent sx={{ p: 4, textAlign: "center" }}>
          <ErrorOutlineIcon sx={{ fontSize: 64, color: "orange", mb: 2 }} />
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            gutterBottom
          >
            Session Expired
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Your session has expired. Please log in again to continue using the
            app.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              onClick={handleLogin}
              color="primary"
              variant="contained"
              fullWidth
            >
              Log In
            </Button>
            <Button
              onClick={handleClose}
              color="primary"
              variant="outlined"
              fullWidth
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default SessionExpiredPopup;
