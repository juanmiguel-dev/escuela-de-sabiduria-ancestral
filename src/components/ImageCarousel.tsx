"use client";

import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ImageItem {
    id: string | number;
    src: string;
    title?: string;
    year?: string;
    tags?: string;
    match?: string;
    isGallery?: boolean;
}

interface ImageCarouselProps {
    images: ImageItem[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
    const [emblaRef] = useEmblaCarousel({
        align: "start",
        loop: true,
        skipSnaps: false,
        dragFree: true,
    });

    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    // Bloquear scroll cuando el modal está abierto
    useEffect(() => {
        if (selectedImg || isGalleryOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedImg, isGalleryOpen]);

    const handleCardClick = (img: ImageItem) => {
        if (img.isGallery) {
            setIsGalleryOpen(true);
        } else {
            setSelectedImg(img.src);
        }
    };

    return (
        <>
            <div className="relative group w-full">
                <div className="overflow-hidden py-16 px-4 sm:px-8 cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex flex-row items-center">
                        {images.map((img) => {
                            const tagList = img.tags ? img.tags.split(' ').filter(t => t.startsWith('#')).map(t => t.replace('#', '')) : [];
                            return (
                                <div key={img.id} className="relative z-10 hover:z-[100] shrink-0 flex-[0_0_auto] mr-6 sm:mr-10">
                                    <motion.div
                                        onClick={() => handleCardClick(img)}
                                        className="relative flex-none w-[300px] sm:w-[340px] rounded-[2rem] overflow-hidden cursor-pointer group bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-gray-100 transition-all duration-500"
                                        whileHover={{
                                            y: -10,
                                            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                                        }}
                                    >
                                        {/* Contenedor de la Media (Video o Imagen) */}
                                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                                        {img.src.endsWith('.mp4') ? (
                                            <video
                                                src={img.src}
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
                                            <Image
                                                src={img.src}
                                                alt={img.title || "Galería"}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        )}
                                        
                                        {/* Overlay Azul Gradiente sutil */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#0033a0]/20 to-transparent pointer-events-none" />

                                            {/* Badge de Año (Arriba Izquierda) */}
                                            <div className="absolute top-4 left-4 z-20">
                                                <div className="bg-gray-500/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30">
                                                    <span className="text-white text-sm font-bold">{img.year}</span>
                                                </div>
                                            </div>

                                            {/* Contenido Central (Overlay) */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#0033a0]/40 backdrop-blur-[2px]">
                                                <div className="bg-[#ff9900] px-3 py-1 rounded text-[10px] font-black text-white uppercase mb-2">
                                                    CASO: {img.title?.split(' ')[0]}
                                                </div>
                                                <p className="text-white text-lg font-bold leading-tight drop-shadow-md">
                                                    {img.title}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Parte Inferior: Información Blanca */}
                                        <div className="p-6 bg-white space-y-4 min-h-[140px]">
                                            <h3 className="text-[#1a2b4e] text-xl font-black leading-tight tracking-tight">
                                                {img.title}
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
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* MODAL / POPUP DE IMAGEN */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 bg-black/90 backdrop-blur-2xl"
                        onClick={() => setSelectedImg(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative max-w-7xl max-h-screen w-full flex items-center justify-center p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Botón de cierre elegante */}
                            <button
                                onClick={() => setSelectedImg(null)}
                                className="absolute top-0 right-0 sm:-top-4 sm:-right-4 z-[110] bg-white/10 hover:bg-white hover:text-black text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/20"
                            >
                                <X size={28} strokeWidth={2} />
                            </button>

                            <img
                                src={selectedImg}
                                alt="Vista ampliada"
                                className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
