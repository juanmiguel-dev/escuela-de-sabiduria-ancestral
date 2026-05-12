'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface HeroSlide {
  mediaType: 'image' | 'video';
  imageUrl?: string;
  videoUrl?: string;
  videoFileUrl?: string;
  title?: string;
  subtitle?: string;
  button1Text?: string;
  button1Link?: string;
  button2Text?: string;
  button2Link?: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  if (!slides || slides.length === 0) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black" ref={emblaRef}>
      <div className="flex h-full">
        {slides.map((slide, index) => (
          <div key={index} className="relative flex-[0_0_100%] h-full overflow-hidden">
            {/* Media Background */}
            <div className="absolute inset-0 z-0">
              {slide.mediaType === 'image' ? (
                <Image
                  src={slide.imageUrl || "/inicio.JPG"}
                  alt={slide.title || "Hero Image"}
                  fill
                  className="object-cover opacity-60"
                  priority={index === 0}
                />
              ) : (
                <div className="absolute inset-0 bg-black">
                  {slide.videoFileUrl ? (
                    <video
                      src={slide.videoFileUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover opacity-60"
                    />
                  ) : slide.videoUrl ? (
                    <iframe
                      src={`${slide.videoUrl}?autoplay=1&mute=1&loop=1&controls=0&background=1`}
                      className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60"
                      allow="autoplay; fullscreen"
                    />
                  ) : null}
                </div>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
              <AnimatePresence mode="wait">
                {selectedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl space-y-8"
                  >
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-title text-white drop-shadow-2xl leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto font-medium italic drop-shadow-lg">
                      {slide.subtitle}
                    </p>

                    <div className="pt-10 flex flex-wrap justify-center gap-5">
                      {slide.button1Text && (
                        <a 
                          href={slide.button1Link || "#"} 
                          className="inline-flex items-center justify-center bg-[#5b2c1d] hover:bg-[#4a2317] text-white px-10 py-4 rounded-full font-bold transition-all shadow-[0_10px_30px_rgba(91,44,29,0.4)] text-sm sm:text-base uppercase tracking-[0.2em] hover:-translate-y-1"
                        >
                          {slide.button1Text}
                        </a>
                      )}
                      {slide.button2Text && (
                        <a 
                          href={slide.button2Link || "#"} 
                          className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl text-sm sm:text-base uppercase tracking-[0.2em] hover:-translate-y-1"
                        >
                          {slide.button2Text}
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                selectedIndex === index ? 'bg-[#d4af37] w-10' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
