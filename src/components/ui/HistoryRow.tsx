import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Stack, Box, Typography, useMediaQuery } from '@mui/material';
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

const StyledTimeBox = ({ date }: { date: string }) => {
  return (
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
      <Typography variant='body1'>{`${moment(date).format(
        'HH:mm'
      )}`}</Typography>
    </Box>
  );
};

const StyledInfoBox = ({ history }: { history: History }) => {
  return (
    <Stack direction='row' flexWrap='wrap' spacing='3px'>
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
  );
};

const StyledIconBtn = ({ value }: { value: 0 | 1 | 'add' | 'remove' }) => {
  return (
    <StyledBox
      className={value === 1 ? 'likes' : value === 0 ? 'dislikes' : 'favorites'}
    >
      <IconFromSprite
        icon={
          value === 1
            ? 'likes'
            : value === 0
            ? 'dislikes'
            : value === 'add'
            ? 'favorites'
            : ''
        }
        height='20px'
        width='20px'
      />
    </StyledBox>
  );
};

const HistoryRow = ({ history }: HistoryRowProps) => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.up('tablet'));

  return (
    <StyledStack direction='row'>
      {tablet ? (
        <>
          <Stack direction='row' spacing='30px' sx={{ alignItems: 'center' }}>
            <StyledTimeBox date={history.date} />
            <StyledInfoBox history={history} />
          </Stack>
          <StyledIconBtn value={history.value} />
        </>
      ) : (
        <Stack sx={{ width: '100%' }} spacing='10px'>
          <Stack direction='row' justifyContent='space-between'>
            <StyledTimeBox date={history.date} />
            <StyledIconBtn value={history.value} />
          </Stack>
          <StyledInfoBox history={history} />
        </Stack>
      )}
    </StyledStack>
  );
};

export default HistoryRow;
