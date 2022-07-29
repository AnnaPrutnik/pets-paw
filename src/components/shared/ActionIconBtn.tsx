import React from 'react';
import IconFromSprite from '../ui/SvgIconSprite';
import StyledIconBtn from '../ui/StyledIconBtn';

interface ActionIconProps {
  isWhite?: boolean;
  icon: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
}

const ActionIconButton = ({
  isWhite = false,
  icon,
  type,
  onClick,
}: ActionIconProps) => {
  return (
    <StyledIconBtn
      className={isWhite ? 'white' : 'color'}
      aria-label={`${icon} icon-button`}
      type={type ? type : 'button'}
      onClick={onClick}
    >
      <IconFromSprite icon={icon} width='20px' height='20px' />
    </StyledIconBtn>
  );
};

export default ActionIconButton;
