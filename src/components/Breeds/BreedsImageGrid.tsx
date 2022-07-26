import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Image } from '../../types';
import { getBreedOneImage } from '../../services/catApi';
import ImageGrid from '../Common/ImageGrid';

interface BreedsImageGridProps {
  imageList: Image[];
}

const BreedsImageGrid = ({ imageList }: BreedsImageGridProps) => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    onCheckOnImageOnList();
  }, [imageList]);

  const onCheckOnImageOnList = async () => {
    const imagesFromProps = [...imageList];
    for (let i = 0; i < imagesFromProps.length; i++) {
      if (!imagesFromProps[i].url) {
        const image = await getBreedOneImage(imagesFromProps[i].breeds[0].id);
        if (image.length === 0) {
        }
        imagesFromProps[i] = {
          ...image[0],
          breeds: imagesFromProps[i].breeds,
        };
      }
    }
    setImages(imagesFromProps);
  };

  const navigate = useNavigate();

  const onCLickCard = (image: Image) => {
    navigate(`/breeds/${image.id}`, { state: { data: image.breeds[0] } });
  };

  const actionForCard = (item: Image) => (
    <Button
      variant='contained'
      sx={{
        backgroundColor: '#fff',
        color: 'primary.main',
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        right: '10px',
        height: '34px',
        borderRadius: '10px',
        '&:hover': {
          backgroundColor: '#fff',
          color: 'primary.main',
        },
      }}
    >
      {item.breeds[0].name || 'unknown breed'}
    </Button>
  );

  return (
    <>
      {images.length > 0 && (
        <ImageGrid
          actionNodeFn={actionForCard}
          imageList={images}
          onClickImage={onCLickCard}
        />
      )}
    </>
  );
};

export default BreedsImageGrid;

//                     }
