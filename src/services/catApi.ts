import axios, { HeadersDefaults } from 'axios';
import { user_id, limitsImagesForBreed } from '../utils/variables';
import { Image, Favorite, Breed, Vote, ResponseAddValue } from '../types';

interface CustomHeaderProp extends HeadersDefaults {
  'x-api-key': string;
}

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers = {
  'x-api-key': 'c3bbcecb-6277-4d5c-ba42-d816fa3cb5dc',
} as CustomHeaderProp;

export async function getRandomImage() {
  const { data } = await axios.get<Image[]>('images/search');
  return data[0];
}

export async function getImageById(id: string) {
  const { data } = await axios.get<Image>(`images/${id}`);
  return data;
}

export async function getBreedsByName(value: string) {
  const response = await axios.get<Breed[]>(`breeds/search?q=${value}`);
  return response;
}

export async function getUserVotes() {
  const { data } = await axios.get<Vote[]>(`/votes`);

  return data;
}

export async function addtoVote(image_id: string, vote: 0 | 1) {
  const body = {
    image_id,
    sub_id: user_id,
    value: vote,
  };

  const { data } = await axios.post<ResponseAddValue>('/votes', body);
  return data;
}

interface deleteProps {
  message: string;
}

export async function deleteFromVotes(id: string) {
  const { data } = await axios.delete<deleteProps>(`/votes/${id}`);
  return data;
}

export async function getFavorites() {
  const { data } = await axios.get<Favorite[]>('/favourites');
  return data;
}

export async function addToFavorite(image_id: string) {
  const body = {
    image_id,
    sub_id: user_id,
  };

  const { data } = await axios.post<ResponseAddValue>('/favourites', body);
  return data;
}

export async function deleteFromFavorite(id: string) {
  const { data } = await axios.delete<deleteProps>(`/favourites/${id}`);
  return data;
}

export async function getBreeds() {
  const { data } = await axios.get<Breed[]>('/breeds');
  return data;
}

export async function getBreedImages(
  id: string,
  limit = limitsImagesForBreed,
  page = 1
) {
  const response = await axios.get<Image[]>(
    `/images/search?breed_ids=${id}&limit=${limit}&page=${page}`
  );
  return response;
}

export async function getBreedOneImage(id: string) {
  const { data } = await axios.get<Image[]>(`/images/search?breed_ids=${id}`);
  return data;
}

export async function getImageForGallery(
  order: string,
  limit: number,
  page: number,
  breedId: string,
  type: string
) {
  const format =
    type === 'all' ? 'gif,jpg,png' : type === 'animated' ? 'gif' : 'jpg,png';

  const response = await axios.get<Image[]>(
    `/images/search?order=${order}&limit=${limit}&page=${page}&breed_id=${breedId}&mime_types=${format}`
  );
  return response;
}

export async function getImageForGalleryRandomBreed(
  order: string,
  limit: number,
  page: number,
  type: string
) {
  const format =
    type === 'all' ? 'jpg,gif,png' : type === 'animated' ? 'gif' : 'jpg,png';

  const response = await axios.get<Image[]>(
    `/images/search?order=${order}&limit=${limit}&page=${page}&mime_types=${format}`
  );
  return response;
}

export async function uploadImage(file: FormData) {
  const response = await axios.post('/images/upload', file, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}
