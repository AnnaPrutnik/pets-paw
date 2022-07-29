import React from 'react';
import { Stack } from '@mui/material';
import SearchInput from '../shared/SearchInput';
import VotesIconBtn from '../shared/VotesIconBtn';

const SearchMenu = ({ initialValue = '' }) => {
  return (
    <Stack direction='row' spacing='10px' mb='10px'>
      <SearchInput initialValue={initialValue} />
      <VotesIconBtn />
    </Stack>
  );
};

export default SearchMenu;
