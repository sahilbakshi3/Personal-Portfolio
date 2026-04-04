// src/components/Data/Projects.jsx

export const projects = [
  {
    id: 1,
    title: "Analytics Dashboard",
    description: "A dashboard to manage customers and transactions.",
    longDescription:
      "Built with React and Node.js, this comprehensive dashboard provides real-time insights into business metrics, customer behavior, and transaction patterns. It features customizable widgets, advanced filtering, data export capabilities, and role-based access control for secure team collaboration.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75&auto=format&fit=crop&crop=center",
    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Stripe",
      "Tailwind",
      "Framer Motion",
    ],
    demoUrl: "https://juspay-dashboard-two.vercel.app/",
    codeUrl: "https://github.com/sahilbakshi3/Juspay-dashboard",
    featured: true,
    features: [
      "Real-time transaction monitoring and analytics",
      "Customizable dashboard with drag-and-drop widgets",
      "Advanced customer management system",
      "Stripe payment integration for secure transactions",
      "Responsive design with smooth animations",
    ],
    stats: [
      { value: "10K+", label: "Transactions" },
      { value: "99.9%", label: "Uptime" },
      { value: "50ms", label: "Response Time" },
    ],
  },
  {
    id: 2,
    title: "Leetcode Solutions",
    description: "A GitHub repository of 100+ LeetCode solutions in C++.",
    longDescription:
      "A comprehensive collection of LeetCode problem solutions implemented in C++. Each solution includes detailed comments explaining the approach, time and space complexity analysis, and alternative solutions where applicable. Organised by difficulty level and problem categories.",
    image:
      "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=600&q=75&auto=format&fit=crop&crop=center",
    tags: ["C++", "DSA", "Algorithms"],
    codeUrl: "https://github.com/sahilbakshi3/Leetcode-solutions",
    features: [
      "Solutions for 100+ LeetCode problems",
      "Detailed explanations and comments",
      "Time and space complexity analysis",
      "Multiple approaches for complex problems",
      "Organised by topics and difficulty",
    ],
    stats: [
      { value: "100+", label: "Problems Solved" },
      { value: "15+", label: "Topics Covered" },
      { value: "C++", label: "Language" },
    ],
  },
  {
    id: 3,
    title: "Wordle Game",
    description:
      "A Wordle clone built with React, Tailwind, and Framer Motion.",
    longDescription:
      "An interactive clone of the popular Wordle game featuring smooth animations, intuitive keyboard interface, and engaging visual feedback. Built with React for dynamic state management, styled with Tailwind CSS, and animated using Framer Motion for a polished user experience.",
    image:
      "https://images.unsplash.com/photo-1652451764453-eff80b50f736?w=600&q=75&auto=format&fit=crop&crop=center",
    tags: ["React", "Tailwind", "Framer Motion"],
    demoUrl: "https://wordle-iota-khaki.vercel.app/",
    codeUrl: "https://github.com/sahilbakshi3/wordle",
    features: [
      "Interactive word guessing gameplay",
      "Smooth animations with Framer Motion",
      "On-screen keyboard with letter highlighting",
      "Share results functionality",
      "Fully responsive design for all devices",
    ],
    stats: [
      { value: "5000+", label: "Words" },
      { value: "6", label: "Attempts" },
      { value: "100%", label: "Fun" },
    ],
  },
  {
    id: 4,
    title: "Job Portal",
    description:
      "A full-stack job portal for posting, browsing, and applying to jobs.",
    longDescription:
      "A feature-rich job portal application connecting employers and job seekers. Employers can post and manage listings while candidates can browse openings, filter by role or location, and apply directly. Built with React on the frontend and a Node.js/Express backend, with MongoDB for data persistence.",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=75&auto=format&fit=crop&crop=center",
    tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    demoUrl: "https://job-portal-iota-blue.vercel.app/",
    codeUrl: "https://github.com/sahilbakshi3/Job-Portal",
    featured: true,
    features: [
      "Job listing creation and management for employers",
      "Candidate browse & filter by role, location, and type",
      "One-click apply with application tracking",
      "Authentication for both employers and job seekers",
      "Fully responsive across all devices",
    ],
    stats: [
      { value: "Full", label: "Stack" },
      { value: "MERN", label: "Tech" },
      { value: "Real-time", label: "Updates" },
    ],
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "Personal portfolio built with React — the one you're looking at right now.",
    longDescription:
      "A modern, fully responsive portfolio website showcasing projects, skills, and experience. Features a luxury minimal aesthetic with Cormorant Garamond typography, warm off-white palette, scroll-reveal animations, and a clean indexed project list.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=75&auto=format&fit=crop&crop=center",
    tags: ["React", "Tailwind", "Framer Motion"],
    demoUrl: "https://personal-portfolio-zeta-steel-92.vercel.app/",
    codeUrl: "https://github.com/sahilbakshi3/personal-portfolio",
    featured: true,
    features: [
      "Luxury minimal design with editorial typography",
      "Scroll-reveal animations throughout",
      "Indexed project list with modal detail view",
      "Fully responsive across all devices",
      "Optimised performance with lazy loading",
    ],
    stats: [
      { value: "95+", label: "Lighthouse Score" },
      { value: "<1s", label: "Load Time" },
      { value: "100%", label: "Mobile Friendly" },
    ],
  },
  {
    id: 6,
    title: "Fleet Tracking Dashboard",
    description:
      "Real-time GPS fleet monitoring with live vehicle status and map visualisation.",
    longDescription:
      "A comprehensive fleet management solution featuring real-time GPS tracking, vehicle status monitoring, and route optimisation. Built with React and WebSocket for live updates, integrated with interactive maps for route visualisation, and includes detailed analytics for fleet performance monitoring.",
    image:
      "https://images.unsplash.com/photo-1638636206910-49cdd0af6d3c?auto=format&fit=crop&q=80&w=1332",
    tags: [
      "React",
      "Tailwind CSS",
      "WebSocket",
      "JavaScript",
      "API Integration",
    ],
    demoUrl: "https://fleet-tracking-beige.vercel.app/",
    codeUrl: "https://github.com/sahilbakshi3/Fleet-Tracking",
    featured: true,
    features: [
      "Real-time GPS tracking with WebSocket",
      "Interactive map with route visualisation",
      "Vehicle status monitoring and alerts",
      "Trip history and analytics dashboard",
      "Geofencing and automated notifications",
    ],
    stats: [
      { value: "50+", label: "Vehicles" },
      { value: "Real-time", label: "Updates" },
      { value: "99%", label: "Accuracy" },
    ],
  },
];
