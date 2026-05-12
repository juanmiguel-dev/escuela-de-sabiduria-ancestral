'use client';

import { PortableText } from "@portabletext/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="max-w-4xl mx-auto w-full py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs sm:text-sm font-bold tracking-[0.3em] text-[#d4af37] uppercase mb-4 block">Estructura</span>
        <h2 className="font-title text-4xl sm:text-5xl md:text-6xl text-[#5b2c1d]">Introducción y Apertura</h2>
      </motion.div>

      <div className="space-y-6">
        {introduccionApertura.map((item, index) => {
          const isOpen = openItem === item._key;
          
          return (
            <motion.div 
              key={item._key} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`border border-[#f0eee9] rounded-2xl overflow-hidden transition-all duration-500 ${
                isOpen ? 'bg-white shadow-[0_20px_40px_rgba(91,44,29,0.04)] border-[#d4af37]/20' : 'bg-white/50 hover:bg-white'
              }`}
            >
              <button
                className="flex justify-between items-center w-full p-6 sm:p-8 text-left focus:outline-none group"
                onClick={() => setOpenItem(isOpen ? null : item._key)}
              >
                <span className={`font-semibold text-lg sm:text-xl transition-colors duration-300 ${
                  isOpen ? 'text-[#5b2c1d]' : 'text-[#333333] group-hover:text-[#5b2c1d]'
                }`}>
                  {item.title}
                </span>
                <div className={`flex-shrink-0 ml-4 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                  <svg
                    className={`w-6 h-6 transition-colors duration-300 ${isOpen ? 'text-[#d4af37]' : 'text-gray-300 group-hover:text-[#d4af37]'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 pb-8 sm:px-8 sm:pb-10 border-t border-[#fdfbf7]">
                      <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed pt-8">
                        <PortableText value={item.content} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
