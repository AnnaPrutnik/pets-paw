import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import SectionWrapper from '../layouts/SectionWrapper';
import SectionTitle from '../shared/SectionTitle';
import BreedsImageGrid from '../layouts/BreedsImageGrid';
import NoItemFound from '../shared/NoItemFound';
import Loading from '../layouts/Loading';
import { Image } from '../../types';
import { getBreedsByName } from '../../services/catApi';

interface CustomizedState {
  searchValue: string;
}

const SearchScreen = () => {
  const state = useLocation().state as CustomizedState;
  const [searchValue, setSearchValue] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newValue = state?.searchValue;
    if (newValue && newValue.trim() !== '') {
      setSearchValue(newValue);
    }
  }, [state]);

  const getImages = useCallback(async () => {
    const { data } = await getBreedsByName(searchValue);
    const newImages = data.reduce((acc: Image[], breed) => {
      const newImage: Image = { ...breed.image, breeds: [breed] };
      acc = [...acc, newImage];
      return acc;
    }, []);
    setImages(newImages);
    setLoading(false);
  }, [searchValue]);

  useEffect(() => {
    if (searchValue.trim() !== '') {
      setLoading(true);
      getImages();
    }
  }, [getImages, searchValue]);

  return (
    <SectionWrapper>
      <Box>
        <SectionTitle title='search' />
      </Box>
      {loading ? (
        <Loading />
      ) : (
        <>
          {images.length > 0 ? (
            <BreedsImageGrid imageList={images} />
          ) : (
            <NoItemFound />
          )}
        </>
      )}
    </SectionWrapper>
  );
};

export default SearchScreen;
