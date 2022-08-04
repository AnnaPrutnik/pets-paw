import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainMenuScreen from '../components/screens/MainMenuScreen';

const StyledGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
}));

const Main = () => {
  return (
    <StyledGrid container>
      <Grid
        item
        mini={12}
        desktop={5.7}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: ' center',
        }}
      >
        <MainMenuScreen />
      </Grid>
      <Grid item mini={0} desktop={6.3}>
        <Stack sx={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
          <Outlet />
        </Stack>
      </Grid>
    </StyledGrid>
  );
};

export default Main;
