"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  videoSrc: string;
  onClick?: () => void;
}

export function ProjectCard({ title, videoSrc, onClick }: ProjectCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className="relative flex-none w-[300px] sm:w-[380px] rounded-[2rem] overflow-hidden cursor-pointer group origin-center transition-all bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10"
      initial={{ y: 0, scale: 1 }}
      whileHover={{
        y: -12,
        scale: 1.05,
        zIndex: 50,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 85, 255, 0.2)"
      }}
      transition={{
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] 
      }}
    >
      {/* Contenedor principal del video con aspect ratio panorámico */}
      <div className="relative w-full aspect-video bg-black/40 overflow-hidden rounded-t-[2rem]">
        <video
          src={videoSrc}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
          }}
        />

        {/* Overlay degradado estilo Netflix */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-20">
          <div className="bg-white/10 p-4 rounded-full text-white backdrop-blur-md border border-white/20 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      </div>

      {/* Sección inferior con título */}
      <div className="p-6 flex flex-col items-center justify-center min-h-[6.5rem] bg-[#1a1a1a] relative border-t border-white/5">
        <h3 className="text-gray-100 text-lg sm:text-xl font-bold tracking-tight text-center w-full break-words group-hover:text-[#0055ff] transition-colors duration-300">
          {title}
        </h3>

        {/* Línea decorativa */}
        <div className="w-8 h-[2px] bg-[#0055ff]/40 rounded-full group-hover:w-16 group-hover:bg-[#0055ff] transition-all duration-500 mt-3" />
      </div>

    </motion.div>
  );
}
