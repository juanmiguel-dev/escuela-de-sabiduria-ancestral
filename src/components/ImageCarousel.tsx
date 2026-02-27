"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export function ImageCarousel() {
    const [emblaRef] = useEmblaCarousel({
        align: "start",
        loop: true,
        skipSnaps: false,
        dragFree: true,
    });

    // Imágenes de la carpeta 1
    const images = [
        { id: 1, src: "/carruseles/1/Publicación 4F-100.jpg" },
        { id: 2, src: "/carruseles/1/a.jpg" },
        { id: 3, src: "/carruseles/1/b.jpg" },
        { id: 4, src: "/carruseles/1/c.jpg" },
        { id: 5, src: "/carruseles/1/d.jpg" },
        { id: 6, src: "/carruseles/1/e.jpg" },
    ];

    return (
        <div className="relative group w-full">
            <div className="overflow-hidden py-10 px-4 sm:px-8 cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex flex-row items-center">
                    {images.map((img) => (
                        <div key={img.id} className="relative z-10 hover:z-50 shrink-0 flex-[0_0_auto] mr-6 sm:mr-10">
                            {/* Card de Imagen con un hover elegante y bordes consitentes */}
                            <div className="relative flex-none w-[280px] sm:w-[350px] aspect-square rounded-[2rem] overflow-hidden bg-white/40 shadow-sm border border-gray-100 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                                <Image
                                    src={img.src}
                                    alt="Automatización, IA y Conectividad satelital"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
