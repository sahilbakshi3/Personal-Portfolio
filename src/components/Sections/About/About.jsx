import React, { useRef, useEffect, useState } from 'react';
import { Download, MapPin, GraduationCap, Calendar, Code2, Sparkles, Briefcase } from 'lucide-react';
import { useIntersectionObserver } from '../../Hooks/useIntersectionObserver';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../../common/Button/Button';
import { personalInfo } from '../../Data/PersonalInfo';

// Timeline Component with scroll animations
const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full overflow-clip">
      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {/* Animated center vertical line */}
        <motion.div
          style={{
            height: height + 'px',
          }}
          className="absolute left-[50%] top-0 hidden w-[2px] translate-x-[-50%] overflow-hidden bg-gradient-to-b from-transparent via-gray-200 to-transparent md:block dark:via-gray-800"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"
          />
        </motion.div>

        {data.map((item, index) => {
          const isLeft = index % 2 === 0;
          
          return (
            <div
              key={index}
              className="timeline-item relative mb-16 grid grid-cols-1 gap-4 last:mb-0 md:mb-20 md:grid-cols-[1fr_auto_1fr] md:gap-8"
            >
              {/* Left side */}
              {isLeft ? (
                <>
                  {/* Content on left */}
                  <motion.div 
                    className="md:text-right"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="inline-block text-left">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300">
                        <Calendar size={14} />
                        {item.title}
                      </div>
                      <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] transition-all hover:shadow-xl dark:border-gray-800/50 dark:bg-gray-900/50">
                        {item.content}
                      </div>
                    </div>
                  </motion.div>

                  {/* Center dot */}
                  <div className="relative hidden md:block">
                    <motion.div 
                      className="sticky top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <div className="h-4 w-4 animate-pulse rounded-full border-4 border-blue-500 bg-white shadow-lg shadow-blue-500/50 dark:border-blue-400 dark:bg-gray-900" />
                    </motion.div>
                  </div>

                  {/* Empty right */}
                  <div className="hidden md:block" />
                </>
              ) : (
                <>
                  {/* Empty left */}
                  <div className="hidden md:block" />

                  {/* Center dot */}
                  <div className="relative hidden md:block">
                    <motion.div 
                      className="sticky top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <div className="h-4 w-4 animate-pulse rounded-full border-4 border-purple-500 bg-white shadow-lg shadow-purple-500/50 dark:border-purple-400 dark:bg-gray-900" />
                    </motion.div>
                  </div>

                  {/* Content on right */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300">
                      <Calendar size={14} />
                      {item.title}
                    </div>
                    <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] transition-all hover:shadow-xl dark:border-gray-800/50 dark:bg-gray-900/50">
                      {item.content}
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const About = () => {
  const [elementRef, isVisible] = useIntersectionObserver();

  // Build timeline data combining education and experience
  const timelineData = [
    // Education entry
    {
      title: personalInfo.education.year,
      type: 'education',
      content: (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
              <GraduationCap className="text-white" size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {personalInfo.education.degree}
            </h3>
          </div>
          <p className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
            {personalInfo.education.field}
          </p>
          <p className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">
            {personalInfo.education.institution}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {personalInfo.education.location}
            </span>
          </div>
        </div>
      ),
    },
    // Experience entries
    ...personalInfo.experience.map((exp) => ({
      title: exp.duration,
      type: 'experience',
      content: (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Briefcase className="text-white" size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {exp.title}
            </h3>
          </div>
          <p className="mb-4 text-sm font-medium text-purple-600 dark:text-purple-400">
            {exp.company} {exp.location && `• ${exp.location}`}
          </p>
          <p className="mb-6 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {exp.description}
          </p>
          
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 text-xs font-medium text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      ),
    })),
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-white px-4 py-20 dark:bg-black">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          ref={elementRef}
          className={`transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Section Header */}
          <div className="mb-20 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              <Sparkles size={16} />
              Get to know me
            </div>
            <h2 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl dark:text-white">
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              My journey as a developer, the experiences that shaped me, and what drives my passion for technology
            </p>
          </div>

          {/* Profile Section */}
          <div className="mb-20 grid gap-8 lg:grid-cols-3">
            {/* Profile Image Card */}
            <motion.div 
              className="overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] dark:border-gray-800/50 dark:bg-gray-900/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-80 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                <img
                  src="/photo.jpeg"
                  alt={personalInfo.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {personalInfo.name}
                </h3>
                <p className="mb-4 text-blue-600 dark:text-blue-400">{personalInfo.title}</p>
                <p className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin size={16} />
                  {personalInfo.location}
                </p>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {personalInfo.bio.short}
                </p>
              </div>
            </motion.div>

            {/* Bio Card */}
            <motion.div 
              className="overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] dark:border-gray-800/50 dark:bg-gray-900/50 lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
                  <Code2 className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">My Story</h3>
              </div>
              <p className="mb-8 whitespace-pre-line text-base leading-relaxed text-gray-700 dark:text-gray-300">
                {personalInfo.bio.long}
              </p>

              {/* Interests */}
              {personalInfo.interests && personalInfo.interests.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Interests & Passions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {personalInfo.interests.map((interest, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Timeline Section */}
          <div className="mb-12">
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                My{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Journey
                </span>
              </h3>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                Education and professional experience that shaped my career
              </p>
            </div>
            
            <Timeline data={timelineData} />
          </div>

          {/* CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href="/RESUME.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg" className="group">
                <Download size={20} className="mr-2 transition-transform group-hover:animate-bounce" />
                Download My Resume
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;