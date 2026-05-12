import { getFormacionBySlug } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChakanaBackground } from "@/components/ChakanaBackground";

// Importar los componentes de bloque
import { IntroBlockRenderer } from "@/components/FormacionBlocks/IntroBlockRenderer";
import { CuerpoPorQueBlockRenderer } from "@/components/FormacionBlocks/CuerpoPorQueBlockRenderer";
import { CuerpoDirigidoABlockRenderer } from "@/components/FormacionBlocks/CuerpoDirigidoABlockRenderer";
import { DetailedDescriptionBlockRenderer } from "@/components/FormacionBlocks/DetailedDescriptionBlockRenderer";
import { IntroduccionAperturaBlockRenderer } from "@/components/FormacionBlocks/IntroduccionAperturaBlockRenderer";
import { TestimoniosBlockRenderer } from "@/components/FormacionBlocks/TestimoniosBlockRenderer";
import { ImageGalleryBlockRenderer } from "@/components/FormacionBlocks/ImageGalleryBlockRenderer";
import { FaqBlockRenderer } from "@/components/FormacionBlocks/FaqBlockRenderer";
import { CronogramaBlockRenderer } from "@/components/FormacionBlocks/CronogramaBlockRenderer";

export const revalidate = 0;

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
    faqBlock: FaqBlockRenderer,
    cronogramaBlock: CronogramaBlockRenderer,
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#fdfbf7] selection:bg-[#333333] selection:text-white font-sans text-gray-900 relative w-full overflow-x-hidden">
      <ChakanaBackground />
      <Navbar theme="dark" position="absolute" />

      {/* Hero Section */}
      <section className="relative z-10 h-[60vh] sm:h-[70vh] w-full flex items-end pb-16 justify-center overflow-hidden bg-black">
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

        <div className="relative z-20 w-full md:max-w-[80%] px-6 sm:px-12 text-center mx-auto">
          {formacion.duration && (
            <span className="block text-xs sm:text-sm text-[#d4af37] font-bold tracking-[0.3em] uppercase mb-4">
              DURACIÓN: {formacion.duration}
            </span>
          )}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-title text-white drop-shadow-2xl max-w-[900px] mx-auto break-words leading-tight px-2">
            {formacion.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto font-medium mt-4">
            {formacion.subtitle || formacion.shortDescription}
          </p>
        </div>
      </section>

      {/* Contenido Detallado - Sin restricción de ancho en el padre para que los bloques respiren */}
      <section className="relative z-10 w-full py-16 sm:py-32 space-y-24 sm:space-y-40">
        {formacion.contentBlocks?.map((block: any) => {
          const BlockComponent = blockRenderers[block._type];
          if (!BlockComponent) return null;
          return (
            <div key={block._key} className="w-full">
              <BlockComponent {...block} />
            </div>
          );
        })}

        {(!formacion.contentBlocks || formacion.contentBlocks.length === 0) && (
           <p className="text-gray-500 italic text-center">No hay detalles adicionales disponibles para esta formación.</p>
        )}
      </section>

      {/* Tarjeta de Reserva Final */}
      <section className="relative z-10 w-full bg-[#fdfbf7] border-t border-[#f0eee9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-12 py-16 sm:py-24 flex flex-col items-center text-center">
          <span className="text-sm font-bold tracking-[0.2em] text-[#a09e9a] uppercase mb-4">Asegura tu lugar</span>
          <h3 className="font-title text-3xl sm:text-5xl text-[#333333] mb-12">Comienza tu viaje hoy</h3>
          
          <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-center gap-16 sm:gap-24">
            {formacion.price && (
              <div className="flex flex-col items-center gap-6 w-full max-w-[300px]">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-widest">Internacional</span>
                  <div className="text-3xl sm:text-6xl font-black text-[#5b2c1d] tracking-tight">
                    <span className="text-2xl sm:text-4xl mr-1 font-medium">$</span>{formacion.price} <span className="text-lg font-bold ml-1 text-gray-400">USD</span>
                  </div>
                </div>
                {formacion.paymentLink && (
                  <a 
                    href={formacion.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center bg-[#5b2c1d] hover:bg-[#4a2317] text-white px-10 py-5 rounded-full font-medium transition-all shadow-[0_10px_20px_rgba(91,44,29,0.2)] text-xs uppercase tracking-widest"
                  >
                    Inscribirme (USD)
                  </a>
                )}
              </div>
            )}

            {formacion.priceArs && (
              <div className="flex flex-col items-center gap-6 w-full max-w-[300px]">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-widest">Argentina</span>
                  <div className="text-3xl sm:text-6xl font-black text-[#5b2c1d] tracking-tight whitespace-nowrap">
                    <span className="text-2xl sm:text-4xl mr-1 font-medium">$</span>{formacion.priceArs.toLocaleString('es-AR')} <span className="text-lg font-bold ml-1 text-gray-400">ARS</span>
                  </div>
                </div>
                {formacion.paymentLinkArs && (
                  <a 
                    href={formacion.paymentLinkArs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center bg-[#d4af37] hover:bg-[#b89a2f] text-white px-10 py-5 rounded-full font-medium transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)] text-xs uppercase tracking-widest"
                  >
                    Inscribirme (ARS)
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}