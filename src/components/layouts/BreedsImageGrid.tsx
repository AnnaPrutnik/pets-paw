import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from '../../types';
import { getBreedOneImage } from '../../services/catApi';
import ImageGrid from '../shared/ImageGrid';
import BtnForBreedsGridProp from '../ui/BtnForBreedsGrid';

interface BreedsImageGridProps {
  imageList: Image[];
}

const BreedsImageGrid = ({ imageList }: BreedsImageGridProps) => {
  const [images, setImages] = useState<Image[]>([]);
  const navigate = useNavigate();

  const onCheckOnImageOnList = useCallback(async () => {
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
  }, [imageList]);

  useEffect(() => {
    onCheckOnImageOnList();
  }, [onCheckOnImageOnList]);

  const onCLickCard = (image: Image) => {
    navigate(`/breeds/${image.id}`, { state: { data: image.breeds[0] } });
  };

  const actionForCard = (item: Image) => <BtnForBreedsGridProp item={item} />;

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
