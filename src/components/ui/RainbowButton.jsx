import React from 'react';

const RainbowButton = ({
  as: Component = 'button',
  className = '',
  speed = '6s',
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
      className={`relative inline-flex items-center justify-center overflow-visible transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
      {...rest}
    >
      {/* Animated Rainbow Border Container */}
      <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
        {/* Bottom rainbow light */}
        <div
          className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom"
          style={{
            background: 'radial-gradient(circle, #ff0000 0%, #ff7f00 14%, #ffff00 28%, #00ff00 42%, #0000ff 57%, #4b0082 71%, #9400d3 85%, transparent 100%)',
            animationDuration: speed
          }}
        />
        
        {/* Top rainbow light */}
        <div
          className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top"
          style={{
            background: 'radial-gradient(circle, #9400d3 0%, #4b0082 14%, #0000ff 28%, #00ff00 42%, #ffff00 57%, #ff7f00 71%, #ff0000 85%, transparent 100%)',
            animationDuration: speed
          }}
        />
      </div>
      
      {/* Glass morphism button content */}
      <span className="relative inline-flex items-center justify-center select-none font-medium text-center px-6 py-3 text-white text-base rounded-lg bg-white/[0.025] border border-white/50 backdrop-blur-sm shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] hover:bg-white/[0.15] transition-all duration-300 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none">
        <span className="relative z-10">{children}</span>
      </span>
    </Component>
  );
};

export default RainbowButton;