// src/components/Layout/Footer/Footer.jsx
import React from 'react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../../../components/Data/PersonalInfo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: personalInfo.social.github,
      icon: Github,
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      url: personalInfo.social.linkedin,
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      url: `mailto:${personalInfo.email}`,
      icon: Mail,
      color: 'hover:text-red-400'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h3>
            <p className="text-gray-400 mb-4 max-w-md">
              {personalInfo.bio.short}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target={link.name === 'Email' ? '_self' : '_blank'}
                    rel={link.name === 'Email' ? '' : 'noopener noreferrer'}
                    className={`text-gray-400 ${link.color} transition-colors transform hover:scale-110`}
                    aria-label={link.name}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-gray-400">
              <p>{personalInfo.location}</p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:text-white transition-colors block"
              >
                {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="hover:text-white transition-colors block"
              >
                {personalInfo.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
            <span>Made with</span>
            <Heart size={16} className="text-red-500" fill="currentColor" />
            <span>by {personalInfo.name}</span>
          </div>
          <div className="text-gray-400 text-sm">
            <p>&copy; {currentYear} {personalInfo.name}. All rights reserved.</p>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;