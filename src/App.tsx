import React from 'react';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './utils/theme';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import './App.css';
import AppRouter from './components/Main/AppRouter';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
