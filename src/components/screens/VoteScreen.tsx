import React, { useState, useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import SectionWrapper from '../layouts/SectionWrapper';
import SectionTitle from '../shared/SectionTitle';
import ImageGrid from '../shared/ImageGrid';
import ActionIconButton from '../shared/ActionIconBtn';
import Loading from '../layouts/Loading';
import NoItemFound from '../shared/NoItemFound';
import { Image } from '../../types';
import { AppDispatch } from '../../redux/store';
import { operations, selectors } from '../../redux';
import { getImageById } from '../../services/catApi';

interface VoteScreenProps {
  state: 'likes' | 'dislikes';
}

const VoteScreen = ({ state }: VoteScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const votes = useSelector(selectors.votesList);
  const dispatch = useDispatch<AppDispatch>();

  const getImages = useCallback(async () => {
    let images: Image[] = [];
    const match = state === 'likes' ? 1 : 0;
    const voteState = votes.filter((vote) => vote.value === match);
    for (let i = 0; i < voteState.length; i++) {
      if (voteState[i].image) {
        images = [...images, voteState[i].image];
      } else {
        const image = await getImageById(voteState[i].image_id);
        images = [...images, image];
      }
    }
    setImages(images);
    setLoading(false);
  }, [votes, state]);

  useEffect(() => {
    setLoading(true);
    getImages();
  }, [getImages]);

  const onClickImage = async (image: Image) => {
    const id = votes.filter((vote) => vote.image_id === image.id)[0].id;
    await dispatch(operations.removeVote(id));
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
          icon={state}
          isWhite={true}
          onClick={() => onClickImage(image)}
        />
      </Box>
    );
  };

  return (
    <SectionWrapper>
      <Box>
        <SectionTitle title={state} />
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
    </SectionWrapper>
  );
};

export default VoteScreen;
