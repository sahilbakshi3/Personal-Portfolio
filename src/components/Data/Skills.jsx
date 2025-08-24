// First install: npm install react-icons

import { 
  SiHtml5, SiJavascript, SiReact, SiTailwindcss, SiTypescript, SiNextdotjs,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiGithub, SiFigma, SiDocker, SiFirebase
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
        color: '#E34F26'
      },
      { 
        name: 'JavaScript', 
        icon: SiJavascript, 
        color: '#F7DF1E'
      },
      { 
        name: 'React', 
        icon: SiReact, 
        color: '#61DAFB'
      },
      { 
        name: 'Tailwind CSS', 
        icon: SiTailwindcss, 
        color: '#06B6D4'
      },
      { 
        name: 'TypeScript', 
        icon: SiTypescript, 
        color: '#3178C6'
      },
      { 
        name: 'Next.js', 
        icon: SiNextdotjs, 
        color: '#000000'
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
        color: '#339933'
      },
      { 
        name: 'Express', 
        icon: SiExpress, 
        color: '#000000'
      },
      { 
        name: 'MongoDB', 
        icon: SiMongodb, 
        color: '#47A248'
      },
      { 
        name: 'PostgreSQL', 
        icon: SiPostgresql, 
        color: '#336791'
      },
      { 
        name: 'REST APIs', 
        icon: FaServer, 
        color: '#FF6B6B'
      },
    ]
  },
  {
    category: 'Tools',
    color: '#8B5CF6',
    items: [
      { 
        name: 'Git & GitHub', 
        icon: SiGithub, 
        color: '#F05032'
      },
      { 
        name: 'VS Code', 
        icon: VscCode, 
        color: '#007ACC'
      },
      { 
        name: 'Figma', 
        icon: SiFigma, 
        color: '#F24E1E'
      },
      { 
        name: 'Docker', 
        icon: SiDocker, 
        color: '#2496ED'
      },
      { 
        name: 'Firebase', 
        icon: SiFirebase, 
        color: '#FF9900'
      },
    ]
  }
];