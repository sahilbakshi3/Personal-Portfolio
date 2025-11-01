import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);
  const canvasRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const animationRef = useRef(null);
  
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

  // Detect system dark mode preference
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Black hole canvas animation with lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
        this.trail = [];
        this.maxTrailLength = 30;
      }

      reset() {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * Math.max(canvas.width, canvas.height);
        this.x = canvas.width / 2 + Math.cos(angle) * distance;
        this.y = canvas.height / 2 + Math.sin(angle) * distance;
        this.speed = Math.random() * 0.5 + 0.2;
        this.hue = Math.random() * 60 + 200; // Blue to purple range
        this.opacity = Math.random() * 0.5 + 0.3;
        this.spiralOffset = Math.random() * Math.PI * 2;
        this.trail = [];
      }

      update() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Store current position in trail
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrailLength) {
          this.trail.shift();
        }
        
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        
        // Spiral effect
        const spiralAngle = angle + (1 / (distance + 50)) * 10 + this.spiralOffset;
        
        this.x += Math.cos(spiralAngle) * this.speed * (distance / 100);
        this.y += Math.sin(spiralAngle) * this.speed * (distance / 100);
        
        // Increase speed as it gets closer
        this.speed += 0.02;
        
        // Reset if too close to center
        if (distance < 30) {
          this.reset();
        }

        // Fade as approaching center
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
        
        // Calculate opacity gradient along the line
        const gradient = ctx.createLinearGradient(
          this.trail[0].x, 
          this.trail[0].y, 
          this.x, 
          this.y
        );
        
        gradient.addColorStop(0, `hsla(${this.hue}, 80%, 60%, 0)`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 80%, 60%, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 80%, 60%, ${this.opacity})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      // Fade effect based on mode
      if (isDarkMode) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw black hole center
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Outer glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150);
      
      if (isDarkMode) {
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        gradient.addColorStop(0.3, 'rgba(30, 20, 60, 0.8)');
        gradient.addColorStop(0.6, 'rgba(60, 40, 120, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(220, 210, 255, 0.8)');
        gradient.addColorStop(0.6, 'rgba(180, 160, 240, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Event horizon
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = isDarkMode ? '#000' : '#fff';
      ctx.fill();

      // Accretion disk ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, 35 + Math.sin(time * 0.05) * 3, 0, Math.PI * 2);
      ctx.strokeStyle = isDarkMode 
        ? `rgba(100, 50, 200, ${0.5 + Math.sin(time * 0.1) * 0.3})`
        : `rgba(120, 80, 220, ${0.5 + Math.sin(time * 0.1) * 0.3})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDarkMode]);

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
      className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Black Hole Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: isDarkMode ? '#000' : '#fff' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="p-8 md:p-12">
          {/* Main Heading */}
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

          {/* Animated Role with Scrambling Effect */}
          <div className="h-16 mb-8">
            <p className={`text-xl md:text-3xl ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              I'm a{' '}
              <span className="font-mono font-semibold relative">
                {displayText.split('').map((char, index) => (
                  <span
                    key={index}
                    className={`
                      inline-block transition-all duration-100
                      ${isScrambling && Math.random() > 0.7 
                        ? `${isDarkMode ? 'text-blue-400' : 'text-blue-600'} animate-pulse transform scale-110` 
                        : isDarkMode ? 'text-blue-400' : 'text-blue-600'
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
                <span className={`animate-pulse ml-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>|</span>
              </span>
            </p>
          </div>

          {/* Description */}
          <p className={`text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
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
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown size={32} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
      </div>
    </section>
  );
};

export default Hero;