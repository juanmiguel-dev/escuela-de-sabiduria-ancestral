"use client";

import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { ImageCarousel } from "@/components/ImageCarousel";
import { TechBackground } from "@/components/TechBackground";
import { VideoModal } from "@/components/VideoModal";
import { GalleryModal } from "@/components/GalleryModal";

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<{ title: string, images: { id: string | number; src: string; }[] } | null>(null);

  // Estado para el proyecto activo en el Hero
  const [activeProject, setActiveProject] = useState({
    title: "Educación y conectividad satelital",
    videoSrc: "/videos/7.mp4",
    year: "1985 - 2025",
    tags: "#Starlink #Meraki #Wifi #Enlaces",
    description: "1000 escuelas rurales conectadas en 90 días"
  });

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
      <header className="absolute top-0 left-0 w-full px-6 py-8 sm:px-12 sm:py-10 z-50">
        <Image
          src="/logo-full.svg"
          alt="Trans Advanced Technologies"
          width={280}
          height={80}
          className="h-10 sm:h-14 w-auto"
          priority
        />
      </header>

      {/* Hero Section (Dynamic Content) */}
      <section className="relative h-[100vh] w-full flex items-center overflow-hidden">
        {/* Featured Background: Video on Desktop, Static Image on Mobile */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeProject.videoSrc}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <video
              src={activeProject.videoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            
            {/* Light Overlay Gradient for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#eeeeee]/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#eeeeee] via-transparent to-transparent z-10" />
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="relative z-20 max-w-5xl px-6 sm:px-12 space-y-6 sm:space-y-8"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.95] flex flex-col items-start">
                <span className="text-[#0033a0] drop-shadow-sm">
                  {activeProject.title.split(' ').slice(0, Math.ceil(activeProject.title.split(' ').length / 2)).join(' ')}
                </span>
                <span className="text-[#ff9900] drop-shadow-sm">
                  {activeProject.title.split(' ').slice(Math.ceil(activeProject.title.split(' ').length / 2)).join(' ')}
                </span>
              </h1>

              {/* Meta Info Bar Unificada */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-base font-bold text-gray-700 mt-6">
                <span className="text-[#0033a0] font-black border-b-2 border-[#0033a0]">CASO DESTACADO</span>
                <span className="font-black">{activeProject.year}</span>
                <span className="opacity-40">|</span>
                <span className="font-black">Infraestructura</span>
                <span className="text-gray-600 font-bold bg-white/40 px-2 py-0.5 rounded border border-gray-200 shadow-sm">
                  {activeProject.tags}
                </span>
              </div>

              <div className="space-y-6 mt-6">
                <p className="text-xl sm:text-3xl text-gray-800 max-w-2xl font-black leading-tight border-l-4 border-[#ff9900] pl-6 py-2">
                  {activeProject.description || "Solución tecnológica de alto impacto"}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button 
                    onClick={() => setIsVideoModalOpen(true)}
                    className="flex items-center gap-3 bg-[#0033a0] text-white px-10 py-4 rounded-full font-black hover:bg-[#002880] transition-all shadow-[0_10px_30px_rgba(0,51,160,0.3)] group cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    CONOCER MÁS
                  </button>
                  <a 
                    href="https://www.transadvanced.tech/contacto" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white text-[#0033a0] px-10 py-4 rounded-full font-black hover:bg-gray-50 transition-all border-2 border-[#0033a0]/10 shadow-xl"
                  >
                    MÁS INFO
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Carousel Overlay (Absolute Positioned at bottom right of Hero) */}
        <div className="absolute bottom-10 right-0 z-30 w-[60vw] max-w-[900px] hidden lg:block overflow-visible">
           <ProjectsCarousel onProjectHover={(p) => setActiveProject({
             title: p.title,
             videoSrc: p.videoSrc,
             year: p.year,
             tags: p.tags,
             description: p.title === "Atención emergencias 107" ? "Gestión crítica de emergencias médicas" : 
                          p.title === "Tecnología en sector Salud" ? "Digitalización integral hospitalaria" :
                          p.title === "Ciberseguridad pública con Cisco" ? "Protección de datos a nivel nacional" :
                          p.title === "6000 puestos de trabajo conectados" ? "Infraestructura de red de gran escala" :
                          p.title === "El inicio de todo" ? "Nuestros orígenes en 1993" :
                          "Innovación constante"
           })} />
           <div className="flex flex-col items-end px-12 mt-6">
              <h2 className="text-2xl font-black text-[#0033a0] tracking-tighter uppercase">
                Casos <span className="text-[#ff9900]">destacados</span>
              </h2>
              <div className="w-16 h-1 bg-[#ff9900] mt-1" />
           </div>
        </div>
      </section>

      <VideoModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={activeProject.title}
        videoSrc={activeProject.videoSrc}
      />

      <GalleryModal 
        isOpen={!!selectedGallery}
        onClose={() => setSelectedGallery(null)}
        title={selectedGallery?.title || ""}
        images={selectedGallery?.images || []}
      />

      {/* El carrusel de Casos Destacados ahora está integrado en el Hero (ver arriba) */}

      {/* Nueva Sección: Cuando la tecnología no puede fallar (Abajo de los videos) */}
      <section className="relative z-30 pt-16 pb-12 w-full overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-5xl px-6 sm:px-12 mb-8 text-left">
            <h2 className="text-4xl sm:text-5xl font-black text-[#0033a0] tracking-tighter uppercase leading-none">
              Cuando la tecnología <span className="text-[#ff9900]">no puede fallar</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#ff9900] mt-4" />
          </div>
          
          <ImageCarousel 
            onGalleryClick={(img) => setSelectedGallery({ title: img.title || "", images: img.gallery || [] })}
            images={[
            { id: "emergencias", src: "/tecnologia-no-puede-fallar/emergencias.mp4", title: "Atención emergencias 107", year: "2010", tags: "#Contact Center #Desarrollo #Center", match: "100% de coincidencia" },
            { id: "salud", src: "/tecnologia-no-puede-fallar/salud.mp4", title: "Tecnología en sector Salud", year: "2008-Hoy", tags: "#Colaboración #Contact Center #Desarrollo #Networking #IA #Center", match: "99% de coincidencia" },
            { id: "ciberseguridad", src: "/tecnologia-no-puede-fallar/ciberseguridad.mp4", title: "Ciberseguridad pública con Cisco", year: "2012", tags: "#Ciberseguridad #Cisco", match: "98% de coincidencia" },
            { 
              id: "frontera", 
              src: "/tecnologia-no-puede-fallar/2011/Publicación 6A-100.jpg", 
              title: "Videovigilancia fronteriza", 
              year: "2011", 
              tags: "#CCTV", 
              match: "97% de coincidencia", 
              isGallery: true,
              gallery: [
                { id: 1, src: "/tecnologia-no-puede-fallar/2011/Publicación 6A-100.jpg" },
                { id: 2, src: "/tecnologia-no-puede-fallar/2011/Publicación 6B-100.jpg" },
                { id: 3, src: "/tecnologia-no-puede-fallar/2011/Publicación 6C-100.jpg" },
                { id: 4, src: "/tecnologia-no-puede-fallar/2011/Publicación 6D-100.jpg" },
                { id: 5, src: "/tecnologia-no-puede-fallar/2011/Publicación 6E-100.jpg" },
              ]
            },
            { id: "hospitales", src: "/tecnologia-no-puede-fallar/hospitales.jpg", title: "Hospitales CABA", year: "2005", tags: "#Cableado #Switches #Networking", match: "96% de coincidencia" },

            { id: "arsat", src: "/tecnologia-no-puede-fallar/arsat.jpg", title: "Data center ARSAT", year: "2014", tags: "#Data center #Cisco", match: "99% de coincidencia" },
          ]} />
        </motion.div>
      </section>

      {/* Segunda Sección: Implementaciones de escala nacional (Infraestructura) */}
      <section className="pb-16 relative w-full overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-5xl px-6 sm:px-12 mb-8 text-left">
            <h2 className="text-4xl sm:text-5xl font-black text-[#0033a0] tracking-tighter uppercase leading-none">
              Implementaciones de <span className="text-[#ff9900]">escala nacional</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#ff9900] mt-4" />
          </div>
          <ImageCarousel 
            onGalleryClick={(img) => setSelectedGallery({ title: img.title || "", images: img.gallery || [] })}
            images={[
            { 
              id: 1, 
              src: "/implementaciones/conectividad-masiva-de-aulas/Publicación 4F-100.jpg", 
              title: "Conectividad masiva de aulas", 
              year: "2017", 
              tags: "#Aulas #Networking", 
              match: "99% de coincidencia",
              isGallery: true,
              gallery: [
                { id: 1, src: "/implementaciones/conectividad-masiva-de-aulas/Publicación 4A-100.jpg" },
                { id: 2, src: "/implementaciones/conectividad-masiva-de-aulas/Publicación 4B-100.jpg" },
                { id: 3, src: "/implementaciones/conectividad-masiva-de-aulas/Publicación 4C-100.jpg" },
                { id: 4, src: "/implementaciones/conectividad-masiva-de-aulas/Publicación 4D-100.jpg" },
                { id: 5, src: "/implementaciones/conectividad-masiva-de-aulas/Publicación 4E-100.jpg" },
                { id: 6, src: "/implementaciones/conectividad-masiva-de-aulas/Publicación 4F-100.jpg" },
              ]
            },
            { id: 2, src: "/implementaciones/360-edificios-publicos-interconectados.mp4", title: "360 edificios públicos interconectados", year: "2015", tags: "#Gobierno #Networking", match: "98% de coincidencia" },
            { id: 3, src: "/implementaciones/6000-puestos-de-trabajo-conectados.mp4", title: "6000 puestos de trabajo conectados", year: "2018", tags: "#Infraestructura #Redes", match: "97% de coincidencia" },
            { id: 4, src: "/implementaciones/12000-escuelas-conectadas.jpg", title: "12000 escuelas conectadas", year: "2010", tags: "#Educación #Nacional", match: "99% de coincidencia" },
            { id: 5, src: "/implementaciones/Ciudad-de-Buenos-Aires-interconectada.jpg", title: "Ciudad de Buenos Aires interconectada", year: "2012", tags: "#CABA #SmartCity", match: "96% de coincidencia" },
          ]} />
        </motion.div>
      </section>

      {/* Tercera Sección: Pioneros en Innovación */}
      <section className="pb-20 relative w-full overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-5xl px-6 sm:px-12 mb-8 text-left">
            <h2 className="text-4xl sm:text-5xl font-black text-[#0033a0] tracking-tighter uppercase leading-none">
              Pioneros en <span className="text-[#ff9900]">tecnología</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#ff9900] mt-4" />
          </div>
          <ImageCarousel images={[
            { id: 1, src: "/pioneros/primeros-pasos.mp4", title: "Primeros pasos de Trans", year: "1985", tags: "#Historia #Fundación", match: "100% de coincidencia" },
            { id: 2, src: "/pioneros/primera-red-switching.jpg", title: "Primera red de Switching en Argentina", year: "1993", tags: "#Pioneros #Switching", match: "99% de coincidencia", pdfSrc: "/pioneros/primera-red-switching.pdf" },
            { id: 3, src: "/pioneros/primera-red-wan.jpg", title: "Primera red WAN - Frame Relay en Argentina", year: "1998", tags: "#WAN #FrameRelay", match: "98% de coincidencia", pdfSrc: "/pioneros/primera-red-wan.pdf" },
            { 
              id: 4, 
              src: "/pioneros/primer-red-mpls/Publicación 9A-100.jpg", 
              title: "Primer red MPLS del país", 
              year: "2005", 
              tags: "#MPLS #Networking", 
              match: "99% de coincidencia", 
              isGallery: true,
              gallery: [
                { id: 1, src: "/pioneros/primer-red-mpls/Publicación 9A-100.jpg" },
                { id: 2, src: "/pioneros/primer-red-mpls/Publicación 9b-100.jpg" },
                { id: 3, src: "/pioneros/primer-red-mpls/Publicación 9c-100.jpg" },
                { id: 4, src: "/pioneros/primer-red-mpls/Publicación 9d-100.jpg" },
                { id: 5, src: "/pioneros/primer-red-mpls/Publicación 9e-100.jpg" },
                { id: 6, src: "/pioneros/primer-red-mpls/Publicación 9f-100.jpg" },
              ]
            },
            { id: 5, src: "/pioneros/primer-softswitch.jpg", title: "Primer SoftSwitch corporativo a gran escala", year: "2002", tags: "#SoftSwitch #VozIP", match: "97% de coincidencia" },
            { 
              id: 6, 
              src: "/pioneros/primera-red-provincial/Publicación 11a-100.jpg", 
              title: "Primera red de gobierno provincial en Argentina", 
              year: "2007", 
              tags: "#Gobierno #Digitalización", 
              match: "96% de coincidencia", 
              isGallery: true,
              gallery: [
                { id: 1, src: "/pioneros/primera-red-provincial/Publicación 11a-100.jpg" },
                { id: 2, src: "/pioneros/primera-red-provincial/Publicación 11b-100.jpg" },
                { id: 3, src: "/pioneros/primera-red-provincial/Publicación 11c-100.jpg" },
                { id: 4, src: "/pioneros/primera-red-provincial/Publicación 11d-100.jpg" },
              ]
            },
          ]} onGalleryClick={(img) => setSelectedGallery({ title: img.title || "", images: img.gallery || [] })} />
        </motion.div>
      </section>

      {/* Cuarta Sección: Integraciones que parecían imposibles */}
      <section className="pb-24 relative w-full overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-5xl px-6 sm:px-12 mb-8 text-left">
            <h2 className="text-4xl sm:text-5xl font-black text-[#0033a0] tracking-tighter uppercase leading-none">
              Integraciones que <span className="text-[#ff9900]">parecían imposibles</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#ff9900] mt-4" />
          </div>
          <ImageCarousel 
            onGalleryClick={(img) => setSelectedGallery({ title: img.title || "", images: img.gallery || [] })}
            images={[
            { 
              id: 1, 
              src: "/integraciones/call-centers/Publicación 18A-100.jpg", 
              title: "Call Centers", 
              year: "2015", 
              tags: "#CallCenter #Integración", 
              match: "100% de coincidencia",
              isGallery: true,
              gallery: [
                { id: 1, src: "/integraciones/call-centers/Publicación 18A-100.jpg" },
                { id: 2, src: "/integraciones/call-centers/Publicación 18B-100.jpg" },
                { id: 3, src: "/integraciones/call-centers/Publicación 18C-100.jpg" },
                { id: 4, src: "/integraciones/call-centers/Publicación 18D-100.jpg" },
              ]
            },
            { 
              id: 2, 
              src: "/integraciones/contact-center/Publicación 8A.jpg", 
              title: "Contact Center", 
              year: "2016", 
              tags: "#ContactCenter #CX", 
              match: "99% de coincidencia",
              isGallery: true,
              gallery: [
                { id: 1, src: "/integraciones/contact-center/Publicación 8A.jpg" },
                { id: 2, src: "/integraciones/contact-center/Publicación 8b.jpg" },
                { id: 3, src: "/integraciones/contact-center/Publicación 8c.jpg" },
                { id: 4, src: "/integraciones/contact-center/Publicación 8d.jpg" },
              ]
            },
            { 
              id: 3, 
              src: "/integraciones/integraciones-multidisciplinaria/Publicación 10A-100.jpg", 
              title: "Integraciones Multidisciplinarias", 
              year: "2017", 
              tags: "#Multiservicio #Networking", 
              match: "98% de coincidencia",
              isGallery: true,
              gallery: [
                { id: 1, src: "/integraciones/integraciones-multidisciplinaria/Publicación 10A-100.jpg" },
                { id: 2, src: "/integraciones/integraciones-multidisciplinaria/Publicación 10b-100.jpg" },
                { id: 3, src: "/integraciones/integraciones-multidisciplinaria/Publicación 10c-100.jpg" },
                { id: 4, src: "/integraciones/integraciones-multidisciplinaria/Publicación 10d-100.jpg" },
              ]
            },
            { id: 4, src: "/integraciones/red-unica-multiservicio.mp4", title: "Red Única Multiservicio", year: "2018", tags: "#Multiservicio #Video", match: "97% de coincidencia" },
            { id: 5, src: "/integraciones/triple-play.png", title: "Triple Play", year: "2014", tags: "#TriplePlay #Servicios", match: "96% de coincidencia" },
          ]} />
        </motion.div>
      </section>


      {/* Quinta Sección: Infraestructura que conecta */}
      <section className="pb-24 relative w-full overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-5xl px-6 sm:px-12 mb-8 text-left">
            <h2 className="text-4xl sm:text-5xl font-black text-[#0033a0] tracking-tighter uppercase leading-none">
              Infraestructura que <span className="text-[#ff9900]">conecta</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#ff9900] mt-4" />
          </div>
          <ImageCarousel images={[
            { id: 1, src: "/infraestructura/Caso 2_horizontal.mp4", title: "Infraestructura Regional", year: "2019", tags: "#Regional #Networking", match: "99% de coincidencia" },
            { id: 2, src: "/infraestructura/plantas-industriales.mp4", title: "Plantas Industriales", year: "2018", tags: "#Industria #Redes", match: "98% de coincidencia" },
            { id: 3, src: "/infraestructura/redes-de-gobierno.mp4", title: "Redes de Gobierno", year: "2015", tags: "#Gobierno #Infraestructura", match: "97% de coincidencia" },
            { id: 4, src: "/infraestructura/call-centers-en-chile.jpg", title: "Expansión Regional Chile", year: "2012", tags: "#Internacional #Chile", match: "96% de coincidencia" },
          ]} />
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
