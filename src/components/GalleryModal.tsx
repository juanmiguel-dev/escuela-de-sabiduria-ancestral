"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageCarousel } from "./ImageCarousel"; // Reutilizamos el carrusel!

interface GalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    images: { id: string | number; src: string; }[];
}

export function GalleryModal({ isOpen, onClose, title, images }: GalleryModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-12 bg-black/80 backdrop-blur-xl cursor-pointer"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        className="relative w-full h-full flex flex-col pointer-events-none cursor-default"
                    >
                        {/* Encabezado del Modal (Transparente) */}
                        <div className="relative z-50 flex justify-between items-center px-4 sm:px-8 py-6 pointer-events-auto">
                            <h3 className="text-white text-2xl sm:text-4xl font-bold tracking-tight drop-shadow-lg">{title}</h3>
                            <button
                                onClick={onClose}
                                className="bg-black/40 hover:bg-white hover:text-black text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/20 cursor-pointer"
                            >
                                <X size={28} strokeWidth={2} />
                            </button>
                        </div>

                        {/* Contenido del Carrusel (Sin restricciones de fondo) */}
                        <div className="flex-grow flex items-center justify-center min-h-0 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                            <ImageCarousel images={images} minimal={true} align="center" />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
