import { getFormacionBySlug } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import NextLink from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const revalidate = 0; // Desactiva la caché de Next.js para esta ruta dinámica

export default async function FormacionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formacion = await getFormacionBySlug(slug);

  if (!formacion) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fdfbf7] selection:bg-[#333333] selection:text-white font-sans text-gray-900 pb-24">
      <Navbar theme="dark" position="absolute" />

      {/* Hero Section de la Formación */}
      <section className="relative h-[60vh] sm:h-[70vh] w-full flex items-end pb-16 justify-center overflow-hidden bg-black">
        {(formacion.heroImageUrl || formacion.imageUrl) && (
          <Image
            src={formacion.heroImageUrl || formacion.imageUrl}
            alt={formacion.title}
            fill
            className="object-cover opacity-50"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 z-10" />

        <div className="relative z-20 max-w-4xl px-6 sm:px-12 text-center">
          {formacion.duration && (
            <span className="block text-xs sm:text-sm text-[#d4af37] font-bold tracking-[0.3em] uppercase mb-4">
              DURACIÓN: {formacion.duration}
            </span>
          )}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg mb-4 sm:mb-6">
            {formacion.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto font-medium">
            {formacion.subtitle || formacion.shortDescription}
          </p>
        </div>
      </section>

      {/* Contenido Detallado - Diseño Elegante y Más Amplio */}
      <section className="max-w-5xl mx-auto px-6 sm:px-12 py-16 sm:py-24 space-y-24">
        
        {/* Intro */}
        {formacion.intro && (
          <div className="prose prose-xl prose-gray [font-family:system-ui,-apple-system,sans-serif] text-[#333333] leading-[1.8] text-center mx-auto font-light max-w-4xl">
            <PortableText value={formacion.intro} />
          </div>
        )}

        {/* Separador Elegante */}
        {(formacion.intro && (formacion.cuerpoPorQue || formacion.cuerpoDirigidoA || formacion.detailedDescription)) && (
          <div className="flex justify-center">
            <div className="w-24 h-[1px] bg-[#d4af37]/40"></div>
          </div>
        )}

        {/* ¿Por qué elegir este camino? */}
        {formacion.cuerpoPorQue && (
          <div className="relative bg-white p-12 sm:p-20 md:p-24 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-[#f0eee9]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fdfbf7] px-8">
              <span className="text-sm font-bold tracking-[0.2em] text-[#d4af37] uppercase">El Propósito</span>
            </div>
            <h2 className="font-title text-4xl sm:text-5xl md:text-6xl text-center text-[#5b2c1d] mb-12 mt-4">¿Por qué elegir este camino?</h2>
            <div className="prose prose-lg sm:prose-xl prose-gray [font-family:system-ui,-apple-system,sans-serif] text-gray-600 leading-relaxed mx-auto max-w-4xl">
              <PortableText value={formacion.cuerpoPorQue} />
            </div>
          </div>
        )}

        {/* ¿A quiénes está dirigida? */}
        {formacion.cuerpoDirigidoA && (
          <div className="relative bg-[#5b2c1d] text-white p-12 sm:p-20 md:p-24 rounded-[3rem] shadow-2xl overflow-hidden">
            {/* Elemento decorativo de fondo */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <h2 className="font-title text-4xl sm:text-5xl md:text-6xl text-center text-[#fdfbf7] mb-12 relative z-10">¿A quiénes está dirigida?</h2>
            <div className="prose prose-lg sm:prose-xl prose-invert [font-family:system-ui,-apple-system,sans-serif] text-white/90 leading-relaxed mx-auto max-w-4xl relative z-10">
              <PortableText value={formacion.cuerpoDirigidoA} />
            </div>
          </div>
        )}

        {/* Descripción Detallada General (Si existe) */}
        {formacion.detailedDescription && (
          <div className="prose prose-lg sm:prose-xl prose-gray [font-family:system-ui,-apple-system,sans-serif] text-gray-700 leading-relaxed mx-auto max-w-4xl bg-white p-12 sm:p-20 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.02)] border border-[#f0eee9]">
            <PortableText value={formacion.detailedDescription} />
          </div>
        )}

        {/* Mensaje por defecto si todo está vacío */}
        {!formacion.intro && !formacion.cuerpoPorQue && !formacion.cuerpoDirigidoA && !formacion.detailedDescription && (
           <p className="text-gray-500 italic text-center">No hay detalles adicionales disponibles para esta formación.</p>
        )}

        {/* Tarjeta de Reserva Final */}
        <div className="mt-24 pt-16 border-t border-[#f0eee9] flex flex-col items-center text-center">
          <span className="text-sm font-bold tracking-[0.2em] text-[#a09e9a] uppercase mb-4">Asegura tu lugar</span>
          <h3 className="font-title text-4xl sm:text-5xl text-[#333333] mb-6">Comienza tu viaje hoy</h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-10">
            {formacion.price && (
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-widest">Internacional</span>
                <div className="text-5xl font-black text-[#5b2c1d] tracking-tight">
                  <span className="text-3xl mr-1 font-medium">$</span>{formacion.price} <span className="text-xl font-bold ml-1 text-gray-400">USD</span>
                </div>
              </div>
            )}
            
            {(formacion.price && formacion.priceArs) && (
              <div className="hidden sm:block w-[1px] h-16 bg-gray-200"></div>
            )}

            {formacion.priceArs && (
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-widest">Argentina</span>
                <div className="text-5xl font-black text-[#5b2c1d] tracking-tight">
                  <span className="text-3xl mr-1 font-medium">$</span>{formacion.priceArs.toLocaleString('es-AR')} <span className="text-xl font-bold ml-1 text-gray-400">ARS</span>
                </div>
              </div>
            )}

            {(!formacion.price && !formacion.priceArs) && (
              <div className="text-3xl font-black text-[#5b2c1d] tracking-tight">
                Consultar valor
              </div>
            )}
          </div>

          {formacion.paymentLink ? (
            <a 
              href={formacion.paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#5b2c1d] hover:bg-[#4a2317] text-white px-12 py-5 rounded-full font-medium transition-all shadow-[0_10px_20px_rgba(91,44,29,0.2)] hover:shadow-[0_15px_30px_rgba(91,44,29,0.3)] hover:-translate-y-1 text-sm uppercase tracking-widest"
            >
              Inscribirse Ahora
            </a>
          ) : (
            <button 
              disabled
              className="inline-flex items-center justify-center bg-gray-200 text-gray-500 px-12 py-5 rounded-full font-medium cursor-not-allowed text-sm uppercase tracking-widest"
            >
              Inscripciones Cerradas
            </button>
          )}
        </div>

      </section>

      {/* Footer Unificado */}
      <Footer />
    </main>
  );
}