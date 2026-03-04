"use client";

import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ImageItem {
    id: string | number;
    src: string;
}

interface ImageCarouselProps {
    images: ImageItem[];
    dark?: boolean;
}

export function ImageCarousel({ images, dark }: ImageCarouselProps) {
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
                <div className="overflow-hidden py-10 px-4 sm:px-8 cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex flex-row items-center">
                        {images.map((img) => (
                            <div key={img.id} className="relative z-10 hover:z-50 shrink-0 flex-[0_0_auto] mr-6 sm:mr-10">
                                {/* Card de Imagen con un hover elegante y bordes consitentes */}
                                <div
                                    onClick={() => setSelectedImg(img.src)}
                                    className="relative flex-none w-[260px] sm:w-[350px] aspect-square rounded-[2rem] overflow-hidden shadow-sm transition-all duration-500 hover:scale-105 cursor-pointer bg-[#1a1a1a]/40 border border-white/10 hover:shadow-[0_0_30px_rgba(0,85,255,0.2)]"
                                >
                                    <Image
                                        src={img.src}
                                        alt="Galería Trans Advanced"
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    {/* Overlay con icono sutil de zoom al hover */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                                        </div>
                                    </div>
                                </div>
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
