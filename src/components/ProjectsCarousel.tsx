"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProjectCard } from "./ProjectCard";
import { VideoModal } from "./VideoModal";
import AutoScroll from "embla-carousel-auto-scroll";

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
        <>
            <div className="relative group w-full">

                {/* Fondo estético con orbes desenfocados para reflectancia */}
                <div className="absolute inset-0 z-[-1] pointer-events-none opacity-40 overflow-hidden mix-blend-multiply">
                    <div className="absolute top-1/2 left-[10%] w-[300px] h-[300px] bg-[#0033a0]/20 rounded-full blur-[100px] -translate-y-1/2" />
                    <div className="absolute top-1/2 right-[10%] w-[350px] h-[350px] bg-[#ff9900]/10 rounded-full blur-[120px] -translate-y-1/2" />
                </div>

                {/* Contenedor del Slider */}
                <div className="overflow-hidden py-16 px-4 sm:px-8 cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex flex-row items-center">
                        {projects.map((p) => (
                            <div key={p.id} className="relative z-10 hover:z-50 shrink-0 flex-[0_0_auto] mr-6 sm:mr-10">
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
            </div>

            <VideoModal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                title={selectedVideo?.title || ""}
                videoSrc={selectedVideo?.src || ""}
            />
        </>
    );
}
