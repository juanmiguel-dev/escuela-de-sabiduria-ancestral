'use client';

import { PortableText } from "@portabletext/react";
import { m, LazyMotion, domAnimation } from "framer-motion";

interface CuerpoPorQueBlockProps {
  cuerpoPorQue: any[];
}

export function CuerpoPorQueBlockRenderer({ cuerpoPorQue }: CuerpoPorQueBlockProps) {
  if (!cuerpoPorQue || cuerpoPorQue.length === 0) {
    return null;
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-white p-12 sm:p-20 md:p-24 rounded-[4rem] shadow-[0_40px_80px_rgba(0,0,0,0.03)] border border-[#f0eee9]"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fdfbf7] px-10 py-2">
          <m.span 
            initial={{ letterSpacing: "0.1em" }}
            whileInView={{ letterSpacing: "0.3em" }}
            transition={{ duration: 1.5 }}
            className="text-xs sm:text-sm font-black tracking-[0.3em] text-[#d4af37] uppercase whitespace-nowrap"
          >
            El Propósito
          </m.span>
        </div>
        <h2 className="font-title text-5xl sm:text-6xl md:text-7xl text-center text-[#5b2c1d] mb-12 mt-4 leading-tight">¿Por qué elegir este camino?</h2>
        <div className="prose prose-lg sm:prose-xl prose-gray [font-family:system-ui,-apple-system,sans-serif] text-[#1a1a1a] leading-relaxed mx-auto max-w-4xl font-light">
          <PortableText value={cuerpoPorQue} />
        </div>
      </m.div>
    </LazyMotion>
  );
}
