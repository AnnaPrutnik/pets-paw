import React from 'react';
import { Paper } from '@mui/material';

const CustomSection = ({ children }: React.PropsWithChildren) => {
  return (
    <Paper
      elevation={0}
      sx={{
        flexGrow: 1,
        padding: '20px',
        backgroundColor: (theme) => theme.bgColor.light,
      }}
    >
      {children}
    </Paper>
  );
};

export default CustomSection;
