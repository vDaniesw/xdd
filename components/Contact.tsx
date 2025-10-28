import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useSiteContent } from '../hooks/useSiteContent';
import { SOCIAL_LINKS } from '../constants';
import { useToast } from '../context/ToastContext';
import { supabase } from '../lib/supabaseClient';

const Contact: React.FC = () => {
    const { content } = useSiteContent();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { error } = await supabase.from('messages').insert([formData]);
            if (error) throw error;
            
            showToast('¡Mensaje enviado con éxito! Gracias por contactarme.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            const errorMessage = (error as Error).message;
            showToast(`Error al enviar el mensaje: ${errorMessage}`, 'error');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const dynamicSocialLinks = content ? [
        { name: 'GitHub', url: content.githuburl },
        { name: 'LinkedIn', url: content.linkedinurl },
        { name: 'Twitter', url: content.twitterurl },
    ].filter(link => link.url)
      .map(link => {
        const staticLink = SOCIAL_LINKS.find(sl => sl.name === link.name);
        return { ...staticLink, ...link };
      }) : [];

  return (
    <section id="contact" className="py-24">
        <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
                Conectemos
            </h2>
            <p className="text-slate-600 dark:text-text-secondary text-lg max-w-2xl mx-auto mb-12">
                ¿Tienes una pregunta o una propuesta, o simplemente quieres saludar? Adelante.
            </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-text-secondary mb-2">Nombre</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        className="w-full bg-slate-100 dark:bg-primary/50 border border-slate-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-slate-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-text-secondary mb-2">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                        className="w-full bg-slate-100 dark:bg-primary/50 border border-slate-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-slate-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
                 <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-text-secondary mb-2">Mensaje</label>
                    <textarea 
                        name="message" 
                        id="message" 
                        rows={5} 
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-100 dark:bg-primary/50 border border-slate-300 dark:border-gray-600/50 rounded-lg px-4 py-2 text-slate-900 dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"></textarea>
                </div>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
            </form>
            <div className="flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
                <h3 className="text-2xl font-bold mb-4">Información de Contacto</h3>
                <p className="text-slate-600 dark:text-text-secondary mb-2">
                    Si prefieres no usar el formulario, puedes encontrarme aquí:
                </p>
                <a href="mailto:contact@alonx.dev" className="text-accent hover:underline font-semibold mb-6">
                    contact@alonx.dev
                </a>
                
                <h4 className="text-xl font-semibold mb-4">Encuéntrame en línea</h4>
                <div className="flex space-x-4">
                    {dynamicSocialLinks.map(link => (
                      <a 
                        key={link.name}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-slate-500 dark:text-text-secondary hover:text-accent transition-colors duration-300"
                        aria-label={link.name}
                      >
                        {React.isValidElement<React.HTMLAttributes<HTMLElement>>(link.icon) && React.cloneElement(link.icon, { className: `${link.icon.props.className || ''} w-8 h-8` })}
                      </a>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

export default Contact;