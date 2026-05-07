'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { ImageCarousel } from "@/components/ImageCarousel"; // Reutilizar el componente existente

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
    return null; // Evitar renderizado en el servidor para componentes con 'use client' y hooks
  }

  const renderMasonry = () => {
    const gridColsClass = `grid-cols-${masonryColumns}`;
    const gridRowsClass = `grid-rows-${masonryRows}`;

    return (
      <div className="my-12">
        {title && <h3 className="font-title text-3xl text-center text-[#5b2c1d] mb-8">{title}</h3>}
        <div
          className={`grid ${gridColsClass} gap-4 auto-rows-fr`} // auto-rows-fr para filas flexibles
          style={{ gridTemplateRows: `repeat(${masonryRows}, minmax(0, 1fr))` }}
        >
          {images.map((image) => (
            <div key={image._key} className="relative w-full h-full overflow-hidden rounded-lg shadow-md">
              <Image
                src={image.imageUrl}
                alt={image.alt || 'Gallery image'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSlider = () => {
    return (
      <div className="my-12">
        {title && <h3 className="font-title text-3xl text-center text-[#5b2c1d] mb-8">{title}</h3>}
        <ImageCarousel images={images.map(img => ({ src: img.imageUrl, alt: img.alt || 'Slider image' }))} />
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
      {layoutType === 'masonry' ? renderMasonry() : renderSlider()}
    </div>
  );
}
