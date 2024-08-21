import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { updateCoBorrowerDetails } from '../../../app/LoanAppliation/FormSlice';

interface CoBorrowerDetailsProps {
  nextStep: () => void;
  prevStep: () => void;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green color
    },
    secondary: {
      main: '#81C784', // Light green color
    },
    background: {
      default: '#E8F5E9', // Very light green for background
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#4CAF50',
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#4CAF50',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

const CoBorrowerDetails: React.FC<CoBorrowerDetailsProps> = ({ nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const coBorrower = useSelector((state: RootState) => ({
    coBorrowerName: state.form.coBorrowerName,
    coBorrowerRelation: state.form.coBorrowerRelation,
    coBorrowerDob: state.form.coBorrowerDob,
    coBorrowerIncome: state.form.coBorrowerIncome,
    coBorrowerPhone: state.form.coBorrowerPhone,
  }));

  const [errors, setErrors] = useState<any>({
    coBorrowerName: false,
    coBorrowerRelation: false,
    coBorrowerDob: false,
    coBorrowerIncome: false,
    coBorrowerPhone: false,
  });

  const validateForm = () => {
    const newErrors = {
      coBorrowerName: coBorrower.coBorrowerName.trim() === '',
      coBorrowerRelation: coBorrower.coBorrowerRelation.trim() === '',
      coBorrowerDob: coBorrower.coBorrowerDob.trim() === '',
      coBorrowerIncome: coBorrower.coBorrowerIncome.trim() === '' || parseFloat(coBorrower.coBorrowerIncome) <= 0,
      coBorrowerPhone: coBorrower.coBorrowerPhone.trim() === '' || !/^\d{10}$/.test(coBorrower.coBorrowerPhone),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleChange = (field: keyof typeof coBorrower) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateCoBorrowerDetails({ [field]: e.target.value }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Paper elevation={3} sx={{ maxWidth: 800, margin: 'auto', p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight="bold">
            Co-borrower Details
          </Typography>
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={coBorrower.coBorrowerName}
                  onChange={handleChange('coBorrowerName')}
                  error={errors.coBorrowerName}
                  helperText={errors.coBorrowerName ? 'Name is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Relation"
                  value={coBorrower.coBorrowerRelation}
                  onChange={handleChange('coBorrowerRelation')}
                  error={errors.coBorrowerRelation}
                  helperText={errors.coBorrowerRelation ? 'Relation is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={coBorrower.coBorrowerDob}
                  onChange={handleChange('coBorrowerDob')}
                  error={errors.coBorrowerDob}
                  helperText={errors.coBorrowerDob ? 'Date of Birth is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Annual Income"
                  type="number"
                  value={coBorrower.coBorrowerIncome}
                  onChange={handleChange('coBorrowerIncome')}
                  error={errors.coBorrowerIncome}
                  helperText={errors.coBorrowerIncome ? 'Annual Income must be greater than 0' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={coBorrower.coBorrowerPhone}
                  onChange={handleChange('coBorrowerPhone')}
                  error={errors.coBorrowerPhone}
                  helperText={errors.coBorrowerPhone ? 'Phone Number must be 10 digits' : ''}
                />
              </Grid>
            </Grid>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={prevStep}
                size="large"
              >
                Back
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit}
                size="large"
              >
                Next
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default CoBorrowerDetails;