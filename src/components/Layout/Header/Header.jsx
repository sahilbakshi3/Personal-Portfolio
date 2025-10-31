import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';
import Navigation from './Navigation';
import logo from '../../Assets/Images/my_logo.png'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode } = useTheme();

  const navItems = ['home', 'about', 'skills', 'projects', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? `${isDarkMode 
              ? 'bg-gray-900/95 border-b border-gray-800/50' 
              : 'bg-white/95 border-b border-gray-200/50'
            } backdrop-blur-md shadow-lg` 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          
          {/* Logo Section - Left aligned */}
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center space-x-3 cursor-pointer group z-50"
          >
            {/* Logo Container with Enhanced Styling */}
            <div className={`
              relative w-12 h-12 rounded-full overflow-hidden transition-all duration-300
              group-hover:scale-110 group-hover:rotate-6
              ${isDarkMode 
                ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/30' 
                : 'bg-gradient-to-br from-blue-100 to-purple-100 ring-2 ring-blue-300/50 shadow-lg shadow-blue-200/50'
              }
            `}>
              <img 
                src={logo} 
                alt="SB" 
                className={`
                  w-full h-full object-cover transition-all duration-300
                  group-hover:scale-110
                  ${isDarkMode 
                    ? 'brightness-110 contrast-110' 
                    : 'brightness-100'
                  }
                `}
              />
              {/* Glow Effect on Hover */}
              <div className={`
                absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                ${isDarkMode 
                  ? 'bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20' 
                  : 'bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10'
                }
              `} />
            </div>

            {/* Brand Name - Hidden on mobile, visible on larger screens */}
            <div className="hidden sm:flex flex-col">
              <span className={`
                text-xl font-bold leading-none transition-colors duration-300
                ${isDarkMode 
                  ? 'text-white group-hover:text-blue-400' 
                  : 'text-gray-900 group-hover:text-blue-600'
                }
              `}>
                Sahil Bakshi
              </span>
              <span className={`
                text-xs font-medium tracking-wider leading-none mt-0.5
                ${isDarkMode 
                  ? 'text-gray-400 group-hover:text-purple-400' 
                  : 'text-gray-600 group-hover:text-purple-600'
                }
              `}>
                PORTFOLIO
              </span>
            </div>
          </a>

          {/* Desktop Navigation & Theme Toggle - Centered/Right aligned */}
          <div className="hidden md:flex items-center space-x-2 ml-auto">
            <Navigation 
              navItems={navItems}
              activeSection={activeSection}
              onNavigate={scrollToSection}
              className="flex items-center space-x-1"
            />
            
            <div className="ml-4 pl-4 border-l border-gray-300 dark:border-gray-700">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button & Theme Toggle - Right aligned */}
          <div className="flex md:hidden items-center space-x-3 ml-auto">
            <ThemeToggle />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                p-2 rounded-lg transition-all duration-300
                ${isDarkMode 
                  ? 'hover:bg-gray-800 text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-700'
                }
              `}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className={`
            py-4 border-t
            ${isDarkMode 
              ? 'border-gray-800 bg-gray-900/95' 
              : 'border-gray-200 bg-white/95'
            }
          `}>
            <Navigation 
              navItems={navItems}
              activeSection={activeSection}
              onNavigate={scrollToSection}
              className="flex flex-col space-y-1 px-2"
              mobile
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;