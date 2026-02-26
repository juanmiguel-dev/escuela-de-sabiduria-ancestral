"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProjectCard } from "./ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectsCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "center", // Mejor experiencia centrando los destacados
        skipSnaps: false,
        dragFree: false, // Animación natural card-por-card en deslice manual (smooth slide)
        containScroll: "trimSnaps", // No mostrar espacio en blanco extra tras la primera y última card
    });

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

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

    return (
        <div className="relative group max-w-[95vw] sm:max-w-7xl mx-auto rounded-[3rem]">

            {/* Fondo estético con orbes desenfocados para que el card "Glassmorphism" reaccione a luz */}
            <div className="absolute inset-0 z-[-1] pointer-events-none opacity-40 overflow-hidden mix-blend-multiply">
                <div className="absolute top-1/2 left-[10%] w-[300px] h-[300px] bg-[#0033a0]/80 rounded-full blur-[100px] -translate-y-1/2" />
                <div className="absolute top-1/2 right-[10%] w-[350px] h-[350px] bg-[#ff9900]/70 rounded-full blur-[120px] -translate-y-1/2" />
            </div>

            {/* Paddings inmensos (py-16) para que el hover gigante de las cards no explote en los márgenes */}
            <div className="overflow-hidden py-16 px-4 sm:px-8 cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex flex-row gap-8 sm:gap-14 min-w-min items-center">
                    {projects.map((p) => (
                        <div key={p.id} className="relative z-10 hover:z-50 shrink-0">
                            <ProjectCard
                                title={p.title}
                                videoSrc={p.videoSrc}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Botones de navegación con Glassmorphism extremo */}
            <button
                onClick={scrollPrev}
                className={`absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,51,160,0.2)] text-[#0033a0] p-3 h-16 w-16 hidden sm:flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:left-2 sm:group-hover:left-8 z-50 rounded-full border border-white/80 hover:scale-110 ${!prevBtnEnabled && "invisible"}`}
            >
                <ChevronLeft size={36} strokeWidth={2.5} />
            </button>

            <button
                onClick={scrollNext}
                className={`absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,51,160,0.2)] text-[#0033a0] p-3 h-16 w-16 hidden sm:flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:right-2 sm:group-hover:right-8 z-50 rounded-full border border-white/80 hover:scale-110 ${!nextBtnEnabled && "invisible"}`}
            >
                <ChevronRight size={36} strokeWidth={2.5} />
            </button>
        </div>
    );
}
