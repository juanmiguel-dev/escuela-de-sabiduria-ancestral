"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

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

    return (
        <div className="relative group w-full">
            <div className="overflow-hidden py-10 px-4 sm:px-8 cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex flex-row items-center">
                    {images.map((img) => (
                        <div key={img.id} className="relative z-10 hover:z-50 shrink-0 flex-[0_0_auto] mr-6 sm:mr-10">
                            {/* Card de Imagen con un hover elegante y bordes consitentes, fondo se ajusta si es oscuro */}
                            <div className={`relative flex-none w-[280px] sm:w-[350px] aspect-square rounded-[2rem] overflow-hidden shadow-sm transition-transform duration-500 hover:scale-105 hover:shadow-2xl ${dark ? 'border border-white/10 bg-black/20' : 'bg-white/40 border-gray-100'}`}>
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
