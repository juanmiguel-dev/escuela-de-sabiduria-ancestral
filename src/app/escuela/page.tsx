"use client";

import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { ImageCarousel } from "@/components/ImageCarousel";
import { TechBackground } from "@/components/TechBackground";
import { TechHeroMobile } from "@/components/TechHeroMobile";
import { VideoModal } from "@/components/VideoModal";
import { GalleryModal } from "@/components/GalleryModal";
import { getSections, getFeaturedProjects } from "@/sanity/lib/queries";

export default function Escuela() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<{ title: string, images: { id: string | number; src: string; }[] } | null>(null);
  const [sanitySections, setSanitySections] = useState<any[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);

  // Estado para el proyecto activo en el Hero
  const [activeProject, setActiveProject] = useState<{
    title: string;
    videoSrc?: string;
    imageSrc?: string;
    description: string;
    sections?: string[];
  } | null>(null);

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
          // Establecer el primer proyecto como activo por defecto
          const p = featured[0];
          setActiveProject({
            title: p.title,
            videoSrc: p.videoUrl,
            imageSrc: p.mediaUrl,
            description: p.description || "",
            sections: p.sections
          });
        }
      } catch (error) {
        console.error("Error cargando datos de Sanity:", error);
      }
    }
    loadData();
  }, []);

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen selection:bg-[#0033a0] selection:text-white pb-24 overflow-x-hidden font-sans relative text-gray-900">

      {/* Header / Top Navigation (Logo de ROMINA CASTAÑEDA) */}
      <header className="absolute top-0 left-0 w-full px-6 py-6 sm:px-12 z-50 flex items-center justify-between bg-transparent">
        <Image
          src="/logo.png"
          alt="Romina Castañeda Logo"
          width={220}
          height={73}
          className="w-[160px] sm:w-[220px] h-auto object-contain"
          priority
        />
        <a 
          href="/dashboard" 
          className="bg-[#00b491] hover:bg-[#009a7b] text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-black text-xs sm:text-sm tracking-widest transition-all shadow-[0_8px_20px_rgba(0,180,145,0.3)] hover:scale-105 active:scale-95 uppercase"
        >
          Acceder
        </a>
      </header>

      {/* Hero Section (Netflix Style) */}
      <section className="relative h-[68vh] sm:h-[95vh] w-full flex items-center overflow-hidden">
        {activeProject && (
          <>
            {/* Featured Background: Video on Desktop, Static Image on Mobile */}
            <div className="absolute inset-0 z-0">
              {/* Static Image for Mobile (Netflix Style) */}
              {/* Subtle Tech Background for Mobile */}
              <div className="block sm:hidden absolute inset-0 w-full h-full">
                <TechHeroMobile />
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
                      controlsList="nodownload"
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
                  
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#eeeeee] via-transparent to-transparent z-10" />
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
                    <span className="text-[#333333] font-black border-b-2 border-[#333333]">Video destacado</span>
                  </div>

                  <div className="space-y-6 mt-6">
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
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </>
        )}
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
              videoSrc: p.videoUrl,
              imageSrc: p.mediaUrl,
              sections: p.sections,
              description: p.description
            })) : undefined}
            onProjectClick={(p: any) => setActiveProject({
             title: p.title,
             videoSrc: p.videoSrc,
             imageSrc: p.imageSrc,
             sections: p.sections,
             description: p.description || ""
           })} />
        </motion.div>
       </section>

      <VideoModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={activeProject?.title || ""}
        videoSrc={activeProject?.videoSrc || ""}
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
              onGalleryClick={() => {}}
              images={sec.projects?.filter((p: any) => p.mediaUrl || p.videoUrl).map((p: any) => ({
                id: p._id,
                src: p.mediaUrl || p.videoUrl,
                title: p.title,
                sections: p.sections,
              })) || []} 
            />
          </motion.div>
        </section>
      ))}

      {/* Footer / Logo a pie de página */}
      <footer className="py-20 bg-[#f8f9fc] border-t border-gray-100 flex flex-col items-center justify-center">
        <Image
          src="/logo.png"
          alt="Romina Castañeda Footer Logo"
          width={180}
          height={60}
          className="h-12 sm:h-14 w-auto object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        />
        <p className="mt-8 text-sm text-gray-400 font-medium tracking-widest">
          © {new Date().getFullYear()} Romina Castañeda
        </p>
      </footer>

    </main>
  );
}
