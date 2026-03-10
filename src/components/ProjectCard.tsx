"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  videoSrc: string;
  year?: string;
  tags?: string;
  match?: string;
  onClick?: () => void;
  onHover?: () => void;
}

export function ProjectCard({ title, videoSrc, year, tags, match = "98% de coincidencia", onClick, onHover }: ProjectCardProps) {
  const tagList = tags ? tags.split(' ').filter(t => t.startsWith('#')).map(t => t.replace('#', '')) : [];

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={onHover}
      className="relative flex-none w-[210px] sm:w-[240px] h-[320px] rounded-[1.5rem] overflow-hidden cursor-pointer group bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col border border-transparent"
      whileHover={{
        y: -8,
        boxShadow: "0 0 25px rgba(255, 153, 0, 0.4), 0 20px 40px rgba(0,0,0,0.15)",
        borderColor: "rgba(255, 153, 0, 0.5)",
      }}
    >
      {/* Parte Superior: Media (Video/Imagen) */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
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
        
        {/* Overlay Azul Gradiente sutil (siempre visible para estética) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0033a0]/20 to-transparent pointer-events-none" />

        {/* Badge de Año (Arriba Izquierda) */}
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-gray-500/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30">
            <span className="text-white text-sm font-bold">{year}</span>
          </div>
        </div>
      </div>

      {/* Parte Inferior: Información Glassmorphism */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-[#1a2b4e] text-lg font-black leading-tight tracking-tight">
            {title}
          </h3>
          
          {/* Tags Estilo Referencia */}
          <div className="flex flex-wrap gap-1.5">
            {tagList.map((tag, idx) => (
              <span 
                key={idx} 
                className="bg-[#0033a0]/10 text-[#0033a0] px-2.5 py-0.5 rounded-lg text-[10px] font-bold border border-[#0033a0]/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
