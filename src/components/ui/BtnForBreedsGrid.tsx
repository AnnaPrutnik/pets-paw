import React from 'react';
import { Button } from '@mui/material';

interface BtnForBreedsGridProp<T> {
  item: T;
}

const BtnForBreedsGrid = <
  T extends { id: string; breeds: K[] },
  K extends { id: string; name: string }
>({
  item,
}: BtnForBreedsGridProp<T>) => {
  return (
    <Button
      variant='contained'
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.bgColor.light : '#282828',
        color: 'primary.main',
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        right: '10px',
        height: '34px',
        borderRadius: '10px',
        '&:hover': {
          backgroundColor: '#fff',
          color: 'primary.main',
        },
      }}
    >
      {item.breeds[0].name || 'unknown breed'}
    </Button>
  );
};

export default BtnForBreedsGrid;
