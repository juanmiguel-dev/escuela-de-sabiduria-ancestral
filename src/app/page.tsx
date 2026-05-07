"use client";

import { useEffect, useState } from "react";
import { m, Variants, LazyMotion, domAnimation, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { getLandingData, getFormaciones } from "@/sanity/lib/queries";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [landingData, setLandingData] = useState<any>(null);
  const [formaciones, setFormaciones] = useState<any[]>([]);
  const { scrollY } = useScroll();

  // Parallax effects
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    async function loadData() {
      try {
        const [landing, forms] = await Promise.all([
          getLandingData(),
          getFormaciones()
        ]);
        if (landing) setLandingData(landing);
        if (forms) setFormaciones(forms);
      } catch (error) {
        console.error("Error loading Sanity data:", error);
      }
    }
    loadData();
  }, []);

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen flex flex-col selection:bg-[#5b2c1d] selection:text-white overflow-x-hidden font-sans relative text-gray-900 bg-[#fdfbf7]">

        <Navbar theme="dark" />

        {/* Hero Section */}
        <section className="relative h-[105vh] w-full flex items-center justify-center overflow-hidden">
          {/* Background Images with Ken Burns & Parallax */}
          <m.div className="absolute inset-0 z-0 bg-black" style={{ scale: heroScale }}>
            <div className="absolute inset-0 animate-crossfade-1">
              <Image
                src={landingData?.backgroundImages?.[0] || "/inicio.JPG"}
                alt="Inicio 1"
                fill
                className="object-cover opacity-50 animate-ken-burns"
                priority
              />
            </div>
            <div className="absolute inset-0 animate-crossfade-2">
              <Image
                src={landingData?.backgroundImages?.[1] || "/inicio-2.jpeg"}
                alt="Inicio 2"
                fill
                className="object-cover opacity-50 animate-ken-burns"
                priority
              />
            </div>
            {/* Gradientes refinados */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#fdfbf7] z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-transparent to-transparent z-10" />
          </m.div>

          <m.div
            className="relative z-20 max-w-5xl px-6 sm:px-12 text-center space-y-8 sm:space-y-12"
            style={{ opacity: heroOpacity, y: heroY }}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
          >
            <div className="space-y-6">
              {landingData?.preTitle && (
                <m.span 
                  initial={{ opacity: 0, letterSpacing: "0.1em" }}
                  animate={{ opacity: 1, letterSpacing: "0.3em" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="block text-xs sm:text-sm text-white/70 font-black tracking-[0.3em] uppercase mb-4"
                >
                  {landingData.preTitle}
                </m.span>
              )}
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-title text-white drop-shadow-2xl max-w-[1000px] mx-auto break-words leading-none">
                {landingData?.title || "La Rueda Medicinal"}
              </h1>
              <m.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-xl sm:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto font-light italic"
              >
                {landingData?.subtitle || "Un viaje a través de los cuatro cuadrantes del alma."}
              </m.p>
            </div>

            <m.div 
              className="pt-8 flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <a 
                href={landingData?.primaryButtonLink || "#formaciones"} 
                className="group relative overflow-hidden inline-flex items-center justify-center bg-[#5b2c1d] text-white px-10 py-4 rounded-full font-black transition-all shadow-2xl text-xs sm:text-sm uppercase tracking-[0.2em]"
              >
                <span className="relative z-10">{landingData?.primaryButtonText || "EXPLORAR FORMACIONES"}</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>
              <a 
                href={landingData?.secondaryButtonLink || "/sesiones"} 
                className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-4 rounded-full font-black transition-all shadow-2xl text-xs sm:text-sm uppercase tracking-[0.2em]"
              >
                {landingData?.secondaryButtonText || "RESERVAR SESIÓN"}
              </a>
            </m.div>
          </m.div>
          
          {/* Scroll Indicator */}
          <m.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div className="w-px h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
          </m.div>
        </section>

        {/* Sección de Formaciones */}
        <section id="formaciones" className="py-32 w-full scroll-mt-20 relative z-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="text-center mb-24 space-y-4"
            >
              <h2 className="text-6xl sm:text-7xl font-title text-[#333333]">
                Nuestras Formaciones
              </h2>
              <div className="w-20 h-0.5 bg-[#5b2c1d]/20 mx-auto" />
            </m.div>

            <m.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {formaciones.map((formacion) => (
                <m.a
                  key={formacion._id}
                  href={`/formaciones/${formacion.slug}`}
                  variants={fadeUpVariant}
                  whileHover={{ y: -15 }}
                  className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(91,44,29,0.1)] transition-all duration-700 border border-[#f0eee9] flex flex-col h-full"
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50">
                    {formacion.imageUrl && (
                      <Image
                        src={formacion.imageUrl}
                        alt={formacion.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {formacion.duration && (
                      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-[#5b2c1d] shadow-xl uppercase">
                        {formacion.duration}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-10 flex-grow flex flex-col space-y-4">
                    <h3 className="text-2xl font-black text-[#1a1a1a] leading-tight tracking-tight group-hover:text-[#5b2c1d] transition-colors duration-300">
                      {formacion.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-grow line-clamp-3 font-medium">
                      {formacion.shortDescription}
                    </p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                      <div className="flex flex-col">
                        {(formacion.price || formacion.priceArs) ? (
                          <>
                            {formacion.price && <span className="font-black text-[#5b2c1d] text-base">${formacion.price} <span className="text-[10px] text-gray-400 font-bold ml-0.5">USD</span></span>}
                            {formacion.priceArs && <span className="font-bold text-gray-400 text-xs">${formacion.priceArs.toLocaleString('es-AR')} ARS</span>}
                          </>
                        ) : (
                          <span className="font-black text-[#5b2c1d] uppercase tracking-widest text-xs">Consultar</span>
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#5b2c1d] group-hover:text-white transition-all duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </div>
                    </div>
                  </div>
                </m.a>
              ))}
            </m.div>
            
            {formaciones.length === 0 && (
              <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-400 py-20 font-medium italic">No hay formaciones disponibles en este momento.</m.p>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </LazyMotion>
  );
}