import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroWithF1Background = () => {
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
    // Set dark mode as default on component mount
    document.documentElement.classList.add('dark');
    
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
      className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* 3D Model Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          title="Formula 1 RedBull Background" 
          frameBorder="0" 
          allowFullScreen 
          mozallowfullscreen="true" 
          webkitallowfullscreen="true" 
          allow="autoplay; fullscreen; xr-spatial-tracking" 
          xr-spatial-tracking="true" 
          execution-while-out-of-viewport="true" 
          execution-while-not-rendered="true" 
          web-share="true" 
          src="https://sketchfab.com/models/d0a2cfaecfc341d69aa44005f0624f94/embed?ui_theme=dark&autostart=1&preload=1&ui_infos=0&ui_controls=0&ui_watermark=0&ui_hint=0&ui_settings=0&ui_help=0&transparent=1&camera=0"
          className="w-full h-full opacity-35 dark:opacity-40"
          style={{ pointerEvents: 'none' }}
        />
        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/85 dark:from-gray-900/60 dark:via-gray-900/40 dark:to-gray-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/60 via-transparent to-purple-50/60 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-500/30 rounded-full opacity-20 animate-pulse blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-500/30 rounded-full opacity-20 animate-pulse blur-3xl" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-3xl p-8 md:p-12">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-gray-900 dark:text-white mb-2 drop-shadow-lg">
              Hi, I'm
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-2xl">
              Sahil Bakshi
            </span>
          </h1>

          {/* Animated Role with Scrambling Effect */}
          <div className="h-16 mb-8">
            <p className="text-xl md:text-3xl text-gray-700 dark:text-gray-200 drop-shadow-md">
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
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Building digital experiences that make a difference, one line of code at a time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 px-8 py-4 rounded-full font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
          
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown size={32} className="text-gray-600 dark:text-gray-400 drop-shadow-lg" />
      </div>
    </section>
  );
};

export default HeroWithF1Background;