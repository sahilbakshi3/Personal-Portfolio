import React, { useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    // Reduced duration since we removed materia animation
    const timer = setTimeout(() => {
      onComplete();
    }, 4000); // Changed from 5000 to 4000

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-container">
      <span className="splash-overlay"></span>
      <span className="splash-welcome"></span>
    </div>
  );
};

export default SplashScreen;