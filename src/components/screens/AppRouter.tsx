import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../../views/Main';
import Home from '../../views/Home';
import Voting from '../../views/Voting';
import Breeds from '../../views/Breeds';
import Gallery from '../../views/Gallery';
import BreedInfo from '../../views/BreedInfo';
import Favorite from '../../views/Favorite';
import Likes from '../../views/Likes';
import Dislikes from '../../views/Dislikes';
import Search from '../../views/Search';

const AppRouter = () => {
  return (
    <Routes>
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
    </Routes>
  );
};

export default AppRouter;
