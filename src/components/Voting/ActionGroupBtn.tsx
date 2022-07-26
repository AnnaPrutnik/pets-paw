import React, { useEffect, useState } from 'react';
import { ButtonGroup, IconButton, Divider, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import IconFromSprite from '../Common/SvgIconSprite';
import { styled } from '@mui/material/styles';
import { Image } from '../../types';
import { AppDispatch } from '../../redux/store';
import { add as addFavorite } from '../../redux/favorites/favorites-operations';
import { add as addVote } from '../../redux/votes/votes-operations';

interface ActionBtnProps {
  getImageFn: () => void;
  image: Image;
}

interface StyledBtnProps {
  title: 'likes' | 'favorites' | 'dislikes';
}

const StyledIconBtn = styled(IconButton)<StyledBtnProps>(({ theme, title }) => {
  return {
    width: '80px',
    height: '80px',
    fill: theme.palette.common.white,
    backgroundColor: theme.voting.default[title],
    borderRadius: 0,

    '&:hover': {
      backgroundColor: theme.voting.hover[title],
      fill: theme.voting.default[title],
    },
    '&:active': {
      fill: theme.voting.default[title],
    },
  };
});

const ActionGroupBtn = ({ getImageFn, image }: ActionBtnProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(false);
  }, [image]);

  const handlerVote = async (action: 0 | 1) => {
    await dispatch(addVote({ id: image.id, value: action }));
    await getImageFn();
  };

  const handlerAddFavorite = async () => {
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
        disableFocusRipple
        disableRipple
        sx={{
          overflow: 'hidden',
          border: '4px solid #FFFFFF',
          backgroundColor: '#FFFFFF',
        }}
      >
        <StyledIconBtn
          disableRipple
          disableFocusRipple
          title='likes'
          onClick={() => handlerVote(1)}
        >
          <IconFromSprite icon='likes' />
        </StyledIconBtn>
        <Divider orientation='vertical' sx={{ width: '4px', border: '0' }} />
        <StyledIconBtn
          disableRipple
          disableFocusRipple
          title='favorites'
          onClick={handlerAddFavorite}
        >
          <IconFromSprite icon={isFavorite ? 'favorite-color' : 'favorites'} />
        </StyledIconBtn>
        <Divider orientation='vertical' sx={{ width: '4px', border: '0' }} />
        <StyledIconBtn
          disableRipple
          disableFocusRipple
          title='dislikes'
          onClick={() => handlerVote(0)}
        >
          <IconFromSprite icon='dislikes' />
        </StyledIconBtn>
      </ButtonGroup>
    </Box>
  );
};

export default ActionGroupBtn;
