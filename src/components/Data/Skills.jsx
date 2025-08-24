// First install: npm install react-icons

import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss, SiTypescript, SiNextdotjs,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql,
  SiGit, SiGithub, SiFigma, SiDocker, SiFirebase
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { FaServer } from 'react-icons/fa';

export const skills = [
  {
    category: 'Frontend',
    color: '#3B82F6',
    items: [
      { 
        name: 'HTML/CSS', 
        icon: SiHtml5, 
        color: '#E34F26',
        experience: '3+ years'
      },
      { 
        name: 'JavaScript', 
        icon: SiJavascript, 
        color: '#F7DF1E',
        experience: '2+ years'
      },
      { 
        name: 'React', 
        icon: SiReact, 
        color: '#61DAFB',
        experience: '2+ years'
      },
      { 
        name: 'Tailwind CSS', 
        icon: SiTailwindcss, 
        color: '#06B6D4',
        experience: '1+ years'
      },
      { 
        name: 'TypeScript', 
        icon: SiTypescript, 
        color: '#3178C6',
        experience: '1+ years'
      },
      { 
        name: 'Next.js', 
        icon: SiNextdotjs, 
        color: '#000000',
        experience: '1+ years'
      },
    ]
  },
  {
    category: 'Backend',
    color: '#10B981',
    items: [
      { 
        name: 'Node.js', 
        icon: SiNodedotjs, 
        color: '#339933',
        experience: '2+ years'
      },
      { 
        name: 'Express', 
        icon: SiExpress, 
        color: '#000000',
        experience: '1+ years'
      },
      { 
        name: 'MongoDB', 
        icon: SiMongodb, 
        color: '#47A248',
        experience: '1+ years'
      },
      { 
        name: 'PostgreSQL', 
        icon: SiPostgresql, 
        color: '#336791',
        experience: '6+ months'
      },
      { 
        name: 'REST APIs', 
        icon: FaServer, 
        color: '#FF6B6B',
        experience: '2+ years'
      },
    ]
  },
  {
    category: 'Tools',
    color: '#8B5CF6',
    items: [
      { 
        name: 'Git & GitHub', 
        icon: SiGit, 
        color: '#F05032',
        experience: '2+ years'
      },
      { 
        name: 'VS Code', 
        icon: VscCode, 
        color: '#007ACC',
        experience: '3+ years'
      },
      { 
        name: 'Figma', 
        icon: SiFigma, 
        color: '#F24E1E',
        experience: '2+ years'
      },
      { 
        name: 'Docker', 
        icon: SiDocker, 
        color: '#2496ED',
        experience: '6+ months'
      },
      { 
        name: 'Firebase', 
        icon: SiFirebase, 
        color: '#FF9900',
        experience: '1+ years'
      },
    ]
  }
];