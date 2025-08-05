// src/components/Sections/About/About.jsx
import React from 'react';
import { Download, MapPin, Calendar, GraduationCap, Code, Briefcase } from 'lucide-react';
import { useIntersectionObserver } from '../../Hooks/useIntersectionObserver';
import Button from '../../common/Button/Button';
import { personalInfo } from '../../Data/PersonalInfo';

const About = () => {
  const [elementRef, isVisible] = useIntersectionObserver();

  const stats = [
    { label: 'Projects Completed', value: '25+', icon: Code },
    { label: 'Years of Learning', value: '3+', icon: Calendar },
    { label: 'Technologies', value: '15+', icon: GraduationCap },
    { label: 'Happy Clients', value: '10+', icon: Briefcase }
  ];

  return (
    <section id="about" className="py-20 px-4">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-6"></div>
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-white">
                          {personalInfo.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">Profile Photo</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div 
                      key={stat.label}
                      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all duration-300 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <IconComponent className="w-8 h-8 text-blue-600 mx-auto mb-2" />
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
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <GraduationCap className="text-blue-600" size={24} />
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
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-gray-500 text-sm">{personalInfo.education.location}</span>
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
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
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
                    <div key={index} className="border-l-4 border-blue-600 pl-4">
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {exp.title} at {exp.company}
                      </h5>
                      <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
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
                <Button
                  onClick={() => {
                    // This would typically trigger a resume download
                    console.log('Resume download triggered');
                  }}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Download size={20} className="mr-2" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;