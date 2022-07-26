import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface ActiveBtnProps {
  title: string;
  direction: 'left' | 'right';
  disabled?: boolean;
  onClick: () => void;
}

const StyledBtn = styled(Button)(({ theme }) => ({
  height: '40px',
  width: '122px',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  borderRadius: '10px',

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },

  '&:disabled': {
    backgroundColor: theme.bgColor,
    color: theme.palette.text.secondary,
  },
}));

const ActiveBtn = ({
  title,
  direction,
  disabled = false,
  onClick,
}: ActiveBtnProps) => {
  return (
    <StyledBtn
      variant='contained'
      startIcon={direction === 'left' && <KeyboardArrowLeftIcon />}
      endIcon={direction === 'right' && <KeyboardArrowRightIcon />}
      disableElevation
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </StyledBtn>
  );
};

export default ActiveBtn;
