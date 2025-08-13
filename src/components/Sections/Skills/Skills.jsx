// src/components/Sections/Skills/Skills.jsx
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useIntersectionObserver } from '../../Hooks/useIntersectionObserver';
import SkillBar from './SkillBar';
import { skills } from '../../Data/Skills';

// 3D Skill Orb Component
const SkillOrb = ({ skill, position, index, isVisible }) => {
  const orbRef = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!orbRef.current || !isVisible) return;

    const startDelay = index * 200;
    
    // Initial position (off-screen)
    orbRef.current.style.transform = `translate3d(${position.x}px, ${position.y + 100}px, 0) scale(0)`;
    orbRef.current.style.opacity = '0';

    const timer = setTimeout(() => {
      orbRef.current.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
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
          relative w-16 h-16 rounded-full cursor-pointer transition-all duration-300 transform
          ${hovered ? 'scale-125' : 'scale-100'}
        `}
        style={{
          background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`,
          border: `2px solid ${skill.color}`,
          boxShadow: hovered 
            ? `0 0 30px ${skill.color}50, 0 0 60px ${skill.color}30` 
            : `0 0 20px ${skill.color}30`,
        }}
      >
        {/* Animated background */}
        <div 
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, ${skill.color}10, transparent 70%)`,
          }}
        />
        
        {/* Skill name */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="text-xs font-bold text-white text-center leading-tight px-1"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
          >
            {skill.name.replace(' & ', '\n&\n').replace(' ', '\n')}
          </span>
        </div>
        
        {/* Skill level indicator */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-semibold shadow-lg border dark:border-gray-600">
            {skill.level}%
          </div>
        </div>
        
        {/* Hover tooltip */}
        {hovered && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap border dark:border-gray-600 z-50">
            {skill.name} - {skill.level}%
          </div>
        )}
      </div>
    </div>
  );
};

// Three.js Background Particles Component
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

    // Create floating particles
    const particles = [];
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    
    for (let i = 0; i < 50; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x3b82f6 : i % 3 === 1 ? 0x10b981 : 0x8b5cf6,
        transparent: true,
        opacity: 0.6
      });
      
      const particle = new THREE.Mesh(particleGeometry, material);
      particle.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      particle.speed = {
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.005
      };

      scene.add(particle);
      particles.push(particle);
    }

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);

      particles.forEach(particle => {
        particle.position.x += particle.speed.x;
        particle.position.y += particle.speed.y;
        particle.position.z += particle.speed.z;
        
        // Boundary check
        if (Math.abs(particle.position.x) > 15) particle.speed.x *= -1;
        if (Math.abs(particle.position.y) > 10) particle.speed.y *= -1;
        if (Math.abs(particle.position.z) > 10) particle.speed.z *= -1;
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
  const [viewMode, setViewMode] = useState('traditional'); // 'traditional' or '3d'

  // Calculate orbital positions for skills
  const getOrbitalPosition = (index, total, radius = 160) => {
    const angle = (index / total) * 2 * Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  const currentSkills = skills[activeCategory].items;

  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* 3D Background Particles - only visible in 3D mode */}
      {viewMode === '3d' && <FloatingParticles />}
      
      <div className="max-w-6xl mx-auto relative z-10">
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
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              {viewMode === '3d' 
                ? 'Interactive 3D visualization of my technical expertise and proficiency levels'
                : 'Here are the technologies and tools I work with to bring ideas to life'
              }
            </p>

            {/* View Mode Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-white dark:bg-gray-700 rounded-full p-1 shadow-lg">
                <button
                  onClick={() => setViewMode('traditional')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    viewMode === 'traditional'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                  }`}
                >
                  Traditional View
                </button>
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    viewMode === '3d'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-purple-600'
                  }`}
                >
                  3D Interactive
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'traditional' ? (
            /* Traditional Skills Grid */
            <>
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {skills.map((category, categoryIndex) => (
                  <div 
                    key={category.category}
                    className={`space-y-6 transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}
                    style={{ transitionDelay: `${categoryIndex * 200}ms` }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                      <span 
                        className="inline-block w-8 h-8 rounded-lg mr-3"
                        style={{ 
                          background: `linear-gradient(135deg, ${category.color}, ${category.color}80)` 
                        }}
                      />
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
            </>
          ) : (
            /* 3D Interactive Skills Visualization */
            <>
              {/* Category Selector */}
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                {skills.map((category, index) => (
                  <button
                    key={category.category}
                    onClick={() => setActiveCategory(index)}
                    className={`
                      px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105
                      ${activeCategory === index 
                        ? 'text-white shadow-lg' 
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }
                    `}
                    style={activeCategory === index ? {
                      background: `linear-gradient(135deg, ${category.color}, ${category.color}80)`,
                      boxShadow: `0 10px 25px ${category.color}30`
                    } : {}}
                  >
                    {category.category}
                  </button>
                ))}
              </div>

              {/* 3D Skills Visualization */}
              <div className="relative h-96 flex items-center justify-center mb-16">
                {/* Central Hub */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-white shadow-2xl animate-pulse"
                    style={{
                      background: `linear-gradient(135deg, ${skills[activeCategory].color}, ${skills[activeCategory].color}80)`,
                      boxShadow: `0 0 40px ${skills[activeCategory].color}50`
                    }}
                  >
                    <span className="text-sm text-center leading-tight">
                      {skills[activeCategory].category.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Skill Orbs in Orbital Pattern */}
                {currentSkills.map((skill, index) => {
                  const position = getOrbitalPosition(index, currentSkills.length, 160);
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

                {/* Connecting Lines Animation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {currentSkills.map((_, index) => {
                    const position = getOrbitalPosition(index, currentSkills.length, 160);
                    const centerX = '50%';
                    const centerY = '50%';
                    const skillX = `calc(50% + ${position.x}px)`;
                    const skillY = `calc(50% + ${position.y}px)`;
                    
                    return (
                      <line
                        key={index}
                        x1={centerX}
                        y1={centerY}
                        x2={skillX}
                        y2={skillY}
                        stroke={skills[activeCategory].color}
                        strokeWidth="2"
                        opacity="0.3"
                        style={{
                          strokeDasharray: "200",
                          strokeDashoffset: isVisible ? "0" : "200",
                          transition: `stroke-dashoffset 1s ease ${index * 200}ms`
                        }}
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Interactive Controls */}
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Click on a category above or hover over skill orbs to explore
                </p>
                
                {/* Auto-rotate toggle */}
                <button
                  onClick={() => {
                    const interval = setInterval(() => {
                      setActiveCategory(prev => (prev + 1) % skills.length);
                    }, 3000);
                    
                    setTimeout(() => clearInterval(interval), 15000);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Auto-Explore Skills
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes draw-line {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-draw-line {
          animation: draw-line 1s ease forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Skills;