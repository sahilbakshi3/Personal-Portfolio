// src/components/Sections/About/About.jsx
import React from 'react';
import { Download, MapPin, Calendar, GraduationCap, Code, Briefcase } from 'lucide-react';
import { useIntersectionObserver } from '../../Hooks/useIntersectionObserver';
import Button from '../../common/Button/Button';
import { personalInfo } from '../../Data/PersonalInfo';

const About = () => {
  const [elementRef, isVisible] = useIntersectionObserver();

  const stats = [
    { label: 'Projects Completed', value: '10+', icon: Code },
    { label: 'Years of Learning', value: '2+', icon: Calendar },
    { label: 'Technologies', value: '15+', icon: GraduationCap },
    { label: 'Happy Clients', value: '2+', icon: Briefcase }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get to know more about who I am, what I do, and what skills I have
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image & Stats */}
            <div className="space-y-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-80 h-80 mx-auto relative">
                  {/* Background gradient decoration */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-6"></div>
                  
                  {/* Main image container */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="/photo.jpeg" 
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-center"
                      style={{
                        filter: 'brightness(1.1) contrast(1.05) saturate(1.1)'
                      }}
                    />
                    {/* Overlay for better text contrast in dark mode */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent dark:from-black/40"></div>
                  </div>

                  {/* Floating elements for visual interest */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-80 animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-80 animate-pulse delay-1000"></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div 
                      key={stat.label}
                      className={`bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl text-center transform hover:scale-105 transition-all duration-300 group ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  I'm {personalInfo.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {personalInfo.bio.long}
                </p>
              </div>

              {/* Education */}
              <div className="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 p-6 rounded-xl hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <GraduationCap className="text-blue-600 dark:text-blue-400" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Education</h4>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    {personalInfo.education.degree} in {personalInfo.education.field}
                  </h5>
                  <p className="text-gray-600 dark:text-gray-400">
                    {personalInfo.education.institution} • {personalInfo.education.year}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{personalInfo.education.location}</span>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Interests & Hobbies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-300"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Highlights */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Experience
                </h4>
                <div className="space-y-4">
                  {personalInfo.experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-blue-600 dark:border-blue-400 pl-4 hover:border-l-6 transition-all duration-300">
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {exp.title} at {exp.company}
                      </h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{exp.duration}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border dark:border-gray-600 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <a
                  href="/SAHIL_BAKSHI_RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto group"
                  >
                    <Download size={20} className="mr-2 group-hover:animate-bounce" />
                    View Resume
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;