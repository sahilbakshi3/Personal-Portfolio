import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
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

  const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';

  const getRandomChar = () => {
    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  };

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
          scrambledText += targetText[i];
        } else {
          scrambledText += getRandomChar();
        }
      }
      
      setDisplayText(scrambledText);
      iteration++;
      
      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current);
        setDisplayText(targetText);
        setIsScrambling(false);
        
        timeoutRef.current = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 80);
  };

  useEffect(() => {
    const currentRole = roles[currentIndex];
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
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
      className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full opacity-20 dark:opacity-30 animate-pulse blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-600 dark:from-purple-500 dark:to-pink-700 rounded-full opacity-20 dark:opacity-30 animate-pulse blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400 to-purple-600 dark:from-indigo-500 dark:to-purple-700 rounded-full opacity-10 dark:opacity-20 animate-pulse blur-3xl" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="p-8 md:p-12">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-gray-900 dark:text-white mb-2">
              Hi, I'm
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Sahil Bakshi
            </span>
          </h1>

          {/* Animated Role with Scrambling Effect */}
          <div className="h-16 mb-8">
            <p className="text-xl md:text-3xl text-gray-700 dark:text-gray-200">
              I'm a{' '}
              <span className="font-mono font-semibold relative">
                {displayText.split('').map((char, index) => (
                  <span
                    key={index}
                    className={`
                      inline-block transition-all duration-100
                      ${isScrambling && Math.random() > 0.7 
                        ? 'text-blue-600 dark:text-blue-400 animate-pulse transform scale-110' 
                        : 'text-blue-600 dark:text-blue-400'
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
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Building digital experiences that make a difference, one line of code at a time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-full font-medium border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown size={32} className="text-gray-600 dark:text-gray-400" />
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .dark .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
};

export default Hero;