// src/components/sections/Skills/SkillCard.jsx
import React, { useState } from 'react';

const SkillCard = ({ skill, delay = 0, isVisible }) => {
  const { name, icon: IconComponent, color } = skill;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`
        group relative bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm hover:shadow-lg 
        transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-102
        border border-gray-200 dark:border-gray-800 overflow-hidden
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{ 
        transitionDelay: `${delay}ms`,
        boxShadow: isHovered ? `0 8px 25px -8px ${color}25` : undefined
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient effect */}
      <div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        style={{
          background: `linear-gradient(135deg, ${color}05, ${color}08)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center space-x-3">
        {/* Icon container */}
        <div 
          className={`
            w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
            transform group-hover:scale-105
          `}
          style={{ 
            background: `linear-gradient(135deg, ${color}15, ${color}20)`,
          }}
        >
          <IconComponent 
            size={20} 
            style={{ 
              color: color,
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }} 
          />
        </div>
        
        {/* Skill name */}
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white transition-colors duration-300">
            {name}
          </h4>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div 
        className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
          isHovered ? 'w-full' : 'w-0'
        }`}
        style={{ 
          backgroundColor: color
        }}
      />
    </div>
  );
};

export default SkillCard;