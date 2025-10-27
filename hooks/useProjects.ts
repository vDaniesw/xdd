import type { Project } from '../types';
import useLocalStorage from './useLocalStorage';
import { INITIAL_PROJECTS } from '../constants';

export const useProjects = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', INITIAL_PROJECTS);

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newId = `proj-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const newProject: Project = { ...projectData, id: newId };
    setProjects(prevProjects => [newProject, ...prevProjects]);
  };

  const deleteProject = (id: string) => {
    setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
  };

  return { projects, addProject, deleteProject };
};