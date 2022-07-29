import React from 'react';
import { Box } from '@mui/material';
import ActionIconButton from '../shared/ActionIconBtn';
import { Image } from '../../types';

interface BtnForGalleryGridProps {
  icon: string;
  onClick: (value: Image) => void;
  image: Image;
}

const BtnForGalleryGrid = ({
  icon,
  onClick,
  image,
}: BtnForGalleryGridProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <ActionIconButton
        icon={icon}
        isWhite={true}
        onClick={() => onClick(image)}
      />
    </Box>
  );
};

export default BtnForGalleryGrid;
