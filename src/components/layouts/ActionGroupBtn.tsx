import React, { useEffect, useState } from 'react';
import { ButtonGroup, Divider, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import StyledActionBtn from '../ui/StyledActionBtn';
import { Image } from '../../types';
import { AppDispatch } from '../../redux/store';
import { add as addFavorite } from '../../redux/favorites/favorites-operations';
import { add as addVote } from '../../redux/votes/votes-operations';

interface ActionBtnProps {
  getImageFn: () => void;
  image: Image;
}

const ActionGroupBtn = ({ getImageFn, image }: ActionBtnProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(false);
  }, [image]);

  const onCLickVote = async (action: 0 | 1) => {
    await dispatch(addVote({ id: image.id, value: action }));
    await getImageFn();
  };

  const onClickFavorite = async () => {
    await dispatch(addFavorite(image.id));
    setIsFavorite(true);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 50%)',
      }}
    >
      <ButtonGroup
        variant='text'
        orientation='horizontal'
        aria-label='action button group'
        disableFocusRipple
        disableRipple
        sx={{
          overflow: 'hidden',
          border: (theme) =>
            theme.palette.mode === 'light'
              ? `4px solid ${theme.bgColor.light}`
              : `4px solid #282828`,
          backgroundColor: (theme) => theme.bgColor.light,
        }}
      >
        <StyledActionBtn
          title='likes'
          onClickFn={() => onCLickVote(1)}
          icon='likes'
        />
        <Divider
          orientation='vertical'
          flexItem
          sx={{ width: '4px', border: '0', backgroundColor: '#fff' }}
        />
        <StyledActionBtn
          title='favorites'
          onClickFn={onClickFavorite}
          icon={isFavorite ? 'favorite-color' : 'favorites'}
        />
        <Divider
          orientation='vertical'
          flexItem
          sx={{ width: '4px', border: '0', backgroundColor: '#fff' }}
        />
        <StyledActionBtn
          title='dislikes'
          onClickFn={() => onCLickVote(0)}
          icon='dislikes'
        />
      </ButtonGroup>
    </Box>
  );
};

export default ActionGroupBtn;
