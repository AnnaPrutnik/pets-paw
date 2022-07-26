import React from 'react';
import { Stack } from '@mui/material';
import SearchInput from './SearchInput';
import SearchIconBtn from './SearchIconBtn';

const SearchMenu = ({ initialValue = '' }) => {
  return (
    <Stack direction='row' spacing='10px' mb='10px'>
      <SearchInput initialValue={initialValue} />
      <SearchIconBtn />
    </Stack>
  );
};

export default SearchMenu;
