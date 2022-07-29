import { ImageListItemBar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledImageBar = styled(ImageListItemBar)(() => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(255, 134, 142, 0.6)',
  opacity: 0,
  cursor: 'pointer',

  '.MuiImageListItem-root:hover &': {
    opacity: 1,
  },
}));

export default StyledImageBar;
