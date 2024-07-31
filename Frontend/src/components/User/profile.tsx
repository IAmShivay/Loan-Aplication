import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Tabs, Tab, Avatar, IconButton, styled, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const GreenTabs = styled(Tabs)(({ theme }) => ({
  width: '100%',
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  '& .MuiTab-root': {
    color: theme.palette.success.main,
  },
  '& .Mui-selected': {
    color: theme.palette.success.dark,
  },
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.success.main,
  },
}));

interface FormData {
  firstName: string;
  lastName: string;
  password: string;
  mobile: string;
}

const ProfileComponent: React.FC = () => {
  const [tab, setTab] = useState<'view' | 'edit'>('view');
  const [formData, setFormData] = useState<FormData>({
    firstName: 'John',
    lastName: 'Doe',
    password: '',
    mobile: '1234567890',
  });
  const [profilePic, setProfilePic] = useState<string | ArrayBuffer | null>(null);
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: 'view' | 'edit') => {
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
    <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh', py: 4 }}>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg width="300" height="300" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="200" fill="#E8F5E9"/>
          <circle cx="200" cy="160" r="60" fill={theme.palette.success.main}/>
          <path d="M200 240C144.772 240 100 284.772 100 340H300C300 284.772 255.228 240 200 240Z" fill={theme.palette.success.main}/>
          <rect x="140" y="140" width="120" height="160" rx="20" stroke={theme.palette.success.dark} strokeWidth="8"/>
          <line x1="170" y1="180" x2="230" y2="180" stroke={theme.palette.success.dark} strokeWidth="8" strokeLinecap="round"/>
          <line x1="170" y1="220" x2="230" y2="220" stroke={theme.palette.success.dark} strokeWidth="8" strokeLinecap="round"/>
          <line x1="170" y1="260" x2="230" y2="260" stroke={theme.palette.success.dark} strokeWidth="8" strokeLinecap="round"/>
        </svg>
      </Box>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={3}
        sx={{
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          bgcolor: theme.palette.background.paper,
          maxHeight: '600px',
          overflowY: 'auto',
        }}
      >
        <GreenTabs value={tab} onChange={handleTabChange}>
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
          width="100%"
        >
          <Box sx={{ position: 'relative', '&:hover .camera-icon': { opacity: 1 } }}>
            <Avatar
              src={profilePic as string}
              sx={{ width: 120, height: 120, mb: 2, bgcolor: theme.palette.success.main }}
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
              <Typography variant="h6" sx={{ color: theme.palette.success.main, mb: 1 }}>
                {formData.firstName} {formData.lastName}
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.success.main, mb: 1 }}>
                Mobile: {formData.mobile}
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.success.main, mb: 2 }}>
                Password: ********
              </Typography>
              <IconButton
                color="primary"
                onClick={() => setTab('edit')}
                sx={{ color: theme.palette.success.main }}
              >
                <EditIcon />
              </IconButton>
            </Box>
          ) : (
            <Box width="100%">
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="firstName"
                value={formData.firstName}
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
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="lastName"
                value={formData.lastName}
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
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                name="password"
                value={formData.password}
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
                label="Mobile Number"
                type="tel"
                variant="outlined"
                fullWidth
                margin="normal"
                name="mobile"
                value={formData.mobile}
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{
                  mt: 2,
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.success.main} 30%, ${theme.palette.success.dark} 90%)`,
                  color: 'white',
                  '&:hover': {
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
    </Container>
  );
};

export default ProfileComponent;
