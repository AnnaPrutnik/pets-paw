import { configureStore } from '@reduxjs/toolkit';
import breedReducer from './breeds/breed-slice';
import favoritesReducer from './favorites/favorites-slice';
import votesReducer from './votes/votes-slice';

export const store = configureStore({
  reducer: {
    breeds: breedReducer,
    favorites: favoritesReducer,
    votes: votesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
