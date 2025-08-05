// src/components/sections/Skills/SkillBar.jsx
import React from 'react';

const SkillBar = ({ skill, delay = 0, isVisible }) => {
  const { name, level, icon } = skill;

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="w-6 h-6 flex items-center justify-center">
              <img 
                src={`/assets/icons/tech-icons/${icon}.svg`} 
                alt={name}
                className="w-5 h-5"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
          <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {name}
          </span>
        </div>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {level}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{
            width: isVisible ? `${level}%` : '0%',
            transitionDelay: `${delay}ms`
          }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkillBar;