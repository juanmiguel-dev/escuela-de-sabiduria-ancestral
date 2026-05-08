"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { getFormacionBySlug } from "@/sanity/lib/queries";

export default function FormacionPlayer({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [formacion, setFormacion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem("alumno_email");
    if (!userEmail) {
      router.push("/portal");
      return;
    }

    async function loadData() {
      try {
        const data = await getFormacionBySlug(slug);
        setFormacion(data);
        if (data?.videos && data.videos.length > 0) {
          setSelectedVideo(data.videos[0]);
        }
      } catch (error) {
        console.error("Error loading formation data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!formacion) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Formación no encontrada</h1>
        <NextLink href="/portal/dashboard" className="text-[#d4af37] hover:underline">Volver al Dashboard</NextLink>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#0f0f0f] flex text-white overflow-hidden">
        
        {/* Sidebar de Módulos / Videos */}
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <m.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 380, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-[#1a1a1a] border-r border-white/5 flex flex-col h-screen flex-shrink-0"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <NextLink href="/portal/dashboard" className="text-xs font-black uppercase tracking-[0.2em] text-white/40 hover:text-white flex items-center gap-2 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
                  Dashboard
                </NextLink>
                <button onClick={() => setIsSidebarOpen(false)} className="text-white/20 hover:text-white">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-title text-[#d4af37] leading-tight mb-2">{formacion.title}</h2>
                <p className="text-xs font-bold text-white/30 uppercase tracking-widest">Contenido del Curso</p>
              </div>

              <nav className="flex-grow overflow-y-auto px-4 pb-8 space-y-2">
                {formacion.videos?.map((video: any, idx: number) => (
                  <button
                    key={video._id}
                    onClick={() => setSelectedVideo(video)}
                    className={`w-full text-left p-5 rounded-2xl transition-all flex gap-4 items-start ${selectedVideo?._id === video._id ? 'bg-[#5b2c1d] text-white shadow-lg' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
                  >
                    <span className={`text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${selectedVideo?._id === video._id ? 'bg-white/20' : 'bg-white/5'}`}>
                      {idx + 1}
                    </span>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold leading-tight mb-1">{video.title}</h4>
                      <p className="text-[10px] opacity-50 uppercase tracking-tighter">Módulo de aprendizaje</p>
                    </div>
                    {selectedVideo?._id === video._id && (
                      <div className="w-2 h-2 rounded-full bg-[#d4af37] mt-1.5 animate-pulse"></div>
                    )}
                  </button>
                ))}

                {(!formacion.videos || formacion.videos.length === 0) && (
                  <p className="text-sm text-white/30 italic p-6">Próximamente más contenido liberado.</p>
                )}
              </nav>
            </m.aside>
          )}
        </AnimatePresence>

        {/* Player Main Area */}
        <main className="flex-grow flex flex-col h-screen overflow-y-auto">
          {/* Header Mobile / Compact */}
          {!isSidebarOpen && (
            <div className="p-4 bg-[#1a1a1a] flex items-center gap-4 border-b border-white/5">
               <button onClick={() => setIsSidebarOpen(true)} className="text-[#d4af37] p-2 hover:bg-white/5 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
               </button>
               <h1 className="text-sm font-bold tracking-tight line-clamp-1">{formacion.title}</h1>
            </div>
          )}

          {selectedVideo ? (
            <div className="flex flex-col">
              {/* Video Player */}
              <div className="w-full aspect-video bg-black relative shadow-2xl">
                {selectedVideo.videoUrl ? (
                  <video 
                    src={selectedVideo.videoUrl} 
                    controls 
                    className="w-full h-full object-contain"
                    poster={selectedVideo.mediaUrl}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white/50">Video en proceso de carga</h3>
                    <p className="text-sm text-white/30 max-w-sm mt-2">Estamos preparando este contenido para ti. Vuelve a intentarlo en unos momentos.</p>
                  </div>
                )}
              </div>

              {/* Info Area */}
              <div className="p-8 sm:p-12 lg:p-16 max-w-4xl">
                <m.div
                  key={selectedVideo._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{selectedVideo.title}</h1>
                    <div className="flex items-center gap-2">
                       <span className="bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Liberado</span>
                    </div>
                  </div>
                  
                  <div className="w-16 h-1 bg-[#d4af37] rounded-full opacity-50" />

                  <div className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed">
                    <p>{selectedVideo.description || "Sin descripción disponible para este módulo."}</p>
                  </div>

                  <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
                      <h5 className="text-xs font-black uppercase tracking-[0.2em] text-[#d4af37] mb-4">Recursos Extra</h5>
                      <p className="text-sm text-white/40 italic">No hay archivos adjuntos para este módulo.</p>
                    </div>
                    <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
                      <h5 className="text-xs font-black uppercase tracking-[0.2em] text-[#d4af37] mb-4">Apuntes</h5>
                      <p className="text-sm text-white/40 italic">Función de notas próximamente disponible.</p>
                    </div>
                  </div>
                </m.div>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center p-12 text-center">
              <div className="max-w-md">
                <h3 className="text-2xl font-bold mb-4 text-white/50">Selecciona un video para comenzar</h3>
                <p className="text-gray-500">Explora el contenido de la formación en el panel lateral.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </LazyMotion>
  );
}
