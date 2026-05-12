'use client';

import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";

interface CronogramaItem {
  _key: string;
  indicator?: string;
  title?: string;
  content: any[];
}

interface CronogramaBlockProps {
  title?: string;
  description?: string;
  items: CronogramaItem[];
}

export function CronogramaBlockRenderer({ title, description, items }: CronogramaBlockProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 max-w-5xl mx-auto w-full">
      <div className="text-center mb-16 sm:mb-20 space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-title text-5xl sm:text-7xl text-[#5b2c1d] leading-tight"
        >
          {title || "Programa de la Formación"}
        </motion.h2>
        {description && (
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto font-medium italic"
          >
            {description}
          </motion.p>
        )}
      </div>

      <div className="relative">
        {/* Línea central decorativa */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4af37]/0 via-[#d4af37]/30 to-[#d4af37]/0 hidden sm:block" />

        <div className="space-y-12 sm:space-y-24">
          {items.map((item, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div 
                key={item._key}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`relative flex flex-col sm:flex-row items-center gap-8 ${isEven ? 'sm:flex-row-reverse' : ''}`}
              >
                {/* Indicador / Punto en la línea */}
                <div className="absolute left-4 sm:left-1/2 top-0 sm:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:block">
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                </div>

                {/* Contenido */}
                <div className="w-full sm:w-[45%] group">
                  <div className={`p-8 sm:p-10 rounded-3xl bg-white border border-[#f0eee9] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(91,44,29,0.08)] hover:border-[#d4af37]/20 relative overflow-hidden`}>
                    
                    {/* Fondo decorativo sutil */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#fdfbf7] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:scale-110 transition-transform duration-700" />

                    <div className="relative z-10">
                      {item.indicator && (
                        <span className="inline-block px-4 py-1 rounded-full bg-[#fdfbf7] text-[#d4af37] text-xs font-bold tracking-widest uppercase mb-4 border border-[#f0eee9]">
                          {item.indicator}
                        </span>
                      )}
                      
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-4 group-hover:text-[#5b2c1d] transition-colors duration-300">
                        {item.title}
                      </h3>

                      <div className="prose prose-gray prose-sm sm:prose-base max-w-none text-gray-600 leading-relaxed">
                        <PortableText value={item.content} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Espacio vacío para el otro lado en desktop */}
                <div className="hidden sm:block sm:w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
