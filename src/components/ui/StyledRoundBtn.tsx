import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const StyledRoundButton = styled(Button)(({ theme }) => ({
  padding: 0,
  width: '10px',
  minWidth: '10px',
  height: '10px',
  borderRadius: '50%',
  '&.active': {
    backgroundColor: theme.palette.primary.main,
  },
  '&.non-active': {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default StyledRoundButton;
