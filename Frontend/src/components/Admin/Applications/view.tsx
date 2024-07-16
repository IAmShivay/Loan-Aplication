import React from "react";
import { Modal, Box, Typography, IconButton, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoanApplication } from "./applications";

interface ApplicationDetailsProps {
  open: boolean;
  onClose: () => void;
  application: LoanApplication | null;
}

const ApplicationDetailsModal: React.FC<ApplicationDetailsProps> = ({
  open,
  onClose,
  application,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!application) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: fullScreen ? "100%" : 400,
          maxWidth: "90%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflowY: "auto", // Enable scrolling if content exceeds modal height
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2">
          Application Details
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Name:</strong> {application.name}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Id:</strong> {application.id}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Status:</strong> {application.status}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Comment:</strong> {application.comment}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ApplicationDetailsModal;
