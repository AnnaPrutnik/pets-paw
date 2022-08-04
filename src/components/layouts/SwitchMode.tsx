import React from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { useThemeContext } from '../../config/themeContext';
import CustomSwitch from '../ui/CustomSwitch';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const SwitchMode = () => {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeContext();

  return (
    <Box>
      <IconButton
        onClick={toggleMode}
        disableRipple
        sx={{ padding: 0, marginRight: '5px' }}
      >
        {mode === 'light' ? (
          <LightModeIcon color='primary' />
        ) : (
          <DarkModeIcon color='inherit' />
        )}
      </IconButton>
      <CustomSwitch checked={mode === 'light'} onChange={toggleMode} />
    </Box>
  );
};

export default SwitchMode;
