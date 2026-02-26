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
    <main className="min-h-screen bg-[#141414] text-white selection:bg-blue-600 selection:text-white pb-24 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center px-4 sm:px-12 pt-20">
        {/* Fondo de Video o Imagen */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/90 sm:via-[#141414]/70 to-transparent z-10" />
          <video
            src="/videos/1.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40 mix-blend-screen"
          />
        </div>

        <motion.div
          className="relative z-20 max-w-4xl space-y-6 sm:space-y-8"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-block"
          >
            <span className="text-blue-500 font-bold tracking-widest text-xs sm:text-sm uppercase drop-shadow-md">
              40 Aniversario
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl leading-[1.1]">
            40 años
            <br />
            <span className="text-4xl sm:text-5xl md:text-7xl text-blue-500 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">
              conectando el futuro
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl font-light leading-relaxed drop-shadow-sm">
            Hemos construido la infraestructura y la conectividad que impulsan la transformación digital, acercando distancias y redefiniendo las posibilidades tecnológicas para las próximas décadas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="bg-white text-black px-8 py-3 rounded font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <span>▶</span> Reproducir Historia
            </button>
            <button className="bg-gray-500/30 text-white px-8 py-3 rounded font-bold text-lg hover:bg-gray-500/50 transition-colors border border-gray-500/50 flex items-center justify-center">
              Más información
            </button>
          </div>
        </motion.div>
      </section>

      {/* Banner de Servicios (Pilares) */}
      <section className="relative z-30 -mt-16 sm:-mt-24 px-4 sm:px-12 mb-20 lg:mb-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {[
            { tag: "01", title: "Automatización\nIA\nConectividad satelital" },
            { tag: "02", title: "Transformación digital\nDesarrollo in-house" },
            { tag: "03", title: "Servicios Profesionales\nLlave en mano" }
          ].map((service, i) => (
            <div key={i} className="bg-[#181818] border border-gray-800 p-8 rounded-lg hover:border-blue-500/40 hover:bg-[#1f1f1f] transition-all cursor-default group flex flex-col justify-between min-h-[160px]">
              <span className="text-blue-500/50 font-mono text-sm mb-4 block group-hover:text-blue-500 transition-colors">
                {service.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-200 whitespace-pre-line leading-tight group-hover:text-white transition-colors">
                {service.title}
              </h3>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Sección Carrusel: Casos Destacados */}
      <section className="py-12 pb-24 relative overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="px-4 sm:px-12 mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Casos Destacados</h2>
            <p className="text-gray-400 text-sm sm:text-base font-medium">Explora las historias que marcaron nuestro camino.</p>
          </div>

          <ProjectsCarousel />
        </motion.div>
      </section>

      {/* Sección de Cierre: Integración */}
      <section className="py-24 sm:py-32 px-4 sm:px-12 relative flex items-center justify-center mt-auto bg-gradient-to-t from-black to-[#141414]">
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
            <div className="w-16 h-[3px] bg-blue-500 mx-auto rounded-full" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 tracking-tight leading-tight">
            Nuestra historia termina en la <span className="text-blue-500">Integración</span>
          </h2>
          <p className="text-lg sm:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
            Porque 40 años no son solo el reflejo del pasado, sino la plataforma que hemos construido para integrar todas las tecnologías del mañana. Seguimos conectando ideas, conectando personas y haciendo posible el futuro.
          </p>
        </motion.div>
      </section>

    </main>
  );
}
