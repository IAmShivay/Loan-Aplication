import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface RequestCallFormProps {
  name:string;
  email:string;
  phoneNumber:string;
  bank: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RequestCallFormData) => void;
}

interface RequestCallFormData {
  name: string;
  email: string;
  phoneNumber: string;
  preferredCallTime: string;
  reasonForCall: string;
  additionalNotes: string;
  bank: string;
}

const RequestCallForm: React.FC<RequestCallFormProps> = ({
  name,
  email,
  phoneNumber,
  open,
  onClose,
  onSubmit,
  bank,
}) => {
  const [formData, setFormData] = useState<RequestCallFormData>({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    preferredCallTime: "",
    reasonForCall: "",
    additionalNotes: "",
    bank:bank,
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit({ ...formData});
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Request a Call</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
          }}
        >
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            name="bank"
            label="Bank"
            value={formData.bank}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            // InputProps={{
            //   readOnly: true,
            // }}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            name="phoneNumber"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            name="preferredCallTime"
            label="Preferred Call Time"
            type="datetime-local"
            value={formData.preferredCallTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="outlined"
          />
          <TextField
            name="reasonForCall"
            label="Reason for Call"
            value={formData.reasonForCall}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            name="additionalNotes"
            label="Additional Notes"
            value={formData.additionalNotes}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="primary" variant="text">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestCallForm;