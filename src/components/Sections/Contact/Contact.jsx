// src/components/Sections/Contact/Contact.jsx
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useIntersectionObserver } from '../../Hooks/useIntersectionObserver';
import ContactForm from './ContactForm';
import { personalInfo } from '../../Data/PersonalInfo';

const Contact = () => {
  const [elementRef, isVisible] = useIntersectionObserver();

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`,
      color: 'text-red-600'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: personalInfo.social.github,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: personalInfo.social.linkedin,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
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
              Get In <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you. 
              Let's create something amazing together!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Let's Connect
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                  I'm always interested in hearing about new opportunities, 
                  whether that's a freelance project, full-time role, or just a chat about technology.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <div 
                      key={method.label}
                      className={`flex items-center space-x-4 p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className={`p-3 ${method.color} bg-opacity-10 rounded-lg`}>
                        <IconComponent size={24} className={method.color} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          {method.label}
                        </p>
                        <a
                          href={method.href}
                          target={method.label === 'Location' ? '_blank' : '_self'}
                          rel={method.label === 'Location' ? 'noopener noreferrer' : ''}
                          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                        >
                          {method.value}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="pt-8">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-110 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-800 dark:text-green-300 font-medium">
                    Available for new projects
                  </span>
                </div>
                <p className="text-green-600 dark:text-green-400 text-sm mt-2">
                  Currently accepting freelance work and full-time opportunities
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Send className="text-blue-600" size={24} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Send Message
                </h3>
              </div>
              <ContactForm />
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Response Guarantee
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                I typically respond to all inquiries within 24 hours. 
                For urgent matters, feel free to call or text me directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;