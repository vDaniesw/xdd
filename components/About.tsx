import React from 'react';
import { useSiteContent } from '../hooks/useSiteContent';

const About: React.FC = () => {
  const { content, loading } = useSiteContent();

  if (loading) {
    return (
        <section id="about" className="py-24 animate-pulse">
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-48 mx-auto mb-12"></div>
            <div className="max-w-3xl mx-auto space-y-4">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-11/12 mx-auto"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-10/12 mx-auto"></div>
            </div>
        </section>
    );
  }

  if (!content || (!content.aboutp1 && !content.aboutp2 && !content.aboutp3)) {
      return null; // Don't render if there's no about text
  }

  return (
    <section id="about" className="py-24">
      <h2 className="text-4xl font-bold text-center mb-12">
        Sobre <span className="text-accent">Mí</span>
      </h2>
      <div className="max-w-3xl mx-auto text-center">
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
    </section>
  );
};

export default About;