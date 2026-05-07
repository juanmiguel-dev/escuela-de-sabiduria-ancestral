'use client';

import { PortableText } from "@portabletext/react";
import { useState } from "react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";

interface AccordionItem {
  _key: string;
  title: string;
  content: any[];
}

interface IntroduccionAperturaBlockProps {
  introduccionApertura: AccordionItem[];
}

export function IntroduccionAperturaBlockRenderer({ introduccionApertura }: IntroduccionAperturaBlockProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  if (!introduccionApertura || introduccionApertura.length === 0) {
    return null;
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-6"
      >
        <h2 className="font-title text-5xl sm:text-6xl md:text-7xl text-center text-[#5b2c1d] mb-16 mt-4 leading-tight">Introducción y Apertura del Camino</h2>
        
        <div className="space-y-4">
          {introduccionApertura.map((item, idx) => (
            <m.div 
              key={item._key} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border border-[#f0eee9] rounded-[2rem] overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                className="flex justify-between items-center w-full p-8 text-left bg-white hover:bg-gray-50/50 transition-colors focus:outline-none"
                onClick={() => setOpenItem(openItem === item._key ? null : item._key)}
              >
                <span className="font-black text-lg sm:text-xl text-[#1a1a1a] tracking-tight uppercase">{item.title}</span>
                <m.div
                  animate={{ rotate: openItem === item._key ? 180 : 0 }}
                  className="w-10 h-10 rounded-full bg-[#fdfbf7] flex items-center justify-center text-[#d4af37]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </m.div>
              </button>
              
              <AnimatePresence>
                {openItem === item._key && (
                  <m.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="p-10 bg-[#fdfbf7] border-t border-[#f0eee9]">
                      <div className="prose prose-lg prose-gray [font-family:system-ui,-apple-system,sans-serif] text-[#333333] leading-relaxed font-light">
                        <PortableText value={item.content} />
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          ))}
        </div>
      </m.div>
    </LazyMotion>
  );
}
