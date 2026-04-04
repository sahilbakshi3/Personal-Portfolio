// src/context/ThemeContext.jsx
import React, { createContext, useContext } from "react";
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});
export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={{ isDarkMode: false, toggleTheme: () => {} }}>
    {children}
  </ThemeContext.Provider>
);
