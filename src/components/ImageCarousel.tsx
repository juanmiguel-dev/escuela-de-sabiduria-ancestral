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

    // Bloquear scroll cuando el modal está abierto
    useEffect(() => {
        if (selectedImg) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedImg]);

    return (
        <>
            <div className="relative group w-full">
                <div className="overflow-hidden py-16 px-4 sm:px-8 cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex flex-row items-center">
                        {images.map((img) => (
                            <div key={img.id} className="relative z-10 hover:z-[100] shrink-0 flex-[0_0_auto] mr-6 sm:mr-10">
                                <motion.div
                                    onClick={() => setSelectedImg(img.src)}
                                    className="relative flex-none w-[280px] sm:w-[320px] rounded-xl overflow-hidden cursor-pointer group origin-center transition-all bg-[#1a1a1a] shadow-xl border border-white/5"
                                    whileHover={{
                                        borderColor: "rgba(255, 153, 0, 0.5)",
                                        boxShadow: "0 0 20px rgba(255, 153, 0, 0.2), 0 0 40px rgba(0, 51, 160, 0.1)",
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    {/* Contenedor de la Imagen */}
                                    <div className="relative w-full aspect-video overflow-hidden">
                                        <Image
                                            src={img.src}
                                            alt={img.title || "Galería"}
                                            fill
                                            className="object-cover transition-opacity duration-500"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        
                                        {/* Overlay con Título (Estilo Logo) - Siempre visible o sutil */}
                                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:from-[#0033a0]/80 transition-all duration-500">
                                            <div className="space-y-1 transform group-hover:-translate-y-2 transition-transform duration-300">
                                                <h3 className="text-white text-xl font-black tracking-tighter leading-none uppercase italic drop-shadow-lg">
                                                    {img.title}
                                                </h3>
                                                
                                                {/* Metadata visible en hover (Overlay) */}
                                                <div className="flex items-center gap-2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <span className="text-green-400">{img.match || "98% de coincidencia"}</span>
                                                    <span className="text-gray-300">{img.year}</span>
                                                    <span className="px-1 py-0.5 border border-white/30 text-white rounded-[2px] text-[8px]">4K</span>
                                                </div>
                                                
                                                {/* Tags visibles en hover (Overlay) */}
                                                <p className="text-gray-300 text-[9px] leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
                                                    {img.tags}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Efecto de luz superior (Glow) */}
                                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff9900] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_#ff9900]" />
                                    </div>

                                    {/* Barra inferior estática */}
                                    <div className="p-2 bg-[#1a1a1a] flex items-center justify-between border-t border-white/5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-[#ff9900] group-hover:animate-pulse" />
                                            <span className="text-white text-[9px] font-bold tracking-widest uppercase opacity-60">Destacado</span>
                                        </div>
                                        <span className="text-[9px] text-gray-500 font-medium">{img.year}</span>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
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
