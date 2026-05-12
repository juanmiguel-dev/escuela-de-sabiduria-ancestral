'use client';

import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";

interface CuerpoPorQueBlockProps {
  cuerpoPorQue: any[];
}

export function CuerpoPorQueBlockRenderer({ cuerpoPorQue }: CuerpoPorQueBlockProps) {
  if (!cuerpoPorQue || cuerpoPorQue.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative bg-white p-10 sm:p-20 md:p-24 rounded-[3rem] shadow-[0_30px_60px_rgba(91,44,29,0.05)] border border-[#f0eee9] overflow-hidden"
    >
      {/* Elemento decorativo sutil */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#fdfbf7] rounded-full opacity-50" />
      
      <div className="relative z-10">
        <div className="flex flex-col items-center mb-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xs sm:text-sm font-bold tracking-[0.3em] text-[#d4af37] uppercase mb-4"
          >
            El Propósito
          </motion.span>
          <h2 className="font-title text-4xl sm:text-6xl text-center text-[#5b2c1d] leading-tight">
            ¿Por qué elegir este camino?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mt-8" />
        </div>
        
        <div className="prose prose-lg sm:prose-xl prose-gray [font-family:system-ui,-apple-system,sans-serif] text-gray-600 leading-relaxed mx-auto max-w-4xl pt-4">
          <PortableText value={cuerpoPorQue} />
        </div>
      </div>
    </motion.div>
  );
}
