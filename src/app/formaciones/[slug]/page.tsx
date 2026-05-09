import { getFormacionBySlug } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import NextLink from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Importar los componentes de bloque
import { IntroBlockRenderer } from "@/components/FormacionBlocks/IntroBlockRenderer";
import { CuerpoPorQueBlockRenderer } from "@/components/FormacionBlocks/CuerpoPorQueBlockRenderer";
import { CuerpoDirigidoABlockRenderer } from "@/components/FormacionBlocks/CuerpoDirigidoABlockRenderer";
import { DetailedDescriptionBlockRenderer } from "@/components/FormacionBlocks/DetailedDescriptionBlockRenderer";
import { IntroduccionAperturaBlockRenderer } from "@/components/FormacionBlocks/IntroduccionAperturaBlockRenderer";
import { TestimoniosBlockRenderer } from "@/components/FormacionBlocks/TestimoniosBlockRenderer";
import { ImageGalleryBlockRenderer } from "@/components/FormacionBlocks/ImageGalleryBlockRenderer";

export const revalidate = 0; // Desactiva la caché de Next.js para esta ruta dinámica

export default async function FormacionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formacion = await getFormacionBySlug(slug);

  if (!formacion) {
    notFound();
  }

  const blockRenderers: { [key: string]: React.ComponentType<any> } = {
    introBlock: IntroBlockRenderer,
    cuerpoPorQueBlock: CuerpoPorQueBlockRenderer,
    cuerpoDirigidoABlock: CuerpoDirigidoABlockRenderer,
    detailedDescriptionBlock: DetailedDescriptionBlockRenderer,
    introduccionAperturaBlock: IntroduccionAperturaBlockRenderer,
    testimoniosBlock: TestimoniosBlockRenderer,
    imageGalleryBlock: ImageGalleryBlockRenderer,
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#fdfbf7] selection:bg-[#333333] selection:text-white font-sans text-gray-900">
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
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-title text-white drop-shadow-lg mb-4 sm:mb-6 leading-tight">
            {formacion.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto font-medium">
            {formacion.subtitle || formacion.shortDescription}
          </p>
        </div>
      </section>

      {/* Contenido Detallado */}
      <section className="max-w-5xl mx-auto px-6 sm:px-12 py-16 sm:py-24 space-y-24">
        {formacion.contentBlocks?.map((block: any) => {
          const BlockComponent = blockRenderers[block._type];
          if (!BlockComponent) {
            console.warn(`No renderer found for block type: ${block._type}`);
            return null;
          }
          return <BlockComponent key={block._key} {...block} />;
        })}

        {(!formacion.contentBlocks || formacion.contentBlocks.length === 0) && (
           <p className="text-gray-500 italic text-center">No hay detalles adicionales disponibles para esta formación.</p>
        )}
      </section>

      {/* Tarjeta de Reserva Final - Full Width */}
      <section className="w-full bg-[#fdfbf7] border-t border-[#f0eee9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 flex flex-col items-center text-center">
          <span className="text-sm font-bold tracking-[0.2em] text-[#a09e9a] uppercase mb-4">Asegura tu lugar</span>
          <h3 className="font-title text-4xl sm:text-5xl text-[#333333] mb-8">Comienza tu viaje hoy</h3>
          
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-20 mb-10">
            {formacion.price && (
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-widest">Internacional</span>
                <div className="text-5xl sm:text-6xl font-black text-[#5b2c1d] tracking-tight">
                  <span className="text-3xl sm:text-4xl mr-1 font-medium">$</span>{formacion.price} <span className="text-xl font-bold ml-1 text-gray-400">USD</span>
                </div>
              </div>
            )}
            
            {(formacion.price && formacion.priceArs) && (
              <div className="hidden sm:block w-[1px] h-20 bg-gray-200"></div>
            )}

            {formacion.priceArs && (
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-widest">Argentina</span>
                <div className="text-5xl sm:text-6xl font-black text-[#5b2c1d] tracking-tight">
                  <span className="text-3xl sm:text-4xl mr-1 font-medium">$</span>{formacion.priceArs.toLocaleString('es-AR')} <span className="text-xl font-bold ml-1 text-gray-400">ARS</span>
                </div>
              </div>
            )}

            {(!formacion.price && !formacion.priceArs) && (
              <div className="text-4xl font-black text-[#5b2c1d] tracking-tight">
                Consultar valor
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            {formacion.paymentLink && (
              <a 
                href={formacion.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#5b2c1d] hover:bg-[#4a2317] text-white px-16 py-6 rounded-full font-medium transition-all shadow-[0_10px_20px_rgba(91,44,29,0.2)] hover:shadow-[0_15px_30px_rgba(91,44,29,0.3)] hover:-translate-y-1 text-base uppercase tracking-widest"
              >
                Inscribirse Ahora (USD)
              </a>
            )}
            {formacion.paymentLinkArs && (
              <a 
                href={formacion.paymentLinkArs}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#d4af37] hover:bg-[#b89a2f] text-white px-16 py-6 rounded-full font-medium transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] hover:-translate-y-1 text-base uppercase tracking-widest"
              >
                Inscribirse Ahora (ARS)
              </a>
            )}
            {(!formacion.paymentLink && !formacion.paymentLinkArs) && (
              <button 
                disabled
                className="inline-flex items-center justify-center bg-gray-200 text-gray-500 px-16 py-6 rounded-full font-medium cursor-not-allowed text-base uppercase tracking-widest"
              >
                Inscripciones Cerradas
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer Unificado */}
      <Footer />
    </main>
  );
}