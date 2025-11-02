import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const Hero = () => {
  const { isDarkMode } = useTheme(); // Get theme from context
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  
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
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
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
  }, [currentIndex, roles, animateToText]);

  // Black hole canvas animation - ONLY IN DARK MODE
  useEffect(() => {
    const canvas = canvasRef.current;
    
    // Clear and exit if not in dark mode or no canvas
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true
    });

    if (!isDarkMode) {
      // Clear canvas in light mode
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let time = 0;
    let frameCount = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 250);
    };
    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.reset();
        this.trail = [];
        this.maxTrailLength = 20;
      }

      reset() {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * Math.max(canvas.width / (Math.min(window.devicePixelRatio, 2)), canvas.height / (Math.min(window.devicePixelRatio, 2)));
        const centerX = canvas.width / (Math.min(window.devicePixelRatio, 2) * 2);
        const centerY = canvas.height / (Math.min(window.devicePixelRatio, 2) * 2);
        this.x = centerX + Math.cos(angle) * distance;
        this.y = centerY + Math.sin(angle) * distance;
        this.speed = Math.random() * 0.5 + 0.2;
        this.hue = Math.random() * 180 + 180;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.spiralOffset = Math.random() * Math.PI * 2;
        this.trail = [];
      }

      update() {
        const dpr = Math.min(window.devicePixelRatio, 2);
        const centerX = canvas.width / (dpr * 2);
        const centerY = canvas.height / (dpr * 2);
        
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrailLength) {
          this.trail.shift();
        }
        
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        
        const spiralAngle = angle + (1 / (distance + 50)) * 10 + this.spiralOffset;
        
        this.x += Math.cos(spiralAngle) * this.speed * (distance / 100);
        this.y += Math.sin(spiralAngle) * this.speed * (distance / 100);
        
        this.speed += 0.02;
        
        if (distance < 30) {
          this.reset();
        }

        if (distance < 200) {
          this.opacity = (distance / 200) * 0.8;
        }
      }

      draw() {
        if (this.trail.length < 2) return;
        
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        
        for (let i = 1; i < this.trail.length; i++) {
          ctx.lineTo(this.trail[i].x, this.trail[i].y);
        }
        
        const gradient = ctx.createLinearGradient(
          this.trail[0].x, 
          this.trail[0].y, 
          this.x, 
          this.y
        );
        
        const hue1 = this.hue;
        const hue2 = (this.hue + 60) % 360;
        const hue3 = (this.hue + 120) % 360;
        
        gradient.addColorStop(0, `hsla(${hue1}, 100%, 50%, 0)`);
        gradient.addColorStop(0.3, `hsla(${hue2}, 100%, 60%, ${this.opacity * 0.6})`);
        gradient.addColorStop(0.7, `hsla(${hue3}, 100%, 70%, ${this.opacity * 0.8})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 80%, ${this.opacity})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 60%, ${this.opacity})`;
        ctx.stroke();
        
        ctx.shadowBlur = 8;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
    particlesRef.current = [];
    const particleCount = window.innerWidth < 768 ? 75 : 120;
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle());
    }

    const animate = () => {
      frameCount++;
      
      if (window.innerWidth < 768 && frameCount % 2 === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio, 2);
      const displayWidth = canvas.width / dpr;
      const displayHeight = canvas.height / dpr;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      const centerX = displayWidth / 2;
      const centerY = displayHeight / 2;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.3, 'rgba(30, 20, 60, 0.8)');
      gradient.addColorStop(0.6, 'rgba(60, 40, 120, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = '#000';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 35 + Math.sin(time * 0.05) * 3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(100, 50, 200, ${0.5 + Math.sin(time * 0.1) * 0.3})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      particlesRef.current = [];
    };
  }, [isDarkMode]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section 
      id="home" 
      className={`pt-20 min-h-screen flex items-center justify-center relative overflow-hidden ${
        isDarkMode ? 'bg-black' : 'bg-white'
      }`}
    >
      {/* Canvas for black hole - always render but conditionally animate */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: isDarkMode ? '#000' : '#fff' }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className={`block mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Hi, I'm
            </span>
            <span className={`block bg-gradient-to-r ${
              isDarkMode 
                ? 'from-blue-400 via-purple-400 to-indigo-400' 
                : 'from-blue-600 via-purple-600 to-indigo-600'
            } bg-clip-text text-transparent`}>
              Sahil Bakshi
            </span>
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
                        : isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
                <span className={`animate-pulse ml-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>|</span>
              </span>
            </p>
          </div>

          <p className={`text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Building digital experiences that make a difference, one line of code at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View My Work
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown size={32} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
      </div>
    </section>
  );
};

export default Hero;