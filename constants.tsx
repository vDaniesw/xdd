import React from 'react';
import type { Project, Skill, SocialLink, SiteContent } from './types';

// Icons
const CodeBracketIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 15" />
  </svg>
);

const GlobeAltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);


// Projects Data
export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'initial-proj-1',
    title: 'Plataforma de E-Commerce',
    description: 'Una solución de e-commerce full-stack con una interfaz de usuario moderna, gestión de productos y un proceso de pago seguro.',
    imageUrl: 'https://picsum.photos/seed/ecom/600/400',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 'initial-proj-2',
    title: 'Aplicación de Gestión de Tareas',
    description: 'Una herramienta colaborativa de gestión de tareas con funcionalidad de arrastrar y soltar, actualizaciones en tiempo real y autenticación de usuarios.',
    imageUrl: 'https://picsum.photos/seed/taskapp/600/400',
    tags: ['Next.js', 'TypeScript', 'Firebase', 'GraphQL'],
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 'initial-proj-3',
    title: 'Blog Personal',
    description: 'Un blog personal ligero y rápido construido con un generador de sitios estáticos, con soporte para markdown y optimización SEO.',
    imageUrl: 'https://picsum.photos/seed/blog/600/400',
    tags: ['Astro', 'Markdown', 'Tailwind CSS', 'Vercel'],
    liveUrl: '#',
    sourceUrl: '#',
  },
];

// Skills Data
export const SKILLS: Skill[] = [
  { name: 'TypeScript', icon: <span className="devicon-typescript-plain text-4xl"></span> },
  { name: 'React', icon: <span className="devicon-react-original text-4xl"></span> },
  { name: 'Next.js', icon: <span className="devicon-nextjs-original text-4xl"></span> },
  { name: 'Node.js', icon: <span className="devicon-nodejs-plain text-4xl"></span> },
  { name: 'Python', icon: <span className="devicon-python-plain text-4xl"></span> },
  { name: 'PostgreSQL', icon: <span className="devicon-postgresql-plain text-4xl"></span> },
  { name: 'Docker', icon: <span className="devicon-docker-plain text-4xl"></span> },
  { name: 'Tailwind CSS', icon: <span className="devicon-tailwindcss-plain text-4xl"></span> },
];

// Social Links Data
export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com', icon: <span className="devicon-github-original text-2xl"></span> },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: <span className="devicon-linkedin-plain text-2xl"></span> },
  { name: 'Twitter', url: 'https://twitter.com', icon: <span className="devicon-twitter-original text-2xl"></span> },
];

export const ICONS = {
    CodeBracketIcon,
    GlobeAltIcon
};

// Site Content Data
export const INITIAL_SITE_CONTENT: SiteContent = {
  heroTitle: 'AlonxDev',
  heroSubtitle: 'Construyo experiencias web modernas.',
  heroDescription: 'Un apasionado Desarrollador Frontend especializado en crear aplicaciones web elegantes, responsivas y fáciles de usar con React y TypeScript.',
  aboutImage: 'https://picsum.photos/seed/profile/400/400',
  aboutP1: '¡Hola! Soy AlonxDev, un desarrollador con una profunda pasión por crear sitios web hermosos y funcionales. Mi viaje en el desarrollo web comenzó con un simple "Hola Mundo", y desde entonces, he quedado cautivado por el poder del código para dar vida a las ideas.',
  aboutP2: 'Me especializo en el frontend, utilizando tecnologías modernas como React, Next.js y TypeScript para construir interfaces de usuario fluidas. Creo en escribir código limpio y mantenible, y siempre estoy ansioso por aprender nuevas tecnologías y mejorar mis habilidades.',
  aboutP3: 'Cuando no estoy programando, me puedes encontrar explorando nuevas tendencias tecnológicas, contribuyendo a proyectos de código abierto o disfrutando de una buena taza de café.',
};
