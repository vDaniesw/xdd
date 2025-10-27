import React from 'react';
import type { Project } from '../types';
import { ICONS } from '../constants';
import { useProjects } from '../hooks/useProjects';

const { CodeBracketIcon, GlobeAltIcon } = ICONS;

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-white dark:bg-secondary rounded-lg overflow-hidden group transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-300/20 dark:hover:shadow-blue-900/20">
    <div className="relative overflow-hidden">
        <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="flex space-x-4">
                {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-accent rounded-full text-white hover:bg-blue-700 transition-colors">
                        <GlobeAltIcon className="w-6 h-6" />
                    </a>
                )}
                {project.sourceUrl && (
                    <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-accent rounded-full text-white hover:bg-blue-700 transition-colors">
                        <CodeBracketIcon className="w-6 h-6" />
                    </a>
                )}
            </div>
        </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-text-primary mb-2">{project.title}</h3>
      <p className="text-slate-600 dark:text-text-secondary mb-4 text-sm">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span key={tag} className="bg-slate-100 dark:bg-primary text-accent text-xs font-semibold px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ProjectSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-secondary rounded-lg overflow-hidden animate-pulse">
        <div className="w-full h-56 bg-slate-200 dark:bg-slate-700"></div>
        <div className="p-6">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-4"></div>
            <div className="flex flex-wrap gap-2">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-20"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-24"></div>
            </div>
        </div>
    </div>
);


const Projects: React.FC = () => {
  const { projects, loading } = useProjects();
  
  return (
    <section id="projects" className="py-24">
      <h2 className="text-4xl font-bold text-center mb-12">
        Mis <span className="text-accent">Proyectos</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
             Array.from({ length: 3 }).map((_, index) => <ProjectSkeleton key={index} />)
        ) : (
            projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
            ))
        )}
      </div>
    </section>
  );
};

export default Projects;