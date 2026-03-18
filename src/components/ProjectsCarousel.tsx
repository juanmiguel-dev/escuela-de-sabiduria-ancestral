"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ProjectCard } from "./ProjectCard";
import { VideoModal } from "./VideoModal";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Project {
    id: number | string;
    title: string;
    videoSrc?: string;
    imageSrc?: string;
    year: string;
    tags: string;
    sections?: string[];
    match: string;
}

interface ProjectsCarouselProps {
    onProjectClick?: (project: Project) => void;
    projects?: Project[];
}

export function ProjectsCarousel({ onProjectClick, projects: externalProjects }: ProjectsCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: true,
        dragFree: true,
    }, [
        AutoScroll({ 
            playOnInit: true, 
            stopOnMouseEnter: true, 
            stopOnInteraction: false, 
            speed: 0.8,
            direction: "backward" // Sentido contrario
        })
    ]);

    // Sincronizamos las flechas con el movimiento invertido:
    // Al ser backward, scrollPrev() nos lleva en el sentido del flujo visual (derecha)
    // y scrollNext() nos lleva en contra (izquierda).
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const [selectedVideo, setSelectedVideo] = useState<{ title: string, src: string } | null>(null);

    const displayProjects = externalProjects || [];

    // Manejar bloqueo de scroll cuando el modal esta abierto
    useEffect(() => {
        if (selectedVideo) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedVideo]);

    return (
        <div className="relative w-full overflow-visible">
            {/* Viewport: Único lugar con overflow-hidden para el slider */}
            <div className="overflow-hidden" ref={emblaRef}>
                {/* Container: Limpio sin márgenes negativos conflictivos */}
                <div className="flex">
                    {displayProjects.map((p) => (
                        <div key={p.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] px-4 py-8">
                            <ProjectCard
                                title={p.title}
                                videoSrc={p.videoSrc}
                                imageSrc={p.imageSrc}
                                year={p.year}
                                tags={p.tags}
                                sections={p.sections}
                                match={p.match}
                                onClick={() => onProjectClick?.(p)}
                            />
                        </div>
                    ))}
                </div>
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
