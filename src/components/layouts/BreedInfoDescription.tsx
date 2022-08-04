import React from 'react';
import { Box, Stack, Typography, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Breed } from '../../types';

interface BreedInfoDescriptionProps {
  breed: Breed;
}

interface BreedPropertyDescProps {
  title: string;
  desc: string;
  isBottomMargin: boolean;
  direction: 'row' | 'column';
  nowrap?: boolean;
}

const BreedPropertyDesc = ({
  title,
  desc,
  isBottomMargin,
  direction,
  nowrap = true,
}: BreedPropertyDescProps) => {
  return (
    <Stack
      direction={direction}
      mb={isBottomMargin ? '10px' : 0}
      spacing={direction === 'row' ? '4px' : 0}
    >
      <Typography variant='subtitle2' whiteSpace='nowrap'>
        {title}
      </Typography>
      <Typography
        variant='subtitle2'
        component='span'
        noWrap={nowrap}
        sx={{ fontWeight: 400, color: 'text.secondary' }}
      >
        {desc}
      </Typography>
    </Stack>
  );
};

const BreedInfoDescription = ({ breed }: BreedInfoDescriptionProps) => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.up('tablet'));

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
        variant={tablet ? 'h4' : 'body2'}
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
          <Typography
            variant={tablet ? 'body2' : 'subtitle2'}
            color='text.secondary'
            mb='20px'
          >
            {breed.description}
          </Typography>
        )}
        <Grid container columnGap='20px'>
          <Grid item mini={12} tablet={6}>
            {breed.temperament && (
              <BreedPropertyDesc
                title='Temperament:'
                desc={breed.temperament}
                isBottomMargin={!tablet}
                direction='column'
                nowrap={false}
              />
            )}
          </Grid>
          <Grid item mini={12} tablet={5} sx={{ width: '100%' }}>
            <BreedPropertyDesc
              title='Origin:'
              desc={breed.origin}
              isBottomMargin={true}
              direction={tablet ? 'row' : 'column'}
            />
            <BreedPropertyDesc
              title='Weight:'
              desc={breed.weight.metric}
              isBottomMargin={true}
              direction={tablet ? 'row' : 'column'}
            />
            <BreedPropertyDesc
              title='Life Span:'
              desc={breed.life_span}
              isBottomMargin={false}
              direction={tablet ? 'row' : 'column'}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BreedInfoDescription;
