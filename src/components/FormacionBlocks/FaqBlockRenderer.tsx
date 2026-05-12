'use client';

import { PortableText } from "@portabletext/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  _key: string;
  title: string;
  content: any[];
}

interface FaqBlockProps {
  title?: string;
  faqs: FAQItem[];
}

export function FaqBlockRenderer({ title, faqs }: FaqBlockProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto w-full py-12">
      <h2 className="font-title text-4xl sm:text-5xl md:text-6xl text-center text-[#5b2c1d] mb-12">
        {title || "Preguntas Frecuentes"}
      </h2>
      
      <div className="space-y-4">
        {faqs.map((item) => {
          const isOpen = openItem === item._key;
          
          return (
            <div 
              key={item._key} 
              className={`border border-[#f0eee9] rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen ? 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-[#d4af37]/30' : 'bg-transparent'
              }`}
            >
              <button
                className="flex justify-between items-center w-full p-6 sm:p-7 text-left focus:outline-none group"
                onClick={() => setOpenItem(isOpen ? null : item._key)}
              >
                <span className={`font-semibold text-lg sm:text-xl transition-colors duration-300 ${
                  isOpen ? 'text-[#5b2c1d]' : 'text-[#333333] group-hover:text-[#5b2c1d]'
                }`}>
                  {item.title}
                </span>
                <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  <svg
                    className={`w-6 h-6 transition-colors duration-300 ${isOpen ? 'text-[#d4af37]' : 'text-gray-400 group-hover:text-[#d4af37]'}`}
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
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-7 sm:px-7 sm:pb-8 border-t border-[#f0eee9]/50">
                      <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed pt-6">
                        <PortableText value={item.content} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
