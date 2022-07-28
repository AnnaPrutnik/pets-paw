import React from 'react';
import { History } from '../../types';
import { styled } from '@mui/material/styles';
import { Stack, Box, Typography } from '@mui/material';
import IconFromSprite from '../Common/SvgIconSprite';
import moment from 'moment';

interface HistoryTableProps {
  history: History[];
}
const StyledStack = styled(Stack)(({ theme }) => ({
  padding: '15px',
  backgroundColor: theme.bgColor.dark,
  justifyContent: 'space-between',
  borderRadius: '10px',
}));

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

export const HistoryTable = ({ history }: HistoryTableProps) => {
  return (
    <>
      {history.length > 0 && (
        <Stack spacing='10px'>
          {history.map((log) => (
            <StyledStack key={log.id} direction='row'>
              <Stack
                direction='row'
                spacing='30px'
                sx={{ alignItems: 'center' }}
              >
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
                  <Typography variant='body1'>{`${moment(log.date).format(
                    'HH:mm'
                  )}`}</Typography>
                </Box>
                <Stack direction='row' spacing='3px'>
                  <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                    Image ID:
                  </Typography>
                  <Typography variant='body1' sx={{ fontWeight: 500 }}>
                    {log.image_id}
                  </Typography>
                  <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                    was {log.value !== 'remove' ? 'added' : 'removed'} to
                  </Typography>
                  <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                    {log.value === 1
                      ? 'Likes'
                      : log.value === 0
                      ? 'Dislikes'
                      : 'Favorites'}
                  </Typography>
                </Stack>
              </Stack>
              <StyledBox
                className={
                  log.value === 1
                    ? 'likes'
                    : log.value === 0
                    ? 'dislikes'
                    : 'favorites'
                }
              >
                <IconFromSprite
                  icon={
                    log.value === 1
                      ? 'likes'
                      : log.value === 0
                      ? 'dislikes'
                      : log.value === 'add'
                      ? 'favorites'
                      : ''
                  }
                  height='20px'
                  width='20px'
                />
              </StyledBox>
            </StyledStack>
          ))}
        </Stack>
      )}
    </>
  );
};
