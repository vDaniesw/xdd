import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-slate-100 dark:bg-secondary/30 rounded-lg">
      <h2 className="text-4xl font-bold text-center mb-12">
        Tecnologías que Utilizo
      </h2>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {SKILLS.map(skill => (
            <div key={skill.name} className="flex flex-col items-center gap-2 group">
              <div className="text-slate-500 dark:text-text-secondary group-hover:text-accent transition-colors duration-300">
                {/* FIX: Add generic type to React.isValidElement to inform TypeScript about the element's props, resolving errors with React.cloneElement. */}
                {React.isValidElement<React.HTMLAttributes<HTMLElement>>(skill.icon) && React.cloneElement(skill.icon, { className: `${skill.icon.props.className || ''} w-12 h-12 md:w-16 md:h-16` })}
              </div>
              <p className="text-sm font-semibold text-slate-600 dark:text-text-secondary group-hover:text-slate-900 dark:group-hover:text-text-primary transition-colors duration-300">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;