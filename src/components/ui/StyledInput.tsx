import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledInput = styled(TextField)(({ theme, value }) => {
  const colorForBorder: string = value
    ? theme.palette.primary.main
    : 'transparent';
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

export default StyledInput;
