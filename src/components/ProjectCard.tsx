"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  videoSrc?: string;
  imageSrc?: string;
  sections?: string[];
  onClick?: () => void;
  onHover?: () => void;
}

export function ProjectCard({ title, videoSrc, imageSrc, sections, onClick, onHover }: ProjectCardProps) {
  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={onHover}
      className="relative w-full h-[360px] rounded-[1.5rem] overflow-hidden cursor-pointer group bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col border border-transparent"
      whileHover={{
        y: -8,
        boxShadow: "0 0 30px rgba(255, 255, 255, 0.8), 0 20px 40px rgba(0,0,0,0.1)",
        borderColor: "rgba(255, 255, 255, 0.6)",
      }}
    >
      {/* Parte Superior: Media (Video/Imagen) */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {videoSrc?.endsWith('.mp4') ? (
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
        ) : (
          (imageSrc || videoSrc) && (
            <Image
              src={imageSrc || videoSrc || ""}
              alt={title}
              fill
              className="object-cover"
            />
          )
        )}
        
        {/* Overlay Azul Gradiente sutil (siempre visible para estética) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#333333]/20 to-transparent pointer-events-none" />
      </div>

      {/* Parte Inferior: Información Glassmorphism */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-[#333333] text-lg font-black leading-tight tracking-tight">
            {title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
