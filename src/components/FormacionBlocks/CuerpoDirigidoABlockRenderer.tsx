'use client';

import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";

interface CuerpoDirigidoABlockProps {
  cuerpoDirigidoA: any[];
}

export function CuerpoDirigidoABlockRenderer({ cuerpoDirigidoA }: CuerpoDirigidoABlockProps) {
  if (!cuerpoDirigidoA || cuerpoDirigidoA.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-[#5b2c1d] text-white p-6 sm:p-20 md:p-24 rounded-[2rem] sm:rounded-[3rem] shadow-[0_30px_70px_rgba(91,44,29,0.2)] overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4af37] opacity-[0.05] rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
      
      <div className="relative z-10">
        <div className="flex flex-col items-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xs sm:text-sm font-bold tracking-[0.4em] text-[#d4af37] uppercase mb-4"
          >
            Apertura
          </motion.span>
          <h2 className="font-title text-3xl sm:text-5xl text-center text-[#fdfbf7] leading-tight">
            ¿A quiénes está dirigida?
          </h2>
        </div>

        <div className="prose prose-lg sm:prose-xl prose-invert [font-family:system-ui,-apple-system,sans-serif] text-white/80 leading-relaxed mx-auto max-w-4xl">
          <PortableText value={cuerpoDirigidoA} />
        </div>
      </div>
    </motion.div>
  );
}
