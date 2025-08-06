// src/components/common/AnimatedText/AnimatedText.jsx
import React, { useState, useEffect } from 'react';

const AnimatedText = ({ 
  finalText = "Full Stack Developer", 
  scrambledText = "F# l-!_a_{?e—eloper",
  className = "",
  delay = 0,
  duration = 3000
}) => {
  const [displayText, setDisplayText] = useState(scrambledText);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Characters used for scrambling effect
  const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';

  // Function to get random scramble character
  const getRandomChar = () => {
    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  };

  useEffect(() => {
    const startAnimation = setTimeout(() => {
      setIsAnimating(true);
      let iteration = 0;
      const maxIterations = 60;
      
      const interval = setInterval(() => {
        let newText = '';
        
        for (let i = 0; i < finalText.length; i++) {
          if (iteration > i * 2) {
            // Gradually reveal the correct character
            newText += finalText[i];
          } else {
            // Show scrambled character
            newText += getRandomChar();
          }
        }
        
        setDisplayText(newText);
        iteration++;
        
        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(finalText);
          setIsAnimating(false);
          
          // Stop cursor blinking after animation completes
          setTimeout(() => setShowCursor(false), 1000);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startAnimation);
  }, [finalText, delay, duration]);

  return (
    <span className={`font-mono ${className}`}>
      {displayText.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-100 ${
            isAnimating && Math.random() > 0.7 ? 'animate-pulse' : ''
          }`}
          style={{
            animationDelay: `${index * 20}ms`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      {showCursor && (
        <span className="animate-pulse text-blue-400 ml-1">|</span>
      )}
    </span>
  );
};

export default AnimatedText;