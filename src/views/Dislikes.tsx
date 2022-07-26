import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CustomSection from '../components/Common/CustomSection';
import SectionTitle from '../components/Common/SectionTitle';
import SearchMenu from '../components/Common/SearchMenu';
import CustomContainer from '../components/Common/Container';
import Loading from '../components/Common/Loading';
import ImageGrid from '../components/Common/ImageGrid';
import ActionIconButton from '../components/Common/ActionIcon';
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
          <SectionTitle title='dislikes' />
        </Box>
        {loading ? (
          <Loading />
        ) : (
          <ImageGrid imageList={images} actionNodeFn={actionForCard} />
        )}
      </CustomSection>
    </CustomContainer>
  );
};

export default Dislikes;