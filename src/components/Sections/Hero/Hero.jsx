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
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
              👋 Welcome to my portfolio
            </span>
          </div>

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

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mt-12">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href={personalInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
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