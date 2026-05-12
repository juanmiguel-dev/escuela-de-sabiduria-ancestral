'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TestimonialItem {
  _key: string;
  nombre: string;
  mensaje: string;
  avatarUrl?: string;
}

interface TestimoniosBlockProps {
  testimonios: TestimonialItem[];
}

export function TestimoniosBlockRenderer({ testimonios }: TestimoniosBlockProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!testimonios || testimonios.length === 0) {
    return null;
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div className="py-24 sm:py-32">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <span className="text-xs sm:text-sm font-bold tracking-[0.4em] text-[#d4af37] uppercase mb-4 block">Experiencias</span>
        <h2 className="font-title text-6xl sm:text-7xl md:text-8xl text-[#5b2c1d]">Voces del Alma</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto px-6">
        {testimonios.map((testimonio, idx) => {
          if (!testimonio.nombre && !testimonio.mensaje && !testimonio.avatarUrl) {
            return null;
          }
          return (
            <motion.div 
              key={testimonio._key} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="bg-white p-10 sm:p-14 rounded-[3.5rem] shadow-[0_30px_70px_rgba(91,44,29,0.06)] border border-[#f0eee9] flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500"
            >
              {testimonio.avatarUrl && (
                <div className="w-full mb-10 overflow-hidden rounded-[2.5rem] aspect-[4/3] relative shadow-inner">
                  <Image
                    src={testimonio.avatarUrl}
                    alt={testimonio.nombre || "Testimonio"}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2.5rem]" />
                </div>
              )}
              
              <div className="relative">
                {/* Comillas decorativas */}
                <span className="absolute -top-6 -left-4 text-6xl text-[#d4af37]/20 font-serif leading-none select-none">“</span>
                
                {testimonio.mensaje && (
                  <p className="text-gray-700 italic text-xl sm:text-2xl leading-[1.8] mb-8 font-light relative z-10">
                    {testimonio.mensaje}
                  </p>
                )}
                
                <span className="absolute -bottom-10 -right-4 text-6xl text-[#d4af37]/20 font-serif leading-none select-none">”</span>
              </div>

              {testimonio.nombre && (
                <div className="mt-auto">
                  <div className="w-12 h-px bg-[#d4af37]/40 mx-auto mb-6" />
                  <p className="font-bold text-[#5b2c1d] uppercase tracking-[0.3em] text-sm">
                    {testimonio.nombre}
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
