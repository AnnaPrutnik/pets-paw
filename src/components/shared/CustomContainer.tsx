import React from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  [theme.breakpoints.down('tablet')]: {
    padding: '20px',
  },
  [theme.breakpoints.up('tablet')]: {
    padding: '30px',
  },
}));

const CustomContainer = ({ children }: React.PropsWithChildren) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default CustomContainer;
