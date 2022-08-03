import React, { useState, useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import SectionWrapper from '../layouts/SectionWrapper';
import SectionTitle from '../shared/SectionTitle';
import GalleryImageGrid from '../layouts/GalleryImageGrid';
import Loading from '../layouts/Loading';
import NoItemFound from '../shared/NoItemFound';
import { Image } from '../../types';
import { selectors } from '../../redux';
import { getImageById } from '../../services/catApi';

const FavoriteScreen = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const favorites = useSelector(selectors.favoritesList);

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
    <SectionWrapper>
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
    </SectionWrapper>
  );
};

export default FavoriteScreen;
