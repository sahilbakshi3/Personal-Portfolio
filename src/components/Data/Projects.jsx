// src/components/Data/Projects.jsx
// OPTIMIZATION: Add query parameters for optimized images and WebP format

export const projects = [
  {
    id: 1,
    title: 'Analytics Dashboard',
    description: 'A dashboard to manage customers and transactions.',
    // OPTIMIZED: Added w=600, q=75 for quality/size balance, auto=format for WebP
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75&auto=format&fit=crop&crop=center',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'Tailwind', 'Framer Motion'],
    demoUrl: 'https://juspay-dashboard-two.vercel.app/',
    codeUrl: 'https://github.com/sahilbakshi3/Juspay-dashboard',
  },
  {
    id: 2,
    title: 'Leetcode Solutions',
    description: 'A github repository for my leetcode solutions.',
    image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=600&q=75&auto=format&fit=crop&crop=center',
    tags: ['C++', 'DSA'],
    codeUrl: 'https://github.com/sahilbakshi3/Leetcode-solutions',
  },
  {
    id: 3,
    title: 'Wordle Game',
    description: 'A wordle game built with React, Tailwind, and Framer Motion.',
    image: 'https://images.unsplash.com/photo-1652451764453-eff80b50f736?w=600&q=75&auto=format&fit=crop&crop=center',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    demoUrl: 'https://wordle-iota-khaki.vercel.app/',
    codeUrl: 'https://github.com/sahilbakshi3/wordle',
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Personal portfolio website built with React, featuring dark mode, smooth animations, and responsive design.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=75&auto=format&fit=crop&crop=center',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    demoUrl: 'https://personal-portfolio-zeta-steel-92.vercel.app/',
    codeUrl: 'https://github.com/sahilbakshi3/personal-portfolio',
  },
  {
    id: 5,
    title: 'Morsify - Advanced Morse Code Translator',
    description: 'A web application that translates text to Morse code and vice versa, built with React and Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1570286424717-86d8a0082d0c?w=600&q=75&auto=format&fit=crop&crop=center',
    tags: ['React', 'Tailwind CSS', 'Web Audio API', 'JavaScript', 'API Integration'],
    demoUrl: 'https://morsify-omega.vercel.app/',
    codeUrl: 'https://github.com/sahilbakshi3/Morsify',
  },
];
