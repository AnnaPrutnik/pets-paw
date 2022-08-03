import React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { SelectedRoutes } from '../../types';
import IconFromSprite from './SvgIconSprite';

interface StyledActionBtnProps {
  title: SelectedRoutes;
  onClickFn: () => void;
  icon: string;
}

interface StyledBtnProps {
  title: SelectedRoutes;
}

const StyledIconBtn = styled(IconButton)<StyledBtnProps>(({ theme, title }) => {
  return {
    width: '80px',
    height: '80px',
    fill: theme.palette.common.white,
    backgroundColor: theme.voting.default[title],
    borderRadius: 0,

    '&:hover': {
      backgroundColor: theme.voting.hover[title],
      fill: theme.voting.default[title],
    },
    '&:active': {
      fill: theme.voting.default[title],
    },
  };
});

const StyledActionBtn = ({ title, onClickFn, icon }: StyledActionBtnProps) => {
  return (
    <StyledIconBtn
      disableRipple
      disableFocusRipple
      aria-label={title}
      title={title}
      onClick={onClickFn}
    >
      <IconFromSprite icon={icon} />
    </StyledIconBtn>
  );
};

export default StyledActionBtn;
