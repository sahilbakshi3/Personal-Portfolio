// src/components/Data/Projects.jsx
// OPTIMIZATION: Add query parameters for optimized images and WebP format

export const projects = [
  {
    id: 1,
    title: 'Analytics Dashboard',
    description: 'A dashboard to manage customers and transactions.',
    longDescription: 'Built with React and Node.js, this comprehensive dashboard provides real-time insights into business metrics, customer behavior, and transaction patterns. It features customizable widgets, advanced filtering, data export capabilities, and role-based access control for secure team collaboration.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75&auto=format&fit=crop&crop=center',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'Tailwind', 'Framer Motion'],
    demoUrl: 'https://juspay-dashboard-two.vercel.app/',
    codeUrl: 'https://github.com/sahilbakshi3/Juspay-dashboard',
    featured: true,
    features: [
      'Real-time transaction monitoring and analytics',
      'Customizable dashboard with drag-and-drop widgets',
      'Advanced customer management system',
      'Stripe payment integration for secure transactions',
      'Responsive design with smooth animations'
    ],
    stats: [
      { value: '10K+', label: 'Transactions' },
      { value: '99.9%', label: 'Uptime' },
      { value: '50ms', label: 'Response Time' }
    ]
  },
  {
    id: 2,
    title: 'Leetcode Solutions',
    description: 'A github repository for my leetcode solutions.',
    longDescription: 'A comprehensive collection of LeetCode problem solutions implemented in C++. Each solution includes detailed comments explaining the approach, time and space complexity analysis, and alternative solutions where applicable. Organized by difficulty level and problem categories.',
    image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=600&q=75&auto=format&fit=crop&crop=center',
    tags: ['C++', 'DSA', 'Algorithms'],
    codeUrl: 'https://github.com/sahilbakshi3/Leetcode-solutions',
    features: [
      'Solutions for 100+ LeetCode problems',
      'Detailed explanations and comments',
      'Time and space complexity analysis',
      'Multiple approaches for complex problems',
      'Organized by topics and difficulty'
    ],
    stats: [
      { value: '100+', label: 'Problems Solved' },
      { value: '15+', label: 'Topics Covered' },
      { value: 'C++', label: 'Language' }
    ]
  },
  {
    id: 3,
    title: 'Wordle Game',
    description: 'A wordle game built with React, Tailwind, and Framer Motion.',
    longDescription: 'An interactive clone of the popular Wordle game featuring smooth animations, intuitive keyboard interface, and engaging visual feedback. Built with React for dynamic state management, styled with Tailwind CSS, and animated using Framer Motion for a polished user experience.',
    image: 'https://images.unsplash.com/photo-1652451764453-eff80b50f736?w=600&q=75&auto=format&fit=crop&crop=center',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    demoUrl: 'https://wordle-iota-khaki.vercel.app/',
    codeUrl: 'https://github.com/sahilbakshi3/wordle',
    features: [
      'Interactive word guessing gameplay',
      'Smooth animations with Framer Motion',
      'On-screen keyboard with letter highlighting',
      'Share results functionality',
      'Fully responsive design for all devices'
    ],
    stats: [
      { value: '5000+', label: 'Words' },
      { value: '6', label: 'Attempts' },
      { value: '100%', label: 'Fun' }
    ]
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Personal portfolio website built with React, featuring dark mode, smooth animations, and responsive design.',
    longDescription: 'A modern, fully responsive portfolio website showcasing my projects, skills, and experience. Features include dark/light theme toggle, smooth scroll animations, lazy loading for optimal performance, and an elegant glassmorphism design aesthetic.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=75&auto=format&fit=crop&crop=center',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    demoUrl: 'https://personal-portfolio-zeta-steel-92.vercel.app/',
    codeUrl: 'https://github.com/sahilbakshi3/personal-portfolio',
    featured: true,
    features: [
      'Dark/Light theme with smooth transitions',
      'Animated hero section with dynamic text',
      'Project showcase with filtering options',
      'Smooth scroll animations and lazy loading',
      'Fully responsive across all devices'
    ],
    stats: [
      { value: '95+', label: 'Lighthouse Score' },
      { value: '<1s', label: 'Load Time' },
      { value: '100%', label: 'Mobile Friendly' }
    ]
  },
  {
    id: 5,
    title: 'Morsify - Advanced Morse Code Translator',
    description: 'A web application that translates text to Morse code and vice versa, built with React and Tailwind CSS.',
    longDescription: 'An advanced Morse code translator with audio playback functionality. Features real-time translation, adjustable playback speed, visual dot-dash representation, and support for multiple character sets. Built with Web Audio API for authentic Morse code sound generation.',
    image: 'https://images.unsplash.com/photo-1570286424717-86d8a0082d0c?w=600&q=75&auto=format&fit=crop&crop=center',
    tags: ['React', 'Tailwind CSS', 'Web Audio API', 'JavaScript', 'API Integration'],
    demoUrl: 'https://morsify-omega.vercel.app/',
    codeUrl: 'https://github.com/sahilbakshi3/Morsify',
    features: [
      'Bidirectional translation (text ↔ Morse)',
      'Audio playback with Web Audio API',
      'Adjustable playback speed and tone',
      'Visual representation of dots and dashes',
      'Copy to clipboard functionality'
    ],
    stats: [
      { value: '36', label: 'Characters' },
      { value: '10', label: 'Numbers' },
      { value: 'Real-time', label: 'Translation' }
    ]
  },
  {
    id: 6,
    title: 'Fleet Tracking Dashboard',
    description: 'A real-time fleet tracking dashboard built with React and Tailwind CSS, enabling live GPS monitoring, vehicle status updates, and interactive map visualisation for efficient fleet management.',
    longDescription: 'A comprehensive fleet management solution featuring real-time GPS tracking, vehicle status monitoring, and route optimization. Built with React and WebSocket for live updates, integrated with interactive maps for route visualization, and includes detailed analytics for fleet performance monitoring.',
    image: 'https://images.unsplash.com/photo-1638636206910-49cdd0af6d3c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332',
    tags: ['React', 'Tailwind CSS', 'WebSocket', 'JavaScript', 'API Integration'],
    demoUrl: 'https://fleet-tracking-beige.vercel.app/',
    codeUrl: 'https://github.com/sahilbakshi3/Fleet-Tracking',
    featured: true,
    features: [
      'Real-time GPS tracking with WebSocket',
      'Interactive map with route visualization',
      'Vehicle status monitoring and alerts',
      'Trip history and analytics dashboard',
      'Geofencing and automated notifications'
    ],
    stats: [
      { value: '50+', label: 'Vehicles' },
      { value: 'Real-time', label: 'Updates' },
      { value: '99%', label: 'Accuracy' }
    ]
  },
];