"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    videoSrc: string;
}

export function VideoModal({ isOpen, onClose, title, videoSrc }: VideoModalProps) {
    // Manejar bloqueo de scroll cuando el modal esta abierto
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
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 bg-black/50 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 30, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 30, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.6)] border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Botón de cierre elegante */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 bg-black/40 hover:bg-white hover:text-black text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/20 cursor-pointer"
                        >
                            <X size={28} strokeWidth={2} />
                        </button>

                        {/* Reproductor Real */}
                        <video
                            src={videoSrc}
                            controls
                            autoPlay
                            className="w-full h-full object-contain bg-black"
                            controlsList="nodownload"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
