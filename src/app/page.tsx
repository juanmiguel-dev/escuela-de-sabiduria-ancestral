"use client";

import { useEffect, useState } from "react";
import { m, Variants, LazyMotion, domAnimation } from "framer-motion";
import Image from "next/image";
import NextLink from "next/link";
import { getLandingData, getFormaciones, getTalleres } from "@/sanity/lib/queries";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [landingData, setLandingData] = useState<any>(null);
  const [formaciones, setFormaciones] = useState<any[]>([]);
  const [talleres, setTalleres] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [landing, forms, talls] = await Promise.all([
          getLandingData(),
          getFormaciones(),
          getTalleres()
        ]);
        if (landing) setLandingData(landing);
        if (forms) setFormaciones(forms);
        if (talls) setTalleres(talls);
      } catch (error) {
        console.error("Error loading Sanity data:", error);
      }
    }
    loadData();
  }, []);

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen flex flex-col selection:bg-[#333333] selection:text-white overflow-x-hidden font-sans relative text-gray-900">

        {/* Header Unificado */}
        <Navbar theme="dark" position="absolute" />

        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Background Images with Ken Burns & Crossfade */}
          <div className="absolute inset-0 z-0 bg-black">
            <div className="absolute inset-0 animate-crossfade-1">
              <Image
                src={landingData?.backgroundImages?.[0] || "/inicio.JPG"}
                alt="Inicio 1"
                fill
                className="object-cover opacity-60 animate-ken-burns"
                priority
              />
            </div>
            <div className="absolute inset-0 animate-crossfade-2">
              <Image
                src={landingData?.backgroundImages?.[1] || "/inicio-2.jpeg"}
                alt="Inicio 2"
                fill
                className="object-cover opacity-60 animate-ken-burns"
                priority
              />
            </div>
            {/* Gradiente oscuro inferior para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          </div>

          <m.div
            className="relative z-20 max-w-4xl px-6 sm:px-12 text-center space-y-6 sm:space-y-8 mt-16"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
          >
            {landingData?.preTitle && (
              <span className="block text-xs sm:text-sm text-white/80 font-bold tracking-[0.3em] uppercase mb-4">
                {landingData.preTitle}
              </span>
            )}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-title text-white drop-shadow-lg max-w-[900px] mx-auto break-words leading-tight">
              {landingData?.title || "La Rueda Medicinal"}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto font-medium italic drop-shadow-md">
              {landingData?.subtitle || "Un viaje a través de los cuatro cuadrantes del alma y la conexión con la Madre Tierra."}
            </p>

            <div className="pt-8 flex flex-wrap justify-center gap-4">
              <a 
                href={landingData?.primaryButtonLink || "#formaciones"} 
                className="inline-flex items-center justify-center bg-[#5b2c1d] hover:bg-[#4a2317] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-xl text-sm sm:text-base uppercase tracking-wider"
              >
                {landingData?.primaryButtonText || "EXPLORAR FORMACIONES"}
              </a>
              <a 
                href={landingData?.secondaryButtonLink || "/sesiones"} 
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-xl text-sm sm:text-base uppercase tracking-wider"
              >
                {landingData?.secondaryButtonText || "RESERVAR UNA SESIÓN"}
              </a>
            </div>
          </m.div>
        </section>

        {/* Sección de Formaciones */}
        <section id="formaciones" className="py-24 bg-[#fdfbf7] w-full scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-12">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUpVariant}
              className="text-center mb-16"
            >
              <h2 className="text-5xl sm:text-6xl font-title text-[#333333] mb-4">
                Nuestras Formaciones
              </h2>
              <div className="w-24 h-1 bg-[#5b2c1d] mx-auto opacity-50" />
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formaciones.map((formacion, idx) => (
                <m.a
                  key={formacion._id}
                  href={`/formaciones/${formacion.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
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
                    <h3 className="text-xl font-bold text-[#333333] mb-3 leading-tight">
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
                </m.a>
              ))}
            </div>
            
            {formaciones.length === 0 && (
              <p className="text-center text-gray-500 py-12">No hay formaciones disponibles en este momento.</p>
            )}
          </div>
        </section>

        {/* Sección de Talleres y Encuentros */}
        {talleres.length > 0 && (
          <section id="talleres" className="py-24 bg-white w-full scroll-mt-20">
            <div className="max-w-6xl mx-auto px-6 sm:px-12">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
                className="text-center mb-16"
              >
                <h2 className="text-5xl sm:text-6xl font-title text-[#333333] mb-4">
                  Talleres y Encuentros
                </h2>
                <div className="w-24 h-1 bg-[#d4af37] mx-auto opacity-50" />
              </m.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {talleres.map((taller, idx) => (
                  <m.div
                    key={taller._id}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="bg-[#fdfbf7] rounded-3xl p-8 sm:p-12 border border-[#f0eee9] shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        {taller.highlightText && (
                          <span className="text-xs font-bold tracking-[0.2em] text-[#d4af37] uppercase mb-2 block">
                            {taller.highlightText}
                          </span>
                        )}
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#333333] leading-tight">
                          {taller.title}
                        </h3>
                      </div>

                      <div className="space-y-4 flex-grow">
                        {taller.projects && taller.projects.length > 0 ? (
                          <div className="grid grid-cols-1 gap-4">
                            {taller.projects.map((project: any) => (
                              <div key={project._id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center gap-4 hover:border-[#d4af37]/30 transition-colors">
                                {project.mediaUrl && (
                                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image src={project.mediaUrl} alt={project.title} fill className="object-cover" />
                                  </div>
                                )}
                                <div className="flex-grow">
                                  <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{project.title}</h4>
                                  <p className="text-xs text-gray-500 line-clamp-1">{project.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">Próximamente más información sobre este encuentro.</p>
                        )}
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-200/50">
                        <NextLink 
                          href="/contacto" 
                          className="inline-flex items-center gap-2 text-sm font-bold text-[#5b2c1d] hover:text-[#d4af37] transition-colors"
                        >
                          Consultar fechas y cupos <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </NextLink>
                      </div>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer Unificado */}
        <Footer />

      </main>
    </LazyMotion>
  );
}