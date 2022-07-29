import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledIconButton = styled(Button)<ButtonProps>(({ theme }) => ({
  minWidth: '40px',
  height: '40px',
  padding: 0,
  borderRadius: '10px',
  fill: theme.palette.primary.main,

  '&.white': {
    backgroundColor:
      theme.palette.mode === 'light' ? theme.bgColor.light : theme.bgColor.dark,
  },
  '&.color': {
    backgroundColor: theme.palette.primary.light,
  },

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    fill: '#fff',
  },
}));

export default StyledIconButton;
