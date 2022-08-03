import React from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Box, Typography } from '@mui/material';
import { History } from '../../types';
import IconFromSprite from './SvgIconSprite';
import moment from 'moment';

interface HistoryRowProps {
  history: History;
}

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '&.likes': {
    fill: theme.voting.default.likes,
  },
  '&.dislikes': {
    fill: theme.voting.default.dislikes,
  },
  '&.favorites': {
    fill: theme.voting.default.favorites,
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  padding: '15px',
  backgroundColor: theme.bgColor.dark,
  justifyContent: 'space-between',
  borderRadius: '10px',
}));

const HistoryRow = ({ history }: HistoryRowProps) => {
  return (
    <StyledStack direction='row'>
      <Stack direction='row' spacing='30px' sx={{ alignItems: 'center' }}>
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.bgColor.light
                : theme.bgColor.dark,
            padding: '3px 10px',
            borderRadius: '5px',
          }}
        >
          <Typography variant='body1'>{`${moment(history.date).format(
            'HH:mm'
          )}`}</Typography>
        </Box>
        <Stack direction='row' spacing='3px'>
          <Typography variant='body1' sx={{ color: 'text.secondary' }}>
            Image ID:
          </Typography>
          <Typography variant='body1' sx={{ fontWeight: 500 }}>
            {history.image_id}
          </Typography>
          <Typography variant='body1' sx={{ color: 'text.secondary' }}>
            was {history.value !== 'remove' ? 'added' : 'removed'} to
          </Typography>
          <Typography variant='body1' sx={{ color: 'text.secondary' }}>
            {history.value === 1
              ? 'Likes'
              : history.value === 0
              ? 'Dislikes'
              : 'Favorites'}
          </Typography>
        </Stack>
      </Stack>
      <StyledBox
        className={
          history.value === 1
            ? 'likes'
            : history.value === 0
            ? 'dislikes'
            : 'favorites'
        }
      >
        <IconFromSprite
          icon={
            history.value === 1
              ? 'likes'
              : history.value === 0
              ? 'dislikes'
              : history.value === 'add'
              ? 'favorites'
              : ''
          }
          height='20px'
          width='20px'
        />
      </StyledBox>
    </StyledStack>
  );
};

export default HistoryRow;
