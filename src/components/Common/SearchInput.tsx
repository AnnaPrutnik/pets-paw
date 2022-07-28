import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

import ActionIconButton from './ActionIcon';

const StyledInput = styled(TextField)(({ theme, value }) => {
  const colorForBorder = value ? theme.palette.primary.main : 'transparent';
  return {
    '& .MuiOutlinedInput-input': {
      height: '60px',
      boxSizing: 'border-box',
    },

    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.bgColor.light,

      '& fieldset': {
        border: `2px solid ${colorForBorder}`,
      },
      '&:hover fieldset': {
        borderColor:
          theme.palette.mode === 'light'
            ? theme.palette.primary.light
            : theme.palette.primary.dark,
      },
      '&.Mui-focused': {
        '& fieldset': {
          borderColor: theme.palette.primary.main,
        },
      },
    },
  };
});

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      onSubmit={handleSubmit}
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
