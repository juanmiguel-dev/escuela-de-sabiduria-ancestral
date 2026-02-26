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
      className="relative flex-none w-[300px] sm:w-[380px] rounded-[2rem] overflow-hidden cursor-pointer group origin-center transition-all bg-white/40 backdrop-blur-2xl border border-white/60"
      initial={{ y: 0, scale: 1 }}
      whileHover={{
        y: -12,
        scale: 1.04,
        zIndex: 50,
        boxShadow: "0 25px 50px -12px rgba(0, 51, 160, 0.25), 0 0 20px rgba(255, 255, 255, 0.8) inset"
      }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] // Curva Out Expo ultra suave
      }}
      style={{
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08), 0 0 10px rgba(255,255,255,0.4) inset",
      }}
    >
      {/* Contenedor principal del video con aspect ratio panorámico */}
      <div className="relative w-full aspect-video bg-black/5 overflow-hidden rounded-t-[2rem]">
        <video
          src={videoSrc}
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
          preload="metadata"
          muted
          loop
          playsInline
          onMouseEnter={(e) => {
            const video = e.target as HTMLVideoElement;
            video.currentTime = 0; // Reinicia el video para causar más impacto
            video.play().catch(() => { }); // Evitar errores si el navegador bloquea el autoplay
          }}
          onMouseLeave={(e) => {
            const video = e.target as HTMLVideoElement;
            video.pause();
          }}
        />

        {/* Overlay Glassmorphic oscuro sutil + Ícono de Play dinámico */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0033a0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-[600ms] pointer-events-none z-20">
          <div className="bg-white/20 p-4 sm:p-5 rounded-full text-white backdrop-blur-lg border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.2)] transform translate-y-6 group-hover:translate-y-0 transition-transform duration-[600ms] ease-out">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M5 3l14 9-14 9V3z" /></svg>
          </div>
        </div>
      </div>

      {/* Sección inferior con título (Glassmorphism + Gradientes sutiles) */}
      <div className="p-5 sm:p-7 flex flex-col items-center justify-center min-h-[6.5rem] bg-gradient-to-b from-white/20 to-white/60 relative">
        <h3 className="text-[#0033a0] text-lg sm:text-2xl font-bold tracking-tight text-center w-full break-words drop-shadow-sm mb-1 group-hover:text-[#ff9900] transition-colors duration-300">
          {title}
        </h3>

        {/* Pequeña línea decorativa que se expande en hover */}
        <div className="w-8 h-[3px] bg-[#0033a0]/20 rounded-full group-hover:w-16 group-hover:bg-[#ff9900]/60 transition-all duration-500 ease-out mt-2" />
      </div>

    </motion.div>
  );
}
