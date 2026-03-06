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
                                    className="relative flex-none w-[280px] sm:w-[320px] rounded-xl overflow-hidden cursor-pointer group origin-center transition-all bg-[#1a1a1a] shadow-xl"
                                    initial={{ scale: 1 }}
                                    whileHover={{
                                        scale: 1.15,
                                        zIndex: 100,
                                        y: -50,
                                        transition: { duration: 0.3, ease: "easeOut" }
                                    }}
                                >
                                    {/* Contenedor de la Imagen */}
                                    <div className="relative w-full aspect-video overflow-hidden">
                                        <Image
                                            src={img.src}
                                            alt={img.title || "Galería"}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        {/* Overlay con Título (Estilo Logo) */}
                                        <div className="absolute bottom-4 left-4 right-4 z-20 group-hover:opacity-0 transition-opacity duration-300">
                                            <h3 className="text-white text-xl font-black tracking-tighter leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase italic">
                                                {img.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Info Expandida (Solo visible en hover) */}
                                    <div className="absolute top-full left-0 w-full bg-[#1a1a1a] p-4 space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-2xl rounded-b-xl border-t border-white/10">
                                        {/* Botones de acción rápidos */}
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                            </div>
                                            <div className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center text-white hover:border-white transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                            </div>
                                            <div className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center text-white hover:border-white transition-colors ml-auto">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-9"/></svg>
                                            </div>
                                        </div>

                                        {/* Metadata */}
                                        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold">
                                            <span className="text-green-500">{img.match || "98% de coincidencia"}</span>
                                            <span className="text-gray-400">{img.year}</span>
                                            <span className="px-1.5 py-0.5 border border-gray-500 text-gray-300 rounded-[2px] text-[8px]">4K</span>
                                            <span className="text-gray-400">Trayectoria</span>
                                        </div>

                                        {/* Título y Tags */}
                                        <div className="space-y-1">
                                            <h4 className="text-white text-sm font-bold">{img.title}</h4>
                                            <p className="text-gray-400 text-[10px] leading-tight">
                                                {img.tags}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Barra inferior estática (Estilo Netflix Coming Soon) */}
                                    <div className="p-3 bg-[#1a1a1a] flex items-center justify-between border-t border-white/5 group-hover:hidden transition-all">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#ff9900]" />
                                            <span className="text-white text-[10px] font-bold tracking-wider uppercase">Destacado</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                            <span className="text-[9px] font-medium">{img.year}</span>
                                        </div>
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
