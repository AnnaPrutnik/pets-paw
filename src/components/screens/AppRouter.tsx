import React, { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/Main';
import Home from '../../pages/Home';
import Voting from '../../pages/Voting';
import Breeds from '../../pages/Breeds';
import Gallery from '../../pages/Gallery';
import BreedInfo from '../../pages/BreedInfo';
import Favorite from '../../pages/Favorite';
import Likes from '../../pages/Likes';
import Dislikes from '../../pages/Dislikes';
import Search from '../../pages/Search';
import { operations } from '../../redux';
import { AppDispatch } from '../../redux/store';

const AppRouter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('desktop'));

  const { breeds, votes, favorites } = operations;

  useEffect(() => {
    dispatch(breeds());
    dispatch(votes());
    dispatch(favorites());
  }, []);

  return (
    <Routes>
      {matches ? (
        <Route path='/' element={<Main />}>
          <Route index element={<Home />} />
          <Route path='voting' element={<Voting />} />
          <Route path='breeds' element={<Breeds />} />
          <Route path='gallery' element={<Gallery />} />
          <Route path='breeds/:breed_id' element={<BreedInfo />} />
          <Route path='favorites' element={<Favorite />} />
          <Route path='likes' element={<Likes />} />
          <Route path='dislikes' element={<Dislikes />} />
          <Route path='search' element={<Search />} />
        </Route>
      ) : (
        <>
          <Route path='/' element={<Main />} />
          <Route path='voting' element={<Voting />} />
          <Route path='breeds' element={<Breeds />} />
          <Route path='gallery' element={<Gallery />} />
          <Route path='breeds/:breed_id' element={<BreedInfo />} />
          <Route path='favorites' element={<Favorite />} />
          <Route path='likes' element={<Likes />} />
          <Route path='dislikes' element={<Dislikes />} />
          <Route path='search' element={<Search />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
