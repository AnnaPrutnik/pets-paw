import { breedsList, votesList, favoritesList } from './selectors';
import {
  votes,
  add as addVote,
  remove as removeVote,
} from './votes/votes-operations';
import {
  favorites,
  add as addFavorite,
  remove as removeFavorite,
} from './favorites/favorites-operations';
import { list as breeds } from './breeds/breed-operations';

export const selectors = { breedsList, votesList, favoritesList };
export const operations = {
  votes,
  addVote,
  removeVote,
  favorites,
  addFavorite,
  removeFavorite,
  breeds,
};
