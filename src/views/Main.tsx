import React, { useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Stack,
  useTheme,
  IconButton,
} from '@mui/material';
import MainMenu from '../components/Main/MainMenu';
import Logo from '../images/home/logo.svg';
import PetsPawDark from '../images/home/PetsPaw.png';
import PetsPawLight from '../images/home/PetsPaw-white.png';
import CustomSwitch from '../components/Main/CustomSwitch';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { list } from '../redux/breeds/breed-operations';
import { favorites } from '../redux/favorites/favorites-operations';
import { votes } from '../redux/votes/votes-operations';
import { AppDispatch } from '../redux/store';
import { useThemeContext } from '../config/themeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const StyledGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: theme.bgColor.dark,
}));

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { mode, toggleMode } = useThemeContext();

  useEffect(() => {
    dispatch(list());
    dispatch(votes());
    dispatch(favorites());
  }, []);

  return (
    <StyledGrid container>
      <Grid
        item
        xs={5.7}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: ' center',
        }}
      >
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
          <Typography
            component='h2'
            variant='h3'
            color='text.primary'
            mb='10px'
          >
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
      </Grid>
      <Grid item xs={6.3}>
        <Stack sx={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
          <Outlet />
        </Stack>
      </Grid>
    </StyledGrid>
  );
};

export default Main;
