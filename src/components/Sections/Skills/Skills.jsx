// src/components/Sections/Skills/Skills.jsx
import React from 'react';
import { useIntersectionObserver } from '../../Hooks/useIntersectionObserver';
import SkillCard from './SkillCard';
import { skills } from '../../Data/Skills';

const Skills = () => {
  const [elementRef, isVisible] = useIntersectionObserver();

  return (
    <section id="skills" className="py-12 px-4 bg-gray-50 dark:bg-gray-900 relative">      
      <div className="max-w-6xl mx-auto relative z-10">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Compact Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Skills & 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Tech Stack</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Technologies I use to build modern web applications
            </p>
          </div>

          {/* All Skills in One Grid */}
          <div className="space-y-6">
            {skills.map((category, categoryIndex) => (
              <div key={category.category}>
                {/* Compact Category Header */}
                <div className="flex items-center mb-4">
                  <div 
                    className="w-1 h-6 rounded-full mr-3"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h3>
                  <div 
                    className="flex-1 h-px ml-4 opacity-30"
                    style={{ backgroundColor: category.color }}
                  />
                </div>

                {/* Compact Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-2">
                  {category.items.map((skill, skillIndex) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      delay={categoryIndex * 100 + skillIndex * 50}
                      isVisible={isVisible}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;