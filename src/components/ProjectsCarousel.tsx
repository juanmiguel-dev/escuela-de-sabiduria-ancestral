"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProjectCard } from "./ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectsCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        skipSnaps: false,
        dragFree: true
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
        <div className="relative group max-w-7xl mx-auto">
            {/* El padding vertical (py-8) es clave para que Framer Motion no corte la tarjeta al escalar */}
            <div className="overflow-hidden py-8 px-4 sm:px-12" ref={emblaRef}>
                <div className="flex flex-row gap-4 sm:gap-6 min-w-min">
                    {projects.map((p) => (
                        <div key={p.id} className="relative z-0 hover:z-50 shrink-0">
                            <ProjectCard
                                title={p.title}
                                videoSrc={p.videoSrc}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Botones de navegación (Ajustados con color azul marino) */}
            <button
                onClick={scrollPrev}
                className={`absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 shadow-md hover:bg-white text-[#0033a0] p-2 h-16 w-12 hidden sm:flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-50 rounded-r-md sm:rounded-full border border-gray-100 ${!prevBtnEnabled && "invisible"}`}
            >
                <ChevronLeft size={32} />
            </button>

            <button
                onClick={scrollNext}
                className={`absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 shadow-md hover:bg-white text-[#0033a0] p-2 h-16 w-12 hidden sm:flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-50 rounded-l-md sm:rounded-full border border-gray-100 ${!nextBtnEnabled && "invisible"}`}
            >
                <ChevronRight size={32} />
            </button>
        </div>
    );
}
