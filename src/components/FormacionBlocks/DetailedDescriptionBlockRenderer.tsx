'use client';

import { PortableText } from "@portabletext/react";
import { m, LazyMotion, domAnimation } from "framer-motion";

interface DetailedDescriptionBlockProps {
  detailedDescription: any[];
}

export function DetailedDescriptionBlockRenderer({ detailedDescription }: DetailedDescriptionBlockProps) {
  if (!detailedDescription || detailedDescription.length === 0) {
    return null;
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="prose prose-lg sm:prose-xl prose-gray [font-family:system-ui,-apple-system,sans-serif] text-[#1a1a1a] leading-relaxed mx-auto max-w-4xl bg-white p-12 sm:p-20 rounded-[3.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.04)] border border-[#f0eee9]"
      >
        <PortableText value={detailedDescription} />
      </m.div>
    </LazyMotion>
  );
}
