"use client";

import { useEffect, useState, use, useRef } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { getFormacionBySlug } from "@/sanity/lib/queries";

import { IntroBlockRenderer } from "@/components/FormacionBlocks/IntroBlockRenderer";
import { CuerpoPorQueBlockRenderer } from "@/components/FormacionBlocks/CuerpoPorQueBlockRenderer";
import { CuerpoDirigidoABlockRenderer } from "@/components/FormacionBlocks/CuerpoDirigidoABlockRenderer";
import { DetailedDescriptionBlockRenderer } from "@/components/FormacionBlocks/DetailedDescriptionBlockRenderer";
import { IntroduccionAperturaBlockRenderer } from "@/components/FormacionBlocks/IntroduccionAperturaBlockRenderer";
import { TestimoniosBlockRenderer } from "@/components/FormacionBlocks/TestimoniosBlockRenderer";
import { ImageGalleryBlockRenderer } from "@/components/FormacionBlocks/ImageGalleryBlockRenderer";
import { FaqBlockRenderer } from "@/components/FormacionBlocks/FaqBlockRenderer";
import { CronogramaBlockRenderer } from "@/components/FormacionBlocks/CronogramaBlockRenderer";

const blockRenderers: { [key: string]: React.ComponentType<any> } = {
  introBlock: IntroBlockRenderer,
  cuerpoPorQueBlock: CuerpoPorQueBlockRenderer,
  cuerpoDirigidoABlock: CuerpoDirigidoABlockRenderer,
  detailedDescriptionBlock: DetailedDescriptionBlockRenderer,
  introduccionAperturaBlock: IntroduccionAperturaBlockRenderer,
  testimoniosBlock: TestimoniosBlockRenderer,
  imageGalleryBlock: ImageGalleryBlockRenderer,
  faqBlock: FaqBlockRenderer,
  cronogramaBlock: CronogramaBlockRenderer,
};

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
  const playerRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerId = useRef(`yt-player-${Math.random().toString(36).slice(2)}`).current;
  const videoId = extractVideoId(videoUrl);
  const thumbnailUrl = poster || (videoId ? getYouTubeThumbnail(videoId) : '');
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!videoId) return;

    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const first = document.getElementsByTagName('script')[0];
      first.parentNode?.insertBefore(tag, first);
    }

    const init = () => {
      if (!(window as any).YT?.Player) { setTimeout(init, 200); return; }
      if (playerRef.current) { try { playerRef.current.destroy(); } catch (e) {} }

      playerRef.current = new (window as any).YT.Player(playerId, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          disablekb: 1,
          origin: typeof window !== 'undefined' ? window.location.origin : '',
        },
        events: {
          onReady: (e: any) => { setReady(true); e.target.playVideo(); },
          onStateChange: (e: any) => {
            setPlaying(e.data === (window as any).YT.PlayerState.PLAYING);
            if (e.data === (window as any).YT.PlayerState.PLAYING) setShowOverlay(false);
          },
        },
      });
    };

    (window as any).onYouTubeIframeAPIReady = init;
    init();

    return () => { if (playerRef.current) { try { playerRef.current.destroy(); } catch (e) {} } };
  }, [videoId, playerId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current?.getCurrentTime && playerRef.current?.getDuration) {
        const dur = playerRef.current.getDuration();
        if (dur > 0) setProgress((playerRef.current.getCurrentTime() / dur) * 100);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;
    playing ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const dur = playerRef.current.getDuration();
    playerRef.current.seekTo((x / rect.width) * dur, true);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (muted) { playerRef.current.unMute(); setMuted(false); }
    else { playerRef.current.mute(); setMuted(true); }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    setVolume(v);
    if (playerRef.current) playerRef.current.setVolume(v);
    if (v > 0 && muted) { playerRef.current.unMute(); setMuted(false); }
  };

  const toggleFullscreen = () => {
    if (!wrapperRef.current) return;
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowOverlay(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowOverlay(false), 3000);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  if (!videoId) return null;

  return (
    <div className="w-full flex justify-center">
      <div
        ref={wrapperRef}
        className="w-full max-w-5xl aspect-video bg-black relative rounded-2xl overflow-hidden group shadow-2xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowOverlay(false)}
      >
        {/* YouTube player - scale-crop to hide UI */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div id={playerId} className="w-[110%] h-[150%] -translate-x-[5%] -translate-y-[15%]" />
        </div>

        {/* Interaction overlay */}
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={togglePlay}
        />

        {/* Thumbnail while loading */}
        {!ready && thumbnailUrl && (
          <div className="absolute inset-0 z-10">
            <Image src={thumbnailUrl} alt="" fill className="object-cover" unoptimized />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}
        {!ready && !thumbnailUrl && (
          <div className="absolute inset-0 z-10 bg-black" />
        )}

        {/* Center play icon when paused */}
        {!playing && ready && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Controls bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 to-transparent px-6 pb-6 pt-16 transition-all duration-500 ${showOverlay ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div
            className="h-1 bg-white/20 rounded-full cursor-pointer mb-4 group/progress"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-[#d4af37] rounded-full relative transition-all duration-200"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button onClick={togglePlay} className="text-white hover:text-[#d4af37] transition-colors cursor-pointer">
                {playing ? (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <div className="flex items-center gap-3 group/vol">
                <button onClick={toggleMute} className="text-white/60 hover:text-[#d4af37] transition-colors cursor-pointer">
                  {muted || volume === 0 ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={muted ? 0 : volume}
                  onChange={handleVolume}
                  onClick={(e) => e.stopPropagation()}
                  className="w-16 h-1 accent-[#d4af37] cursor-pointer"
                />
              </div>

              <span className="text-white/50 text-xs font-mono">
                {formatTime(playerRef.current?.getCurrentTime?.() || 0)} / {formatTime(playerRef.current?.getDuration?.() || 0)}
              </span>
            </div>

            <button onClick={toggleFullscreen} className="text-white/60 hover:text-[#d4af37] transition-colors cursor-pointer">
              {isFullscreen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FormacionPlayer({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [formacion, setFormacion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeVideo, setActiveVideo] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("dashboard_theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dashboard_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dashboard_theme", "light");
    }
  }, [dark]);

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
        if (data?.modulos && data.modulos.length > 0) {
          const firstModule = data.modulos[0];
          if (firstModule.videos && firstModule.videos.length > 0) {
            setSelectedVideo({ 
              videoUrl: firstModule.videos[0].videoUrl, 
              title: firstModule.videos[0].titulo 
            });
          }
        } else if (data?.videoUrl) {
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

  // Reset active video when tab changes
  useEffect(() => {
    setActiveVideo(0);
  }, [activeTab]);

  useEffect(() => {
    if (formacion?.modulos && formacion.modulos.length > 0) {
      const activeModule = formacion.modulos[activeTab];
      if (activeModule?.videos && activeModule.videos.length > activeVideo) {
        setSelectedVideo({
          videoUrl: activeModule.videos[activeVideo].videoUrl,
          title: activeModule.videos[activeVideo].titulo
        });
      }
    }
  }, [activeTab, activeVideo, formacion]);

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
      <div className={`min-h-screen flex flex-col ${dark ? 'bg-[#0f0f0f] text-white' : 'bg-[#fdfbf7] text-[#333333]'}`}>
        
        <header className={`p-6 flex items-center gap-4 border-b ${dark ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-gray-100'}`}>
          <NextLink href="/portal/dashboard" className="text-[#d4af37] hover:text-white transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </NextLink>
          <h1 className="text-lg font-bold tracking-tight flex-1">{formacion.title}</h1>
          <button
            onClick={() => setDark(!dark)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 cursor-pointer ${dark ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'bg-[#5b2c1d]/10 text-[#5b2c1d]'}`}
          >
            {dark ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"/>
              </svg>
            )}
          </button>
        </header>

        <main className="flex-grow flex flex-col lg:flex-row-reverse overflow-hidden">
          {selectedVideo ? (
            <>
              {/* Video Player - left/top */}
              <div className="flex-shrink-0 w-full lg:w-[65%] bg-black relative">
                {selectedVideo.videoUrl ? (
                  <CustomVideoPlayer videoUrl={selectedVideo.videoUrl} poster={formacion?.imageUrl} />
                ) : (
                  <div className="w-full aspect-video flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white/50">Video no disponible</h3>
                  </div>
                )}
              </div>

              {/* Sidebar - right/bottom */}
              <div className={`flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-6 ${dark ? 'text-white' : 'text-[#333333]'}`}>
                <m.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {formacion?.modulos && formacion.modulos.length > 0 && (
                    <div className="space-y-3">
                      {/* Tabs de Módulos */}
                      <div className="flex flex-col gap-2">
                        {formacion.modulos.map((modulo: any, index: number) => (
                          <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border cursor-pointer ${
                              activeTab === index 
                                ? 'bg-[#d4af37] text-white border-[#d4af37]' 
                                : dark 
                                  ? 'bg-transparent text-white/50 border-white/10 hover:border-white/30' 
                                  : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            {modulo.titulo}
                          </button>
                        ))}
                      </div>

                      {/* Sub-Tabs de Videos (Solo si hay más de 1 video en el módulo activo) */}
                      {formacion.modulos[activeTab]?.videos && formacion.modulos[activeTab].videos.length > 1 && (
                        <div className="flex flex-col gap-2 mt-4">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] mb-1 px-1">Clases del Módulo</h5>
                          {formacion.modulos[activeTab].videos.map((video: any, index: number) => (
                            <button
                              key={index}
                              onClick={() => setActiveVideo(index)}
                              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 cursor-pointer border ${
                                activeVideo === index 
                                  ? dark ? 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30' : 'bg-[#5b2c1d]/5 text-[#5b2c1d] border-[#5b2c1d]/20'
                                  : dark 
                                    ? 'bg-transparent text-white/50 border-transparent hover:bg-white/5' 
                                    : 'bg-transparent text-gray-500 border-transparent hover:bg-gray-50'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                activeVideo === index 
                                  ? dark ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'bg-[#5b2c1d]/10 text-[#5b2c1d]'
                                  : dark ? 'bg-white/5 text-white/40' : 'bg-gray-100 text-gray-400'
                              }`}>
                                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                              <span className="leading-tight">{video.titulo}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{selectedVideo?.title || 'Contenido Liberado'}</h1>
                    <span className="self-start bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Liberado</span>
                  </div>
                  
                  <div className="w-12 h-[2px] bg-[#d4af37]/50 rounded-full" />

                  <p className={`text-sm leading-relaxed ${dark ? 'text-white/60' : 'text-gray-500'}`}>Contenido exclusivo de la formación.</p>

                  {/* Recursos */}
                  <div className={`p-6 rounded-2xl border ${dark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <h5 className="text-xs font-black uppercase tracking-[0.2em] text-[#d4af37] mb-4">Recursos Extra</h5>
                    {(() => {
                      const currentRecursos = formacion?.modulos && formacion.modulos.length > 0 
                        ? formacion.modulos[activeTab]?.recursos 
                        : formacion?.recursos;
                        
                      return currentRecursos && currentRecursos.length > 0 ? (
                        <div className="space-y-3">
                          {currentRecursos.map((recurso: any, index: number) => (
                            <a
                              key={index}
                              href={recurso.archivoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-3 transition-colors group ${dark ? 'text-white/70 hover:text-[#d4af37]' : 'text-gray-600 hover:text-[#5b2c1d]'}`}
                            >
                              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                              </svg>
                              <span className="text-sm group-hover:underline">{recurso.titulo}</span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <p className={`text-sm italic ${dark ? 'text-white/40' : 'text-gray-400'}`}>No hay archivos adjuntos para este módulo.</p>
                      );
                    })()}
                  </div>

                  {/* Apuntes */}
                  <div className={`p-6 rounded-2xl border ${dark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <h5 className="text-xs font-black uppercase tracking-[0.2em] text-[#d4af37] mb-4">Apuntes</h5>
                    <p className={`text-sm italic ${dark ? 'text-white/40' : 'text-gray-400'}`}>Función de notas próximamente disponible.</p>
                  </div>
                </m.div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-12 text-center">
              <div className="max-w-md">
                <h3 className="text-2xl font-bold mb-4 text-white/50">Contenido no disponible</h3>
                <p className="text-gray-500">No hay contenido liberado para esta formación en este momento.</p>
              </div>
            </div>
          )}
        </main>

        {/* Extra Content Blocks */}
        {formacion?.modulos && formacion.modulos[activeTab]?.contentBlocks && formacion.modulos[activeTab].contentBlocks.length > 0 && (
          <section className="w-full py-16 px-6 sm:px-12 space-y-24 bg-white dark:bg-[#111111]">
            <div className="max-w-7xl mx-auto space-y-24">
              {formacion.modulos[activeTab].contentBlocks.map((block: any) => {
                const BlockComponent = blockRenderers[block._type];
                if (!BlockComponent) return null;
                return (
                  <div key={block._key} className="w-full">
                    <BlockComponent {...block} dark={dark} />
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </LazyMotion>
  );
}