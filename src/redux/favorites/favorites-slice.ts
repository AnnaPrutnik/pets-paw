import { createSlice } from '@reduxjs/toolkit';
import { Favorite } from '../../types';

import { favorites, add, remove } from './favorites-operations';

interface InitialState {
  list: Favorite[];
  error: string | null | undefined;
}

const initialState: InitialState = {
  list: [],
  error: null,
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(favorites.pending, (state, _) => {
      state.error = null;
    });
    builder.addCase(favorites.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
    builder.addCase(favorites.rejected, (state, { payload }) => {
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

export default favoriteSlice.reducer;
