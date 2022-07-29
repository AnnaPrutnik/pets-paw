import React from 'react';
import StyledNavigationBtn from '../ui/StyledNavigationBtn';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface NavigationBtnProps {
  title: string;
  direction: 'left' | 'right';
  disabled?: boolean;
  onClick: () => void;
}

const NavigationBtn = ({
  title,
  direction,
  disabled = false,
  onClick,
}: NavigationBtnProps) => {
  return (
    <StyledNavigationBtn
      variant='contained'
      startIcon={direction === 'left' && <KeyboardArrowLeftIcon />}
      endIcon={direction === 'right' && <KeyboardArrowRightIcon />}
      disableElevation
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </StyledNavigationBtn>
  );
};

export default NavigationBtn;
