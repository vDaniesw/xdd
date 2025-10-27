import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 py-6 mt-12">
      <div className="container mx-auto px-6 md:px-12 text-center text-text-secondary">
        <div className="flex justify-center items-center space-x-4">
            <p>&copy; {currentYear} AlonxDev. Todos los derechos reservados.</p>
        </div>
        <p className="text-xs mt-2">
            Creado con React, TypeScript y Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;