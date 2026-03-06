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
      className="relative flex-none w-[280px] sm:w-[320px] rounded-xl overflow-hidden cursor-pointer group origin-center transition-all bg-[#1a1a1a] shadow-xl border border-white/5"
      whileHover={{
        borderColor: "rgba(255, 153, 0, 0.5)",
        boxShadow: "0 0 20px rgba(255, 153, 0, 0.2), 0 0 40px rgba(0, 51, 160, 0.1)",
        transition: { duration: 0.3 }
      }}
    >
      {/* Contenedor del video */}
      <div className="relative w-full aspect-video overflow-hidden">
        <video
          src={videoSrc}
          className="w-full h-full object-cover transition-opacity duration-500"
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
        
        {/* Overlay con Título (Estilo Logo) - Siempre visible o sutil */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:from-[#0033a0]/80 transition-all duration-500">
          <div className="space-y-1 transform group-hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-white text-xl font-black tracking-tighter leading-none uppercase italic drop-shadow-lg">
              {title}
            </h3>
            
            {/* Metadata visible en hover (Overlay) */}
            <div className="flex items-center gap-2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-green-400">{match}</span>
              <span className="text-gray-300">{year}</span>
              <span className="px-1 py-0.5 border border-white/30 text-white rounded-[2px] text-[8px]">4K</span>
            </div>
            
            {/* Tags visibles en hover (Overlay) */}
            <p className="text-gray-300 text-[9px] leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
              {tags}
            </p>
          </div>
        </div>

        {/* Efecto de luz superior (Glow) */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff9900] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_#ff9900]" />
      </div>

      {/* Barra inferior estática - Solo decorativa ahora */}
      <div className="p-2 bg-[#1a1a1a] flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-[#ff9900] group-hover:animate-pulse" />
          <span className="text-white text-[9px] font-bold tracking-widest uppercase opacity-60">Destacado</span>
        </div>
        <span className="text-[9px] text-gray-500 font-medium">{year}</span>
      </div>
    </motion.div>
  );
}

    </motion.div>
  );
}
