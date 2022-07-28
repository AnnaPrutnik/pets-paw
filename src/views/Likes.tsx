import React, { useState, useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CustomSection from '../components/Common/CustomSection';
import SectionTitle from '../components/Common/SectionTitle';
import SearchMenu from '../components/Common/SearchMenu';
import CustomContainer from '../components/Common/Container';
import ImageGrid from '../components/Common/ImageGrid';
import ActionIconButton from '../components/Common/ActionIcon';
import Loading from '../components/Common/Loading';
import NoItemFound from '../components/Common/NoItemFound';
import { Image } from '../types';
import { AppDispatch } from '../redux/store';
import { remove } from '../redux/votes/votes-operations';
import { getImageById } from '../services/catApi';
import { votesList } from '../redux/selectors';

const Likes = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const votes = useSelector(votesList);
  const dispatch = useDispatch<AppDispatch>();

  const getDislikedImages = useCallback(async () => {
    let images: Image[] = [];
    const likes = votes.filter((vote) => vote.value === 1);
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].image) {
        images = [...images, likes[i].image];
      } else {
        const image = await getImageById(likes[i].image_id);
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
          icon='likes'
          isWhite={true}
          handlerClick={() => onClickImage(image)}
        />
      </Box>
    );
  };
  return (
    <CustomContainer>
      <SearchMenu />
      <CustomSection>
        <Box>
          <SectionTitle title='likes' />
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

export default Likes;
