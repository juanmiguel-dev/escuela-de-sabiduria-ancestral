'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { ImageCarousel } from "@/components/ImageCarousel"; // Reutilizar el componente existente

import { m, LazyMotion, domAnimation } from "framer-motion";

interface ImageAsset {
  _key: string;
  imageUrl: string;
  alt?: string;
}

interface ImageGalleryBlockProps {
  title?: string;
  images: ImageAsset[];
  layoutType: 'masonry' | 'slider';
  masonryColumns?: number;
  masonryRows?: number;
}

export function ImageGalleryBlockRenderer({
  title,
  images,
  layoutType,
  masonryColumns = 3,
  masonryRows = 3,
}: ImageGalleryBlockProps) {
  if (!images || images.length === 0) {
    return null;
  }

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const renderMasonry = () => {
    const gridColsClasses: { [key: number]: string } = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    };

    const gridColsClass = gridColsClasses[masonryColumns] || 'grid-cols-3';

    return (
      <div className="my-12">
        {title && (
          <m.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-title text-5xl text-center text-[#5b2c1d] mb-12"
          >
            {title}
          </m.h3>
        )}
        <div
          className={`grid ${gridColsClass} gap-6`}
          style={{ 
            gridTemplateRows: `repeat(${masonryRows}, minmax(180px, 1fr))`
          }}
        >
          {images.filter(img => img.imageUrl).map((image, idx) => (
            <m.div 
              key={image._key} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative w-full aspect-square overflow-hidden rounded-[2rem] shadow-[0_15px_35px_rgba(0,0,0,0.1)] group hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] transition-all duration-500 border border-white/20"
            >
              <Image
                src={image.imageUrl}
                alt={image.alt || 'Gallery image'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </m.div>
          ))}
        </div>
      </div>
    );
  };

  const renderSlider = () => {
    return (
      <div className="my-12">
        {title && (
          <m.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-title text-5xl text-center text-[#5b2c1d] mb-12"
          >
            {title}
          </m.h3>
        )}
        <ImageCarousel minimal images={images.filter(img => img.imageUrl).map(img => ({ id: img._key, src: img.imageUrl, alt: img.alt || 'Slider image' }))} />
      </div>
    );
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
        {layoutType === 'masonry' ? renderMasonry() : renderSlider()}
      </div>
    </LazyMotion>
  );
}
