import React, { useState, useEffect, useMemo } from 'react';
import { Home, User, Code, Briefcase, Menu, X } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';
import logo from '../../Assets/Images/my_logo.png';

const Header = () => {
  const [isFloatingVisible, setIsFloatingVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();

  // Memoized to satisfy exhaustive-deps in the scroll effect
  const navItems = useMemo(
    () => [
      { id: 'home', icon: Home, label: 'Home' },
      { id: 'about', icon: User, label: 'About' },
      { id: 'skills', icon: Code, label: 'Skills' },
      { id: 'projects', icon: Briefcase, label: 'Projects' },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsFloatingVisible(window.scrollY > 100);

      const scrollPosition = window.scrollY + 150;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navItems[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Static Logo Header - Visible at top */}
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isFloatingVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Anchor must have content accessible to SRs */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="flex items-center space-x-3 cursor-pointer group"
              aria-label="Go to Home"
            >
              <img
                src={logo}
                alt="Sahil Bakshi logo"
                className="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
              <span className="sr-only">Home</span>
            </a>

            {/* <ThemeToggle /> */}
          </div>
        </div>
      </header>

      {/* Floating Navbar - Appears on scroll */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isFloatingVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        {/* Desktop Navigation */}
        <nav
          className={`hidden md:flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-lg border shadow-2xl ${
            isDarkMode
              ? 'bg-black/80 border-gray-800/50 shadow-blue-500/10'
              : 'bg-white/80 border-gray-200/50 shadow-gray-500/10'
          }`}
        >
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 select-none group"
            aria-label="Go to Home"
          >
            <img
              src={logo}
              alt="SB Logo"
              className="w-7 h-7 rounded-full object-cover transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
          </button>

          <div className="w-px h-6 bg-gray-500/40 mx-2" />

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}

          <div className={`ml-2 pl-2 border-l ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-lg border shadow-2xl ${
              isDarkMode
                ? 'bg-black/80 border-gray-800/50 text-white'
                : 'bg-white/80 border-gray-200/50 text-gray-900'
            }`}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="text-sm font-medium">Menu</span>
          </button>

          {isMobileMenuOpen && (
            <div
              id="mobile-nav"
              className={`absolute top-16 left-1/2 -translate-x-1/2 w-56 rounded-2xl backdrop-blur-lg border shadow-2xl overflow-hidden ${
                isDarkMode ? 'bg-black/90 border-gray-800/50' : 'bg-white/90 border-gray-200/50'
              }`}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                <img src={logo} alt="SB Logo" className="w-7 h-7 rounded-full object-cover" />
                <button
                  onClick={() => scrollToSection('home')}
                  className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  Sahil
                </button>
              </div>

              <div className="p-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-800/50'
                          : 'text-gray-600 hover:bg-gray-100/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}

                <div className={`my-2 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />

                <div className="px-4 py-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
