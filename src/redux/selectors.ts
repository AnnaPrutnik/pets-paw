import { RootState } from './store';

export const breedsList = (state: RootState) => state.breeds.list;
export const votesList = (state: RootState) => state.votes.list;
export const favoritesList = (state: RootState) => state.favorites.list;
