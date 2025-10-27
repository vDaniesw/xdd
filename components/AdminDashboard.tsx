import React, { useState, FormEvent, useContext, ChangeEvent } from 'react';
import { useProjects } from '../hooks/useProjects';
import type { Project } from '../types';
import { AuthContext } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const AdminDashboard: React.FC = () => {
    const { projects, addProject, deleteProject } = useProjects();
    const { logout } = useContext(AuthContext);
    
    const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
        title: '',
        description: '',
        imageUrl: '',
        tags: [],
    });
    const [tagsInput, setTagsInput] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setNewProject({ ...newProject, imageUrl: result });
                setImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const tags = tagsInput.split(',').map(tag => tag.trim()).filter(Boolean);
        addProject({ ...newProject, tags });
        
        // Reset form
        setNewProject({ title: '', description: '', imageUrl: '', tags: [] });
        setTagsInput('');
        setImagePreview(null);
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
    };

    return (
        <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-primary transition-colors duration-300">
            <div className="container mx-auto">
                <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-text-primary">Panel de Administración</h1>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button onClick={logout} className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                            Cerrar Sesión
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Add Project Form */}
                    <div className="bg-white dark:bg-secondary/30 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-text-primary">Añadir Nuevo Proyecto</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Título</label>
                                <input type="text" name="title" value={newProject.title} onChange={handleInputChange} required className="w-full bg-gray-100 dark:bg-primary/50 border border-gray-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-gray-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent" />
                            </div>
                            <div>
                                <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Descripción</label>
                                <textarea name="description" value={newProject.description} onChange={handleInputChange} required rows={4} className="w-full bg-gray-100 dark:bg-primary/50 border border-gray-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-gray-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"></textarea>
                            </div>
                             <div>
                                <label htmlFor="tags" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Etiquetas (separadas por coma)</label>
                                <input type="text" name="tags" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} required className="w-full bg-gray-100 dark:bg-primary/50 border border-gray-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-gray-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent" />
                            </div>
                            <div>
                                <label htmlFor="image" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Imagen del Proyecto</label>
                                <input type="file" id="image" name="image" onChange={handleImageChange} required accept="image/*" className="w-full text-sm text-gray-500 dark:text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-blue-700"/>
                                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg max-h-40" />}
                            </div>
                            <button type="submit" className="w-full bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300">Añadir Proyecto</button>
                        </form>
                    </div>

                    {/* Projects List */}
                    <div>
                         <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-text-primary">Proyectos Existentes ({projects.length})</h2>
                         <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {projects.map(project => (
                                <div key={project.id} className="bg-white dark:bg-secondary/30 backdrop-blur-lg p-4 rounded-lg flex items-start gap-4 border border-gray-200 dark:border-gray-800/50">
                                    <img src={project.imageUrl} alt={project.title} className="w-24 h-24 object-cover rounded-md" />
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-gray-800 dark:text-text-primary">{project.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-text-secondary line-clamp-2">{project.description}</p>
                                         <div className="flex flex-wrap gap-1 mt-2">
                                            {project.tags.map(tag => (
                                            <span key={tag} className="bg-gray-200 text-accent dark:bg-primary dark:text-accent text-xs font-semibold px-2 py-0.5 rounded-full">
                                                {tag}
                                            </span>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={() => deleteProject(project.id)} className="text-red-500 hover:text-red-400 transition-colors p-1 rounded-full bg-red-500/10 hover:bg-red-500/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;