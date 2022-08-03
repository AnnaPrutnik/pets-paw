import React from 'react';
import { Box } from '@mui/material';
import BgImage from '../assets/images/home/bg-image.png';

const Home = () => {
  return (
    <>
      <Box
        sx={{
          margin: '30px 48px',
          flexGrow: 1,
          borderRadius: '20px',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.primary.light
              : theme.bgColor.light,
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
          backgroundSize: 'contain',
          zIndex: '2',
        }}
      />
    </>
  );
};

export default Home;
