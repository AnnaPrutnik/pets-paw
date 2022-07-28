import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Stack, Button, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomSection from '../components/Common/CustomSection';
import SectionTitle, {
  StyledTypography,
} from '../components/Common/SectionTitle';
import { getBreedImages } from '../services/catApi';
import { Breed, Image } from '../types';
import { limitsImagesForBreed } from '../config/variables';
import emptyImage from '../images/search/empty.png';
import Loading from '../components/Common/Loading';

interface CustomizedState {
  data: Breed;
}

const RoundButton = styled(Button)(({ theme }) => ({
  padding: 0,
  width: '10px',
  minWidth: '10px',
  height: '10px',
  borderRadius: '50%',
  '&.active': {
    backgroundColor: theme.palette.primary.main,
  },
  '&.non-active': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const BreedInfo = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [breed, setBreed] = useState<Breed | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(limitsImagesForBreed);
  const state = useLocation().state as CustomizedState;

  const paginationArray = useMemo(
    () => Array.from(Array(totalImages).keys()),
    [totalImages]
  );

  const currentImage = useMemo(() => {
    if (images.length > 0) {
      return images[activeImage];
    }
  }, [activeImage, images]);

  useEffect(() => {
    setBreed(state.data);
  }, [state]);

  useEffect(() => {
    setLoading(true);
    handlerGetImages();
  }, [breed]);

  const handlerGetImages = async () => {
    if (breed) {
      const response = await getBreedImages(breed.id);
      setImages(response.data);
      if (response.data.length < totalImages) {
        setTotalImages(response.data.length);
      }
      setLoading(false);
    }
  };

  const handlerClickBtn = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.getAttribute('data-value');
    setActiveImage(Number(value));
  };

  return (
    <CustomSection>
      <Stack direction='row' spacing='10px' mb='20px'>
        <SectionTitle title='breeds' isLight={true} />
        {breed && (
          <Box>
            <StyledTypography className='color' variant='h6'>
              {breed.id}
            </StyledTypography>
          </Box>
        )}
      </Stack>
      {loading ? (
        <Loading />
      ) : (
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
                      <RoundButton
                        key={page}
                        data-value={page}
                        className={
                          activeImage === page ? 'active' : 'non-active'
                        }
                        onClick={handlerClickBtn}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </>
          )}
          {breed && (
            <Box
              sx={{
                border: (theme) => `2px solid ${theme.palette.primary.light}`,
                borderRadius: '20px',
                padding: '26px 40px 40px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                variant='h4'
                padding='5px 40px'
                sx={{
                  position: 'absolute',
                  top: 0,
                  transform: 'translateY(-50%)',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.bgColor.light
                      : '#282828',
                  borderRadius: '20px',
                }}
              >
                {breed.name}
              </Typography>
              <Box>
                {breed.description && (
                  <Typography variant='body2' color='text.secondary' mb='20px'>
                    {breed.description}
                  </Typography>
                )}
                <Grid container columnGap='20px'>
                  <Grid item xs={6}>
                    {breed.temperament && (
                      <>
                        <Typography variant='subtitle2'>
                          Temperament:
                        </Typography>
                        <Typography
                          variant='subtitle2'
                          component='span'
                          sx={{ fontWeight: 400, color: 'text.secondary' }}
                        >
                          {breed.temperament}
                        </Typography>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={5} sx={{ width: '100%' }}>
                    <Stack direction='row' mb='10px' spacing='4px'>
                      <Typography variant='subtitle2'>Origin:</Typography>
                      <Typography
                        variant='subtitle2'
                        component='span'
                        sx={{ fontWeight: 400, color: 'text.secondary' }}
                      >
                        {breed.origin}
                      </Typography>
                    </Stack>
                    <Stack direction='row' mb='10px' spacing='4px'>
                      <Typography variant='subtitle2' whiteSpace='nowrap'>
                        Weight:{' '}
                      </Typography>
                      <Typography
                        variant='subtitle2'
                        component='span'
                        whiteSpace='nowrap'
                        sx={{
                          fontWeight: 400,
                          color: 'text.secondary',
                        }}
                      >
                        {breed.weight.metric}
                      </Typography>
                    </Stack>
                    <Stack direction='row' spacing='4px'>
                      <Typography variant='subtitle2' whiteSpace='nowrap'>
                        Life Span:
                      </Typography>
                      <Typography
                        variant='subtitle2'
                        component='div'
                        whiteSpace='nowrap'
                        sx={{
                          fontWeight: 400,
                          color: 'text.secondary',
                        }}
                      >
                        {breed.life_span}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </>
      )}
    </CustomSection>
  );
};

export default BreedInfo;
