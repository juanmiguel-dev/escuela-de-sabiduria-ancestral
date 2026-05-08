import { PortableText } from "@portabletext/react";

interface CuerpoDirigidoABlockProps {
  cuerpoDirigidoA: any[];
}

export function CuerpoDirigidoABlockRenderer({ cuerpoDirigidoA }: CuerpoDirigidoABlockProps) {
  if (!cuerpoDirigidoA || cuerpoDirigidoA.length === 0) {
    return null;
  }

  return (
    <div className="relative bg-[#5b2c1d] text-white p-12 sm:p-20 md:p-24 rounded-[3rem] shadow-2xl overflow-hidden">
      {/* Elemento decorativo de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      
      <h2 className="font-title text-4xl sm:text-5xl md:text-6xl text-center text-[#fdfbf7] mb-12 relative z-10">¿A quiénes está dirigida?</h2>
      <div className="prose prose-lg sm:prose-xl prose-invert [font-family:system-ui,-apple-system,sans-serif] text-white/90 leading-relaxed mx-auto max-w-4xl relative z-10">
        <PortableText value={cuerpoDirigidoA} />
      </div>
    </div>
  );
}
