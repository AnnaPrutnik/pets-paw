import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stack } from '@mui/material';
import IconFromSprite from '../ui/SvgIconSprite';
import StyledVotesIconBtn from '../ui/StyledVotesIconBtn';
import { SelectedRoutes } from '../../types';
import { selectedPath } from '../../utils/constants/variables';

const VotesIconBtn = () => {
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
        <StyledVotesIconBtn
          key={path}
          disableRipple
          onClick={() => onClickIconBtn(path)}
          className={active === path ? 'active' : 'non-active'}
        >
          <IconFromSprite icon={path} />
        </StyledVotesIconBtn>
      ))}
    </Stack>
  );
};

export default VotesIconBtn;
