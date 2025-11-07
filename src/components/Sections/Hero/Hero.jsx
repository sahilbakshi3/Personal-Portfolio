import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import Aurora from '../../ui/Aurora.jsx';
import RainbowButton from '../../ui/RainbowButton.jsx';
import GradientText from '../../ui/GradientText.jsx';
import LightGlassBackground from '../../ui/LightGlassBackground.jsx'; // <-- NEW

const Hero = () => {
  const { isDarkMode } = useTheme();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const roles = useMemo(() => [
    'Web Developer',
    'UI/UX Designer',
    'Electronics Engineer',
    'Problem Solver'
  ], []);

  const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';

  const getRandomChar = useCallback(() => {
    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  }, [scrambleChars]);

  const animateToText = useCallback((targetText) => {
    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = 30;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambledText = Array.from(targetText, (char, i) =>
        iteration > i * 2 ? char : getRandomChar()
      ).join('');

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
  }, [getRandomChar, roles.length]);

  useEffect(() => {
    const currentRole = roles[currentIndex];

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const startDelay = setTimeout(() => {
      animateToText(currentRole);
    }, 100);

    return () => {
      clearTimeout(startDelay);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, roles, animateToText]);

  // We keep the effect for canvas only if you still want it elsewhere.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (isDarkMode) return;

    const ctx = canvas.getContext('2d', { alpha: false });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [isDarkMode]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section
      id="home"
      className={`pt-20 min-h-screen flex items-center justify-center relative overflow-hidden ${
        isDarkMode ? 'bg-black' : 'bg-white'
      }`}
    >
      {/* Light mode glassmorphism background */}
      {!isDarkMode && (
        <LightGlassBackground />
      )}

      {/* Dark mode aurora (WebGL) */}
      {isDarkMode && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Aurora
            colorStops={['#ee7752', '#e73c7e', '#23a6d5', '#23d5ab']}
            amplitude={1.0}
            blend={0.6}
            speed={1.0}
          />
        </div>
      )}

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className={`block mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Hi, I'm
            </span>

            {/* Animated gradient name (light & dark) */}
            <GradientText
              className="clip-text text-4xl md:text-6xl lg:text-7xl leading-tight"
              colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
              animationSpeed={8}
              showBorder={false}
            >
              Sahil Bakshi
            </GradientText>
          </h1>

          <div className="h-16 mb-8">
            <p className={`text-xl md:text-3xl ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              I'm a{' '}
              <span className="font-mono font-semibold relative">
                {displayText.split('').map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-100 ${
                      isScrambling && Math.random() > 0.7
                        ? `${isDarkMode ? 'text-blue-400' : 'text-blue-600'} animate-pulse transform scale-110`
                        : isDarkMode
                        ? 'text-blue-400'
                        : 'text-blue-600'
                    }`}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
                <span className={`animate-pulse ml-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>|</span>
              </span>
            </p>
          </div>

          <p
            className={`text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Building digital experiences that make a difference, one line of code at a time.
          </p>

          <RainbowButton onClick={() => scrollToSection('projects')}>
            View My Work
          </RainbowButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown size={32} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
      </div>
    </section>
  );
};

export default Hero;
