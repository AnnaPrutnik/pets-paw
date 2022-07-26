import {
  getUserVotes,
  addtoVote,
  deleteFromVotes,
} from '../../services/catApi';
import { Vote } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { AxiosError } from 'axios';

export const votes = createAsyncThunk<Vote[], void, { rejectValue: string }>(
  'votes/list',
  async (_, { rejectWithValue }) => {
    try {
      const logs = await getUserVotes();
      return logs;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

interface propsForAddVote {
  id: string;
  value: 0 | 1;
}

export const add = createAsyncThunk<
  Vote,
  propsForAddVote,
  { rejectValue: string }
>('votes/add', async ({ id, value }, { rejectWithValue }) => {
  try {
    const result = await addtoVote(id, value);
    return {
      id: result.id,
      created_at: moment().format().toString(),
      image_id: id,
      value: value,
    } as Vote;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Unknown error');
  }
});

export const remove = createAsyncThunk<string, string, { rejectValue: string }>(
  'favorites/remove',
  async (id, { rejectWithValue }) => {
    try {
      const result = await deleteFromVotes(id);
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
