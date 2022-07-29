import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CustomSection from '../components/shared/CustomSection';
import SectionTitle from '../components/shared/SectionTitle';
import SearchMenu from '../components/layouts/SearchMenu';
import CustomContainer from '../components/shared/CustomContainer';
import Loading from '../components/layouts/Loading';
import ImageGrid from '../components/shared/ImageGrid';
import ActionIconButton from '../components/shared/ActionIconBtn';
import NoItemFound from '../components/shared/NoItemFound';
import { Image } from '../types';
import { AppDispatch } from '../redux/store';
import { remove } from '../redux/votes/votes-operations';
import { votesList } from '../redux/selectors';
import { getImageById } from '../services/catApi';

const Dislikes = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const votes = useSelector(votesList);
  const dispatch = useDispatch<AppDispatch>();

  const getDislikedImages = useCallback(async () => {
    let images: Image[] = [];
    const dislikes = votes.filter((vote) => vote.value === 0);
    for (let i = 0; i < dislikes.length; i++) {
      if (dislikes[i].image) {
        images = [...images, dislikes[i].image];
      } else {
        const image = await getImageById(dislikes[i].image_id);
        images = [...images, image];
      }
    }
    setImages(images);
    setLoading(false);
  }, [votes]);

  useEffect(() => {
    setLoading(true);
    getDislikedImages();
  }, [getDislikedImages]);

  const onClickImage = async (image: Image) => {
    const id = votes.filter((vote) => vote.image_id === image.id)[0].id;
    await dispatch(remove(id));
  };

  const actionForCard = (image: Image) => {
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
          icon='dislikes'
          isWhite={true}
          onClick={() => onClickImage(image)}
        />
      </Box>
    );
  };

  return (
    <CustomContainer>
      <SearchMenu />
      <CustomSection>
        <Box>
          <SectionTitle title='dislikes' />
        </Box>
        {loading ? (
          <Loading />
        ) : (
          <>
            {images.length > 0 ? (
              <ImageGrid imageList={images} actionNodeFn={actionForCard} />
            ) : (
              <NoItemFound />
            )}
          </>
        )}
      </CustomSection>
    </CustomContainer>
  );
};

export default Dislikes;
