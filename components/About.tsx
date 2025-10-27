import React from 'react';
import { useSiteContent } from '../hooks/useSiteContent';

const About: React.FC = () => {
  const { content, loading } = useSiteContent();

  if (loading || !content) {
    return (
        <section id="about" className="py-24 animate-pulse">
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-48 mx-auto mb-12"></div>
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
                <div className="w-full md:w-1/3 flex justify-center">
                    <div className="rounded-full bg-slate-200 dark:bg-slate-700 w-64 h-64 md:w-80 md:h-80"></div>
                </div>
                <div className="w-full md:w-2/3 space-y-4">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-11/12"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-10/12"></div>
                </div>
            </div>
        </section>
    );
  }

  return (
    <section id="about" className="py-24">
      <h2 className="text-4xl font-bold text-center mb-12">
        Sobre <span className="text-accent">Mí</span>
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div className="w-full md:w-1/3 flex justify-center">
          <img 
            src={content.aboutimage} 
            alt="AlonxDev Portrait"
            className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-slate-200 dark:border-secondary shadow-lg"
          />
        </div>
        <div className="w-full md:w-2/3 text-center md:text-left">
          <p className="text-slate-600 dark:text-text-secondary text-lg leading-relaxed mb-4">
            {content.aboutp1}
          </p>
          <p className="text-slate-600 dark:text-text-secondary text-lg leading-relaxed mb-4">
            {content.aboutp2}
          </p>
          <p className="text-slate-600 dark:text-text-secondary text-lg leading-relaxed">
            {content.aboutp3}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;