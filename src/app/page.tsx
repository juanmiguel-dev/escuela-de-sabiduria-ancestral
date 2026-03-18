"use client";

import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { ImageCarousel } from "@/components/ImageCarousel";
import { TechBackground } from "@/components/TechBackground";
import { VideoModal } from "@/components/VideoModal";
import { GalleryModal } from "@/components/GalleryModal";
import { getSections, getFeaturedProjects } from "@/sanity/lib/queries";

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<{ title: string, images: { id: string | number; src: string; }[] } | null>(null);
  const [sanitySections, setSanitySections] = useState<any[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);

  // Cargar datos de Sanity
  useEffect(() => {
    async function loadData() {
      try {
        const sections = await getSections();
        if (sections && sections.length > 0) {
          setSanitySections(sections);
        }

        const featured = await getFeaturedProjects();
        if (featured && featured.length > 0) {
          setFeaturedProjects(featured);
        }
      } catch (error) {
        console.error("Error cargando datos de Sanity:", error);
      }
    }
    loadData();
  }, []);

  // Estado para el proyecto activo en el Hero
  const [activeProject, setActiveProject] = useState<{
    title: string;
    videoSrc?: string;
    imageSrc?: string;
    year: string;
    tags: string;
    description: string;
    sections?: string[];
  }>({
    title: "Educación y conectividad satelital",
    videoSrc: "/videos/7.mp4",
    year: "1985 - 2025",
    tags: "#Starlink #Meraki #Wifi #Enlaces",
    description: "1000 escuelas rurales conectadas en 90 días",
    sections: ["Infraestructura"]
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

      {/* Hero Section (Netflix Style) */}
      <section className="relative h-[85vh] sm:h-[95vh] w-full flex items-center overflow-hidden">
        {/* Featured Background: Video on Desktop, Static Image on Mobile */}
        <div className="absolute inset-0 z-0">
          {/* Static Image for Mobile (Netflix Style) */}
          <div className="block sm:hidden w-full h-full">
            <Image
              src="/carruseles/8/Publicación 8d.jpg"
              alt="Educación y conectividad satelital"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Video for Desktop */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeProject.videoSrc || activeProject.imageSrc}
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {activeProject.videoSrc ? (
                <video
                  src={activeProject.videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="hidden sm:block w-full h-full object-cover"
                />
              ) : (
                activeProject.imageSrc && (
                  <div className="hidden sm:block relative w-full h-full">
                    <Image
                      src={activeProject.imageSrc}
                      alt={activeProject.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )
              )}
              
              {/* Light Overlay Gradient for Readability */}
              {/* Desktop: Horizontal gradient */}
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#eeeeee]/60 to-transparent z-10" />
              {/* Mobile: Stronger vertical and full white overlay */}
              <div className="block sm:hidden absolute inset-0 bg-white/70 z-10" />
              <div className="block sm:hidden absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#eeeeee] via-transparent to-transparent z-10" />
            </motion.div>
          </AnimatePresence>
        </div>

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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] flex flex-col items-start font-sans">
                <span className="text-[#0033a0] drop-shadow-sm">
                  {activeProject.title.split(' ').slice(0, Math.ceil(activeProject.title.split(' ').length / 2)).join(' ')}
                </span>
                <span className="text-[#37e4af] drop-shadow-sm">
                  {activeProject.title.split(' ').slice(Math.ceil(activeProject.title.split(' ').length / 2)).join(' ')}
                </span>
              </h1>

              {/* Meta Info Bar Unificada */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-base font-bold text-gray-700 mt-8">
                <span className="text-[#0033a0] font-black border-b-2 border-[#0033a0]">Caso destacado</span>
                <span className="font-black">{activeProject.year}</span>
                <span className="opacity-40">|</span>
                <span className="font-black">{activeProject.sections?.join(' / ') || "Tecnología"}</span>
                <span className="text-[#0033a0] text-xs font-medium bg-[#ff9900] px-3 py-1 rounded border border-white/30 shadow-lg animate-orange-glow uppercase tracking-wider">
                  {activeProject.tags}
                </span>
              </div>

              <div className="space-y-6 mt-6">
                <p className="text-xl sm:text-3xl text-gray-800 max-w-2xl font-black leading-tight border-l-4 border-[#37e4af] pl-6 py-2">
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
                    Ver caso
                  </button>
                  <a 
                    href="https://www.transadvanced.tech/contacto" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white text-[#0033a0] px-10 py-4 rounded-full font-black hover:bg-gray-50 transition-all border-2 border-[#0033a0]/10 shadow-xl"
                  >
                    Más info
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
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
          <div className="max-w-5xl px-6 sm:px-12 mb-8 text-left">
            <h2 className="text-3xl sm:text-4xl font-medium text-[#0033a0] tracking-tight">
              Casos <span className="text-[#37e4af]">destacados</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#37e4af] mt-4" />
          </div>

          <ProjectsCarousel 
            projects={featuredProjects.length > 0 ? featuredProjects.map((p: any) => ({
              id: p._id,
              title: p.title,
              videoSrc: p.videoUrl || (p.mediaType === 'video' ? p.mediaUrl : undefined),
              imageSrc: p.mediaUrl,
              year: p.year,
              tags: p.tags,
              sections: p.sections,
              match: "99% de coincidencia"
            })) : undefined}
            onProjectClick={(p: any) => setActiveProject({
             title: p.title,
             videoSrc: p.videoSrc,
             imageSrc: p.imageSrc,
             year: p.year,
             tags: p.tags,
             sections: p.sections,
             description: p.title === "Atención emergencias 107" ? "Gestión crítica de emergencias médicas" : 
                          p.title === "Tecnología en sector salud" ? "Digitalización integral hospitalaria" :
                          p.title === "Ciberseguridad pública con Cisco" ? "Protección de datos a nivel nacional" :
                          p.title === "6000 puestos de trabajo conectados" ? "Infraestructura de red de gran escala" :
                          p.title === "El inicio de todo" ? "Nuestros orígenes en 1993" :
                          "Innovación constante"
           })} />
        </motion.div>
       </section>

      <VideoModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={activeProject.title}
        videoSrc={activeProject.videoSrc || ""}
      />

      <GalleryModal 
        isOpen={!!selectedGallery}
        onClose={() => setSelectedGallery(null)}
        title={selectedGallery?.title || ""}
        images={selectedGallery?.images || []}
      />

      {/* Renderizado Dinámico de Secciones de Sanity */}
      {sanitySections.map((sec) => (
        <section key={sec._id} className="pb-24 relative w-full overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUpVariant}
          >
            <div className="max-w-5xl px-6 sm:px-12 mb-8 text-left">
              <h2 className="text-3xl sm:text-4xl font-medium text-[#0033a0] tracking-tight leading-none">
                {sec.title} <span className="text-[#37e4af]">{sec.highlightText}</span>
              </h2>
              <div className="w-24 h-1.5 bg-[#37e4af] mt-4" />
            </div>
            <ImageCarousel 
              onGalleryClick={(img) => setSelectedGallery({ title: img.title || "", images: img.gallery || [] })}
              images={sec.projects?.filter((p: any) => p.mediaUrl || p.videoUrl).map((p: any) => ({
                id: p._id,
                src: p.mediaType === 'video' ? (p.videoUrl || p.mediaUrl) : (p.mediaUrl || p.videoUrl),
                title: p.title,
                year: p.year,
                tags: p.tags,
                sections: p.sections,
                pdfSrc: p.pdfUrl,
                isGallery: p.isGallery,
                gallery: p.gallery?.map((url: string, idx: number) => ({ id: idx, src: url })) || []
              })) || []} 
            />
          </motion.div>
        </section>
      ))}

      {/* Secciones Estáticas (Solo se muestran si no hay datos en Sanity para evitar duplicados si decides migrar todo) */}
      {sanitySections.length === 0 && (
        <>
          {/* Nueva Sección: Cuando la tecnología no puede fallar (Abajo de los videos) */}
          <section className="relative z-30 pt-16 pb-12 w-full overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUpVariant}
            >
              <div className="max-w-5xl px-6 sm:px-12 mb-8 text-left">
                <h2 className="text-3xl sm:text-4xl font-medium text-[#0033a0] tracking-tight leading-none">
                  Cuando la tecnología <span className="text-[#37e4af]">no puede fallar</span>
                </h2>
                <div className="w-24 h-1.5 bg-[#37e4af] mt-4" />
              </div>
              
              <ImageCarousel 
                onGalleryClick={(img) => setSelectedGallery({ title: img.title || "", images: img.gallery || [] })}
                images={[
                { id: "emergencias", src: "/tecnologia-no-puede-fallar/emergencias.mp4", title: "Atención emergencias 107", year: "2010", tags: "#Contact Center #Desarrollo #Center", match: "100% de coincidencia" },
                { id: "salud", src: "/tecnologia-no-puede-fallar/salud.mp4", title: "Tecnología en sector salud", year: "2008-Hoy", tags: "#Colaboración #Contact Center #Desarrollo #Networking #IA #Center", match: "99% de coincidencia" },
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
            <h2 className="text-3xl sm:text-4xl font-medium text-[#0033a0] tracking-tight leading-none">
              Implementaciones de <span className="text-[#37e4af]">escala nacional</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#37e4af] mt-4" />
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
            { id: 5, src: "/implementaciones/Ciudad de Buenos Aires interconectada.jpg", title: "Ciudad de Buenos Aires interconectada", year: "2012", tags: "#CABA #SmartCity", match: "96% de coincidencia" },
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
            <h2 className="text-3xl sm:text-4xl font-medium text-[#0033a0] tracking-tight leading-none">
              Pioneros en <span className="text-[#37e4af]">tecnología</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#37e4af] mt-4" />
          </div>
          <ImageCarousel images={[
            { id: 1, src: "/pioneros/primeros-pasos.mp4", title: "Primeros pasos de Trans", year: "1985", tags: "#Historia #Fundación", match: "100% de coincidencia" },
            { id: 2, src: "/pioneros/primera-red-switching.jpg", title: "Primera red de switching en Argentina", year: "1993", tags: "#Pioneros #Switching", match: "99% de coincidencia", pdfSrc: "/pioneros/primera-red-switching.pdf" },
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
            { id: 5, src: "/pioneros/primer-softswitch.jpg", title: "Primer softSwitch corporativo a gran escala", year: "2002", tags: "#SoftSwitch #VozIP", match: "97% de coincidencia" },
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
            <h2 className="text-3xl sm:text-4xl font-medium text-[#0033a0] tracking-tight leading-none">
              Integraciones que <span className="text-[#37e4af]">parecían imposibles</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#37e4af] mt-4" />
          </div>
          <ImageCarousel 
            onGalleryClick={(img) => setSelectedGallery({ title: img.title || "", images: img.gallery || [] })}
            images={[
            { 
              id: 1, 
              src: "/integraciones/call-centers/Publicación 18A-100.jpg", 
              title: "Call centers", 
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
              title: "Contact center", 
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
              title: "Integraciones multidisciplinarias", 
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
            { id: 4, src: "/integraciones/red-unica-multiservicio.mp4", title: "Red única multiservicio", year: "2018", tags: "#Multiservicio #Video", match: "97% de coincidencia" },
            { id: 5, src: "/integraciones/triple-play.png", title: "Triple play", year: "2014", tags: "#TriplePlay #Servicios", match: "96% de coincidencia" }
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
            <h2 className="text-3xl sm:text-4xl font-medium text-[#0033a0] tracking-tight leading-none">
              Infraestructura que <span className="text-[#37e4af]">conecta</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#37e4af] mt-4" />
          </div>
          <ImageCarousel 
            onGalleryClick={(img) => setSelectedGallery({ title: img.title || "", images: img.gallery || [] })}
            images={[
            { 
              id: 1, 
              src: "/infraestructura/1300km de fibra - 92 localidades/Publicación 7A-100.jpg", 
              title: "1300km de fibra - 92 localidades", 
              year: "2018", 
              tags: "#Fibra #Nacional", 
              match: "99% de coincidencia",
              isGallery: true,
              gallery: [
                { id: 1, src: "/infraestructura/1300km de fibra - 92 localidades/Publicación 7A-100.jpg" },
                { id: 2, src: "/infraestructura/1300km de fibra - 92 localidades/Publicación 7B-100.jpg" },
                { id: 3, src: "/infraestructura/1300km de fibra - 92 localidades/Publicación 7C-100.jpg" },
                { id: 4, src: "/infraestructura/1300km de fibra - 92 localidades/Publicación 7D-100.jpg" },
                { id: 5, src: "/infraestructura/1300km de fibra - 92 localidades/Publicación 7E-100.jpg" },
              ]
            },
            { 
              id: 2, 
              src: "/infraestructura/telefonia-publica-morteros/Publicación 12a-100.jpg", 
              title: "Telefonía pública - Morteros", 
              year: "2010", 
              tags: "#Voz #Morteros", 
              match: "98% de coincidencia",
              isGallery: true,
              gallery: [
                { id: 1, src: "/infraestructura/telefonia-publica-morteros/Publicación 12a-100.jpg" },
                { id: 2, src: "/infraestructura/telefonia-publica-morteros/Publicación 12b-100.jpg" },
              ]
            },
            { id: 3, src: "/infraestructura/Educación y Starlink.mp4", title: "Educación y Starlink", year: "2024", tags: "#Starlink #Conectividad", match: "100% de coincidencia" },
            { id: 4, src: "/infraestructura/Redes de Gobierno.mp4", title: "Redes de gobierno", year: "2015", tags: "#Gobierno #Infraestructura", match: "97% de coincidencia" },
            { id: 5, src: "/infraestructura/Innovación en Atención al cliente.mp4", title: "Innovación en atención al cliente", year: "2020", tags: "#CX #Innovación", match: "99% de coincidencia" },
            { id: 6, src: "/infraestructura/Plantas industriales automotrices.mp4", title: "Plantas industriales automotrices", year: "2018", tags: "#Industria #Redes", match: "98% de coincidencia" },
            { id: 7, src: "/infraestructura/Call centers en Chile.jpg", title: "Call centers en Chile", year: "2012", tags: "#Chile #Internacional", match: "96% de coincidencia" },
          ]} />
        </motion.div>
      </section>


      {/* Sexta Sección: Salud, educación y ciudadanía */}
      <section className="pb-24 relative w-full overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-5xl px-6 sm:px-12 mb-8 text-left">
            <h2 className="text-3xl sm:text-4xl font-medium text-[#0033a0] tracking-tight leading-none">
              Salud, educación <span className="text-[#37e4af]">y ciudadanía</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#37e4af] mt-4" />
          </div>
          <ImageCarousel 
            onGalleryClick={(img) => setSelectedGallery({ title: img.title || "", images: img.gallery || [] })}
            images={[
            { 
              id: 1, 
              src: "/salud-educacion-ciudadania/Metrovias - Gestion de pasajeros/Publicación 5A-100.jpg", 
              title: "Metrovias - gestión de pasajeros", 
              year: "2016", 
              tags: "#Transporte #Ciudadanía", 
              match: "99% de coincidencia",
              isGallery: true,
              gallery: [
                { id: 1, src: "/salud-educacion-ciudadania/Metrovias - Gestion de pasajeros/Publicación 5A-100.jpg" },
                { id: 2, src: "/salud-educacion-ciudadania/Metrovias - Gestion de pasajeros/Publicación 5B-100.jpg" },
                { id: 3, src: "/salud-educacion-ciudadania/Metrovias - Gestion de pasajeros/Publicación 5C-100.jpg" },
                { id: 4, src: "/salud-educacion-ciudadania/Metrovias - Gestion de pasajeros/Publicación 5D-100.jpg" },
              ]
            },
            { id: 2, src: "/salud-educacion-ciudadania/Tecnología en Sector Salud.mp4", title: "Tecnología en sector salud", year: "2022", tags: "#Salud #Digitalización", match: "100% de coincidencia" },
            { id: 3, src: "/salud-educacion-ciudadania/Automatización para organismos públicos.mp4", title: "Automatización para organismos públicos", year: "2021", tags: "#Ciudadanía #Automatización", match: "98% de coincidencia" },
            { 
              id: 4, 
              src: "/salud-educacion-ciudadania/Aulas Inteligentes (Fundación Rocca)/Portada Aulas inteligentes-100.jpg", 
              title: "Aulas inteligentes - Fundación Rocca", 
              year: "2019", 
              tags: "#Educación #Innovación", 
              match: "97% de coincidencia",
              pdfSrc: "/salud-educacion-ciudadania/Aulas Inteligentes (Fundación Rocca)/Nota de blog 7 - Transformar el aula para transformar el futuro.pdf",
              isGallery: true,
              gallery: [
                { id: 1, src: "/salud-educacion-ciudadania/Aulas Inteligentes (Fundación Rocca)/Portada Aulas inteligentes-100.jpg" }
              ]
            },
            { 
              id: 5, 
              src: "/salud-educacion-ciudadania/Palacio de Justicia/Nota de blog 4/Portada palacio de justicia 1-100.jpg", 
              title: "Palacio de Justicia", 
              year: "2018", 
              tags: "#Justicia #Infraestructura", 
              match: "96% de coincidencia",
              pdfSrc: "/salud-educacion-ciudadania/Palacio de Justicia/Nota de blog 4/Nota de blog 4.pdf",
              isGallery: true,
              gallery: [
                { id: 1, src: "/salud-educacion-ciudadania/Palacio de Justicia/Nota de blog 4/Portada palacio de justicia 1-100.jpg" }
              ]
            },
            { id: 6, src: "/salud-educacion-ciudadania/Hospital Viña del Mar.jpg", title: "Hospital Viña del Mar", year: "2017", tags: "#Salud #Chile", match: "95% de coincidencia" },
            { id: 7, src: "/salud-educacion-ciudadania/Juegos Olímpicos.jpg", title: "Juegos Olímpicos", year: "2018", tags: "#Eventos #Ciudadanía", match: "99% de coincidencia" },
            { id: 8, src: "/salud-educacion-ciudadania/Acondicionamiento oficinas Edenor.jpg", title: "Acondicionamiento oficinas Edenor", year: "2020", tags: "#Infraestructura #Oficinas", match: "94% de coincidencia" },
          ]} />
        </motion.div>
      </section>
    </>
  )}


      {/* Footer / Logo a pie de página */}
      <footer className="py-20 bg-[#f8f9fc] border-t border-gray-100 flex flex-col items-center justify-center">
        <Image
          src="/logo-full.svg"
          alt="Trans Advanced Technologies Footer"
          width={280}
          height={80}
          className="h-12 sm:h-16 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        />
        <p className="mt-8 text-sm text-gray-400 font-medium tracking-widest">
          © {new Date().getFullYear()} Trans Advanced Technologies
        </p>
      </footer>

    </main>
  );
}
