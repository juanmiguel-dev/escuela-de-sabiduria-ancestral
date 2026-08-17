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
    <div className="w-full h-full flex items-center justify-center p-3 sm:p-6 lg:p-8">
      <div
        ref={wrapperRef}
        className="w-full aspect-video bg-black relative rounded-2xl sm:rounded-3xl overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 ring-1 ring-white/5 transition-all duration-300"
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
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/30 hover:scale-105 transition-transform">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
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
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/20 transition-transform">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Controls bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/95 via-black/60 to-transparent px-5 sm:px-8 pb-5 sm:pb-6 pt-16 transition-all duration-300 ${showOverlay ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
        >
          {/* Progress bar */}
          <div
            className="h-1.5 bg-white/20 hover:h-2 rounded-full cursor-pointer mb-4 group/progress transition-all relative"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#e8cb69] rounded-full relative transition-all duration-200"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <button onClick={togglePlay} className="text-white hover:text-[#d4af37] transition-colors cursor-pointer focus:outline-none">
                {playing ? (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <div className="flex items-center gap-2 sm:gap-3 group/vol">
                <button onClick={toggleMute} className="text-white/70 hover:text-[#d4af37] transition-colors cursor-pointer focus:outline-none">
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
                  className="w-14 sm:w-20 h-1 accent-[#d4af37] cursor-pointer bg-white/20 rounded-lg"
                />
              </div>

              <span className="text-white/60 text-xs font-mono font-medium tracking-tight">
                {formatTime(playerRef.current?.getCurrentTime?.() || 0)} / {formatTime(playerRef.current?.getDuration?.() || 0)}
              </span>
            </div>

            <button onClick={toggleFullscreen} className="text-white/70 hover:text-[#d4af37] transition-colors cursor-pointer focus:outline-none">
              {isFullscreen ? (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  const [userNotes, setUserNotes] = useState<string>("");
  const [notesSaved, setNotesSaved] = useState(false);

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
          setSelectedVideo({ videoUrl: data.videoUrl, title: data.title });
        }
      } catch (error) {
        console.error("Error loading formation data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug, router]);

  // Load user notes from localStorage per course
  useEffect(() => {
    if (slug) {
      const savedNotes = localStorage.getItem(`notes_${slug}`);
      if (savedNotes) {
        setUserNotes(savedNotes);
      }
    }
  }, [slug]);

  const handleNotesChange = (text: string) => {
    setUserNotes(text);
    if (slug) {
      localStorage.setItem(`notes_${slug}`, text);
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 2000);
    }
  };

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
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs uppercase tracking-widest text-white/50 font-medium">Cargando experiencia...</span>
        </div>
      </div>
    );
  }

  if (!formacion) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center text-white px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight mb-2">Contenido no encontrado</h1>
        <p className="text-white/50 text-sm max-w-sm mb-8">El curso o formación solicitado no está disponible o no tienes acceso asignado.</p>
        <NextLink
          href="/portal/dashboard"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b89528] text-black font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-full shadow-lg hover:brightness-110 transition-all"
        >
          &larr; Volver al Dashboard
        </NextLink>
      </div>
    );
  }

  const currentRecursos = formacion?.modulos && formacion.modulos.length > 0 
    ? formacion.modulos[activeTab]?.recursos 
    : formacion?.recursos;

  const hasMultipleModules = formacion?.modulos && formacion.modulos.length > 1;
  const currentModuleVideos = formacion?.modulos && formacion.modulos[activeTab]?.videos;

  return (
    <LazyMotion features={domAnimation}>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 font-sans ${dark ? 'bg-[#0a0a0c] text-white' : 'bg-[#f7f6f2] text-[#1c1c1e]'}`}>
        
        {/* Top Header - Apple style frosted glass */}
        <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 ${dark ? 'bg-[#0a0a0c]/80 border-white/[0.08]' : 'bg-white/80 border-black/[0.06]'}`}>
          <div className="flex items-center gap-4 min-w-0">
            <NextLink 
              href="/portal/dashboard" 
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all cursor-pointer border ${dark ? 'bg-white/[0.05] hover:bg-white/[0.1] text-white/80 border-white/[0.08]' : 'bg-black/[0.04] hover:bg-black/[0.08] text-gray-700 border-black/[0.05]'}`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Dashboard</span>
            </NextLink>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div className="min-w-0 flex items-center gap-2.5">
              <h1 className="text-sm sm:text-base font-semibold tracking-tight truncate">
                {formacion.title}
              </h1>
              {formacion.modulos && formacion.modulos.length > 0 && (
                <span className={`hidden md:inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${dark ? 'bg-white/[0.04] text-white/50 border-white/[0.06]' : 'bg-black/[0.03] text-gray-500 border-black/[0.05]'}`}>
                  Módulo {activeTab + 1} de {formacion.modulos.length}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setDark(!dark)}
              title={dark ? "Modo Claro" : "Modo Oscuro"}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border ${dark ? 'bg-white/[0.05] border-white/[0.08] text-[#d4af37] hover:bg-white/[0.1]' : 'bg-black/[0.04] border-black/[0.06] text-[#5b2c1d] hover:bg-black/[0.08]'}`}
            >
              {dark ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"/>
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Main Workspace Layout */}
        <main className="flex-grow flex flex-col lg:flex-row overflow-hidden">
          {selectedVideo ? (
            <>
              {/* Left Column: Cinematic Video Stage */}
              <div className="flex-1 flex flex-col justify-start bg-black lg:min-h-[calc(100vh-61px)] relative">
                {selectedVideo.videoUrl ? (
                  <CustomVideoPlayer videoUrl={selectedVideo.videoUrl} poster={formacion?.imageUrl} />
                ) : (
                  <div className="w-full aspect-video flex flex-col items-center justify-center p-12 text-center my-auto">
                    <div className="w-16 h-16 bg-white/[0.05] rounded-2xl border border-white/10 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-white/70 mb-1">Video en preparación</h3>
                    <p className="text-xs text-white/40 max-w-xs">El contenido de esta clase estará disponible próximamente.</p>
                  </div>
                )}

                {/* Video Info Strip beneath player on desktop */}
                <div className={`hidden lg:block px-8 py-6 border-t ${dark ? 'bg-[#0d0d10] border-white/[0.06]' : 'bg-[#f0eee6] border-black/[0.06]'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                      {formacion.modulos && formacion.modulos.length > 0 ? `Módulo ${activeTab + 1}` : 'Contenido'}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className={`text-xs ${dark ? 'text-white/50' : 'text-gray-500'}`}>
                      {formacion.title}
                    </span>
                  </div>
                  <h2 className={`text-xl sm:text-2xl font-semibold tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedVideo?.title || formacion?.title}
                  </h2>
                </div>
              </div>

              {/* Right Column: Apple-style Curated Sidebar */}
              <div className={`w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 flex flex-col border-t lg:border-t-0 lg:border-l overflow-y-auto max-h-none lg:max-h-[calc(100vh-61px)] ${dark ? 'bg-[#0f0f13] border-white/[0.08]' : 'bg-[#faf9f5] border-black/[0.06]'}`}>
                <div className="p-5 sm:p-7 space-y-6">

                  {/* Module Tabs (Apple Segmented Style) */}
                  {hasMultipleModules && (
                    <div className="space-y-2.5">
                      <span className={`text-[11px] font-semibold tracking-wider uppercase ${dark ? 'text-white/40' : 'text-gray-400'}`}>
                        Módulos
                      </span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {formacion.modulos.map((modulo: any, index: number) => {
                          const isActive = activeTab === index;
                          const videoCount = modulo.videos?.length || 0;
                          return (
                            <button
                              key={index}
                              onClick={() => setActiveTab(index)}
                              className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer border ${
                                isActive 
                                  ? dark 
                                    ? 'bg-[#d4af37]/15 text-[#f5d77f] border-[#d4af37]/40 shadow-sm' 
                                    : 'bg-[#5b2c1d] text-white border-[#5b2c1d] shadow-sm'
                                  : dark 
                                    ? 'bg-white/[0.03] text-white/70 border-white/[0.05] hover:bg-white/[0.06] hover:text-white' 
                                    : 'bg-white text-gray-700 border-black/[0.06] hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                                  isActive
                                    ? dark ? 'bg-[#d4af37] text-black' : 'bg-white text-[#5b2c1d]'
                                    : dark ? 'bg-white/10 text-white/60' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {index + 1}
                                </span>
                                <span className="font-semibold text-xs sm:text-sm tracking-tight truncate">
                                  {modulo.titulo}
                                </span>
                              </div>
                              {videoCount > 0 && (
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                                  isActive
                                    ? dark ? 'bg-[#d4af37]/20 text-[#f5d77f]' : 'bg-white/20 text-white'
                                    : dark ? 'bg-white/[0.05] text-white/40' : 'bg-gray-100 text-gray-500'
                                }`}>
                                  {videoCount} {videoCount === 1 ? 'clase' : 'clases'}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Video Playlist within Module */}
                  {currentModuleVideos && currentModuleVideos.length > 1 && (
                    <div className="space-y-2.5">
                      <span className={`text-[11px] font-semibold tracking-wider uppercase ${dark ? 'text-white/40' : 'text-gray-400'}`}>
                        Clases del Módulo
                      </span>
                      <div className="space-y-1.5">
                        {currentModuleVideos.map((video: any, index: number) => {
                          const isCurrent = activeVideo === index;
                          return (
                            <button
                              key={index}
                              onClick={() => setActiveVideo(index)}
                              className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex items-center gap-3 cursor-pointer border ${
                                isCurrent
                                  ? dark 
                                    ? 'bg-white/[0.08] text-white border-white/20 shadow-sm' 
                                    : 'bg-white text-[#5b2c1d] border-[#5b2c1d]/30 shadow-sm'
                                  : dark 
                                    ? 'bg-transparent text-white/60 border-transparent hover:bg-white/[0.04] hover:text-white/90' 
                                    : 'bg-transparent text-gray-600 border-transparent hover:bg-black/[0.03]'
                              }`}
                            >
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                                isCurrent
                                  ? 'bg-[#d4af37] text-black scale-105'
                                  : dark ? 'bg-white/[0.06] text-white/40' : 'bg-gray-200 text-gray-500'
                              }`}>
                                <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                              <span className="text-xs sm:text-sm font-medium tracking-tight leading-snug line-clamp-2">
                                {video.titulo}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Title & Description on Mobile */}
                  <div className="block lg:hidden space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                      {formacion.modulos && formacion.modulos.length > 0 ? `Módulo ${activeTab + 1}` : 'Contenido'}
                    </span>
                    <h2 className={`text-lg sm:text-xl font-semibold tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedVideo?.title || formacion?.title}
                    </h2>
                  </div>

                  {/* Extra Resources Card - Apple Material Design */}
                  <div className={`p-5 rounded-3xl border transition-all ${dark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white border-black/[0.06] shadow-sm'}`}>
                    <div className="flex items-center gap-2 mb-3.5">
                      <div className="w-6 h-6 rounded-lg bg-[#d4af37]/15 flex items-center justify-center text-[#d4af37]">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                        </svg>
                      </div>
                      <h4 className={`text-xs font-semibold tracking-wide uppercase ${dark ? 'text-white/80' : 'text-gray-800'}`}>
                        Material y Descargas
                      </h4>
                    </div>

                    {currentRecursos && currentRecursos.length > 0 ? (
                      <div className="space-y-2">
                        {currentRecursos.map((recurso: any, index: number) => (
                          <a
                            key={index}
                            href={recurso.archivoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-between gap-3 p-3 rounded-2xl border transition-all group ${
                              dark 
                                ? 'bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.05] text-white/80' 
                                : 'bg-gray-50 hover:bg-gray-100 border-black/[0.04] text-gray-800'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                                PDF
                              </span>
                              <span className="text-xs font-medium truncate group-hover:text-[#d4af37] transition-colors">
                                {recurso.titulo}
                              </span>
                            </div>
                            <svg className="w-4 h-4 text-white/40 group-hover:text-[#d4af37] group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className={`text-xs ${dark ? 'text-white/40' : 'text-gray-400'}`}>
                        No hay archivos adjuntos en este módulo.
                      </p>
                    )}
                  </div>

                  {/* Personal Notes Card (Interactive with LocalStorage Autosave) */}
                  <div className={`p-5 rounded-3xl border transition-all ${dark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white border-black/[0.06] shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#d4af37]/15 flex items-center justify-center text-[#d4af37]">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                        <h4 className={`text-xs font-semibold tracking-wide uppercase ${dark ? 'text-white/80' : 'text-gray-800'}`}>
                          Mis Apuntes Personales
                        </h4>
                      </div>
                      {notesSaved && (
                        <span className="text-[10px] text-emerald-400 font-medium tracking-tight">
                          Guardado ✓
                        </span>
                      )}
                    </div>
                    <textarea
                      value={userNotes}
                      onChange={(e) => handleNotesChange(e.target.value)}
                      placeholder="Escribe aquí tus reflexiones o notas de la clase (se guardan automáticamente en tu dispositivo)..."
                      rows={3}
                      className={`w-full text-xs rounded-2xl p-3.5 border resize-none focus:outline-none focus:ring-1 focus:ring-[#d4af37]/50 transition-all ${
                        dark 
                          ? 'bg-black/30 text-white placeholder-white/25 border-white/[0.08]' 
                          : 'bg-gray-50 text-gray-800 placeholder-gray-400 border-black/[0.06]'
                      }`}
                    />
                  </div>

                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-12 text-center">
              <div className="max-w-md">
                <h3 className="text-xl font-semibold mb-2 opacity-60">Contenido en preparación</h3>
                <p className="text-sm opacity-40">No hay clases disponibles en este momento.</p>
              </div>
            </div>
          )}
        </main>

        {/* Extra Content Blocks */}
        {formacion?.modulos && formacion.modulos[activeTab]?.contentBlocks && formacion.modulos[activeTab].contentBlocks.length > 0 && (
          <section className={`w-full py-16 px-6 sm:px-12 space-y-24 border-t ${dark ? 'bg-[#0f0f13] border-white/[0.08]' : 'bg-white border-black/[0.06]'}`}>
            <div className="max-w-6xl mx-auto space-y-24">
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