import React from 'react';

interface TituloAncestralProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  conSubrayado?: boolean;
}

export const TituloAncestral: React.FC<TituloAncestralProps> = ({
  children,
  className = '',
  as: Component = 'h2',
  conSubrayado = false,
}) => {
  return (
    <div className={`relative inline-block w-fit ${className}`}>
      <Component 
        className="font-hand rotate-[-2deg] text-[#3d2b1f] transition-transform duration-300 hover:rotate-0"
      >
        {children}
      </Component>
      
      {conSubrayado && (
        <div className="absolute -bottom-2 left-0 w-full h-4 overflow-visible pointer-events-none opacity-80">
          <svg
            viewBox="0 0 200 20"
            preserveAspectRatio="none"
            className="w-full h-full fill-current text-[#d4af37]/60"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Trazo irregular tipo pincelada */}
            <path d="M0,10 C30,12 60,8 100,10 C140,12 170,8 200,10 L200,12 C170,10 140,14 100,12 C60,10 30,14 0,12 Z" />
            <path d="M10,13 C40,14 70,12 110,13 C150,14 180,12 190,13 L190,14 C180,13 150,15 110,14 C70,13 40,15 10,14 Z" opacity="0.5" />
          </svg>
        </div>
      )}
    </div>
  );
};
