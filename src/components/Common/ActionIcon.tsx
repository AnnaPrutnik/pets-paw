import React from 'react';
import IconFromSprite from './SvgIconSprite';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ActionIconProps {
  isWhite?: boolean;
  icon: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  handlerClick?: () => void;
}

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  minWidth: '40px',
  height: '40px',
  padding: 0,
  borderRadius: '10px',
  fill: theme.palette.primary.main,

  '&.white': {
    backgroundColor:
      theme.palette.mode === 'light' ? theme.bgColor.light : theme.bgColor.dark,
  },
  '&.color': {
    backgroundColor: theme.palette.primary.light,
  },

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    fill: '#fff',
  },
}));

const ActionIconButton = ({
  isWhite = false,
  icon,
  type,
  handlerClick,
}: ActionIconProps) => {
  return (
    <StyledButton
      className={isWhite ? 'white' : 'color'}
      aria-label={`${icon} icon-button`}
      type={type ? type : 'button'}
      onClick={handlerClick}
    >
      <IconFromSprite icon={icon} width='20px' height='20px' />
    </StyledButton>
  );
};

export default ActionIconButton;
