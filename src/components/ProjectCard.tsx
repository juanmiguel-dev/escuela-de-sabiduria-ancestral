"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  imageSrc: string;
  alt: string;
}

export function ProjectCard({ title, imageSrc, alt }: ProjectCardProps) {
  return (
    <motion.div
      className="relative flex-none w-[280px] sm:w-[320px] aspect-video rounded-md overflow-hidden cursor-pointer group origin-center transition-all bg-[#222]"
      whileHover={{ 
        scale: 1.08, 
        zIndex: 20,
        boxShadow: "0 10px 30px rgba(0,0,0,0.8)"
      }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut" 
      }}
      style={{
        boxShadow: "0 4px 15px rgba(0,0,0,0)",
      }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-300 group-hover:opacity-100 opacity-80"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      
      {/* Degradado oscuro inferior para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
      
      {/* Título de la tarjeta: Mobile-first: text-wrap para que no se trunque */}
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-white text-base sm:text-lg font-bold tracking-wide drop-shadow-lg leading-tight w-full break-words">
          {title}
        </h3>
      </div>
      
      {/* Resplandor (Glow) al estilo Netflix al hacer hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border-[2px] border-blue-500/60 rounded-md transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
