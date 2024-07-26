import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Tabs, Tab, Avatar, IconButton, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

// Styled Tabs component to ensure green colors are applied correctly
const GreenTabs = styled(Tabs)(({ theme }) => ({
  width: '100%',
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  '& .MuiTab-root': {
    color: '#2e7d32', // Green color for tab text
  },
  '& .Mui-selected': {
    color: '#1b5e20', // Darker green for selected tab text
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#4caf50', // Green indicator color
  },
}));

const ProfileComponent: React.FC = () => {
  const [tab, setTab] = useState('view'); // 'view' or 'edit'
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    password: '',
    mobile: '1234567890',
  });
  const [profilePic, setProfilePic] = useState<string | ArrayBuffer | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Saved data:', formData);
    setTab('view');
  };

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={3}
        mt={5}
        sx={{
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          bgcolor: 'background.paper',
        }}
      >
        <GreenTabs
          value={tab}
          onChange={handleTabChange}
        >
          <Tab label="View Profile" value="view" />
          <Tab label="Edit Profile" value="edit" />
        </GreenTabs>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={2}
          position="relative"
        >
          <Box
            sx={{
              position: 'relative',
              '&:hover .camera-icon': {
                opacity: 1, // Show the camera icon on hover
              },
            }}
          >
            <Avatar
              src={profilePic as string}
              sx={{ width: 120, height: 120, mb: 2, bgcolor: '#4caf50' }}
            >
              {formData.firstName.charAt(0)}
            </Avatar>
            <input
              accept="image/*"
              id="profile-pic-input"
              type="file"
              style={{ display: 'none' }}
              onChange={handleProfilePicChange}
            />
            <label htmlFor="profile-pic-input" className="camera-icon" style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              transform: 'translate(50%, 50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.6)',
              opacity: 0,
              transition: 'opacity 0.3s',
            }}>
              <IconButton color="primary" component="span">
                <CameraAltIcon sx={{ color: '#ffffff' }} />
              </IconButton>
            </label>
          </Box>
          {tab === 'view' ? (
            <Box>
              <Typography variant="h6" sx={{ color: '#2e7d32', mb: 1 }}>
                {formData.firstName} {formData.lastName}
              </Typography>
              <Typography variant="body1" sx={{ color: '#2e7d32', mb: 1 }}>
                Mobile: {formData.mobile}
              </Typography>
              <Typography variant="body1" sx={{ color: '#2e7d32', mb: 2 }}>
                Password: ********
              </Typography>
              <IconButton
                color="primary"
                onClick={() => setTab('edit')}
                sx={{
                  color: '#2e7d32',
                }}
              >
                <EditIcon />
              </IconButton>
            </Box>
          ) : (
            <Box width="100%">
              <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <input
                  accept="image/*"
                  id="profile-pic-input"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleProfilePicChange}
                />
                <label htmlFor="profile-pic-input">
                  <IconButton color="primary" component="span">
                    <CameraAltIcon sx={{ color: '#4caf50' }} />
                  </IconButton>
                </label>
              </Box>

              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                sx={{ 
                  '& .MuiInputLabel-root': { color: '#2e7d32' }, 
                  '& .MuiInputBase-root': { color: '#2e7d32' },
                  '& .MuiOutlinedInput-root': { 
                    '& fieldset': { borderColor: '#2e7d32' }, 
                    '&:hover fieldset': { borderColor: '#2e7d32' },
                  }
                }}
              />

              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                sx={{ 
                  '& .MuiInputLabel-root': { color: '#2e7d32' }, 
                  '& .MuiInputBase-root': { color: '#2e7d32' },
                  '& .MuiOutlinedInput-root': { 
                    '& fieldset': { borderColor: '#2e7d32' }, 
                    '&:hover fieldset': { borderColor: '#2e7d32' },
                  }
                }}
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                name="password"
                value={formData.password}
                onChange={handleChange}
                sx={{ 
                  '& .MuiInputLabel-root': { color: '#2e7d32' }, 
                  '& .MuiInputBase-root': { color: '#2e7d32' },
                  '& .MuiOutlinedInput-root': { 
                    '& fieldset': { borderColor: '#2e7d32' }, 
                    '&:hover fieldset': { borderColor: '#2e7d32' },
                  }
                }}
              />

              <TextField
                label="Mobile Number"
                type="tel"
                variant="outlined"
                fullWidth
                margin="normal"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                sx={{ 
                  '& .MuiInputLabel-root': { color: '#2e7d32' }, 
                  '& .MuiInputBase-root': { color: '#2e7d32' },
                  '& .MuiOutlinedInput-root': { 
                    '& fieldset': { borderColor: '#2e7d32' }, 
                    '&:hover fieldset': { borderColor: '#2e7d32' },
                  }
                }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{
                  mt: 2,
                  background: 'linear-gradient(45deg, #4caf50 30%, #2e7d32 90%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)',
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
    </Container>
  );
};

export default ProfileComponent;