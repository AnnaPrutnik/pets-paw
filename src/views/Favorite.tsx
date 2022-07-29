import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import CustomSection from '../components/shared/CustomSection';
import SectionTitle from '../components/shared/SectionTitle';
import SearchMenu from '../components/layouts/SearchMenu';
import CustomContainer from '../components/shared/CustomContainer';
import GalleryImageGrid from '../components/layouts/GalleryImageGrid';
import { favoritesList } from '../redux/selectors';
import { getImageById } from '../services/catApi';
import { Image } from '../types';
import Loading from '../components/layouts/Loading';
import NoItemFound from '../components/shared/NoItemFound';

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
        {loading ? (
          <Loading />
        ) : (
          <>
            {images.length > 0 ? (
              <GalleryImageGrid imageList={images} />
            ) : (
              <NoItemFound />
            )}
          </>
        )}
      </CustomSection>
    </CustomContainer>
  );
};

export default Favorite;
