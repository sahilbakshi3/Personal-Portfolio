// src/App.js - OPTIMIZED VERSION
import React, { lazy, Suspense } from 'react';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './app.css';

// OPTIMIZATION: Lazy load heavy components
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
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;