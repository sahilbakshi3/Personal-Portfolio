// src/components/sections/Skills/Skills.jsx
import React from 'react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import SkillBar from './SkillBar';
import { skills } from '../../../data/skills';

const Skills = () => {
  const [elementRef, isVisible] = useIntersectionObserver();

  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Skills & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Technologies</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to life
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {skills.map((category, categoryIndex) => (
              <div 
                key={category.category}
                className={`space-y-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${categoryIndex * 200}ms` }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="inline-block w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-3"></span>
                  {category.category}
                </h3>
                
                <div className="space-y-4">
                  {category.items.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      delay={skillIndex * 100}
                      isVisible={isVisible}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Always Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Technology evolves rapidly, and I'm constantly updating my skills and exploring new technologies. 
                Currently focusing on advanced React patterns, cloud architecture, and IoT integration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;