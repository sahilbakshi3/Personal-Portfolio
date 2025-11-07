import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../../Data/PersonalInfo';
import { useTheme } from '../../../context/ThemeContext';

const SocialLinks = () => {
  const { isDarkMode } = useTheme();

  const socialLinks = [
    {
      name: 'GitHub',
      url: personalInfo.social.github,
      icon: Github,
      color: 'hover:text-gray-400',
      bgColor: 'hover:bg-gray-400/10'
    },
    {
      name: 'LinkedIn',
      url: personalInfo.social.linkedin,
      icon: Linkedin,
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-500/10'
    },
    {
      name: 'Email',
      url: `mailto:${personalInfo.email}`,
      icon: Mail,
      color: 'hover:text-red-500',
      bgColor: 'hover:bg-red-500/10'
    }
  ];

  return (
    <div className={`py-8 border-t ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            const isEmail = link.name === 'Email';
            
            return (
              <a
                key={link.name}
                href={link.url}
                target={isEmail ? '_self' : '_blank'}
                rel={isEmail ? undefined : 'noopener noreferrer'}
                aria-label={link.name}
                className={`
                  group relative p-3 rounded-full transition-all duration-300
                  ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-600'}
                  ${link.bgColor}
                  ${link.color}
                  transform hover:scale-110 hover:shadow-lg
                `}
              >
                <IconComponent size={20} className="transition-transform duration-300 group-hover:rotate-12" />
              </a>
            );
          })}
        </div>
        
        <p className={`text-center mt-4 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SocialLinks;