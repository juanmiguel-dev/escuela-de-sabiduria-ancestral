'use client';

import { PortableText } from "@portabletext/react";
import { m, LazyMotion, domAnimation } from "framer-motion";

interface CuerpoDirigidoABlockProps {
  cuerpoDirigidoA: any[];
}

export function CuerpoDirigidoABlockRenderer({ cuerpoDirigidoA }: CuerpoDirigidoABlockProps) {
  if (!cuerpoDirigidoA || cuerpoDirigidoA.length === 0) {
    return null;
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-[#5b2c1d] text-white p-12 sm:p-20 md:p-24 rounded-[4rem] shadow-[0_40px_100px_rgba(91,44,29,0.3)] overflow-hidden"
      >
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>
        
        <h2 className="font-title text-5xl sm:text-6xl md:text-7xl text-center text-[#fdfbf7] mb-12 relative z-10 leading-tight">¿A quiénes está dirigida?</h2>
        <div className="prose prose-lg sm:prose-xl prose-invert [font-family:system-ui,-apple-system,sans-serif] text-white/90 leading-[1.8] mx-auto max-w-4xl relative z-10 font-light">
          <PortableText value={cuerpoDirigidoA} />
        </div>
      </m.div>
    </LazyMotion>
  );
}
