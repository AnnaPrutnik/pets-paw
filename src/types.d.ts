export type CardsRoutes = 'voting' | 'breeds' | 'gallery';
export type SelectedRoutes = 'favorites' | 'likes' | 'dislikes';
export type Theme = 'light' | 'dark';
export type Routers = CardsRoutes | SelectedRoutes | 'search';

export interface Image {
  id: 'string';
  url: 'string';
  width: number;
  height: number;
  breeds: Breed[];
}

export interface History {
  id: string;
  date: string;
  image_id: string;
  value: 0 | 1 | 'add' | 'remove';
}

export interface Vote {
  id: string;
  created_at: string;
  image_id: string;
  value: 0 | 1;
  image: Image;
}

export interface Favorite {
  id: string;
  created_at: string;
  image_id: string;
  image: Image;
}

export interface ResponseAddValue {
  id: string;
  message: string;
}

export interface Breed {
  id: string;
  name: string;
  description: string;
  image: Image;
  temperament: string;
  origin: string;
  weight: {
    imperial: string;
    metric: string;
  };
  life_span: string;
}

export interface SearchQuery {
  order: string;
  type: string;
  breed: string;
  limit: number;
}

export interface BreedSearchQuery {
  breed: string;
  limit: number;
}
