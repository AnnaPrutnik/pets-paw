import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import CustomSection from '../components/Common/CustomSection';
import SectionTitle from '../components/Common/SectionTitle';
import SearchMenu from '../components/Common/SearchMenu';
import CustomContainer from '../components/Common/Container';
import GalleryImageGrid from '../components/Gallery/GalleryImageGrid';
import { favoritesList } from '../redux/selectors';
import { getImageById } from '../services/catApi';
import { Image } from '../types';
import Loading from '../components/Common/Loading';

const Favorite = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const favorites = useSelector(favoritesList);

  const getImagesFromFavorites = useCallback(async () => {
    let images: Image[] = [];
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].image) {
        images = [...images, favorites[i].image];
      } else {
        const image = await getImageById(favorites[i].image_id);
        images = [...images, image];
      }
    }
    setImages(images);
    setLoading(false);
  }, [favorites]);

  useEffect(() => {
    setLoading(true);
    getImagesFromFavorites();
  }, [getImagesFromFavorites]);

  return (
    <CustomContainer>
      <SearchMenu />
      <CustomSection>
        <Box>
          <SectionTitle title='favorites' />
        </Box>
        {loading ? <Loading /> : <GalleryImageGrid imageList={images} />}
      </CustomSection>
    </CustomContainer>
  );
};

export default Favorite;