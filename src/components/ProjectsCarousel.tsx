"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProjectCard } from "./ProjectCard";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import AutoScroll from "embla-carousel-auto-scroll";

export function ProjectsCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start", // Usamos start para mejor compatibilidad de loop con resoluciones anchas
        loop: true,
        skipSnaps: false,
        dragFree: true,
    }, [
        AutoScroll({ playOnInit: true, stopOnMouseEnter: true, stopOnInteraction: false, speed: 1.0 })
    ]);

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<{ title: string, src: string } | null>(null);

    // 7 videos destacados de la carpeta /videos
    const projects = [
        { id: 1, title: "El inicio de todo", videoSrc: "/videos/1.mp4" },
        { id: 2, title: "Redes de Gobierno", videoSrc: "/videos/2.mp4" },
        { id: 3, title: "Sector salud", videoSrc: "/videos/3.mp4" },
        { id: 4, title: "Automatización", videoSrc: "/videos/4.mp4" },
        { id: 5, title: "Transformación Digital", videoSrc: "/videos/5.mp4" },
        { id: 6, title: "Conectividad Satelital", videoSrc: "/videos/6.mp4" },
        { id: 7, title: "Mirando al Futuro", videoSrc: "/videos/7.mp4" },
    ];

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    // Manejar bloqueo de scroll cuando el modal esta abierto
    useEffect(() => {
        if (selectedVideo) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedVideo]);

    return (
        <>
            <div className="relative group max-w-[95vw] sm:max-w-[90rem] mx-auto rounded-[3rem]">

                {/* Fondo estético con orbes desenfocados para reflectancia */}
                <div className="absolute inset-0 z-[-1] pointer-events-none opacity-40 overflow-hidden mix-blend-multiply">
                    <div className="absolute top-1/2 left-[10%] w-[300px] h-[300px] bg-[#0033a0]/80 rounded-full blur-[100px] -translate-y-1/2" />
                    <div className="absolute top-1/2 right-[10%] w-[350px] h-[350px] bg-[#ff9900]/70 rounded-full blur-[120px] -translate-y-1/2" />
                </div>

                {/* Contenedor del Slider */}
                <div className="overflow-hidden py-16 px-4 sm:px-8 cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex flex-row gap-8 sm:gap-14 items-center">
                        {projects.map((p) => (
                            <div key={p.id} className="relative z-10 hover:z-50 shrink-0">
                                <ProjectCard
                                    title={p.title}
                                    videoSrc={p.videoSrc}
                                    onClick={() => setSelectedVideo({ title: p.title, src: p.videoSrc })}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botones de navegación (Flechas más sutiles debajo del slide) */}
                <div className="flex justify-center gap-6 mt-2 relative z-20">
                    <button
                        onClick={scrollPrev}
                        className="bg-white/80 hover:bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-[#0033a0] p-3 h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center transition-all duration-300 ease-out rounded-full border border-gray-100 hover:scale-110 hover:shadow-md"
                    >
                        <ChevronLeft size={28} strokeWidth={2.5} className="-ml-1" />
                    </button>

                    <button
                        onClick={scrollNext}
                        className="bg-white/80 hover:bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-[#0033a0] p-3 h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center transition-all duration-300 ease-out rounded-full border border-gray-100 hover:scale-110 hover:shadow-md"
                    >
                        <ChevronRight size={28} strokeWidth={2.5} className="-mr-1" />
                    </button>
                </div>
            </div>

            {/* POPUP SUPER PUESTO (Modal Reproductor) */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 bg-black/80 backdrop-blur-xl"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 30, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.6)] border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Botón de cierre elegante */}
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 bg-black/40 hover:bg-white hover:text-black text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/20"
                            >
                                <X size={28} strokeWidth={2} />
                            </button>

                            {/* Reproductor Real sin auto-loop para que lo vean tranquilos */}
                            <video
                                src={selectedVideo.src}
                                controls
                                autoPlay
                                className="w-full h-full object-contain bg-black"
                                controlsList="nodownload"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
