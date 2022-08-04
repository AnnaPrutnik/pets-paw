import React from 'react';
import { Typography, Button } from '@mui/material';

interface UploadModalDragClickTextProps {
  onUploadBtn: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadModalDragClickText = ({
  onUploadBtn,
}: UploadModalDragClickTextProps) => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      component='p'
      sx={{
        position: 'absolute',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Typography
        variant='body2'
        color='text.primary'
        mr='5px'
        sx={{ fontWeight: 500 }}
      >
        Drag here
      </Typography>
      your file or
      <Button
        sx={{
          textTransform: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          letterSpacing: 'inherit',
          padding: '0',
          margin: '0 5px',
          color: 'text.primary',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        disableRipple
        component='label'
      >
        Click here
        <input
          hidden
          accept='image/*'
          multiple
          type='file'
          onChange={onUploadBtn}
        />
      </Button>
      to upload
    </Typography>
  );
};

export default UploadModalDragClickText;
