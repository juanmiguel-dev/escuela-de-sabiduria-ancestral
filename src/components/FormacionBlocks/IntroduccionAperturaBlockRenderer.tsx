'use client';

import { PortableText } from "@portabletext/react";
import { useState } from "react";

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
    <div className="space-y-4">
      <h2 className="font-title text-4xl sm:text-5xl md:text-6xl text-center text-[#5b2c1d] mb-12 mt-4">Introducción y Apertura del Camino</h2>
      {introduccionApertura.map((item) => (
        <div key={item._key} className="border border-[#f0eee9] rounded-lg overflow-hidden">
          <button
            className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-gray-50 focus:outline-none"
            onClick={() => setOpenItem(openItem === item._key ? null : item._key)}
          >
            <span className="font-medium text-lg text-[#333333]">{item.title}</span>
            <svg
              className={`w-5 h-5 text-[#d4af37] transform transition-transform duration-200 ${
                openItem === item._key ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {openItem === item._key && (
            <div className="p-6 bg-[#fdfbf7] border-t border-[#f0eee9]">
              <div className="prose prose-lg prose-gray [font-family:system-ui,-apple-system,sans-serif] text-gray-700 leading-relaxed">
                <PortableText value={item.content} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
