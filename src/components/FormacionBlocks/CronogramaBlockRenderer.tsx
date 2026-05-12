'use client';

import { PortableText } from "@portabletext/react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section ref={containerRef} className="py-16 sm:py-32 max-w-6xl mx-auto w-full px-6">
      <div className="text-center mb-16 sm:mb-28 space-y-4">
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
            className="text-xl text-gray-500 max-w-2xl mx-auto font-medium italic"
          >
            {description}
          </motion.p>
        )}
      </div>

      <div className="relative">
        {/* Línea central base (fondo) */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-[#f0eee9] -translate-x-1/2 hidden sm:block rounded-full" />
        
        {/* Línea central animada (llenado) */}
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#d4af37] to-[#ffeb3b] -translate-x-1/2 hidden sm:block rounded-full z-10 shadow-[0_0_15px_rgba(255,235,59,0.5)]" 
        />

        <div className="space-y-16 sm:space-y-32">
          {items.map((item, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div 
                key={item._key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col sm:flex-row items-center gap-12 ${isEven ? 'sm:flex-row-reverse' : ''}`}
              >
                {/* Punto en la línea con iluminación animada */}
                <div className="absolute left-4 sm:left-1/2 top-0 sm:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden sm:block">
                  <motion.div 
                    initial={{ scale: 0.8, backgroundColor: "#f0eee9", boxShadow: "none" }}
                    whileInView={{ 
                      scale: 1.2, 
                      backgroundColor: "#ffeb3b",
                      boxShadow: "0 0 20px rgba(255, 235, 59, 0.8), 0 0 40px rgba(255, 235, 59, 0.4)"
                    }}
                    viewport={{ once: false, margin: "-50% 0px -50% 0px" }}
                    transition={{ duration: 0.5 }}
                    className="w-5 h-5 rounded-full border-2 border-white"
                  />
                </div>

                {/* Contenido (Card Color Tierra) */}
                <div className="w-full sm:w-[45%] group">
                  <motion.div 
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="p-6 sm:p-14 rounded-[2rem] sm:rounded-[3.5rem] bg-[#5b2c1d] shadow-[0_30px_70px_rgba(91,44,29,0.3)] relative overflow-hidden border border-white/5"
                  >
                    {/* Resplandor decorativo interno */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#ffeb3b] opacity-[0.03] rounded-full blur-3xl group-hover:opacity-[0.07] transition-opacity duration-700" />

                    <div className="relative z-10">
                      {item.indicator && (
                        <span className="inline-block px-5 py-1.5 rounded-full bg-white/10 text-[#ffeb3b] text-xs font-bold tracking-[0.2em] uppercase mb-6 border border-white/10">
                          {item.indicator}
                        </span>
                      )}
                      
                      <h3 className="text-3xl sm:text-4xl font-bold text-[#fdfbf7] mb-6 group-hover:text-[#ffeb3b] transition-colors duration-300 leading-tight">
                        {item.title}
                      </h3>

                      <div className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed [font-family:system-ui,-apple-system,sans-serif]">
                        <PortableText 
                          value={item.content} 
                          components={{
                            marks: {
                              strong: ({children}) => <strong className="text-[#ffeb3b] font-bold">{children}</strong>,
                            }
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
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
