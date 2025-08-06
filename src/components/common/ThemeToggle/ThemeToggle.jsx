// src/components/common/ThemeToggle/ThemeToggle.jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-6 h-6">
        <Sun 
          size={20} 
          className={`absolute inset-0 text-yellow-500 transition-all duration-300 ${
            isDarkMode ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
          }`} 
        />
        <Moon 
          size={20} 
          className={`absolute inset-0 text-blue-200 transition-all duration-300 ${
            isDarkMode ? 'opacity-100 rotate-0 drop-shadow-[0_0_8px_rgba(147,197,253,0.5)]' : 'opacity-0 -rotate-90'
          }`} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;