import React from 'react';
import StyledVotesIconBtn from '../ui/StyledVotesIconBtn';
import IconFromSprite from '../ui/SvgIconSprite';

interface MobileMenuProps {
  onOpenMenu: () => void;
}

const MobileMenu = ({ onOpenMenu }: MobileMenuProps) => {
  return (
    <StyledVotesIconBtn onClick={onOpenMenu}>
      <IconFromSprite icon='menu' />
    </StyledVotesIconBtn>
  );
};

export default MobileMenu;
