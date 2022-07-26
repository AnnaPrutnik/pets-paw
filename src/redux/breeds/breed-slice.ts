import { createSlice } from '@reduxjs/toolkit';
import { Breed } from '../../types';

import { list } from './breed-operations';

interface InitialState {
  list: Breed[];
  error: string | null | undefined;
}

const initialState: InitialState = {
  list: [],
  error: null,
};

const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(list.pending, (state, _) => {
      state.error = null;
    });
    builder.addCase(list.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
    builder.addCase(list.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

export default breedsSlice.reducer;
