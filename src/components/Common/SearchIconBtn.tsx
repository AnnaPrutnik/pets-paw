import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack, IconButton } from '@mui/material';
import IconFromSprite from './SvgIconSprite';
import { SelectedRoutes } from '../../types';
import { selectedPath } from '../../config/variables';

const StyledIconBtn = styled(IconButton)(({ theme }) => ({
  width: '60px',
  height: '60px',
  fill: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.bgColor.light,

  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },

  '&:active': {
    backgroundColor: theme.palette.primary.main,
    fill: theme.palette.common.white,
  },

  '&.active': {
    backgroundColor: theme.palette.primary.main,
    fill: theme.palette.common.white,
  },
}));

const SearchIconBtn = () => {
  const [active, setActive] = useState<SelectedRoutes | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const current = location.pathname.slice(1);

    const result = selectedPath.reduce((acc: SelectedRoutes | null, path) => {
      if (current === path) {
        acc = path;
      }
      return acc;
    }, null);
    setActive(result);
  }, [location]);

  const onClickIconBtn = (value: string) => {
    navigate(`/${value}`);
  };

  return (
    <Stack spacing='10px' direction='row'>
      {selectedPath.map((path) => (
        <StyledIconBtn
          key={path}
          disableRipple
          onClick={() => onClickIconBtn(path)}
          className={active === path ? 'active' : 'non-active'}
        >
          <IconFromSprite icon={path} />
        </StyledIconBtn>
      ))}

      {/* <StyledIconBtn disableRipple onClick={() => onClickIconBtn('favorite')}>
        <IconFromSprite icon='favorite' />
      </StyledIconBtn>
      <StyledIconBtn disableRipple onClick={() => onClickIconBtn('dislike')}>
        <IconFromSprite icon='dislike' />
      </StyledIconBtn> */}
    </Stack>
  );
};

export default SearchIconBtn;
