"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { ImageCarousel } from "@/components/ImageCarousel";
import { TechBackground } from "@/components/TechBackground";
import { VideoModal } from "@/components/VideoModal";
import { GalleryModal } from "@/components/GalleryModal";

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  const galleryImages = [
    { id: 1, src: "/tecnologia-no-puede-fallar/2011/Publicación 6A-100.jpg" },
    { id: 2, src: "/tecnologia-no-puede-fallar/2011/Publicación 6B-100.jpg" },
    { id: 3, src: "/tecnologia-no-puede-fallar/2011/Publicación 6C-100.jpg" },
    { id: 4, src: "/tecnologia-no-puede-fallar/2011/Publicación 6D-100.jpg" },
    { id: 5, src: "/tecnologia-no-puede-fallar/2011/Publicación 6E-100.jpg" },
  ];

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
        {/* Featured Background: Video on Desktop, Static Image on Mobile */}
        <div className="absolute inset-0 z-0">
          {/* Static Image for Mobile (Netflix Style) */}
          <div className="block sm:hidden w-full h-full">
            <Image
              src="/carruseles/8/Publicación 8d.jpg" // Una imagen representativa de escuelas/educación
              alt="Educación y conectividad satelital"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Video for Desktop */}
          <video
            src="/videos/7.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="hidden sm:block w-full h-full object-cover"
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
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-tight text-[#0033a0] drop-shadow-sm">
            Educación y conectividad satelital
          </h1>

          {/* Meta Info Bar Unificada */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] sm:text-sm font-bold text-gray-700">
            <span className="text-[#0033a0] font-black border-b-2 border-[#0033a0]">NUEVO CASO</span>
            <span className="animate-color-blink font-bold">1985 - 2025</span>
            <span>4K Infraestructura</span>
            <span className="text-gray-600 text-xs sm:text-sm font-bold">#Starlink #Meraki #Wifi <span className="bg-[#ff9900]/20 px-1 rounded">#Enlaces</span></span>
          </div>

          <p className="text-lg sm:text-2xl text-gray-800 max-w-xl font-bold leading-tight border-b border-gray-300 pb-1 inline-block pt-4">
            1000 escuelas rurales conectadas en 90 días
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center gap-2 bg-[#0033a0] text-white px-8 py-3 rounded font-bold hover:bg-[#002880] transition-colors shadow-lg group cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M8 5v14l11-7z"/></svg>
              Conocer más
            </button>
            <a 
              href="https://www.transadvanced.tech/contacto" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/60 backdrop-blur-md text-[#0033a0] px-8 py-3 rounded font-bold hover:bg-white/80 transition-all border border-[#0033a0]/20 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Más info
            </a>
          </div>
        </motion.div>
      </section>

      <VideoModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Educación y conectividad satelital"
        videoSrc="/videos/7.mp4"
      />

      <GalleryModal 
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        title="Videovigilancia fronteriza"
        images={galleryImages}
      />

      {/* Sección Carrusel: Casos Destacados - Overlap Effect (Se mantiene igual) */}
      <section className="relative z-30 -mt-16 sm:-mt-24 pb-12 w-full overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-12 mb-4 text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">Casos destacados</h2>
          </div>

          <ProjectsCarousel />
        </motion.div>
      </section>

      {/* Nueva Sección: Cuando la tecnología no puede fallar (Abajo de los videos) */}
      <section className="relative z-30 pt-16 pb-12 w-full overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-12 mb-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0033a0] tracking-tight">Cuando la tecnología no puede fallar</h2>
          </div>
          
          <ImageCarousel 
            onGalleryClick={() => setIsGalleryModalOpen(true)}
            images={[
            { id: "emergencias", src: "/tecnologia-no-puede-fallar/emergencias.mp4", title: "Atención emergencias 107", year: "2010", tags: "#Contact Center #Desarrollo #CENTER", match: "100% de coincidencia" },
            { id: "salud", src: "/tecnologia-no-puede-fallar/salud.mp4", title: "Tecnología en sector Salud", year: "2008-Hoy", tags: "#Colaboración #Contact Center #Desarrollo #Networking #IA #CENTER", match: "99% de coincidencia" },
            { id: "ciberseguridad", src: "/tecnologia-no-puede-fallar/ciberseguridad.mp4", title: "Ciberseguridad pública con Cisco", year: "2012", tags: "#Ciberseguridad #Cisco", match: "98% de coincidencia" },
            { id: "frontera", src: "/tecnologia-no-puede-fallar/2011/Publicación 6A-100.jpg", title: "Videovigilancia fronteriza", year: "2011", tags: "#CCTV", match: "97% de coincidencia", isGallery: true },
            { id: "hospitales", src: "/tecnologia-no-puede-fallar/hospitales.jpg", title: "Hospitales CABA", year: "2005", tags: "#Cableado #Switches #Networking", match: "96% de coincidencia" },

            { id: "arsat", src: "/tecnologia-no-puede-fallar/arsat.jpg", title: "Data center ARSAT", year: "2014", tags: "#Data center #Cisco", match: "99% de coincidencia" },
          ]} />
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
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0033a0] tracking-tight">Implementaciones de escala nacional</h2>
          </div>
          <ImageCarousel images={[
            { id: 1, src: "/carruseles/1/Publicación 4F-100.jpg", title: "12.000 escuelas conectadas", year: "2007", tags: "#Networking #Educación", match: "99% de coincidencia" },
            { id: 2, src: "/carruseles/1/a.jpg", title: "Conectividad masiva de aulas", year: "2017", tags: "#Switches #AP #Networking", match: "98% de coincidencia" },
            { id: 3, src: "/carruseles/1/b.jpg", title: "Red Gobierno CABA", year: "2010-2015", tags: "#MPLS #Networking", match: "97% de coincidencia" },
            { id: 4, src: "/carruseles/1/c.jpg", title: "Ciudad Interconectada", year: "2017", tags: "#MPLS #Networking #CABA", match: "99% de coincidencia" },
            { id: 5, src: "/carruseles/1/d.jpg", title: "Enlaces de Fibra Óptica", year: "2018", tags: "#Fibra #Infraestructura", match: "96% de coincidencia" },
          ]} />
        </motion.div>
      </section>

      {/* Tercer Carrusel: Pioneros */}
      <section className="pb-20 relative w-full overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-12 mb-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0033a0] tracking-tight">Pioneros en infraestructura y redes</h2>
          </div>
          <ImageCarousel images={[
            { id: 1, src: "/carruseles/2/1.jpg", title: "Primera red Switching AR", year: "1993", tags: "#Switches #Pioneros", match: "100% de coincidencia" },
            { id: 2, src: "/carruseles/2/2.jpg", title: "Red WAN Frame Relay", year: "1997", tags: "#WAN #FrameRelay", match: "98% de coincidencia" },
            { id: 3, src: "/carruseles/2/3.jpg", title: "Primer SoftSwitch Corporativo", year: "2009", tags: "#SoftSwitch #Telefonía", match: "99% de coincidencia" },
            { id: 4, src: "/carruseles/2/4.jpg", title: "Red MPLS Nacional", year: "2010", tags: "#MPLS #Fibra", match: "97% de coincidencia" }
          ]} />
        </motion.div>
      </section>

      {/* Cuarto Carrusel: Otros Proyectos (Fondo Azul Marca) */}
      <section className="py-20 relative bg-[#0033a0] w-full mt-10 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-12 mb-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Sectores: Salud, Justicia y Educación</h2>
          </div>
          <ImageCarousel
            images={[
              { id: 1, src: "/carruseles/6/Publicación 10d-100.jpg", title: "Hospitales CABA", year: "2005", tags: "#Salud #Networking", match: "98% de coincidencia" },
              { id: 2, src: "/carruseles/6/a.jpg", title: "Hospital Viña del Mar", year: "2010", tags: "#Salud #ContactCenter", match: "97% de coincidencia" },
              { id: 3, src: "/carruseles/6/b.jpg", title: "Swiss Medical", year: "2010s", tags: "#Salud #MisiónCrítica", match: "99% de coincidencia" },
              { id: 4, src: "/carruseles/6/c.jpg", title: "Consejo de la Magistratura", year: "2013-Hoy", tags: "#Justicia #Sistemas", match: "96% de coincidencia" },
              { id: 5, src: "/carruseles/8/Publicación 8d.jpg", title: "Aulas Inteligentes", year: "2017-Hoy", tags: "#Educación #IA", match: "100% de coincidencia" },
            ]}
          />
        </motion.div>
      </section>

      {/* Quinta Sección: Integración */}
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
              { id: 6, src: "/carruseles/9/a.jpg" },
              { id: 7, src: "/carruseles/9/b.jpg" },
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
