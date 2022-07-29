import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import CustomSection from '../components/shared/CustomSection';
import SectionTitle from '../components/shared/SectionTitle';
import ActionGroupBtn from '../components/Voting/ActionGroupBtn';
import SearchMenu from '../components/layouts/SearchMenu';
import CustomContainer from '../components/shared/CustomContainer';
import Loading from '../components/layouts/Loading';
import { getRandomImage } from '../services/catApi';
import { Image, History } from '../types';
import { HistoryTable } from '../components/Voting/HistoryTable';
import { favoritesList, votesList } from '../redux/selectors';

const Voting = () => {
  const votes = useSelector(votesList);
  const favorites = useSelector(favoritesList);

  const [image, setImage] = useState<Image | null>(null);
  const [history, setHistory] = useState<History[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    onGetImage();
  }, []);

  useEffect(() => {
    const logFav: History[] = favorites.map((favorite) => ({
      id: favorite.id,
      image_id: favorite.image_id,
      date: favorite.created_at,
      value: 'add',
    }));

    const logVotes = votes.map((vote) => ({
      id: vote.id,
      image_id: vote.image_id,
      date: vote.created_at,
      value: vote.value,
    }));
    setHistory(
      [...logFav, ...logVotes].sort(
        (a, b) => moment(b.date).unix() - moment(a.date).unix()
      )
    );
  }, [votes, favorites]);

  const onGetImage = async () => {
    const result = await getRandomImage();
    setImage(result);
    setLoading(false);
  };

  return (
    <CustomContainer>
      <SearchMenu />
      <CustomSection>
        <Box mb='20px'>
          <SectionTitle title='voting'></SectionTitle>
        </Box>
        {loading ? (
          <Loading />
        ) : (
          <>
            {image && (
              <Box sx={{ position: 'relative' }} mb='52px'>
                <Box
                  component='img'
                  src={image.url}
                  alt='image for vote'
                  sx={{
                    borderRadius: '20px',
                    width: '100%',
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                  }}
                />
                <ActionGroupBtn getImageFn={onGetImage} image={image} />
              </Box>
            )}
            {history.length > 0 && <HistoryTable history={history} />}
          </>
        )}
      </CustomSection>
    </CustomContainer>
  );
};

export default Voting;
