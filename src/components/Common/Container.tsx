import React from 'react';
import { Container } from '@mui/material';

const CustomContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <Container
      sx={{
        padding: '30px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </Container>
  );
};

export default CustomContainer;
