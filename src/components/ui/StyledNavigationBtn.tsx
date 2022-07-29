import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledNavigationBtn = styled(Button)(({ theme }) => ({
  height: '40px',
  width: '122px',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  borderRadius: '10px',

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },

  '&:disabled': {
    backgroundColor: theme.bgColor,
    color: theme.palette.text.secondary,
  },
}));

export default StyledNavigationBtn;
