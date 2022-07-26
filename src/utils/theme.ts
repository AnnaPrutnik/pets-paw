import { createTheme } from '@mui/material';

const theme = createTheme({
  bgColor: '#F8F8F7',
  cards: {
    voting: '#B4B7FF',
    breeds: '#97EAB9',
    gallery: '#FFD280',
  },
  voting: {
    default: {
      likes: '#97EAB9',
      favorites: '#FF868E',
      dislikes: '#FFD280',
    },
    hover: {
      likes: 'rgba(151, 234, 185, 0.3)',
      favorites: 'rgba(255, 134, 142, 0.3)',
      dislikes: 'rgba(255, 210, 128, 0.3)',
    },
  },

  typography: {
    fontFamily: 'Jost, sans-serif',
    h3: {
      fontWeight: 500,
      fontSize: '2.75rem',
      lineHeight: 1.318,
    },
    h4: {
      fontWeight: 500,
      fontSize: '2.25rem',
      lineHeight: 1.445,
    },
    body2: {
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '1rem',
      lineHeight: 1.445,
    },

    button: {
      fontSize: '0.75rem',
      lineHeight: '1.333',
      letterSpacing: '0.125rem',
    },
  },

  palette: {
    primary: {
      main: '#FF868E',
      light: '#FBE0DC',
      contrastText: '#fff',
    },
    text: {
      primary: '#1D1D1D',
      secondary: '#8C8C8C',
    },
  },

  shape: {
    borderRadius: 20,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            webkitBorderRadius: '20px',
            background: 'transparent',
            borderRadius: '20px',
            opacity: 0,
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#8C8C8C',
            borderRadius: '10px',
          },
        },
      },
    },
  },
});

export default theme;
