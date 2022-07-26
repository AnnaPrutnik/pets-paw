import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CardsRoutes } from '../../types';

type Props = {
  image: string;
  title: 'voting' | 'breeds' | 'gallery';
  isActive: boolean;
};

type StyledBoxProps = {
  title: 'voting' | 'breeds' | 'gallery';
  image: string;
};

const StyledBox = styled(Box)<StyledBoxProps>(({ theme, title, image }) => {
  return {
    boxSizing: 'border-box',
    backgroundColor: theme.cards[title],
    border: '4px solid rgba(255, 255, 255, 0.6)',
    flex: '1 1 0',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundImage: `url(${image})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    '.card-item:hover &': {
      border: `4px solid ${theme.palette.common.white}`,
    },

    '&.active': {
      border: `4px solid ${theme.palette.primary.light}`,
    },
  };
});

const StyledButton = styled(Button)(({ theme }) => {
  return {
    width: '100%',
    borderRadius: '10px',

    padding: '10px 0',
    backgroundColor: theme.palette.common.white,

    '.card-item:hover &': {
      backgroundColor: theme.palette.primary.light,
    },

    '.card-item:active &': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },

    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  };
});

const MenuOption = ({ image, title, isActive }: Props) => {
  return (
    <Box
      sx={{
        width: 138,
        height: 244,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
      className='card-item'
    >
      <StyledBox
        title={title}
        image={image}
        className={isActive ? 'active' : 'non-active'}
        mb='10px'
      />
      <StyledButton
        disableRipple
        className={isActive ? 'active' : 'non-active'}
      >
        {title}
      </StyledButton>
    </Box>
  );
};

export default MenuOption;
