"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProjectCard } from "./ProjectCard";
import { VideoModal } from "./VideoModal";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Project {
    id: number;
    title: string;
    videoSrc: string;
    year: string;
    tags: string;
    match: string;
}

interface ProjectsCarouselProps {
    onProjectHover?: (project: Project) => void;
}

export function ProjectsCarousel({ onProjectHover }: ProjectsCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: true,
        dragFree: true,
    });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const [selectedVideo, setSelectedVideo] = useState<{ title: string, src: string } | null>(null);

    // 6 videos destacados de la carpeta /videos mapeados según el JSON
    const projects: Project[] = [
        { id: 6, title: "Atención emergencias 107", videoSrc: "/videos/6.mp4", year: "2010", tags: "#Contact Center #Desarrollo", match: "99% de coincidencia" },
        { id: 3, title: "Tecnología en sector Salud", videoSrc: "/videos/3.mp4", year: "2008-Hoy", tags: "#Colaboración #Contact Center #Desarrollo #Networking #IA", match: "98% de coincidencia" },
        { id: 2, title: "Ciberseguridad pública con Cisco", videoSrc: "/videos/2.mp4", year: "2012", tags: "#Ciberseguridad #Cisco", match: "97% de coincidencia" },
        { id: 5, title: "6000 puestos de trabajo conectados", videoSrc: "/videos/5.mp4", year: "2018", tags: "#Cableado #Fibra óptica", match: "96% de coincidencia" },
        { id: 1, title: "El inicio de todo", videoSrc: "/videos/1.mp4", year: "1993", tags: "#Switches #Networking", match: "99% de coincidencia" },
        { id: 7, title: "Mirando al Futuro", videoSrc: "/videos/7.mp4", year: "2025", tags: "#IA #Integración #Futuro", match: "100% de coincidencia" },
    ];

    // Manejar bloqueo de scroll cuando el modal esta abierto
    useEffect(() => {
        if (selectedVideo) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedVideo]);

    return (
        <div className="relative w-full group">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex px-4 sm:px-12 py-4">
                    {projects.map((p) => (
                        <div key={p.id} className="mr-6">
                            <ProjectCard
                                title={p.title}
                                videoSrc={p.videoSrc}
                                year={p.year}
                                tags={p.tags}
                                match={p.match}
                                onClick={() => setSelectedVideo({ title: p.title, src: p.videoSrc })}
                                onHover={() => onProjectHover?.(p)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Flechas de Navegación (Debajo de las cards) */}
            <div className="flex justify-end items-center gap-4 px-12 mt-2">
                <button 
                    onClick={scrollPrev}
                    className="bg-white/10 hover:bg-[#ff9900] text-white p-2 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 cursor-pointer shadow-lg group/btn"
                >
                    <ChevronLeft size={20} className="group-hover/btn:scale-110 transition-transform" />
                </button>
                <button 
                    onClick={scrollNext}
                    className="bg-white/10 hover:bg-[#ff9900] text-white p-2 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 cursor-pointer shadow-lg group/btn"
                >
                    <ChevronRight size={20} className="group-hover/btn:scale-110 transition-transform" />
                </button>
            </div>

            <VideoModal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                title={selectedVideo?.title || ""}
                videoSrc={selectedVideo?.src || ""}
            />
        </div>
    );
}
