'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { ImageCarousel } from "@/components/ImageCarousel";
import { motion } from "framer-motion";

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
    if (images.length === 1) {
      const image = images[0];
      return (
        <div className="my-16 flex justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] group"
          >
            <Image
              src={image.imageUrl}
              alt={image.alt || 'Featured image'}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>
        </div>
      );
    }

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
      <div className="my-20">
        {title && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="font-title text-4xl sm:text-6xl text-[#5b2c1d]">
              {title}
            </h3>
          </motion.div>
        )}
        <div
          className={`grid ${gridColsClass} gap-8 px-4`}
          style={{ 
            gridTemplateRows: `repeat(${masonryRows}, minmax(200px, 1fr))`
          }}
        >
          {images.filter(img => img.imageUrl).map((image, idx) => (
            <motion.div 
              key={image._key} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.08, ease: "easeOut" }}
              className="relative w-full aspect-square overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] group hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-700 border border-white/50"
            >
              <Image
                src={image.imageUrl}
                alt={image.alt || 'Gallery image'}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderSlider = () => {
    return (
      <div className="my-20">
        {title && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="font-title text-4xl sm:text-6xl text-[#5b2c1d]">
              {title}
            </h3>
          </motion.div>
        )}
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(91,44,29,0.1)] border border-[#f0eee9]"
        >
          <ImageCarousel minimal images={images.filter(img => img.imageUrl).map(img => ({ id: img._key, src: img.imageUrl, alt: img.alt || 'Slider image' }))} />
        </motion.div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
      {layoutType === 'masonry' ? renderMasonry() : renderSlider()}
    </div>
  );
}
