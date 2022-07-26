import React from 'react';
import { Box } from '@mui/material';
import { RotatingLines } from 'react-loader-spinner';
import { red } from '@mui/material/colors';

const Loading = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        color: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}
    >
      <RotatingLines
        strokeColor={red[200]}
        strokeWidth='5'
        animationDuration='0.75'
        width='96'
        visible={true}
      />
    </Box>
  );
};

export default Loading;
