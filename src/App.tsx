import React, { useMemo } from 'react';
import { ThemeProvider, CssBaseline, createTheme, Box } from '@mui/material';
import { themeFn } from './config/theme';
import { useThemeContext } from './config/themeContext';

import './App.css';
import AppRouter from './components/screens/AppRouter';

function App() {
  const { mode } = useThemeContext();

  const themeSettings = useMemo(() => {
    return themeFn(mode);
  }, [mode]);

  const theme = useMemo(() => createTheme(themeSettings), [themeSettings]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: (theme) => theme.bgColor.dark }}>
        <AppRouter />
      </Box>
    </ThemeProvider>
  );
}

export default App;
