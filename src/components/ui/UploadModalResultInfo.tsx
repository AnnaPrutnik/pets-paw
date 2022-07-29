import React from 'react';
import { Typography, Alert } from '@mui/material';
import IconFromSprite from './SvgIconSprite';

interface UploadModalResultInfoProps {
  result: 'success' | 'error';
}

const UploadModalResultInfo = ({ result }: UploadModalResultInfoProps) => {
  return (
    <Alert
      variant='outlined'
      severity={result}
      icon={<IconFromSprite icon={result} width='20px' height='20px' />}
      sx={{
        borderRadius: '10px',
        backgroundColor: (theme) => theme.bgColor.light,
        border: 'none',

        fill: result === 'success' ? '#97EAB9' : '#FF868E',
        display: 'flex',
        alignItems: 'center',
        height: '60px',
      }}
    >
      <Typography
        variant='subtitle2'
        component='span'
        sx={{ fontWeight: 400, color: 'text.secondary' }}
      >
        {result === 'success'
          ? 'Thanks for the Upload - Cat found!'
          : 'No Cat found - try a different one'}
      </Typography>
    </Alert>
  );
};

export default UploadModalResultInfo;
