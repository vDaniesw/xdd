import React, { useState, FormEvent, useContext, ChangeEvent, useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';
import type { Project, SiteContent } from '../types';
import { AuthContext } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { useSiteContent } from '../hooks/useSiteContent';
import { useToast } from '../context/ToastContext';

const ManageProjects: React.FC = () => {
    const { projects, addProject, deleteProject, loading } = useProjects();
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newProject, setNewProject] = useState<Omit<Project, 'id' | 'imageurl'>>({
        title: '',
        description: '',
        tags: [],
        liveurl: '',
        sourceurl: '',
    });
    const [tagsInput, setTagsInput] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!imageFile) {
            showToast('Por favor, selecciona una imagen para el proyecto.', 'error');
            return;
        }
        setIsSubmitting(true);
        const tags = tagsInput.split(',').map(tag => tag.trim()).filter(Boolean);
        
        try {
            await addProject({ ...newProject, tags }, imageFile);
            showToast('Proyecto añadido con éxito!');
            
            setNewProject({ title: '', description: '', tags: [], liveurl: '', sourceurl: '' });
            setTagsInput('');
            setImageFile(null);
            setImagePreview(null);
            const fileInput = document.getElementById('image') as HTMLInputElement;
            if(fileInput) fileInput.value = '';
        } catch (error) {
            console.error(error);
            showToast('Error al añadir el proyecto.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProject = async (projectId: string) => {
        if(window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
            try {
                await deleteProject(projectId);
                showToast('Proyecto eliminado.');
            } catch (error) {
                 console.error(error);
                showToast('Error al eliminar el proyecto.', 'error');
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-secondary/30 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-text-primary">Añadir Nuevo Proyecto</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form fields */}
                    <div>
                        <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Título</label>
                        <input type="text" name="title" value={newProject.title} onChange={handleInputChange} required className="w-full bg-gray-100 dark:bg-primary/50 border border-gray-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-gray-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                        <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Descripción</label>
                        <textarea name="description" value={newProject.description} onChange={handleInputChange} required rows={3} className="w-full bg-gray-100 dark:bg-primary/50 border border-gray-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-gray-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"></textarea>
                    </div>
                     <div>
                        <label htmlFor="tags" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Etiquetas (separadas por coma)</label>
                        <input type="text" name="tags" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} required className="w-full bg-gray-100 dark:bg-primary/50 border border-gray-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-gray-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                        <label htmlFor="liveurl" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">URL del Sitio (Opcional)</label>
                        <input type="url" name="liveurl" value={newProject.liveurl} onChange={handleInputChange} className="w-full bg-gray-100 dark:bg-primary/50 border border-gray-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-gray-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                        <label htmlFor="sourceurl" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">URL del Código (Opcional)</label>
                        <input type="url" name="sourceurl" value={newProject.sourceurl} onChange={handleInputChange} className="w-full bg-gray-100 dark:bg-primary/50 border border-gray-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-gray-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                        <label htmlFor="image" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Imagen del Proyecto</label>
                        <input type="file" id="image" name="image" onChange={handleImageChange} required accept="image/*" className="w-full text-sm text-gray-500 dark:text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-blue-700"/>
                        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg max-h-40" />}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Añadiendo...' : 'Añadir Proyecto'}
                    </button>
                </form>
            </div>
            <div>
                 <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-text-primary">Proyectos Existentes ({projects.length})</h2>
                 {loading ? (<p>Cargando proyectos...</p>) : (
                    <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                        {projects.map(project => (
                            <div key={project.id} className="bg-white dark:bg-secondary/30 backdrop-blur-lg p-4 rounded-lg flex items-start gap-4 border border-gray-200 dark:border-gray-800/50">
                                <img src={project.imageurl} alt={project.title} className="w-24 h-24 object-cover rounded-md" />
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
                                <button onClick={() => handleDeleteProject(project.id)} className="text-red-500 hover:text-red-400 transition-colors p-1 rounded-full bg-red-500/10 hover:bg-red-500/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                 )}
            </div>
        </div>
    );
}

const MainContent: React.FC = () => {
    const { content, updateContent, loading } = useSiteContent();
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<SiteContent | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (content) {
            setFormData(content);
            setImagePreview(content.aboutimage);
        } else if (!loading) {
             setFormData({
                id: 1,
                herotitle: '',
                herosubtitle: '',
                herodescription: '',
                aboutimage: '',
                aboutp1: '',
                aboutp2: '',
                aboutp3: '',
            });
            setImagePreview(null);
        }
    }, [content, loading]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (formData) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData) return;
        setIsSubmitting(true);
        try {
            const { id, ...updateData } = formData;
            await updateContent(updateData, imageFile);
            showToast('Contenido principal actualizado!');
            setImageFile(null);
        } catch (error) {
            console.error(error);
            showToast('Error al actualizar el contenido.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <p>Cargando contenido...</p>;
    if (!formData) return <p>No se pudo cargar el contenido. Por favor, añada contenido nuevo.</p>;
    
    return (
        <div className="bg-white dark:bg-secondary/30 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-text-primary">Editar Contenido Principal</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="aboutimage" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Foto de Perfil (Sobre Mí)</label>
                        <input type="file" id="aboutimage" name="aboutimage" onChange={handleImageChange} accept="image/*" className="w-full text-sm text-gray-500 dark:text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-blue-700"/>
                        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg max-h-40" />}
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="herotitle" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Título del Hero</label>
                            <input type="text" name="herotitle" value={formData.herotitle} onChange={handleInputChange} className="w-full bg-gray-100 dark:bg-primary/50 border border-gray-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-gray-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent" />
                        </div>
                        <div>
                            <label htmlFor="herosubtitle" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Subtítulo del Hero</label>
                            <input type="text" name="herosubtitle" value={formData.herosubtitle} onChange={handleInputChange} className="w-full bg-gray-100 dark:bg-primary/50 border border-gray-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-gray-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent" />
                        </div>
                    </div>
                </div>
                 <div>
                    <label htmlFor="herodescription" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Descripción del Hero</label>
                    <textarea name="herodescription" value={formData.herodescription} onChange={handleInputChange} rows={3} className="w-full bg-gray-100 dark:bg-primary/50 border border-gray-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-gray-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"></textarea>
                </div>
                <div>
                    <label htmlFor="aboutp1" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Sobre Mí - Párrafo 1</label>
                    <textarea name="aboutp1" value={formData.aboutp1} onChange={handleInputChange} rows={4} className="w-full bg-gray-100 dark:bg-primary/50 border border-gray-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-gray-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"></textarea>
                </div>
                <div>
                    <label htmlFor="aboutp2" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Sobre Mí - Párrafo 2</label>
                    <textarea name="aboutp2" value={formData.aboutp2} onChange={handleInputChange} rows={4} className="w-full bg-gray-100 dark:bg-primary/50 border border-gray-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-gray-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"></textarea>
                </div>
                <div>
                    <label htmlFor="aboutp3" className="text-sm font-medium text-gray-700 dark:text-text-secondary block mb-2">Sobre Mí - Párrafo 3</label>
                    <textarea name="aboutp3" value={formData.aboutp3} onChange={handleInputChange} rows={4} className="w-full bg-gray-100 dark:bg-primary/50 border border-gray-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-gray-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </form>
        </div>
    );
}

const AdminDashboard: React.FC = () => {
    const { logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState<'projects' | 'main'>('projects');
    
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

                <div className="mb-8 flex border-b border-gray-200 dark:border-gray-700">
                    <button 
                        onClick={() => setActiveTab('projects')}
                        className={`py-3 px-6 font-medium text-lg transition-colors ${activeTab === 'projects' ? 'border-b-2 border-accent text-accent' : 'text-gray-500 dark:text-text-secondary hover:text-accent'}`}
                    >
                        Gestionar Proyectos
                    </button>
                    <button 
                        onClick={() => setActiveTab('main')}
                        className={`py-3 px-6 font-medium text-lg transition-colors ${activeTab === 'main' ? 'border-b-2 border-accent text-accent' : 'text-gray-500 dark:text-text-secondary hover:text-accent'}`}
                    >
                        Principal
                    </button>
                </div>

                {activeTab === 'projects' && <ManageProjects />}
                {activeTab === 'main' && <MainContent />}

            </div>
        </div>
    );
};

export default AdminDashboard;