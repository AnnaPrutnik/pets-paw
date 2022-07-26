import { getBreeds } from '../../services/catApi';
import { Breed } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

export const list = createAsyncThunk<Breed[], void, { rejectValue: string }>(
  'breeds/list',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getBreeds();
      return data;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);
