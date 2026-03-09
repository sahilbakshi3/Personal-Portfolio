// src/context/ThemeContext.jsx
// Luxury minimal = light only. Clean, intentional, no half-baked toggle.
import React, { createContext, useContext } from "react";

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Always light — the palette is built around warm off-white.
  // Dark mode can be added back later as a deliberate design decision.
  return (
    <ThemeContext.Provider value={{ isDarkMode: false, toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};
