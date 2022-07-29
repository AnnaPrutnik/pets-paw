import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTitle = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  letterSpacing: '2px',
  lineHeight: 1.5,
  borderRadius: '10px',
  padding: '5px 30px',

  '&.color': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },

  '&.light': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
}));
export default StyledTitle;
