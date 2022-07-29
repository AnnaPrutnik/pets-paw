import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';

const StyledVotesIconBtn = styled(IconButton)(({ theme }) => ({
  width: '60px',
  height: '60px',
  fill: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.bgColor.light,

  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },

  '&:active': {
    backgroundColor: theme.palette.primary.main,
    fill: theme.palette.common.white,
  },

  '&.active': {
    backgroundColor: theme.palette.primary.main,
    fill: theme.palette.common.white,
  },
}));

export default StyledVotesIconBtn;
