import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import StyledInputForSelect from '../ui/StyledSelect';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface CustomSelectProps<T> {
  value: string;
  changeValue: (value: string) => void;
  options: T[];
  label: string;
  isLabelVisible?: boolean;
}

const CustomSelect = <T extends { id: string | number; name: string }>({
  value,
  changeValue,
  options,
  label,
  isLabelVisible = false,
}: CustomSelectProps<T>) => {
  const onChange = (e: SelectChangeEvent<string>) => {
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
        onChange={onChange}
        IconComponent={KeyboardArrowDownIcon}
        input={<StyledInputForSelect fullWidth />}
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
