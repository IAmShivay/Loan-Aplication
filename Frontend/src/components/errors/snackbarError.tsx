// src/components/Snackbar.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar as MUISnackbar, Alert } from "@mui/material";
import { selectSnackbar, hideSnackbar } from "../../app/errors/errorSlice";

const Snackbar: React.FC = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(selectSnackbar);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideSnackbar());
  };

  return (
    <MUISnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MUISnackbar>
  );
};

export default Snackbar;