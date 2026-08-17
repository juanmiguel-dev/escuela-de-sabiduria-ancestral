"use client";

import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import NextLink from "next/link";
import { ImageCarousel } from "@/components/ImageCarousel";
import { VideoModal } from "@/components/VideoModal";
import { GalleryModal } from "@/components/GalleryModal";
import { getCursos } from "@/sanity/lib/queries";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HtmlCourseViewer } from "@/components/HtmlCourseViewer";

export default function CursosPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<{ title: string; images: { id: string | number; src: string; }[] } | null>(null);
  const [sanityCursos, setSanityCursos] = useState<any[]>([]);
  const [activeVideo, setActiveVideo] = useState<{ title: string; videoSrc?: string; imageSrc?: string; description?: string } | null>(null);

  useEffect(() => {
    async function loadCursos() {
      try {
        const cursosData = await getCursos();
        if (cursosData && cursosData.length > 0) {
          setSanityCursos(cursosData);
          // Si el primer curso tiene proyectos/videos, se setea el primero como activo
          const firstWithProject = cursosData.find((c: any) => c.projects && c.projects.length > 0);
          if (firstWithProject) {
            const p = firstWithProject.projects[0];
            setActiveVideo({
              title: p.title,
              videoSrc: p.videoUrl,
              imageSrc: p.mediaUrl,
              description: p.description || "",
            });
          }
        }
      } catch (error) {
        console.error("Error cargando cursos de Sanity:", error);
      }
    }
    loadCursos();
  }, []);

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen bg-[#fdfbf7] selection:bg-[#5b2c1d] selection:text-white pb-24 overflow-x-hidden font-sans relative text-gray-900">
      {/* Header Unificado */}
      <Navbar theme="dark" position="absolute" />

      {/* Hero Header para Cursos */}
      <section className="relative h-[45vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/inicio.JPG"
          alt="Fondo Cursos"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-transparent to-black/40 z-10" />

        <div className="relative z-20 text-center mt-12 px-6">
          <span className="block text-xs sm:text-sm text-[#d4af37] font-bold tracking-[0.3em] uppercase mb-4 drop-shadow-md">
            Sabiduría y Experiencia
          </span>
          <h1 className="text-4xl sm:text-6xl text-white drop-shadow-lg font-title tracking-wide">
            Nuestros Cursos
          </h1>
        </div>
      </section>

      {/* Modales */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={activeVideo?.title || ""}
        videoSrc={activeVideo?.videoSrc || ""}
      />

      <GalleryModal
        isOpen={!!selectedGallery}
        onClose={() => setSelectedGallery(null)}
        title={selectedGallery?.title || ""}
        images={selectedGallery?.images || []}
      />

      {/* Renderizado Dinámico de Cursos de Sanity */}
      <section className="relative z-30 max-w-7xl mx-auto px-6 sm:px-12 pt-12">
        {sanityCursos.length > 0 ? (
          sanityCursos.map((curso) => (
            <section key={curso._id} className="pb-16 relative w-full overflow-hidden">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-medium text-[#5b2c1d] tracking-tight leading-none">
                      {curso.title} <span className="text-[#d4af37]">{curso.highlightText}</span>
                    </h2>
                    <div className="w-20 h-1 bg-[#d4af37] mt-3 rounded-full" />
                  </div>
                  {(curso.customLandingUrl || curso.slug === 'divina-matriz') && (
                    <NextLink
                      href={curso.customLandingUrl || '/divina-matriz'}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#5b2c1d] hover:text-[#d4af37] transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 hover:shadow-md self-start sm:self-auto"
                    >
                      Ver Presentación Completa &rarr;
                    </NextLink>
                  )}
                </div>

                {curso.htmlContent && (
                  <HtmlCourseViewer html={curso.htmlContent} title={curso.title} />
                )}

                {curso.projects && curso.projects.length > 0 && (
                  <ImageCarousel
                    onGalleryClick={() => {}}
                    images={curso.projects
                      .filter((p: any) => p.mediaUrl || p.videoUrl)
                      .map((p: any) => ({
                        id: p._id,
                        src: p.mediaUrl || p.videoUrl,
                        title: p.title,
                        description: p.description,
                      }))}
                  />
                )}
              </motion.div>
            </section>
          ))
        ) : (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center my-12">
            <p className="text-gray-500 text-lg">Próximamente estaremos añadiendo nuevos cursos.</p>
          </div>
        )}
      </section>

      {/* Footer Unificado */}
      <Footer />
    </main>
  );
}
