import React, { memo } from 'react';

const Navigation = memo(({ navItems, activeSection, onNavigate, className = '', mobile = false }) => {
  return (
    <nav className={className}>
      {navItems.map((item) => (
        <button
          key={item}
          onClick={() => onNavigate(item)}
          className={`
            capitalize transition-colors duration-200 font-medium
            ${mobile 
              ? 'block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
              : 'px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
            }
            ${activeSection === item 
              ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
              : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }
          `}
        >
          {item}
        </button>
      ))}
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
