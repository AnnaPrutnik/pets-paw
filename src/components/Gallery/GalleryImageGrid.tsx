import React from 'react';
import { Image } from '../../types';
import ImageGrid from '../Common/ImageGrid';
import ActionIconButton from '../Common/ActionIcon';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { favoritesList } from '../../redux/selectors';
import { add, remove } from '../../redux/favorites/favorites-operations';
import { AppDispatch } from '../../redux/store';

interface GalleryImageGridProps {
  imageList: Image[];
}

const GalleryImageGrid = ({ imageList }: GalleryImageGridProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(favoritesList);

  const onCLickImage = async (image: Image) => {
    const isImageInFavorites = favorites.filter(
      (favorite) => favorite.image_id === image.id
    );
    if (isImageInFavorites.length > 0) {
      await dispatch(remove(isImageInFavorites[0].id));
    } else {
      await dispatch(add(image.id));
    }
  };

  const actionForCard = (image: Image) => {
    const isImageInFavorites = favorites.filter(
      (favorite) => favorite.image_id === image.id
    );

    const icon = isImageInFavorites.length > 0 ? 'favorite-color' : 'favorites';

    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <ActionIconButton
          icon={icon}
          isWhite={true}
          handlerClick={() => onCLickImage(image)}
        />
      </Box>
    );
  };

  return (
    <>
      <ImageGrid imageList={imageList} actionNodeFn={actionForCard} />
    </>
  );
};

export default GalleryImageGrid;
