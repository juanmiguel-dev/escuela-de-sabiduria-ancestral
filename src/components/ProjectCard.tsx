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
  const tagList = tags ? tags.split(' ').filter(t => t.startsWith('#')).map(t => t.replace('#', '')) : [];

  return (
    <motion.div
      onClick={onClick}
      className="relative flex-none w-[300px] sm:w-[340px] rounded-[2rem] overflow-hidden cursor-pointer group bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-gray-100 transition-all duration-500"
      whileHover={{
        y: -10,
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
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

        {/* Contenido Central (Overlay) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#0033a0]/40 backdrop-blur-[2px]">
           <div className="bg-[#ff9900] px-3 py-1 rounded text-[10px] font-black text-white uppercase mb-2">
             CASO: {title.split(' ')[0]}
           </div>
           <p className="text-white text-lg font-bold leading-tight drop-shadow-md">
             {title}
           </p>
        </div>
      </div>

      {/* Parte Inferior: Información Blanca */}
      <div className="p-6 bg-white space-y-4 min-h-[140px]">
        <h3 className="text-[#1a2b4e] text-xl font-black leading-tight tracking-tight">
          {title}
        </h3>
        
        {/* Tags Estilo Referencia */}
        <div className="flex flex-wrap gap-2">
          {tagList.map((tag, idx) => (
            <span 
              key={idx} 
              className="bg-gray-100 text-[#0033a0] px-3 py-1 rounded-lg text-xs font-bold border border-gray-200"
            >
              {tag}
            </span>
          ))}
          {tagList.length === 0 && (
            <span className="bg-gray-100 text-[#0033a0] px-3 py-1 rounded-lg text-xs font-bold border border-gray-200">
              Networking
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
