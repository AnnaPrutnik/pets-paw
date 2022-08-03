import React from 'react';
import { Box, Stack, Typography, Grid } from '@mui/material';
import { Breed } from '../../types';

interface BreedInfoDescriptionProps {
  breed: Breed;
}

const BreedInfoDescription = ({ breed }: BreedInfoDescriptionProps) => {
  return (
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
            theme.palette.mode === 'light' ? theme.bgColor.light : '#282828',
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
                <Typography variant='subtitle2'>Temperament:</Typography>
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
  );
};

export default BreedInfoDescription;
