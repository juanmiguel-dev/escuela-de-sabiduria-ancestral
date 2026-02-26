"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  videoSrc: string;
}

export function ProjectCard({ title, videoSrc }: ProjectCardProps) {
  return (
    <motion.div
      className="relative flex-none w-[280px] sm:w-[320px] bg-[#f8f9fc] rounded-2xl overflow-hidden cursor-pointer group origin-center transition-all border border-gray-100"
      whileHover={{
        scale: 1.05,
        zIndex: 20,
        boxShadow: "0 15px 35px rgba(0,0,0,0.12)"
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      style={{
        boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
      }}
    >
      {/* Contenedor del video con aspect-video  */}
      <div className="relative w-full aspect-video bg-black overflow-hidden">
        <video
          src={videoSrc}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          preload="metadata"
          muted
          loop
          playsInline
          onMouseOver={e => (e.target as HTMLVideoElement).play()}
          onMouseOut={e => {
            const video = e.target as HTMLVideoElement;
            video.pause();
          }}
        />
        {/* Play icon overlay sutil */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-white/80 p-3 rounded-full text-[#0033a0] backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M5 3l14 9-14 9V3z" /></svg>
          </div>
        </div>
      </div>

      {/* Título de la tarjeta debajo del video */}
      <div className="p-4 sm:p-5 flex items-center justify-center min-h-[5rem]">
        <h3 className="text-[#0033a0] text-lg sm:text-xl font-bold tracking-tight text-center w-full break-words">
          {title}
        </h3>
      </div>

    </motion.div>
  );
}
