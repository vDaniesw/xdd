import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { useSiteContent } from '../hooks/useSiteContent';

const Hero: React.FC = () => {
    const { content, loading } = useSiteContent();

    const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    };
    
    // Create dynamic social links based on content from DB
    const dynamicSocialLinks = content ? [
        { name: 'GitHub', url: content.githuburl },
        { name: 'LinkedIn', url: content.linkedinurl },
        { name: 'Twitter', url: content.twitterurl },
    ].filter(link => link.url)
      .map(link => {
        const staticLink = SOCIAL_LINKS.find(sl => sl.name === link.name);
        return { ...staticLink, ...link };
      }) : [];

    if (loading) {
        return (
          <section id="home" className="py-24 md:py-32">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 animate-pulse">
              <div className="w-auto flex-shrink-0">
                <div className="rounded-full bg-slate-200 dark:bg-slate-700 w-48 h-48 md:w-56 md:h-56"></div>
              </div>
              <div className="w-full">
                <div className="h-14 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-full mb-6"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-8"></div>
                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded w-48"></div>
              </div>
            </div>
          </section>
        );
    }
      
    if (!content || !content.herotitle) {
        return (
            <section id="home" className="py-24 md:py-32 flex flex-col justify-center items-center text-center">
                <div className="max-w-3xl animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-text-primary mb-6">
                        ¡Bienvenido a tu Portafolio!
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-text-secondary mb-8">
                        Parece que el sitio aún no ha sido configurado. Ve al panel de administración para empezar.
                    </p>
                    <a
                        href="/admin"
                        className="bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Ir al Administrador
                    </a>
                </div>
            </section>
        )
    }

  return (
    <section id="home" className="py-24 md:py-32">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="w-auto flex-shrink-0 animate-fade-in-up">
          <img 
            src={content.aboutimage} 
            alt="AlonxDev Portrait"
            className="rounded-full w-48 h-48 md:w-56 md:h-56 object-cover border-4 border-slate-200 dark:border-secondary shadow-lg"
          />
        </div>
        <div className="w-full text-center md:text-left animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-4">
            {content.herotitle}
          </h1>
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 dark:text-text-primary mb-6">
            {content.herosubtitle}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-text-secondary mb-8">
            {content.herodescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
            <a 
              href="#contact" 
              onClick={handleScrollToContact}
              className="bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Ponte en Contacto
            </a>
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
      </div>
    </section>
  );
};

export default Hero;