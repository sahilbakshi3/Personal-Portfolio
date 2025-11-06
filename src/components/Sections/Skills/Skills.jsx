import React, { useMemo } from 'react';
import { useIntersectionObserver } from '../../Hooks/useIntersectionObserver';
import { skills as skillsByCategory } from '../../Data/Skills';
import LogoLoop from '../../common/LogoLoop/LogoLoop';
import { useTheme } from '../../../context/ThemeContext';

/* flatten to { lowerName: { name, icon, color } } */
const flattenSkills = (byCat) => {
  const map = new Map();
  byCat.forEach(cat => {
    cat.items.forEach(item => {
      map.set(item.name.toLowerCase(), {
        ...item,
        color: item.color ?? cat.color ?? '#9ca3af',
      });
    });
  });
  return map;
};

/* alias map so your order keys match data */
const NAME_ALIASES = {
  'tailwindcss': 'Tailwind CSS',
  'tailwind css': 'Tailwind CSS',
  'github': 'Git & GitHub',
  'git': 'Git & GitHub',
  'rest': 'REST APIs',
  'rest apis': 'REST APIs',
  'typescript': 'TypeScript',
  'javascript': 'JavaScript',
  'next.js': 'Next.js',
  'node.js': 'Node.js',
  'postgres': 'PostgreSQL',
  'postgresql': 'PostgreSQL',
  'shadcn': 'shadcn/ui',
  'vercel': 'Vercel',
};
const resolveName = (n) => NAME_ALIASES[n.toLowerCase()] ?? n;

const Skills = () => {
  const [elementRef, isVisible] = useIntersectionObserver();
  const { isDarkMode } = useTheme();

  // order shown in the loop
  const featuredOrder = [
    'React',
    'Next.js',
    'TypeScript',
    'TailwindCSS',
    'JavaScript',
    'Node.js',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'Docker',
    'GitHub',
    'Firebase',
  ];

  const loopLogos = useMemo(() => {
    const flat = flattenSkills(skillsByCategory);
    return featuredOrder
      .map(raw => {
        const name = resolveName(raw);
        const s = flat.get(name.toLowerCase());
        if (!s || !s.icon) return null;
        const Icon = s.icon;
        return {
          node: (
            <span className="inline-flex items-center justify-center select-none" aria-hidden="true">
              <Icon
                size={56}
                className="transition-transform duration-300"
                style={{ color: 'currentColor' }}
              />
            </span>
          ),
          title: s.name,
          ariaLabel: s.name,
        };
      })
      .filter(Boolean);
  }, [featuredOrder]);

  return (
    <section
      id="skills"
      className={`
        relative overflow-hidden
        bg-gray-50 dark:bg-[#090611]
        py-24 md:py-32
        px-4
      `}
    >
      <div className="max-w-6xl mx-auto">
        <div
          ref={elementRef}
          className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          <div className="flex items-center mb-6">
            <div className="w-1 h-6 rounded-full mr-3 bg-gradient-to-b from-blue-600 to-purple-600" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Featured Stack</h3>
            <div className="flex-1 h-px ml-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30" />
          </div>

          <LogoLoop
            logos={loopLogos}
            speed={95}
            direction="left"
            logoHeight={64}
            gap={72}
            pauseOnHover
            fadeOut
            fadeOutColor={isDarkMode ? '#090611' : '#ffffff'}
            fadeWidth="56px"
            scaleOnHover={false}
            className={`
              bg-transparent border-0 shadow-none
              text-neutral-700 dark:text-neutral-300
              py-6
            `}
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
