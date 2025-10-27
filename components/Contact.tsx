import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 text-center">
      <h2 className="text-4xl font-bold mb-4">
        Conectemos
      </h2>
      <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
        Actualmente estoy abierto a nuevas oportunidades y colaboraciones. Si tienes un proyecto en mente o simplemente quieres saludar, no dudes en contactarme.
      </p>
      <div className="flex justify-center items-center gap-8">
        <a 
          href="mailto:contact@alonx.dev" 
          className="bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Envíame un Email
        </a>
        <div className="flex space-x-4">
            {SOCIAL_LINKS.map(link => (
              <a 
                key={link.name}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-text-secondary hover:text-accent transition-colors duration-300"
                aria-label={link.name}
              >
                {/* FIX: Add generic type to React.isValidElement to inform TypeScript about the element's props, resolving errors with React.cloneElement. */}
                {React.isValidElement<React.HTMLAttributes<HTMLElement>>(link.icon) && React.cloneElement(link.icon, { className: `${link.icon.props.className || ''} w-8 h-8` })}
              </a>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;