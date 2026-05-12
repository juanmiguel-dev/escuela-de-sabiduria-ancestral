'use client';

import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";

interface IntroBlockProps {
  intro: any[];
}

export function IntroBlockRenderer({ intro }: IntroBlockProps) {
  if (!intro || intro.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="prose prose-xl sm:prose-2xl prose-gray [font-family:system-ui,-apple-system,sans-serif] text-[#333333] leading-[1.8] text-center mx-auto font-light max-w-4xl px-4"
    >
      <PortableText value={intro} />
    </motion.div>
  );
}
