"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  videoSrc: string;
  year?: string;
  tags?: string;
  match?: string;
  onClick?: () => void;
}

export function ProjectCard({ title, videoSrc, year, tags, match = "98% de coincidencia", onClick }: ProjectCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className="relative flex-none w-[280px] sm:w-[320px] rounded-xl overflow-hidden cursor-pointer group origin-center transition-all bg-[#1a1a1a] shadow-xl"
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.15,
        zIndex: 100,
        y: -50,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Contenedor del video */}
      <div className="relative w-full aspect-video overflow-hidden">
        <video
          src={videoSrc}
          className="w-full h-full object-cover"
          preload="metadata"
          muted
          loop
          playsInline
          onMouseEnter={(e) => {
            const video = e.target as HTMLVideoElement;
            video.play().catch(() => { });
          }}
          onMouseLeave={(e) => {
            const video = e.target as HTMLVideoElement;
            video.pause();
            video.currentTime = 0;
          }}
        />
        {/* Overlay con Título (Estilo Logo) */}
        <div className="absolute bottom-4 left-4 right-4 z-20 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-white text-xl font-black tracking-tighter leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase italic">
            {title}
          </h3>
        </div>
      </div>

      {/* Info Expandida (Solo visible en hover) */}
      <div className="absolute top-full left-0 w-full bg-[#1a1a1a] p-4 space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-2xl rounded-b-xl border-t border-white/10">
        {/* Botones de acción rápidos */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center text-white hover:border-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center text-white hover:border-white transition-colors ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-9"/></svg>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold">
          <span className="text-green-500">{match}</span>
          <span className="text-gray-400">{year}</span>
          <span className="px-1.5 py-0.5 border border-gray-500 text-gray-300 rounded-[2px] text-[8px]">4K</span>
          <span className="text-gray-400">Trayectoria</span>
        </div>

        {/* Título y Tags */}
        <div className="space-y-1">
          <h4 className="text-white text-sm font-bold">{title}</h4>
          <p className="text-gray-400 text-[10px] leading-tight">
            {tags}
          </p>
        </div>
      </div>

      {/* Barra inferior estática (Estilo Netflix Coming Soon) */}
      <div className="p-3 bg-[#1a1a1a] flex items-center justify-between border-t border-white/5 group-hover:hidden transition-all">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ff9900]" />
          <span className="text-white text-[10px] font-bold tracking-wider uppercase">Destacado</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span className="text-[9px] font-medium">{year}</span>
        </div>
      </div>

    </motion.div>
  );
}
