import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import SectionTitle from '../shared/SectionTitle';
import SectionWrapper from '../layouts/SectionWrapper';
import StyledTitle from '../ui/StyledTitle';
import BreedInfoDescription from '../layouts/BreedInfoDescription';
import BreedInfoImages from '../layouts/BreedInfoImages';
import Loading from '../layouts/Loading';
import { getBreedImages } from '../../services/catApi';
import { Breed, Image } from '../../types';
import { limitsImagesForBreed } from '../../utils/constants/variables';

interface CustomizedState {
  data: Breed;
}

const BreedInfoScreen = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [breed, setBreed] = useState<Breed | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(limitsImagesForBreed);
  const state = useLocation().state as CustomizedState;

  const paginationArray = useMemo(
    () => Array.from(Array(totalImages).keys()),
    [totalImages]
  );

  useEffect(() => {
    setBreed(state.data);
  }, [state]);

  const onGetImages = useCallback(async () => {
    if (breed) {
      const response = await getBreedImages(breed.id);
      setImages(response.data);
      if (response.data.length < totalImages) {
        setTotalImages(response.data.length);
      }
      setLoading(false);
    }
  }, [breed]);

  useEffect(() => {
    setLoading(true);
    onGetImages();
  }, [onGetImages]);

  return (
    <SectionWrapper>
      <Stack direction='row' spacing='10px' mb='20px'>
        <SectionTitle title='breeds' isLight={true} />
        {breed && (
          <Box>
            <StyledTitle className='color' variant='h6'>
              {breed.id}
            </StyledTitle>
          </Box>
        )}
      </Stack>
      {loading ? (
        <Loading />
      ) : (
        <>
          <BreedInfoImages images={images} paginationArray={paginationArray} />
          {breed && <BreedInfoDescription breed={breed} />}
        </>
      )}
    </SectionWrapper>
  );
};

export default BreedInfoScreen;
