import React, { useState } from 'react';
import { Button } from '@mui/material';
import IconFromSprite from '../Common/SvgIconSprite';

interface UploadBtnProps {
  onOpenModal: () => void;
}

const UploadBtn = ({ onOpenModal }: UploadBtnProps) => {
  const onClickBtn = () => {
    onOpenModal();
  };

  return (
    <Button
      variant='contained'
      startIcon={<IconFromSprite icon='upload' width='16px' height='16px' />}
      disableElevation
      sx={{
        height: '40px',
        backgroundColor: 'primary.light',
        padding: '0 30px',
        color: 'primary.main',
        borderRadius: '10px',
        fill: (theme) => theme.palette.primary.main,
        '&:hover': {
          backgroundColor: 'primary.main',
          color: '#fff',
          fill: '#fff',
        },
        '& .MuiButton-startIcon': {
          marginRight: '10px',
          marginLeft: '-1px',
        },
      }}
      onClick={onClickBtn}
    >
      upload
    </Button>
  );
};

export default UploadBtn;
