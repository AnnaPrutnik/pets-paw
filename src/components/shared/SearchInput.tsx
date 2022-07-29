import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Snackbar, Alert } from '@mui/material';
import StyledInput from '../ui/StyledInput';
import ActionIconButton from './ActionIconBtn';
interface SearchInputProps {
  initialValue?: string;
}

const SearchInput = ({ initialValue }: SearchInputProps) => {
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === '') {
      setIsError(true);
      return;
    }
    navigate('/search', { state: { searchValue: value.trim() } });
  };

  const onCLoseError = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsError(false);
  };

  return (
    <Box
      component='form'
      sx={{
        width: '100%',
        minWidth: '250px',
        height: '60px',
        position: 'relative',
      }}
      onSubmit={onSubmit}
    >
      <StyledInput
        id='search-breeds-by-name'
        placeholder='Search for breeds by name'
        variant='outlined'
        value={value}
        inputProps={{}}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
        autoComplete='off'
      />
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '40px',
          height: '40px',
        }}
      >
        <ActionIconButton type='submit' isWhite={false} icon='search' />
      </Box>
      <Snackbar open={isError} autoHideDuration={4000} onClose={onCLoseError}>
        <Alert onClose={onCLoseError} severity='error' icon={false}>
          Query field is empty
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SearchInput;
