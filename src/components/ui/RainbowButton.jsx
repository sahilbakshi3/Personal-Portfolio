
import React from 'react';

const RainbowButton = ({
  as: Component = 'button',
  className = '',
  speed = '0.75s',
  children,
  onClick,
  disabled = false,
  type = 'button',
  ...rest
}) => {
  return (
    <Component
      type={Component === 'button' ? type : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-block text-white no-underline rounded-lg overflow-hidden p-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        minWidth: '200px',
        textAlign: 'center'
      }}
      {...rest}
    >
      {/* Animated gradient background */}
      <div
        className="absolute top-0 left-0 w-[200%] h-full pointer-events-none animate-rainbow-slide"
        style={{
          background: 'linear-gradient(115deg, #4fcf70, #fad648, #a767e5, #12bcfe, #44ce7b)',
          backgroundSize: '50% 100%',
          animationDuration: speed,
          animationPlayState: disabled ? 'paused' : 'running'
        }}
      />
      
      {/* Inner content with black background */}
      <span className="relative z-10 py-3.5 px-6 bg-black rounded-md flex items-center justify-center text-lg font-medium">
        {children}
      </span>
      
      <style jsx>{`
        @keyframes rainbow-slide {
          to {
            transform: translateX(-50%);
          }
        }
        .animate-rainbow-slide {
          animation: rainbow-slide linear infinite;
        }
      `}</style>
    </Component>
  );
};

export default RainbowButton;