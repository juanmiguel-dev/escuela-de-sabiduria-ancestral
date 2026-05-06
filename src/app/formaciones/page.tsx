import Image from "next/image";
import NextLink from "next/link";
import { getFormaciones } from "@/sanity/lib/queries";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const revalidate = 0;

export default async function FormacionesPage() {
  const formaciones = await getFormaciones();

  return (
    <main className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-[#5b2c1d] selection:text-white">
      <Navbar theme="dark" position="absolute" />

      {/* Hero Header para Formaciones */}
      <section className="relative h-[45vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/inicio.JPG"
          alt="Fondo Formaciones"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-transparent to-black/40 z-10" />
        
        <div className="relative z-20 text-center mt-12 px-6">
          <span className="block text-xs sm:text-sm text-[#d4af37] font-bold tracking-[0.3em] uppercase mb-4 drop-shadow-md">
            Crecimiento y Sabiduría
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white drop-shadow-lg font-title tracking-wide">
            Nuestras Formaciones
          </h1>
        </div>
      </section>

      {/* Grid de Formaciones */}
      <section className="relative z-30 max-w-6xl mx-auto px-6 pb-24 -mt-8 sm:-mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formaciones.map((formacion: any, idx: number) => (
            <NextLink
              key={formacion._id}
              href={`/formaciones/${formacion.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                {formacion.imageUrl && (
                  <Image
                    src={formacion.imageUrl}
                    alt={formacion.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                {formacion.duration && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#5b2c1d] shadow-sm">
                    {formacion.duration}
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-[#333333] mb-3 leading-tight group-hover:text-[#5b2c1d] transition-colors">
                  {formacion.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                  {formacion.shortDescription}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    {(formacion.price || formacion.priceArs) ? (
                      <>
                        {formacion.price && <span className="font-bold text-[#5b2c1d] text-sm">${formacion.price} USD</span>}
                        {formacion.priceArs && <span className="font-bold text-[#5b2c1d] text-sm">${formacion.priceArs.toLocaleString('es-AR')} ARS</span>}
                      </>
                    ) : (
                      <span className="font-bold text-[#5b2c1d]">Consultar</span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-gray-400 group-hover:text-[#5b2c1d] transition-colors flex items-center gap-1">
                    Info <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </span>
                </div>
              </div>
            </NextLink>
          ))}
        </div>
        
        {formaciones.length === 0 && (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-lg">Próximamente estaremos anunciando nuevas formaciones.</p>
          </div>
        )}
      </section>

      {/* Footer Unificado */}
      <Footer />
    </main>
  );
}