import React, { useState, useMemo } from 'react';
import { Box, Stack } from '@mui/material';
import StyledRoundButton from '../ui/StyledRoundBtn';
import emptyImage from '../../assets/images/search/empty.png';
import { Image } from '../../types';

interface BreedInfoImagesProps {
  images: Image[];
  paginationArray: number[];
}

const BreedInfoImages = ({ images, paginationArray }: BreedInfoImagesProps) => {
  const [activeImage, setActiveImage] = useState(0);

  const onClickBtn = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.getAttribute('data-value');
    setActiveImage(Number(value));
  };

  const currentImage = useMemo(() => {
    if (images.length > 0) {
      return images[activeImage];
    }
  }, [activeImage, images]);

  return (
    <>
      {images.length === 0 ? (
        <Box mb='51px'>
          <Box
            component='img'
            src={emptyImage}
            alt='image not found'
            sx={{
              borderRadius: '20px',
              width: '100%',
              aspectRatio: '16/9',
              objectFit: 'cover',
            }}
          />
        </Box>
      ) : (
        <>
          {currentImage && (
            <Box sx={{ position: 'relative' }} mb='51px'>
              <Box
                component='img'
                src={currentImage.url}
                alt={`image ${currentImage.breeds[0].name}`}
                sx={{
                  borderRadius: '20px',
                  width: '100%',
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                }}
              />
              <Stack
                direction='row'
                spacing='5px'
                padding='10px'
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  borderRadius: '20px',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.bgColor.light
                      : '#282828',
                  transform: 'translate(-50%, 50%)',
                }}
              >
                {paginationArray.map((page) => (
                  <StyledRoundButton
                    key={page}
                    data-value={page}
                    className={activeImage === page ? 'active' : 'non-active'}
                    onClick={onClickBtn}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default BreedInfoImages;
