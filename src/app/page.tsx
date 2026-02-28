"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { ImageCarousel } from "@/components/ImageCarousel";

export default function Home() {
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 selection:bg-[#0033a0] selection:text-white pb-24 overflow-x-hidden font-sans">

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

      {/* Hero Section (Estructura de la imagen) */}
      <section className="relative pt-32 sm:pt-48 px-4 sm:px-12 flex flex-col items-center justify-center text-center">
        <motion.div
          className="relative z-20 max-w-4xl space-y-4 sm:space-y-6"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-none flex flex-col items-center gap-1 sm:gap-2">
            <span className="text-[#0033a0]">
              40 años
            </span>
            <span className="text-[#ff9900]">
              conectando el futuro
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-gray-800 max-w-2xl mx-auto font-medium leading-relaxed mt-4 sm:mt-6">
            Cuatro décadas resolviendo desafíos complejos
            <br className="hidden sm:block" />
            en infraestructura, integración y conectividad avanzada.
          </p>
        </motion.div>
      </section>

      {/* Sección Carrusel: Casos Destacados */}
      <section className="pt-16 sm:pt-24 pb-12 relative w-full overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-12 mb-8 text-center mt-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0033a0] tracking-tight">Casos destacados</h2>
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
      <section className="pt-20 pb-16 relative bg-white w-full overflow-hidden">
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
