import { Routers, CardsRoutes, SelectedRoutes } from '../../types';

export const cardsPath: CardsRoutes[] = ['voting', 'breeds', 'gallery'];

export const selectedPath: SelectedRoutes[] = [
  'likes',
  'favorites',
  'dislikes',
];
export const routerPath: Routers[] = [...cardsPath, ...selectedPath, 'search'];

export const user_id = 'User-555789';

export const limits = [5, 10, 15, 20];

export const limitsImagesForBreed = 5;

export const orders = ['Random', 'Desc', 'Asc'];

export const types = ['all', 'static', 'animated'];
