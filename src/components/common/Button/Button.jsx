import React, { memo } from 'react';

const Button = memo(({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  rainbow = false, // NEW ✅
  type = 'button',
  ...props 
}) => {

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-full
    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed relative z-[1]
  `;

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl',
    outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white',
    ghost: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/20',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const btn = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  return rainbow ? (
    <div className="rainbow-border rounded-full inline-block">
      <button
        type={type}
        onClick={onClick}
        className={btn + " bg-black/90 dark:bg-black text-white"} // inner fill color
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </div>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={btn}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
