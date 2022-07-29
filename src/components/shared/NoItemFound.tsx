import React from 'react';
import { Box, Typography } from '@mui/material';

const NoItemFound = () => {
  return (
    <Box
      sx={{
        mt: '20px',
        height: '60px',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.bgColor.dark
            : theme.bgColor.light,
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
      }}
    >
      <Typography color='text.secondary'>No item found</Typography>
    </Box>
  );
};

export default NoItemFound;
