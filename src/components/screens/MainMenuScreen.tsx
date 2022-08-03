import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography, Stack, IconButton, useTheme } from '@mui/material';
import MainMenu from '../layouts/MainMenu';
import CustomSwitch from '../ui/CustomSwitch';
import Logo from '../../assets/images/home/logo.svg';
import PetsPawDark from '../../assets/images/home/PetsPaw.png';
import PetsPawLight from '../../assets/images/home/PetsPaw-white.png';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeContext } from '../../config/themeContext';

const MainMenuScreen = () => {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeContext();

  return (
    <Stack sx={{ paddingTop: '38px', position: 'fixed' }}>
      <Stack
        aria-label='logo'
        sx={{ marginBottom: '75px' }}
        direction='row'
        justifyContent='space-between'
      >
        <NavLink to='/' style={() => ({ textDecoration: 'none' })}>
          <Stack direction='row' spacing='8px' alignItems='center'>
            <Box component='img' src={Logo} alt='Logo' />
            <Box
              component='img'
              src={mode === 'light' ? PetsPawDark : PetsPawLight}
              alt='PetsPaw'
            />
          </Stack>
        </NavLink>
        <Box>
          <IconButton
            onClick={toggleMode}
            disableRipple
            sx={{ padding: 0, marginRight: '5px' }}
          >
            {theme.palette.mode === 'light' ? (
              <LightModeIcon color='primary' />
            ) : (
              <DarkModeIcon color='inherit' />
            )}
          </IconButton>
          <CustomSwitch checked={mode === 'light'} onChange={toggleMode} />
        </Box>
      </Stack>
      <Typography component='h2' variant='h3' color='text.primary' mb='10px'>
        Hi, my friend!
      </Typography>
      <Typography
        component='p'
        variant='body2'
        color='text.secondary'
        mb='60px'
      >
        Do you want to see the sweetest kitty?
      </Typography>
      <Typography
        component='p'
        variant='body2'
        color='text.primary'
        sx={{ fontWeight: 500 }}
        mb='20px'
      >
        Lets start!
      </Typography>
      <MainMenu />
    </Stack>
  );
};

export default MainMenuScreen;
