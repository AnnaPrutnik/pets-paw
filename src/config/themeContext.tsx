import React, { useState, useContext, createContext, useEffect } from 'react';
import { Theme } from '../types';

interface ThemeContextInterface {
  mode: Theme;
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface | null>(null);

const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [mode, setMode] = useState<Theme>(() => {
    let theme = JSON.parse(localStorage.getItem('theme') as Theme);
    if (theme === 'light' || theme === 'dark') {
      return theme;
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(mode));
  }, [mode]);

  const toggleMode = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useThemeContext() {
  return useContext(ThemeContext) as ThemeContextInterface;
}

export default ThemeProvider;
