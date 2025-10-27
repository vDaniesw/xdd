import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { useSiteContent } from '../hooks/useSiteContent';

const Hero: React.FC = () => {
    const { content, loading } = useSiteContent();

    const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading || !content) {
        return (
          <section id="home" className="min-h-screen flex flex-col justify-center items-start text-left py-20">
            <div className="max-w-3xl animate-pulse">
                <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded w-full mb-6"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-8"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-4/6 mb-8"></div>
                <div className="flex items-center gap-6">
                  <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded w-48"></div>
                </div>
            </div>
          </section>
        );
      }

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-start text-left py-20">
      <div className="max-w-3xl animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-4">
          {content.herotitle}
        </h1>
        <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 dark:text-text-primary mb-6">
          {content.herosubtitle}
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-text-secondary mb-8">
          {content.herodescription}
        </p>
        <div className="flex items-center gap-6">
          <a 
            href="#contact" 
            onClick={handleScrollToContact}
            className="bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Ponte en Contacto
          </a>
          <div className="flex space-x-4">
            {SOCIAL_LINKS.map(link => (
              <a 
                key={link.name}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 dark:text-text-secondary hover:text-accent transition-colors duration-300"
                aria-label={link.name}
              >
                {/* FIX: Add generic type to React.isValidElement to inform TypeScript about the element's props, resolving errors with React.cloneElement. */}
                {React.isValidElement<React.HTMLAttributes<HTMLElement>>(link.icon) && React.cloneElement(link.icon, { className: `${link.icon.props.className || ''} w-8 h-8` })}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;