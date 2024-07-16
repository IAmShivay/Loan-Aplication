// src/components/Header.js
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
interface HeaderProps {
  onMenuClick: () => void; // or any specific function signature if it takes arguments
}
const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
