import React, { useMemo } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { themeFn } from './config/theme';
import { useThemeContext } from './config/themeContext';

import './App.css';
import AppRouter from './components/Main/AppRouter';

function App() {
  const { mode } = useThemeContext();

  const themeSettings = useMemo(() => {
    return themeFn(mode);
  }, [mode]);

  const theme = useMemo(() => createTheme(themeSettings), [themeSettings]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
