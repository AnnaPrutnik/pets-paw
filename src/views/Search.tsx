import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import CustomSection from '../components/shared/CustomSection';
import SectionTitle from '../components/shared/SectionTitle';
import SearchMenu from '../components/layouts/SearchMenu';
import CustomContainer from '../components/shared/CustomContainer';
import BreedsImageGrid from '../components/layouts/BreedsImageGrid';
import NoItemFound from '../components/shared/NoItemFound';
import { getBreedsByName } from '../services/catApi';
import { Image } from '../types';
import Loading from '../components/layouts/Loading';

interface CustomizedState {
  searchValue: string;
}

const Search = () => {
  const location = useLocation().state as CustomizedState;
  const [searchValue, setSearchValue] = useState<string>('');
  const [images, setImages] = useState<Image[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newValue = location.searchValue;
    if (newValue.trim() !== '') {
      setSearchValue(newValue);
    }
  }, [location]);

  useEffect(() => {
    if (searchValue.trim() !== '') {
      setLoading(true);
      getImages();
    }
  }, [searchValue]);

  const getImages = async () => {
    const { data } = await getBreedsByName(searchValue);
    const newImages = data.reduce((acc: Image[], breed) => {
      const newImage: Image = { ...breed.image, breeds: [breed] };
      acc = [...acc, newImage];
      return acc;
    }, []);
    setImages(newImages);
    setLoading(false);
  };

  return (
    <CustomContainer>
      <SearchMenu initialValue={searchValue} />
      <CustomSection>
        <Box>
          <SectionTitle title='search' />
        </Box>
        {loading ? (
          <Loading />
        ) : (
          <>
            {images && (
              <>
                {images.length > 0 ? (
                  <BreedsImageGrid imageList={images} />
                ) : (
                  <NoItemFound />
                )}
              </>
            )}
          </>
        )}
      </CustomSection>
    </CustomContainer>
  );
};

export default Search;
