'use client';

import { PortableText } from "@portabletext/react";
import { m, LazyMotion, domAnimation } from "framer-motion";

interface IntroBlockProps {
  intro: any[];
}

export function IntroBlockRenderer({ intro }: IntroBlockProps) {
  if (!intro || intro.length === 0) {
    return null;
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="prose prose-lg sm:prose-2xl prose-gray [font-family:system-ui,-apple-system,sans-serif] text-[#1a1a1a] leading-[1.9] text-center mx-auto font-light max-w-4xl"
      >
        <PortableText value={intro} />
      </m.div>
    </LazyMotion>
  );
}
