"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { ImageCarousel } from "@/components/ImageCarousel";
import { TechBackground } from "@/components/TechBackground";

export default function Home() {
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen selection:bg-[#0033a0] selection:text-white pb-24 overflow-x-hidden font-sans relative text-gray-900">

      {/* Header / Top Navigation (Logo de Trans Advanced Technologies) */}
      <header className="absolute top-0 left-0 w-full p-6 sm:p-10 z-50">
        <Image
          src="/logo-full.svg"
          alt="Trans Advanced Technologies"
          width={280}
          height={80}
          className="h-10 sm:h-14 w-auto"
          priority
        />
      </header>

      {/* Hero Section (Netflix Style) */}
      <section className="relative h-[85vh] sm:h-[95vh] w-full flex items-center overflow-hidden">
        {/* Featured Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            src="/videos/1.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Light Overlay Gradient for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#eeeeee]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#eeeeee] via-transparent to-transparent z-10" />
        </div>

        <motion.div
          className="relative z-20 max-w-4xl px-6 sm:px-12 space-y-4 sm:space-y-6"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          {/* "Netflix Series" equivalent */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#ff9900] font-bold text-sm tracking-widest uppercase">Evolución 4.0</span>
            <div className="w-12 h-[2px] bg-[#ff9900]" />
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] flex flex-col items-start gap-1">
            <span className="text-[#0033a0] drop-shadow-sm">
              40 años
            </span>
            <span className="text-[#ff9900] drop-shadow-sm">
              conectando
            </span>
            <span className="text-[#ff9900] drop-shadow-sm">
              el futuro
            </span>
          </h1>

          {/* Meta Info Bar */}
          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base font-bold text-gray-700">
            <span className="text-green-600">97% Conectividad</span>
            <span>1985 - 2025</span>
            <span className="px-2 py-0.5 border-2 border-gray-400 rounded text-xs uppercase tracking-tighter">Trayectoria</span>
            <span>4K Infraestructura</span>
          </div>

          <p className="text-lg sm:text-2xl text-gray-800 max-w-xl font-medium leading-tight">
            Cuatro décadas resolviendo desafíos complejos en infraestructura, integración y conectividad avanzada.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button className="flex items-center gap-2 bg-[#0033a0] text-white px-8 py-3 rounded font-bold hover:bg-[#002880] transition-colors shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Conocer más
            </button>
            <button className="flex items-center gap-2 bg-white/60 backdrop-blur-md text-[#0033a0] px-8 py-3 rounded font-bold hover:bg-white/80 transition-all border border-[#0033a0]/20 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Más info
            </button>
          </div>
        </motion.div>
      </section>

      {/* Sección Carrusel: Casos Destacados - Overlap Effect */}
      <section className="relative z-30 -mt-16 sm:-mt-24 pb-12 w-full overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-12 mb-4 text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">Proyectos destacados</h2>
          </div>

          <ProjectsCarousel />
        </motion.div>
      </section>

      {/* Segundo Carrusel: Galería / Casos */}
      <section className="pb-16 relative w-full overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-12 mb-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0033a0] tracking-tight">Automatización - IA - Conectividad satelital</h2>
          </div>
          <ImageCarousel images={[
            { id: 1, src: "/carruseles/1/Publicación 4F-100.jpg" },
            { id: 2, src: "/carruseles/1/a.jpg" },
            { id: 3, src: "/carruseles/1/b.jpg" },
            { id: 4, src: "/carruseles/1/c.jpg" },
            { id: 5, src: "/carruseles/1/d.jpg" },
            { id: 6, src: "/carruseles/1/e.jpg" },
          ]} />
        </motion.div>
      </section>

      {/* Tercer Carrusel: Transformación Digital */}
      <section className="pb-20 relative w-full overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-12 mb-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0033a0] tracking-tight">Transformación digital + Desarrollo in-house</h2>
          </div>
          <ImageCarousel images={[
            { id: 1, src: "/carruseles/2/1.jpg" },
            { id: 2, src: "/carruseles/2/2.jpg" },
            { id: 3, src: "/carruseles/2/3.jpg" },
            { id: 4, src: "/carruseles/2/4.jpg" }
          ]} />
        </motion.div>
      </section>

      {/* Cuarto Carrusel: Servicios Profesionales (Fondo Azul Marca) */}
      <section className="py-20 relative bg-[#0033a0] w-full mt-10 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-12 mb-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Servicios Profesionales + Llave en mano</h2>
          </div>
          <ImageCarousel
            dark={true}
            images={[
              { id: 1, src: "/carruseles/3/a.jpg" },
              { id: 2, src: "/carruseles/3/b.jpg" },
              { id: 3, src: "/carruseles/3/c.jpg" },
              { id: 4, src: "/carruseles/3/d.jpg" },
              { id: 5, src: "/carruseles/3/e.jpg" },
            ]}
          />
        </motion.div>
      </section>

      {/* Quinto Carrusel: Integración */}
      <section className="pt-20 pb-16 relative w-full overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-12 mb-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0033a0] tracking-tight">Integración</h2>
          </div>
          <ImageCarousel
            images={[
              { id: 1, src: "/carruseles/4/a.jpg" },
              { id: 2, src: "/carruseles/4/b.jpg" },
              { id: 3, src: "/carruseles/4/c.jpg" },
              { id: 4, src: "/carruseles/4/d.jpg" },
              { id: 5, src: "/carruseles/4/e.jpg" },
            ]}
          />
        </motion.div>
      </section>

      {/* Sección de Cierre: Integración (Adaptado) */}
      <section className="py-24 sm:py-32 px-4 sm:px-12 relative flex items-center justify-center mt-auto bg-[#f8f9fc] border-t border-gray-100">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, scale: 0.95, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
          } as Variants}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="mb-8 inline-block">
            <div className="w-16 h-[4px] bg-[#ff9900] mx-auto rounded-full" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tight leading-tight text-gray-900">
            Nuestra historia termina en la <span className="text-[#0033a0]">Integración</span>
          </h2>
          <p className="text-lg sm:text-2xl text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto">
            Porque 40 años no son solo el reflejo del pasado, sino la plataforma que hemos construido para integrar todas las tecnologías del mañana. Seguimos conectando ideas, conectando personas y haciendo posible el futuro.
          </p>
        </motion.div>
      </section>
      {/* Footer / Logo a pie de página */}
      <footer className="py-20 bg-[#f8f9fc] border-t border-gray-100 flex flex-col items-center justify-center">
        <Image
          src="/logo-full.svg"
          alt="Trans Advanced Technologies Footer"
          width={280}
          height={80}
          className="h-12 sm:h-16 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        />
        <p className="mt-8 text-sm text-gray-400 font-medium tracking-widest uppercase">
          © {new Date().getFullYear()} Trans Advanced Technologies
        </p>
      </footer>

    </main>
  );
}
