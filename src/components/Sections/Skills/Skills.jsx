// src/components/Sections/Skills/Skills.jsx
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useIntersectionObserver } from '../../Hooks/useIntersectionObserver';
import SkillCard from './SkillCard';
import { skills } from '../../Data/Skills';

// 3D Skill Orb Component (Compact version with React Icons)
const SkillOrb = ({ skill, position, index, isVisible }) => {
  const orbRef = useRef();
  const [hovered, setHovered] = useState(false);
  const IconComponent = skill.icon;

  useEffect(() => {
    if (!orbRef.current || !isVisible) return;

    const startDelay = index * 150;
    
    orbRef.current.style.transform = `translate3d(${position.x}px, ${position.y + 60}px, 0) scale(0)`;
    orbRef.current.style.opacity = '0';

    const timer = setTimeout(() => {
      orbRef.current.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      orbRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) scale(1)`;
      orbRef.current.style.opacity = '1';
    }, startDelay);

    return () => clearTimeout(timer);
  }, [position, index, isVisible]);

  return (
    <div
      ref={orbRef}
      className="absolute"
      style={{ left: '50%', top: '50%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div 
        className={`
          relative w-16 h-16 rounded-full cursor-pointer transition-all duration-300 transform flex items-center justify-center
          ${hovered ? 'scale-110' : 'scale-100'}
        `}
        style={{
          background: `linear-gradient(135deg, ${skill.color}25, ${skill.color}40)`,
          border: `2px solid ${skill.color}`,
          boxShadow: hovered 
            ? `0 0 25px ${skill.color}40, 0 0 50px ${skill.color}20` 
            : `0 0 15px ${skill.color}20`,
        }}
      >
        {/* Skill icon */}
        <IconComponent 
          size={24} 
          color="white" 
          style={{ 
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))',
            transition: 'transform 0.3s ease',
            transform: hovered ? 'scale(1.1)' : 'scale(1)'
          }} 
        />
        
        {/* Experience indicator */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs font-medium shadow-md border dark:border-gray-600 whitespace-nowrap">
            {skill.experience}
          </div>
        </div>
        
        {/* Hover tooltip */}
        {hovered && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg shadow-lg text-xs font-medium whitespace-nowrap border dark:border-gray-600 z-50">
            {skill.name}
          </div>
        )}
      </div>
    </div>
  );
};

// Simplified Background Particles
const FloatingParticles = () => {
  const mountRef = useRef();
  
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const particles = [];
    const particleGeometry = new THREE.SphereGeometry(0.03, 6, 6);
    
    for (let i = 0; i < 30; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x3b82f6 : i % 3 === 1 ? 0x10b981 : 0x8b5cf6,
        transparent: true,
        opacity: 0.4
      });
      
      const particle = new THREE.Mesh(particleGeometry, material);
      particle.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );
      
      particle.speed = {
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.003
      };

      scene.add(particle);
      particles.push(particle);
    }

    camera.position.z = 12;

    const animate = () => {
      requestAnimationFrame(animate);

      particles.forEach(particle => {
        particle.position.x += particle.speed.x;
        particle.position.y += particle.speed.y;
        particle.position.z += particle.speed.z;
        
        if (Math.abs(particle.position.x) > 12) particle.speed.x *= -1;
        if (Math.abs(particle.position.y) > 8) particle.speed.y *= -1;
        if (Math.abs(particle.position.z) > 8) particle.speed.z *= -1;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particles.forEach(particle => {
        particle.geometry.dispose();
        particle.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />;
};

const Skills = () => {
  const [elementRef, isVisible] = useIntersectionObserver();
  const [activeCategory, setActiveCategory] = useState(0);
  const [viewMode, setViewMode] = useState('cards');

  const getOrbitalPosition = (index, total, radius = 140) => {
    const angle = (index / total) * 2 * Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  const currentSkills = skills[activeCategory].items;

  return (
    <section id="skills" className="py-16 px-4 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {viewMode === '3d' && <FloatingParticles />}
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Compact Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Skills & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tech Stack</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              Technologies I use to build modern web applications
            </p>

            {/* Compact View Toggle */}
            <div className="inline-flex bg-white dark:bg-gray-700 rounded-lg p-1 shadow-md">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewMode === 'cards'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('3d')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewMode === '3d'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600'
                }`}
              >
                3D
              </button>
            </div>
          </div>

          {viewMode === 'cards' ? (
            /* Compact Grid Layout */
            <div className="space-y-8">
              {skills.map((category, categoryIndex) => (
                <div key={category.category}>
                  {/* Compact Category Header */}
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-3 h-8 rounded-full mr-3"
                      style={{ backgroundColor: category.color }}
                    />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.category}
                    </h3>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600 ml-4" />
                  </div>

                  {/* Compact Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                    {category.items.map((skill, skillIndex) => (
                      <SkillCard
                        key={skill.name}
                        skill={skill}
                        delay={(categoryIndex * 100) + (skillIndex * 50)}
                        isVisible={isVisible}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Compact Legend */}
              <div className="mt-8 bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex flex-wrap justify-center gap-4 text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">3+ years</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">2+ years</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">1+ years</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">6+ months</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Compact 3D View */
            <>
              {/* Category Selector */}
              <div className="flex justify-center gap-2 mb-8">
                {skills.map((category, index) => (
                  <button
                    key={category.category}
                    onClick={() => setActiveCategory(index)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                      ${activeCategory === index 
                        ? 'text-white shadow-lg' 
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }
                    `}
                    style={activeCategory === index ? {
                      background: `linear-gradient(135deg, ${category.color}, ${category.color}80)`,
                    } : {}}
                  >
                    {category.category}
                  </button>
                ))}
              </div>

              {/* Compact 3D Visualization */}
              <div className="relative h-80 flex items-center justify-center mb-8">
                {/* Central Hub */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${skills[activeCategory].color}, ${skills[activeCategory].color}80)`,
                      boxShadow: `0 0 30px ${skills[activeCategory].color}40`
                    }}
                  >
                    <span className="text-xs text-center">
                      {skills[activeCategory].items.length}
                    </span>
                  </div>
                </div>

                {/* Skill Orbs */}
                {currentSkills.map((skill, index) => {
                  const position = getOrbitalPosition(index, currentSkills.length, 140);
                  return (
                    <SkillOrb
                      key={`${activeCategory}-${skill.name}`}
                      skill={skill}
                      position={position}
                      index={index}
                      isVisible={isVisible}
                    />
                  );
                })}

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {currentSkills.map((_, index) => {
                    const position = getOrbitalPosition(index, currentSkills.length, 140);
                    return (
                      <line
                        key={index}
                        x1="50%"
                        y1="50%"
                        x2={`calc(50% + ${position.x}px)`}
                        y2={`calc(50% + ${position.y}px)`}
                        stroke={skills[activeCategory].color}
                        strokeWidth="1.5"
                        opacity="0.25"
                        style={{
                          strokeDasharray: "100",
                          strokeDashoffset: isVisible ? "0" : "100",
                          transition: `stroke-dashoffset 0.8s ease ${index * 100}ms`
                        }}
                      />
                    );
                  })}
                </svg>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;