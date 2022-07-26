import { createSlice } from '@reduxjs/toolkit';
import { Vote } from '../../types';

import { votes, add, remove } from './votes-operations';

interface InitialState {
  list: Vote[];
  error: string | null | undefined;
}

const initialState: InitialState = {
  list: [],
  error: null,
};

const votesSlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(votes.pending, (state, _) => {
      state.error = null;
    });
    builder.addCase(votes.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
    builder.addCase(votes.rejected, (state, { payload }) => {
      state.error = payload;
    });
    builder.addCase(add.pending, (state, _) => {
      state.error = null;
    });
    builder.addCase(add.fulfilled, (state, { payload }) => {
      state.list = [...state.list, payload];
    });
    builder.addCase(add.rejected, (state, { payload }) => {
      state.error = payload;
    });
    builder.addCase(remove.pending, (state, _) => {
      state.error = null;
    });
    builder.addCase(remove.fulfilled, (state, { payload }) => {
      state.list = state.list.filter((item) => item.id !== payload);
    });
    builder.addCase(remove.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

export default votesSlice.reducer;
