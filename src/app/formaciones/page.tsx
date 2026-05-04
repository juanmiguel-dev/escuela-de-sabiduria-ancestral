import Image from "next/image";
import NextLink from "next/link";
import { getFormaciones } from "@/sanity/lib/queries";

export default async function FormacionesPage() {
  const formaciones = await getFormaciones();

  return (
    <main className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-[#5b2c1d] selection:text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full px-6 py-6 sm:px-12 z-50 flex items-center justify-between bg-transparent">
        <NextLink href="/">
          <Image
            src="/logo.png"
            alt="Romina Castañeda Logo"
            width={220}
            height={73}
            className="w-[160px] sm:w-[220px] h-auto object-contain drop-shadow-sm"
            priority
          />
        </NextLink>
        <NextLink 
          href="/" 
          className="text-sm font-bold text-white tracking-wider hover:text-gray-200 transition-colors drop-shadow-md uppercase"
        >
          Volver al Inicio
        </NextLink>
      </header>

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
                  <span className="font-bold text-[#5b2c1d]">
                    {formacion.price || "Ver detalles"}
                  </span>
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

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100 flex flex-col items-center justify-center mt-auto">
        <Image
          src="/logo.png"
          alt="Romina Castañeda Footer Logo"
          width={140}
          height={45}
          className="h-10 w-auto object-contain opacity-40 grayscale"
        />
      </footer>
    </main>
  );
}