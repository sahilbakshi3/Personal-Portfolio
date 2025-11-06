import React from 'react';
import { Download, MapPin, Calendar, GraduationCap } from 'lucide-react';
import { useIntersectionObserver } from '../../Hooks/useIntersectionObserver';
import Button from '../../common/Button/Button';
import { personalInfo } from '../../Data/PersonalInfo';
import Timeline from '../../ui/Timeline';

const About = () => {
  const [elementRef, isVisible] = useIntersectionObserver();

  // Build timeline entries from your data
  // Example 1: Experience timeline (map your personalInfo.experience)
  const experienceTimeline = (personalInfo?.experience ?? []).map((exp) => ({
    title: exp.duration || exp.year || '—',
    content: (
      <div>
        <h5 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
          {exp.title} <span className="font-normal">at</span> {exp.company}
        </h5>
        <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">{exp.location ?? ''}</p>
        <p className="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {exp.description}
        </p>
        {Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((t, i) => (
              <span
                key={i}
                className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    ),
  }));

  // Example 2: A milestones timeline like your demo with images
  const milestonesTimeline = [
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Shipped my portfolio revamp and multiple UI micro-interactions.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/templates/startup-1.webp"
              alt="Milestone 1"
              className="h-24 w-full rounded-lg object-cover shadow md:h-40 lg:h-52"
            />
            <img
              src="https://assets.aceternity.com/templates/startup-2.webp"
              alt="Milestone 2"
              className="h-24 w-full rounded-lg object-cover shadow md:h-40 lg:h-52"
            />
            <img
              src="https://assets.aceternity.com/templates/startup-3.webp"
              alt="Milestone 3"
              className="h-24 w-full rounded-lg object-cover shadow md:h-40 lg:h-52"
            />
            <img
              src="https://assets.aceternity.com/templates/startup-4.webp"
              alt="Milestone 4"
              className="h-24 w-full rounded-lg object-cover shadow md:h-40 lg:h-52"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <p className="mb-3 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Built a set of reusable components and shipped client work.
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Focused on performance, accessibility, and delightful interactions.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="Hero sections"
              className="h-24 w-full rounded-lg object-cover shadow md:h-40 lg:h-52"
            />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="Features section"
              className="h-24 w-full rounded-lg object-cover shadow md:h-40 lg:h-52"
            />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="Bento grids"
              className="h-24 w-full rounded-lg object-cover shadow md:h-40 lg:h-52"
            />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="Cards"
              className="h-24 w-full rounded-lg object-cover shadow md:h-40 lg:h-52"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="about" className="bg-white px-4 py-20 dark:bg-black">
      <div className="mx-auto max-w-6xl">
        <div
          ref={elementRef}
          className={`transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              Get to know more about who I am, what I do, and what skills I have
            </p>
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left Column - Image & Education */}
            <div className="space-y-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="relative mx-auto h-80 w-80">
                  <div className="absolute inset-0 rotate-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600" />
                  <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src="/photo.jpeg"
                      alt={personalInfo.name}
                      className="h-full w-full object-cover object-center"
                      style={{ filter: 'brightness(1.1) contrast(1.05) saturate(1.1)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent dark:from-black/40" />
                  </div>
                  <div className="absolute -right-4 -top-4 h-8 w-8 animate-pulse rounded-full bg-blue-500 opacity-80" />
                  <div className="absolute -bottom-4 -left-4 h-6 w-6 animate-pulse rounded-full bg-purple-500 opacity-80 delay-1000" />
                </div>
              </div>

              {/* Education */}
              <div className="rounded-xl border p-6 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-3 flex items-center space-x-3">
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
                  <div className="mt-2 flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {personalInfo.education.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Bio + Timeline */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  I'm {personalInfo.name}
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {personalInfo.bio.long}
                </p>
              </div>

              {/* Experience Timeline */}
              {experienceTimeline.length > 0 && (
                <div>
                  <h4 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Experience</h4>
                  <Timeline data={experienceTimeline} align="alternate" />
                </div>
              )}

              {/* Milestones Timeline (optional showcase like your example) */}
              <div>
                <h4 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Milestones</h4>
                <Timeline data={milestonesTimeline} align="alternate" />
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <a href="/RESUME.pdf" target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="lg" className="group w-full sm:w-auto">
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
