import React from 'react';
import {
  Select,
  InputBase,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';

interface CustomSelectProps<T> {
  value: string;
  changeValue: (value: string) => void;
  options: T[];
  label: string;
  isLabelVisible?: boolean;
}

const StyledSelect = styled(InputBase)(({ theme }) => ({
  maxHeight: '40px',
  boxSizing: 'border-box',
  textTransform: 'capitalize',

  '& .MuiSelect-select': {
    width: '100%',
    padding: '7px 32px 6px 10px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.bgColor,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    border: '2px solid transparent',
  },

  '&.white .MuiSelect-select': {
    backgroundColor: '#fff',
    color: theme.palette.text.primary,
  },

  '&.grey .MuiSelect-select': {
    backgroundColor: theme.bgColor,
    color: theme.palette.text.secondary,
  },

  '& .MuiSelect-select:hover': {
    border: `2px solid ${theme.palette.primary.light}`,
  },
}));

const CustomSelect = <T extends { id: string | number; name: string }>({
  value,
  changeValue,
  options,
  label,
  isLabelVisible = false,
}: CustomSelectProps<T>) => {
  const handlerChange = (e: SelectChangeEvent<string>) => {
    changeValue(e.target.value);
  };

  const visibility = isLabelVisible ? 'visible' : 'hidden';
  const marginTop = isLabelVisible ? '5px' : '0px';

  return (
    <FormControl fullWidth>
      <InputLabel
        id={label.split(' ').join('-')}
        sx={{
          visibility: visibility,
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '0.625rem',
            lineHeight: 1.8,
            textTransform: 'uppercase',
          }}
        >
          {label}
        </Typography>
      </InputLabel>

      <Select
        value={value}
        onChange={handlerChange}
        IconComponent={KeyboardArrowDownIcon}
        input={<StyledSelect fullWidth />}
        MenuProps={{
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          transformOrigin: { vertical: 'top', horizontal: 'left' },
          PaperProps: {
            style: {
              width: 300,
              maxHeight: 300,
              borderRadius: '30px',
            },
          },
        }}
        className={isLabelVisible ? 'white' : 'grey'}
        sx={{ marginTop: marginTop }}
      >
        {options &&
          options.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              sx={{ textTransform: 'capitalize' }}
            >
              {option.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
