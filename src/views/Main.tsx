import React, { useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Grid, Box, Typography, Stack } from '@mui/material';
import Logo from '../images/home/logo.png';
import MainMenu from '../components/Main/MainMenu';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { list } from '../redux/breeds/breed-operations';
import { favorites } from '../redux/favorites/favorites-operations';
import { votes } from '../redux/votes/votes-operations';
import { AppDispatch } from '../redux/store';

const StyledGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: theme.bgColor,
}));

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();

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
          <Box aria-label='logo' sx={{ marginBottom: '75px' }}>
            <NavLink to='/'>
              <Box component='img' src={Logo} alt='Logo' />
            </NavLink>
          </Box>
          <Typography
            component='h2'
            variant='h3'
            color='text.primary'
            mb='10px'
          >
            Hi intern!
          </Typography>
          <Typography
            component='p'
            variant='body2'
            color='text.secondary'
            mb='60px'
          >
            Welcome to MI 2022 Front-end test
          </Typography>
          <Typography
            component='p'
            variant='body2'
            color='text.primary'
            sx={{ fontWeight: 500 }}
            mb='20px'
          >
            Lets start using The Cat API
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
