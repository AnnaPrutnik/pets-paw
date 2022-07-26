import React from 'react';
import { Box, Stack } from '@mui/material';
import BgImage from '../images/home/bg-image.png';
import { shape } from '@mui/system';

const Home = () => {
  return (
    <>
      <Box
        sx={{
          margin: '30px 48px',
          flexGrow: 1,
          borderRadius: shape.borderRadius,
          backgroundColor: 'primary.light',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          backgroundImage: `url(${BgImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right',
          zIndex: '2',
        }}
      />
    </>
  );
};

export default Home;
