'use client';

import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";

interface DetailedDescriptionBlockProps {
  detailedDescription: any[];
}

export function DetailedDescriptionBlockRenderer({ detailedDescription }: DetailedDescriptionBlockProps) {
  if (!detailedDescription || detailedDescription.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="prose prose-lg sm:prose-xl prose-gray [font-family:system-ui,-apple-system,sans-serif] text-gray-700 leading-relaxed mx-auto max-w-4xl bg-white p-6 sm:p-20 rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.02)] border border-[#f0eee9] w-full break-words overflow-hidden"
    >
      <PortableText value={detailedDescription} />
    </motion.div>
  );
}
