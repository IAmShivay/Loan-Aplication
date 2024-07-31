import React, { useState } from 'react';
import axios from 'axios';
import { 
  Box, TextField, Button, Typography, Container, styled, useTheme, CircularProgress, Paper, Snackbar, Alert 
} from '@mui/material';

// Styled components
const GreenButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.success.main} 30%, ${theme.palette.success.dark} 90%)`,
  color: 'white',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.success.dark} 30%, ${theme.palette.success.main} 90%)`,
  },
}));

const BackgroundSVG = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.3,
    zIndex: -1,
    background: `url('https://plus.unsplash.com/premium_photo-1681487850722-f686554f95c1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',  // Ensure that background image stays fixed
  }));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 500,
  margin: 'auto',
  backgroundColor: '#ffffff',
  borderRadius: 16,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  zIndex: 1,
}));

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const ScoreDisplay = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: 12,
  backgroundColor: '#f0f8f1',
}));

const CreditScoreComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    ssn: '',
    dob: '',
  });
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckCreditScore = async () => {
    setLoading(true);
    setError(null);
    setCreditScore(null);
    
    try {
      const response = await axios.post('https://api.experian.com/credit-scores/v1/score', formData, {
        headers: {
          'Authorization': `Bearer YOUR_API_KEY`, // Replace with your actual API key
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.score) {
        setCreditScore(response.data.score);
      } else {
        setError('Unable to fetch credit score. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while fetching the credit score.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, position: 'relative' }}>
      <BackgroundSVG />
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: theme.palette.success.main, fontWeight: 'bold', mb: 3 }}>
          Check Your Credit Score
        </Typography>
        <Form onSubmit={(e) => { e.preventDefault(); handleCheckCreditScore(); }}>
          <TextField
            label="Social Security Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="ssn"
            value={formData.ssn}
            onChange={handleChange}
            sx={{ 
              '& .MuiInputLabel-root': { color: theme.palette.success.main }, 
              '& .MuiInputBase-root': { color: theme.palette.success.main },
              '& .MuiOutlinedInput-root': { 
                '& fieldset': { borderColor: theme.palette.success.main }, 
                '&:hover fieldset': { borderColor: theme.palette.success.main },
              }
            }}
          />
          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ 
              '& .MuiInputLabel-root': { color: theme.palette.success.main }, 
              '& .MuiInputBase-root': { color: theme.palette.success.main },
              '& .MuiOutlinedInput-root': { 
                '& fieldset': { borderColor: theme.palette.success.main }, 
                '&:hover fieldset': { borderColor: theme.palette.success.main },
              }
            }}
          />
          <GreenButton
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Check Credit Score'}
          </GreenButton>
          {error && (
            <Typography variant="body1" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {creditScore !== null && (
            <ScoreDisplay>
              <Typography variant="h6" gutterBottom sx={{ color: theme.palette.success.dark }}>
                Your Credit Score:
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: creditScore >= 750 ? '#4caf50' : 
                          creditScore >= 700 ? '#8bc34a' : 
                          creditScore >= 650 ? '#ffc107' : 
                          creditScore >= 600 ? '#ff9800' : '#f44336',
                  my: 2,
                }}
              >
                {creditScore}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {creditScore >= 750 ? 'Excellent' : 
                 creditScore >= 700 ? 'Good' :
                 creditScore >= 650 ? 'Fair' :
                 creditScore >= 600 ? 'Poor' : 'Very Poor'}
              </Typography>
            </ScoreDisplay>
          )}
        </Form>
      </StyledPaper>
      <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={() => setShowSnackbar(false)}>
        <Alert onClose={() => setShowSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreditScoreComponent;
