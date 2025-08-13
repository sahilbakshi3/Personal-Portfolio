// src/components/Sections/Hero/Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useIntersectionObserver } from '../../Hooks/useIntersectionObserver';
import Button from '../../common/Button/Button';
import { personalInfo } from '../../Data/PersonalInfo';

const Hero = () => {
  const [elementRef, isVisible] = useIntersectionObserver();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  
  const roles = [
    'Web Developer',
    'UI/UX Designer', 
    'Electronics Engineer',
    'Problem Solver'
  ];

  // Characters used for scrambling effect
  const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';

  // Function to get random scramble character
  const getRandomChar = () => {
    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  };

  // Scrambled text animation effect
  const animateToText = (targetText) => {
    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = 30;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      let scrambledText = '';
      
      for (let i = 0; i < targetText.length; i++) {
        if (iteration > i * 2) {
          // Gradually reveal the correct character
          scrambledText += targetText[i];
        } else {
          // Show scrambled character
          scrambledText += getRandomChar();
        }
      }
      
      setDisplayText(scrambledText);
      iteration++;
      
      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current);
        setDisplayText(targetText);
        setIsScrambling(false);
        
        // Schedule next role change
        timeoutRef.current = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 80);
  };

  // Main typewriter effect with scrambling
  useEffect(() => {
    const currentRole = roles[currentIndex];
    
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Start scrambling animation to new text
    const startDelay = setTimeout(() => {
      animateToText(currentRole);
    }, 100);
    
    return () => {
      clearTimeout(startDelay);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={elementRef}
      className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Greeting */}
          {/* <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
              👋 Welcome to my portfolio
            </span>
          </div> */}

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-gray-900 dark:text-white mb-2">
              Hi, I'm
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </h1>

          {/* Animated Role with Scrambling Effect */}
          <div className="h-16 mb-8">
            <p className="text-xl md:text-3xl text-gray-600 dark:text-gray-300">
              I'm a{' '}
              <span className="font-mono font-semibold relative">
                {displayText.split('').map((char, index) => (
                  <span
                    key={index}
                    className={`
                      inline-block transition-all duration-100
                      ${isScrambling && Math.random() > 0.7 
                        ? 'text-blue-600 animate-pulse transform scale-110' 
                        : 'text-blue-600'
                      }
                    `}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      transform: isScrambling && Math.random() > 0.8 
                        ? `translateY(${Math.random() * 4 - 2}px)` 
                        : 'none'
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
                <span className="animate-pulse text-blue-400 ml-1">|</span>
              </span>
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {personalInfo.bio.short}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => scrollToSection('projects')}
              variant="primary"
              size="lg"
              className="transform hover:scale-105 transition-all duration-300"
            >
              View My Work
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              size="lg"
              className="transform hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-gray-400" />
      </div>

      <style jsx>{`
        @keyframes glitch-effect {
          0%, 100% { 
            transform: translate(0); 
            filter: hue-rotate(0deg);
          }
          20% { 
            transform: translate(-1px, 1px); 
            filter: hue-rotate(90deg);
          }
          40% { 
            transform: translate(-1px, -1px); 
            filter: hue-rotate(180deg);
          }
          60% { 
            transform: translate(1px, 1px); 
            filter: hue-rotate(270deg);
          }
          80% { 
            transform: translate(1px, -1px); 
            filter: hue-rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;