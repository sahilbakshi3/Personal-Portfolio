import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';
import Navigation from './Navigation';
import logo from '../../Assets/Images/my_logo.png'; // ✅ Correct path to your logo

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode } = useTheme();

  const navItems = ['home', 'about', 'skills', 'projects', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? `${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm shadow-lg` 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* ✅ Logo - Top left corner with dark mode glow */}
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img 
              src={logo} 
              alt="SB Logo" 
              className={`
                w-10 h-10 rounded-full object-cover transition-transform duration-200 hover:scale-105
                ring-0 border-none
                bg-white dark:bg-gray-900
                ${isDarkMode ? 'shadow-[0_0_12px_rgba(147,51,234,0.6)]' : 'shadow-sm'}
              `}
            />
            <span className="sr-only">Go to Home</span>
          </a>

          {/* Desktop Navigation & Theme Toggle */}
          <div className="flex items-center space-x-6">
            <Navigation 
              navItems={navItems}
              activeSection={activeSection}
              onNavigate={scrollToSection}
              className="hidden md:flex"
            />
            
            <ThemeToggle />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} shadow-lg`}>
            <Navigation 
              navItems={navItems}
              activeSection={activeSection}
              onNavigate={scrollToSection}
              className="flex flex-col px-4 py-2 space-y-2"
              mobile
            />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
