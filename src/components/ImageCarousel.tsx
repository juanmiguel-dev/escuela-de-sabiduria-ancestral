"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, FileText } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ImageItem {
    id: string | number;
    src: string;
    title?: string;
    year?: string;
    tags?: string;
    match?: string;
    isGallery?: boolean;
    pdfSrc?: string;
}

interface ImageCarouselProps {
    images: ImageItem[];
    onGalleryClick?: (img: ImageItem) => void;
    minimal?: boolean;
    align?: "start" | "center";
}

export function ImageCarousel({ images, onGalleryClick, minimal = false, align = "start" }: ImageCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: align,
        loop: true,
        skipSnaps: false,
        dragFree: true,
    });

    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [selectedPdf, setSelectedPdf] = useState<{ src: string, title: string } | null>(null);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    // Funciones para las flechas
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    // Bloquear scroll cuando el modal está abierto
    useEffect(() => {
        if (selectedImg || isGalleryOpen || selectedVideo || selectedPdf) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedImg, isGalleryOpen, selectedVideo, selectedPdf]);

    const handleCardClick = (img: ImageItem) => {
        if (img.isGallery) {
            if (onGalleryClick) {
                onGalleryClick(img);
            } else {
                setIsGalleryOpen(true);
            }
        } else if (img.src.endsWith('.pdf')) {
            setSelectedPdf({ src: img.src, title: img.title || "Documento" });
        } else if (img.src.endsWith('.mp4')) {
            setSelectedVideo(img.src);
        } else {
            setSelectedImg(img.src);
        }
    };

    return (
        <>
            <div className="relative group w-full">
                {/* Flechas de Navegación (Solo visibles en hover del contenedor principal) */}
                <button 
                    onClick={scrollPrev}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/40 hover:bg-white hover:text-black text-white p-2 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 cursor-pointer ${minimal ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                >
                    <ChevronLeft size={32} />
                </button>
                <button 
                    onClick={scrollNext}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/40 hover:bg-white hover:text-black text-white p-2 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 cursor-pointer ${minimal ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                >
                    <ChevronRight size={32} />
                </button>

                <div className={`overflow-hidden cursor-grab active:cursor-grabbing ${minimal ? 'py-12' : 'py-16 px-4 sm:px-8'}`} ref={emblaRef}>
                    <div className="flex flex-row items-center">
                        {images.map((img) => {
                            const tagList = img.tags ? img.tags.split(' ').filter(t => t.startsWith('#')).map(t => t.replace('#', '')) : [];
                            
                            // MODO MINIMALISTA: Solo la imagen redondeada, sin texto ni estilo de card blanca
                            if (minimal) {
                                return (
                                    <div key={img.id} className="relative z-10 hover:z-[100] shrink-0 flex-[0_0_auto] mr-4 sm:mr-8">
                                        <motion.div
                                            onClick={() => handleCardClick(img)}
                                            className="relative flex-none w-[60vw] sm:w-[45vw] max-w-[800px] aspect-video rounded-3xl overflow-hidden cursor-pointer border border-white/10 transition-all duration-500"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <Image
                                                src={img.src}
                                                alt="Galería"
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                            {/* Sutil overlay al hover en minimal */}
                                            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                        </motion.div>
                                    </div>
                                );
                            }

                            // MODO NORMAL (CARD): Estilo tipo referencia con parte inferior blanca
                            return (
                                <div key={img.id} className="relative z-10 hover:z-[100] shrink-0 flex-[0_0_auto] mr-6 sm:mr-10">
                                    <motion.div
                                        onClick={() => handleCardClick(img)}
                                        className="relative flex-none w-[300px] sm:w-[340px] h-[480px] rounded-[2rem] overflow-hidden cursor-pointer group bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-gray-100 transition-all duration-500 flex flex-col"
                                        whileHover={{
                                            y: -10,
                                            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                                        }}
                                    >
                                        {/* Contenedor de la Media (Video o Imagen) */}
                                    <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden">
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
                                        </div>

                                        {/* Parte Inferior: Información Blanca */}
                                        <div className="p-6 bg-white space-y-4 min-h-[140px] flex flex-col justify-between">
                                            <div className="space-y-3">
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

                                            {/* Botón PDF si existe */}
                                            {img.pdfSrc && (
                                                <div className="pt-2 border-t border-gray-100">
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedPdf({ src: img.pdfSrc || "", title: img.title || "Documento" });
                                                        }}
                                                        className="flex items-center gap-2 text-[#0033a0] hover:text-[#ff9900] font-bold text-sm transition-colors group/pdf w-full text-left cursor-pointer"
                                                    >
                                                        <div className="p-1.5 bg-[#0033a0]/5 group-hover/pdf:bg-[#ff9900]/10 rounded-md transition-colors">
                                                            <FileText size={16} />
                                                        </div>
                                                        VER DOCUMENTO PDF
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* MODAL / POPUP DE PDF */}
            <AnimatePresence>
                {selectedPdf && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 bg-black/60 backdrop-blur-md"
                        onClick={() => setSelectedPdf(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Cabecera del Modal PDF */}
                            <div className="absolute top-0 left-0 w-full h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-[110]">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#0033a0]/5 rounded-lg text-[#0033a0]">
                                        <FileText size={20} />
                                    </div>
                                    <span className="font-black text-[#1a2b4e] uppercase tracking-tight line-clamp-1">{selectedPdf.title}</span>
                                </div>
                                <button
                                    onClick={() => setSelectedPdf(null)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 rounded-full transition-all duration-300 cursor-pointer"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Contenido del PDF (Iframe) */}
                            <div className="w-full h-full pt-16">
                                <iframe
                                    src={`${selectedPdf.src}#toolbar=0&navpanes=0&scrollbar=0`}
                                    className="w-full h-full border-none"
                                    title="Visor PDF"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MODAL / POPUP DE IMAGEN */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 bg-black/50 backdrop-blur-md"
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
                                className="absolute top-0 right-0 sm:-top-4 sm:-right-4 z-[110] bg-white/10 hover:bg-white hover:text-black text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/20 cursor-pointer"
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

            {/* MODAL / POPUP DE VIDEO */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 bg-black/50 backdrop-blur-md"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative w-full max-w-4xl aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Botón de cierre elegante */}
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-0 right-0 sm:-top-4 sm:-right-4 z-[110] bg-white/10 hover:bg-white hover:text-black text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/20 cursor-pointer"
                            >
                                <X size={28} strokeWidth={2} />
                            </button>

                            <video
                                src={selectedVideo}
                                className="w-full h-full rounded-2xl shadow-2xl border border-white/10"
                                controls
                                autoPlay
                                loop
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
