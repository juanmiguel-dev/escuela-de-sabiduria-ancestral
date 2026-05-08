"use client";

import { useEffect, useState, use, useRef } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { m, LazyMotion, domAnimation } from "framer-motion";
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

interface YouTubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setVolume(volume: number): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
}

function YouTubeAPIVideoPlayer({ videoUrl, poster }: { videoUrl: string; poster?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoId = extractVideoId(videoUrl);
  const thumbnailUrl = poster || (videoId ? getYouTubeThumbnail(videoId) : '');
  const [playerReady, setPlayerReady] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!videoId) return;

    const existingScript = document.getElementById('youtube-api-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'youtube-api-script';
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);
    }

    const checkAPI = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        setPlayerReady(true);
      } else {
        setTimeout(checkAPI, 100);
      }
    };
    checkAPI();

    (window as any).onYouTubeIframeAPIReady = () => {
      setPlayerReady(true);
    };

    return () => {
      if (playerRef.current) {
        try { playerRef.current.pauseVideo(); } catch (e) {}
      }
    };
  }, [videoId]);

  useEffect(() => {
    if (!playerReady || !videoId || !containerRef.current || playerRef.current) return;

    const player = new (window as any).YT.Player(containerRef.current, {
      videoId: videoId,
      playerVars: {
        'controls': 0,
        'showinfo': 0,
        'modestbranding': 1,
        'rel': 0,
        'disablekb': 1,
        'iv_load_policy': 3,
        'fs': 0,
        'playsinline': 1,
        'autoplay': 0,
      },
      events: {
        'onReady': (event: any) => {
          playerRef.current = event.target;
          setIsReady(true);
          setDuration(event.target.getDuration());
        },
        'onStateChange': (event: any) => {
          if (event.data === (window as any).YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (event.data === (window as any).YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          } else if (event.data === (window as any).YT.PlayerState.ENDED) {
            setIsPlaying(false);
            setProgress(0);
          }
        },
      },
    });
  }, [playerReady, videoId]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();
          const dur = playerRef.current.getDuration();
          setProgress((currentTime / dur) * 100);
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const seekTime = percentage * duration;
    playerRef.current.seekTo(seekTime, true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.setVolume(volume || 100);
      setIsMuted(false);
    } else {
      playerRef.current.setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  if (!isPlaying && !isReady) {
    return (
      <div 
        className="w-full aspect-video bg-black relative cursor-pointer group"
        onClick={() => {
          if (playerRef.current) {
            playerRef.current.playVideo();
          }
        }}
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
    <div 
      className="w-full aspect-video bg-black relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <div ref={containerRef} className="w-full h-full" />
      
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        <div 
          className="h-1 bg-white/30 rounded-full cursor-pointer mb-3 group"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-[#d4af37] rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={handlePlayPause} className="text-white hover:text-[#d4af37] transition-colors">
              {isPlaying ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-white hover:text-[#d4af37] transition-colors">
                {isMuted || volume === 0 ? (
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
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 accent-[#d4af37]"
              />
            </div>
            
            <span className="text-white text-sm">
              {formatTime(isReady ? (playerRef.current?.getCurrentTime() || 0) : 0)} / {formatTime(duration)}
            </span>
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

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col text-white">
        
        <header className="p-6 bg-[#1a1a1a] flex items-center gap-4 border-b border-white/5">
          <NextLink href="/portal/dashboard" className="text-[#d4af37] hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </NextLink>
          <h1 className="text-lg font-bold tracking-tight">{formacion.title}</h1>
        </header>

        <main className="flex-grow flex flex-col overflow-y-auto">
          {selectedVideo ? (
            <div className="flex flex-col">
              <div className="w-full aspect-video bg-black relative shadow-2xl">
                {selectedVideo.videoUrl ? (
                  <YouTubeAPIVideoPlayer videoUrl={selectedVideo.videoUrl} poster={formacion?.imageUrl} />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white/50">Video no disponible</h3>
                  </div>
                )}
              </div>

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