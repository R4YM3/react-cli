import React, {createContext, useState, useEffect} from 'react';

const defaultTheme = 'white';

type ThemeContextType = {
  theme: string;
  setTheme: (value: string) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

type IProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({children}: IProps) => {
  const [theme, setTheme] = useState(defaultTheme)!;

  useEffect(() => {
    // We'd get the theme from a web API / local storage in a real app
    // We've hardcoded the theme in our example
    const currentTheme = 'dark';
    setTheme(currentTheme);
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
