import React, { useState, useContext, createContext } from 'react';

type Theme = 'light' | 'dark';

//TODO: add mode to localStorage or cookie
interface ThemeContextInterface {
  mode: Theme;
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface | null>(null);

const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [mode, setMode] = useState<Theme>('light');

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
