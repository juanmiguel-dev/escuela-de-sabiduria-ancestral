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
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-12 bg-black/50 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        className="relative w-full max-w-7xl h-[80vh] bg-black/20 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Encabezado del Modal */}
                        <div className="relative z-50 flex justify-between items-center p-6 sm:p-8">
                            <h3 className="text-white text-2xl sm:text-4xl font-bold tracking-tight">{title}</h3>
                            <button
                                onClick={onClose}
                                className="bg-black/50 hover:bg-white hover:text-black text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/20 cursor-pointer"
                            >
                                <X size={28} strokeWidth={2} />
                            </button>
                        </div>

                        {/* Contenido del Carrusel (ocupa el resto del espacio) */}
                        <div className="flex-grow flex items-center justify-center min-h-0">
                            <ImageCarousel images={images} minimal={true} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
