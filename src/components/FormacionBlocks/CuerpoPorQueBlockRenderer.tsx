import { PortableText } from "@portabletext/react";

interface CuerpoPorQueBlockProps {
  cuerpoPorQue: any[];
}

export function CuerpoPorQueBlockRenderer({ cuerpoPorQue }: CuerpoPorQueBlockProps) {
  if (!cuerpoPorQue || cuerpoPorQue.length === 0) {
    return null;
  }

  return (
    <div className="relative bg-white p-12 sm:p-20 md:p-24 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-[#f0eee9]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fdfbf7] px-8">
        <span className="text-sm font-bold tracking-[0.2em] text-[#d4af37] uppercase">El Propósito</span>
      </div>
      <h2 className="font-title text-4xl sm:text-5xl md:text-6xl text-center text-[#5b2c1d] mb-12 mt-4">¿Por qué elegir este camino?</h2>
      <div className="prose prose-lg sm:prose-xl prose-gray [font-family:system-ui,-apple-system,sans-serif] text-gray-600 leading-relaxed mx-auto max-w-4xl">
        <PortableText value={cuerpoPorQue} />
      </div>
    </div>
  );
}
