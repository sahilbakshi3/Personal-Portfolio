import React, { useRef } from 'react';
import { Download, MapPin, GraduationCap, Calendar, Code2, Briefcase, Sparkles, Heart, Trophy, Coffee } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../../Data/PersonalInfo';

// Timeline Component (keeping your existing one)
const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
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
        <motion.div
          style={{ height: height + 'px' }}
          className="absolute left-[50%] top-0 hidden w-[2px] translate-x-[-50%] overflow-hidden bg-gradient-to-b from-transparent via-gray-200 to-transparent md:block dark:via-gray-800"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
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
              {isLeft ? (
                <>
                  <motion.div 
                    className="md:text-right"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="inline-block text-left">
                      <div className="mb-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300">
                        <Calendar size={14} />
                        {item.title}
                      </div>
                      <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-lg dark:border-gray-800/50 dark:bg-gray-900/50">
                        {item.content}
                      </div>
                    </div>
                  </motion.div>
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
                  <div className="hidden md:block" />
                </>
              ) : (
                <>
                  <div className="hidden md:block" />
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
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="mb-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300">
                      <Calendar size={14} />
                      <span className='items-center'>{item.title}</span>
                    </div>
                    <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-lg dark:border-gray-800/50 dark:bg-gray-900/50">
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
  const timelineData = [
    {
      title: personalInfo.education.year,
      type: 'education',
      content: (
        <div>
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
              <GraduationCap className="text-white" size={24} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                {personalInfo.education.degree}
              </h3>
              <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                {personalInfo.education.institution}
              </p>
            </div>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {personalInfo.education.field}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
            <MapPin size={12} />
            <span>{personalInfo.education.location}</span>
          </div>
        </div>
      ),
    },
    ...personalInfo.experience.map((exp) => ({
      title: exp.duration,
      type: 'experience',
      content: (
        <div>
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
              <Briefcase className="text-white" size={24} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                {exp.title}
              </h3>
              <p className="mb-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                {exp.company}
              </p>
            </div>
          </div>
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
    <section id="about" className="relative overflow-hidden bg-white dark:bg-black px-4 py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl dark:text-white">
            About{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            My journey as a developer, the experiences that shaped me, and what drives my passion for technology
          </p>
        </motion.div>

        {/* Profile Cards Grid */}
        <div className="mb-20 grid gap-6 lg:grid-cols-3">
          {/* Main Profile Card */}
          <motion.div 
            className="lg:col-span-2 rounded-2xl border border-gray-200/50 bg-white p-8 shadow-lg dark:border-gray-800/50 dark:bg-gray-900/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {personalInfo.name}
                </h3>
                <p className="mb-4 text-lg font-medium text-blue-600 dark:text-blue-400">
                  {personalInfo.title}
                </p>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin size={16} />
                  <span>{personalInfo.location}</span>
                </div>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                <Code2 className="text-white" size={32} />
              </div>
            </div>

            <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
              {personalInfo.bio.long}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 dark:from-blue-900/20 dark:to-blue-800/20">
                <div className="mb-1 text-2xl font-bold text-blue-600 dark:text-blue-400">6+</div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-4 dark:from-purple-900/20 dark:to-purple-800/20">
                <div className="mb-1 text-2xl font-bold text-purple-600 dark:text-purple-400">1+</div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Years Exp.</div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 p-4 dark:from-pink-900/20 dark:to-pink-800/20">
                <div className="mb-1 text-2xl font-bold text-pink-600 dark:text-pink-400">10+</div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Technologies</div>
              </div>
            </div>
          </motion.div>

          {/* Interests Card */}
          <motion.div 
            className="rounded-2xl border border-gray-200/50 bg-white p-8 shadow-lg dark:border-gray-800/50 dark:bg-gray-900/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="text-blue-600 dark:text-blue-400" size={24} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Interests & Hobbies</h3>
            </div>
            <div className="space-y-3">
              {personalInfo.interests.map((interest, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-3 dark:from-gray-800/50 dark:to-gray-800/30"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                    {i === 0 && <Code2 size={16} className="text-white" />}
                    {i === 1 && <Sparkles size={16} className="text-white" />}
                    {i === 2 && <Trophy size={16} className="text-white" />}
                    {i === 3 && <MapPin size={16} className="text-white" />}
                    {i === 4 && <Coffee size={16} className="text-white" />}
                    {i === 5 && <Heart size={16} className="text-white" />}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {interest}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="mb-12">
          <motion.div 
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              My{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Journey
              </span>
            </h3>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              Education and professional experience that shaped my career
            </p>
          </motion.div>
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
          <a
            href='/RESUME.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='relative inline-block overflow-hidden rounded-lg p-0.5'
          
          >

            <button className="relative inline-block overflow-hidden rounded-lg p-0.5">
              <div className="absolute top-0 left-0 w-[200%] h-full animate-[rainbow-slide_0.75s_linear_infinite]"
                  style={{
                    background: 'linear-gradient(115deg, #4fcf70, #fad648, #a767e5, #12bcfe, #44ce7b)',
                    backgroundSize: '50% 100%'
                  }} />
              <span className="relative z-10 flex items-center gap-2 rounded-md bg-white px-6 py-3.5 text-lg font-medium text-black dark:bg-black dark:text-white">
                <Download size={20} />
                Download Resume
              </span>
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;