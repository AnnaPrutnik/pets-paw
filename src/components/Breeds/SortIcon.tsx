import React from 'react';
import IconFromSprite from '../Common/SvgIconSprite';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SortIconProps {
  icon: string;
  handlerClick?: () => void;
}

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  minWidth: '40px',
  maxHeight: '40px',
  padding: 0,
  borderRadius: '10px',
  fill: theme.palette.text.secondary,
  backgroundColor: theme.bgColor,
  border: `2px solid transparent`,

  '&:hover': {
    fill: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.light}`,
  },
}));

const SortIcon = ({ icon, handlerClick }: SortIconProps) => {
  return (
    <StyledButton aria-label={`${icon} icon-button`} onClick={handlerClick}>
      <IconFromSprite icon={icon} width='20px' height='20px' />
    </StyledButton>
  );
};

export default SortIcon;
