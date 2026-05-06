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
        {formacion.imageUrl && (
          <Image
            src={formacion.imageUrl}
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
            {formacion.shortDescription}
          </p>
        </div>
      </section>

      {/* Contenido Detallado */}
      <section className="max-w-4xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Columna Principal (Descripción) */}
          <div className="md:col-span-2 prose prose-lg prose-gray">
            {formacion.detailedDescription ? (
              <PortableText value={formacion.detailedDescription} />
            ) : (
              <p className="text-gray-600">No hay detalles adicionales disponibles para esta formación.</p>
            )}
          </div>

          {/* Columna Lateral (Reserva y Precio) */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reserva tu lugar</h3>
              <p className="text-gray-500 text-sm mb-6">Asegura tu participación en este programa transformador.</p>
              
              <div className="text-3xl font-black text-[#5b2c1d] mb-8">
                {formacion.price || "Consultar"}
              </div>

              {formacion.paymentLink ? (
                <a 
                  href={formacion.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#5b2c1d] hover:bg-[#4a2317] text-white py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                >
                  Inscribirse Ahora
                </a>
              ) : (
                <button 
                  disabled
                  className="block w-full bg-gray-200 text-gray-500 py-4 rounded-xl font-bold cursor-not-allowed"
                >
                  Inscripciones Cerradas
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Footer Unificado */}
      <Footer />
    </main>
  );
}