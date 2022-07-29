import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledInputForSelect = styled(InputBase)(({ theme }) => ({
  maxHeight: '40px',
  boxSizing: 'border-box',
  textTransform: 'capitalize',

  '& .MuiSelect-select': {
    width: '100%',
    padding: '7px 32px 6px 10px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.bgColor.light,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    border: `2px solid transparent`,
  },

  '&.white .MuiSelect-select': {
    backgroundColor:
      theme.palette.mode === 'light' ? theme.bgColor.light : theme.bgColor.dark,
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

export default StyledInputForSelect;
