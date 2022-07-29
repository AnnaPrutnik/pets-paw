import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import ActionIconButton from './ActionIconBtn';
import StyledTitle from '../ui/StyledTitle';
import { Routers } from '../../types';

interface SectionTitleProps {
  title: Routers;
  isLight?: boolean;
}

const SectionTitle = ({ title, isLight = false }: SectionTitleProps) => {
  const navigate = useNavigate();

  return (
    <Stack direction='row' spacing='10px'>
      <ActionIconButton
        isWhite={false}
        icon='back'
        onClick={() => navigate(-1)}
      />
      <StyledTitle className={isLight ? 'light' : 'color'} variant='h6'>
        {title}
      </StyledTitle>
    </Stack>
  );
};

export default SectionTitle;
