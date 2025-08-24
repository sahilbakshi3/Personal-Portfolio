// src/components/sections/Skills/SkillCard.jsx
import React, { useState } from 'react';

const SkillCard = ({ skill, delay = 0, isVisible }) => {
  const { name, icon: IconComponent, color, experience } = skill;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`
        group relative bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-lg 
        transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-600
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{ 
        transitionDelay: `${delay}ms`,
        boxShadow: isHovered ? `0 8px 25px ${color}15` : undefined
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top row: Icon + Name */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
            style={{ 
              background: isHovered ? `${color}20` : `${color}10`,
              color: color
            }}
          >
            <IconComponent size={18} />
          </div>
          
          <h4 className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {name}
          </h4>
        </div>
        
        {/* Experience badge */}
        <span 
          className="text-xs font-medium px-2 py-1 rounded-full"
          style={{ 
            background: `${color}15`,
            color: color
          }}
        >
          {experience}
        </span>
      </div>
      
      {/* Hover indicator line */}
      <div 
        className={`h-0.5 rounded-full transition-all duration-300 ${
          isHovered ? 'w-full' : 'w-0'
        }`}
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default SkillCard;