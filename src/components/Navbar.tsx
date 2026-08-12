"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import { getTallerCount, getCursoCount } from "@/sanity/lib/queries";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  theme?: "light" | "dark";
  position?: "absolute" | "sticky";
}

export function Navbar({ theme = "dark", position = "absolute" }: NavbarProps) {
  const isLight = theme === "light";
  const [showTalleres, setShowTalleres] = useState(false);
  const [showCursos, setShowCursos] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function checkSections() {
      try {
        const [tallerCount, cursoCount] = await Promise.all([
          getTallerCount(),
          getCursoCount(),
        ]);
        setShowTalleres(tallerCount > 0);
        setShowCursos(cursoCount > 0);
      } catch (e) {
        console.error("Error fetching section counts:", e);
      }
    }
    checkSections();
  }, []);

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Formaciones", href: "/formaciones" },
    ...(showCursos ? [{ label: "Cursos", href: "/cursos" }] : []),
    ...(showTalleres ? [{ label: "Talleres", href: "/#talleres" }] : []),
    { label: "Agendar Sesión", href: "/sesiones" },
    { label: "Contacto", href: "/contacto" },
  ];
  
  return (
    <header className={`${position} top-0 left-0 w-full px-6 sm:px-12 z-[100] flex items-center justify-between transition-all duration-300 ${isLight ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-4' : 'bg-transparent py-6'}`}>
      <NextLink href="/" className="relative z-[110]">
        <Image
          src="/logo.png"
          alt="Romina Castañeda Logo"
          width={176}
          height={58}
          className={`w-[110px] sm:w-[145px] md:w-[176px] h-auto object-contain transition-all duration-300 ${isLight ? 'filter invert opacity-90' : 'drop-shadow-sm'}`}
          priority
        />
      </NextLink>
      
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium ${isLight ? 'text-gray-800' : 'text-white/90'}`}>
          {navLinks.map((link) => (
            <NextLink 
              key={link.href} 
              href={link.href} 
              className={`transition-colors ${isLight ? 'hover:text-[#5b2c1d]' : 'hover:text-white'}`}
            >
              {link.label}
            </NextLink>
          ))}
        </nav>
        
        {/* Portal Button (Desktop & Mobile) */}
        <NextLink 
          href="/portal" 
          className={`hidden sm:inline-flex text-xs sm:text-sm font-bold tracking-wider uppercase transition-all px-5 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 bg-[#5b2c1d] text-white hover:bg-[#4a2317]`}
        >
          Portal
        </NextLink>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`relative z-[110] p-2 md:hidden transition-colors ${isLight ? 'text-gray-900' : 'text-white'}`}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#fdfbf7] z-[105] flex flex-col items-center justify-center p-12 md:hidden"
          >
            {/* Fondo decorativo sutil */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
               <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#5b2c1d] rounded-full blur-[120px]" />
               <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4af37] rounded-full blur-[120px]" />
            </div>

            <nav className="flex flex-col items-center gap-8 text-center relative z-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  <NextLink 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-3xl sm:text-4xl font-title text-[#5b2c1d] hover:text-[#d4af37] transition-colors"
                  >
                    {link.label}
                  </NextLink>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.1 }}
                className="pt-8"
              >
                <NextLink 
                  href="/portal" 
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex bg-[#5b2c1d] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl"
                >
                  Portal de Alumnos
                </NextLink>
              </motion.div>
            </nav>

            {/* Redes Sociales sutiles al final */}
            <div className="absolute bottom-12 left-0 w-full text-center text-[#a09e9a] text-xs font-bold tracking-[0.3em] uppercase">
               Escuela de Sabiduría Ancestral
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}