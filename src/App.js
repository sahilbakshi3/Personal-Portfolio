// src/App.js
import React, { lazy, Suspense, useState } from 'react';
import Header from './components/Layout/Header/Header';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import SplashScreen from './components/common/SplashScreen/SplashScreen';
import './app.css';
import SocialLinks from './components/common/SocialLinks/SocialLinks';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { SmoothCursor } from './components/ui/SmoothCursor';

// Lazy load heavy components
const Hero = lazy(() => import('./components/Sections/Hero/Hero'));
const About = lazy(() => import('./components/Sections/About/About'));
const Skills = lazy(() => import('./components/Sections/Skills/Skills'));
const Projects = lazy(() => import('./components/Sections/Projects/Projects'));

// Loading component for better UX
const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function AppContent() {
  const { isDarkMode } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Show splash screen on every load
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className={`App min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      <Header />
      <main>
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
      </main>
      <SocialLinks />
    </div>
  );
}

function App() {
  return (
    <>
    <SmoothCursor/>
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>

    <SpeedInsights />

    </>
  );
}

export default App;