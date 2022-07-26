import {
  getFavorites,
  addToFavorite,
  deleteFromFavorite,
} from '../../services/catApi';
import { Favorite } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import moment from 'moment';

export const favorites = createAsyncThunk<
  Favorite[],
  void,
  { rejectValue: string }
>('favorites/list', async (_, { rejectWithValue }) => {
  try {
    const favorites = await getFavorites();
    return favorites;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Unknown error');
  }
});

export const add = createAsyncThunk<Favorite, string, { rejectValue: string }>(
  'favorites/add',
  async (id, { rejectWithValue }) => {
    try {
      const result = await addToFavorite(id);
      return {
        id: result.id,
        created_at: moment().format().toString(),
        image_id: id,
      } as Favorite;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

export const remove = createAsyncThunk<string, string, { rejectValue: string }>(
  'favorites/remove',
  async (id, { rejectWithValue }) => {
    try {
      const result = await deleteFromFavorite(id);
      if (result.message === 'SUCCESS') {
        return id;
      } else {
        return rejectWithValue('This image is not your Favorite');
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('Unknown error');
      }
    }
  }
);
