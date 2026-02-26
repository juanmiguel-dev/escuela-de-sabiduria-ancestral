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

    // Datos hardcodeados de los proyectos/casos destacados
    const projects = [
        { id: 1, title: "El inicio de todo", image: "/carruseles/1/a.jpg" },
        { id: 2, title: "Redes de Gobierno", image: "/carruseles/2/1.jpg" },
        { id: 3, title: "Sector salud", image: "/carruseles/3/a.jpg" },
        { id: 4, title: "Automatización", image: "/carruseles/4/a.jpg" },
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
        <div className="relative group">
            {/* El padding vertical (py-8) es clave para que Framer Motion no corte la tarjeta al escalar */}
            <div className="overflow-hidden py-8 px-4 sm:px-12" ref={emblaRef}>
                <div className="flex flex-row gap-4 sm:gap-6 min-w-min">
                    {projects.map((p) => (
                        <div key={p.id} className="relative z-0 hover:z-50">
                            <ProjectCard
                                title={p.title}
                                imageSrc={p.image}
                                alt={p.title}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Botones de navegación (Estilo Netflix) */}
            <button
                onClick={scrollPrev}
                className={`absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-2 h-[calc(100%-4rem)] w-12 hidden sm:flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-50 rounded-r-md ${!prevBtnEnabled && "invisible"}`}
            >
                <ChevronLeft size={32} />
            </button>

            <button
                onClick={scrollNext}
                className={`absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-2 h-[calc(100%-4rem)] w-12 hidden sm:flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-50 rounded-l-md ${!nextBtnEnabled && "invisible"}`}
            >
                <ChevronRight size={32} />
            </button>
        </div>
    );
}
