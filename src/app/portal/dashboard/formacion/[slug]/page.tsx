"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { getFormacionBySlug } from "@/sanity/lib/queries";

function extractVideoId(url: string): string {
    if (!url) return '';
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      return urlParams.get('v') || '';
    } else if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube.com/embed/')) {
      return url.split('embed/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube-nocookie.com/embed/')) {
      return url.split('embed/')[1]?.split('?')[0] || '';
    }
    return '';
  }

  function getYouTubeThumbnail(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  function CustomVideoPlayer({ videoUrl, poster }: { videoUrl: string; poster?: string }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoId = extractVideoId(videoUrl);
    const thumbnailUrl = poster || (videoId ? getYouTubeThumbnail(videoId) : '');

    if (!isPlaying) {
      return (
        <div 
          className="w-full aspect-video bg-black relative cursor-pointer group"
          onClick={() => setIsPlaying(true)}
        >
          {thumbnailUrl && (
            <Image
              src={thumbnailUrl}
              alt="Video thumbnail"
              fill
              className="object-cover"
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full aspect-video bg-black relative">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
          title="Video Player"
          className="w-full h-full"
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  export default function FormacionPlayer({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const router = useRouter();
    const [formacion, setFormacion] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<any>(null);

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
        if (data?.videoUrl) {
          setSelectedVideo({ videoUrl: data.videoUrl, title: 'Contenido Liberado' });
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

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    
    let videoId = '';
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get('v') || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube-nocookie.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0] || '';
    }
    
    if (!videoId) return url;
    
    const params = new URLSearchParams({
      modestbranding: '1',
      rel: '0',
      showinfo: '0',
      iv_load_policy: '3',
      disablekb: '1',
      fs: '1',
      playsinline: '1',
      cc_load_policy: '0',
      controls: '0',
      enablejsapi: '0',
      brand: '0',
      hide_share: '1',
      hide_annotations: '1',
      xtags: '',
    });
    
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col text-white">
        
        {/* Header */}
        <header className="p-6 bg-[#1a1a1a] flex items-center gap-4 border-b border-white/5">
          <NextLink href="/portal/dashboard" className="text-[#d4af37] hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </NextLink>
          <h1 className="text-lg font-bold tracking-tight">{formacion.title}</h1>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col overflow-y-auto">
          {selectedVideo ? (
            <div className="flex flex-col">
              {/* Video Player */}
              <div className="w-full aspect-video bg-black relative shadow-2xl">
                {selectedVideo.videoUrl ? (
                  <CustomVideoPlayer videoUrl={selectedVideo.videoUrl} poster={formacion?.imageUrl} />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white/50">Video no disponible</h3>
                  </div>
                )}
              </div>

              {/* Info Area */}
              <div className="p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto w-full">
                <m.div
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
                    <p>Contenido exclusivo de la formación.</p>
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
                <h3 className="text-2xl font-bold mb-4 text-white/50">Contenido no disponible</h3>
                <p className="text-gray-500">No hay contenido liberado para esta formación en este momento.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </LazyMotion>
  );
}
