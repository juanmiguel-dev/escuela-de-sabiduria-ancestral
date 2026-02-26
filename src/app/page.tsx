"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";

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
      <section className="pt-16 sm:pt-24 pb-12 relative overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="px-4 sm:px-12 mb-8 text-center mt-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0033a0] tracking-tight">Casos destacados</h2>
          </div>

          <ProjectsCarousel />
        </motion.div>
      </section>

      {/* Banner de Servicios (Adaptado al light theme para coherencia) */}
      <section className="relative z-30 px-4 sm:px-12 mb-20 lg:mb-32 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-10"
        >
          {[
            { tag: "01", title: "Automatización\nIA\nConectividad satelital" },
            { tag: "02", title: "Transformación digital\nDesarrollo in-house" },
            { tag: "03", title: "Servicios Profesionales\nLlave en mano" }
          ].map((service, i) => (
            <div key={i} className="bg-[#f8f9fc] border border-gray-200 p-8 rounded-2xl hover:border-[#0033a0]/30 hover:bg-white hover:shadow-lg transition-all cursor-default group flex flex-col justify-between min-h-[160px]">
              <span className="text-[#ff9900] font-mono text-sm mb-4 block transition-colors font-semibold">
                {service.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0033a0] whitespace-pre-line leading-tight transition-colors">
                {service.title}
              </h3>
            </div>
          ))}
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

    </main>
  );
}
