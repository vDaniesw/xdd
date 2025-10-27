import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24">
      <h2 className="text-4xl font-bold text-center mb-12">
        Sobre <span className="text-accent">Mí</span>
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div className="w-full md:w-1/3 flex justify-center">
          <img 
            src="https://picsum.photos/seed/profile/400/400" 
            alt="AlonxDev Portrait"
            className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-slate-200 dark:border-secondary shadow-lg"
          />
        </div>
        <div className="w-full md:w-2/3 text-center md:text-left">
          <p className="text-slate-600 dark:text-text-secondary text-lg leading-relaxed mb-4">
            ¡Hola! Soy AlonxDev, un desarrollador con una profunda pasión por crear sitios web hermosos y funcionales. Mi viaje en el desarrollo web comenzó con un simple "Hola Mundo", y desde entonces, he quedado cautivado por el poder del código para dar vida a las ideas.
          </p>
          <p className="text-slate-600 dark:text-text-secondary text-lg leading-relaxed mb-4">
            Me especializo en el frontend, utilizando tecnologías modernas como React, Next.js y TypeScript para construir interfaces de usuario fluidas. Creo en escribir código limpio y mantenible, y siempre estoy ansioso por aprender nuevas tecnologías y mejorar mis habilidades.
          </p>
          <p className="text-slate-600 dark:text-text-secondary text-lg leading-relaxed">
            Cuando no estoy programando, me puedes encontrar explorando nuevas tendencias tecnológicas, contribuyendo a proyectos de código abierto o disfrutando de una buena taza de café.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;