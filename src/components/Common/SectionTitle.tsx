import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routers } from '../../types';
import ActionIconButton from './ActionIcon';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SectionTitleProps {
  title: Routers;
  isLight?: boolean;
}

export const StyledTypography = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  letterSpacing: '2px',
  lineHeight: 1.5,
  borderRadius: '10px',
  padding: '5px 30px',

  '&.color': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },

  '&.light': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
}));

const SectionTitle = ({ title, isLight = false }: SectionTitleProps) => {
  const navigate = useNavigate();

  return (
    <Stack direction='row' spacing='10px'>
      <ActionIconButton
        isWhite={false}
        icon='back'
        handlerClick={() => navigate(-1)}
      />
      <StyledTypography className={isLight ? 'light' : 'color'} variant='h6'>
        {title}
      </StyledTypography>
    </Stack>
  );
};

export default SectionTitle;
