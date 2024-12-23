import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleNavigationChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/create-character');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleNavigationChange}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent', // Set background to transparent
      }}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Add Character" icon={<AddCircleIcon />} />
    </BottomNavigation>
  );
};

export default Navigation;