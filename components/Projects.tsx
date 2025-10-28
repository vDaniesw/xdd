import React, { useState, useMemo } from 'react';
import type { Project } from '../types';
import { ICONS } from '../constants';
import { useProjects } from '../hooks/useProjects';
import { supabase } from '../lib/supabaseClient';


const { CodeBracketIcon, GlobeAltIcon } = ICONS;

const handleViewCount = async (project: Project) => {
    if (!project.id) return;
    const newViews = (project.views || 0) + 1;
    await supabase
        .from('projects')
        .update({ views: newViews })
        .eq('id', project.id);
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-white dark:bg-secondary rounded-lg overflow-hidden group transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-300/20 dark:hover:shadow-blue-900/20">
    <div className="relative overflow-hidden">
        <img src={project.imageurl} alt={project.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="flex space-x-4">
                {project.liveurl && (
                    <a href={project.liveurl} target="_blank" rel="noopener noreferrer" onClick={() => handleViewCount(project)} className="p-3 bg-accent rounded-full text-white hover:bg-blue-700 transition-colors">
                        <GlobeAltIcon className="w-6 h-6" />
                    </a>
                )}
                {project.sourceurl && (
                    <a href={project.sourceurl} target="_blank" rel="noopener noreferrer" className="p-3 bg-accent rounded-full text-white hover:bg-blue-700 transition-colors">
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
  const [activeFilter, setActiveFilter] = useState<string>('Todos');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(tag => tags.add(tag)));
    return ['Todos', ...Array.from(tags)];
  }, [projects]);
  
  const filteredProjects = useMemo(() => {
      if (activeFilter === 'Todos') return projects;
      return projects.filter(p => p.tags.includes(activeFilter));
  }, [projects, activeFilter]);
  
  return (
    <section id="projects" className="py-24">
      <h2 className="text-4xl font-bold text-center mb-6">
        Mis <span className="text-accent">Proyectos</span>
      </h2>
      
      {!loading && projects.length > 0 && (
         <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allTags.map(tag => (
                <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${activeFilter === tag ? 'bg-accent text-white' : 'bg-slate-200 dark:bg-secondary/50 text-slate-700 dark:text-text-secondary hover:bg-accent/20'}`}
                >
                    {tag}
                </button>
            ))}
        </div>
      )}
        
      {!loading && projects.length === 0 && (
          <div className="text-center bg-slate-100 dark:bg-secondary/30 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">¡Pronto habrá proyectos aquí!</h3>
              <p className="text-slate-600 dark:text-text-secondary mb-4">
                  Actualmente estoy trabajando en nuevos proyectos. Mientras tanto, puedes añadir los tuyos desde el panel de administración.
              </p>
              <a href="/admin" className="text-accent font-semibold hover:underline">
                  Añadir Proyectos
              </a>
          </div>
      )}
        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
             Array.from({ length: 3 }).map((_, index) => <ProjectSkeleton key={index} />)
        ) : (
            filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
            ))
        )}
      </div>
    </section>
  );
};

export default Projects;