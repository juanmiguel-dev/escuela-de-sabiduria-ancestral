"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import { getTallerCount } from "@/sanity/lib/queries";

interface NavbarProps {
  theme?: "light" | "dark";
  position?: "absolute" | "sticky";
}

export function Navbar({ theme = "dark", position = "absolute" }: NavbarProps) {
  const isLight = theme === "light";
  const [showTalleres, setShowTalleres] = useState(false);

  useEffect(() => {
    async function checkTalleres() {
      try {
        const count = await getTallerCount();
        setShowTalleres(count > 0);
      } catch (e) {
        console.error("Error fetching taller count:", e);
      }
    }
    checkTalleres();
  }, []);
  
  return (
    <header className={`${position} top-0 left-0 w-full px-6 sm:px-12 z-50 flex items-center justify-between transition-all duration-300 ${isLight ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-4' : 'bg-transparent py-6'}`}>
      <NextLink href="/">
        <Image
          src="/logo.png"
          alt="Romina Castañeda Logo"
          width={176}
          height={58}
          className={`w-[110px] sm:w-[145px] md:w-[176px] h-auto object-contain transition-all duration-300 ${isLight ? 'filter invert opacity-90' : 'drop-shadow-sm'}`}
          priority
        />
      </NextLink>
      
      <div className="flex items-center gap-6 lg:gap-8">
        <nav className={`hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium ${isLight ? 'text-gray-800' : 'text-white/90'}`}>
          <NextLink href="/" className={`transition-colors ${isLight ? 'hover:text-[#5b2c1d]' : 'hover:text-white'}`}>Inicio</NextLink>
          <NextLink href="/formaciones" className={`transition-colors ${isLight ? 'hover:text-[#5b2c1d]' : 'hover:text-white'}`}>Formaciones</NextLink>
          {showTalleres && (
            <NextLink href="/#talleres" className={`transition-colors ${isLight ? 'hover:text-[#5b2c1d]' : 'hover:text-white'}`}>Talleres</NextLink>
          )}
          <NextLink href="/sesiones" className={`transition-colors ${isLight ? 'hover:text-[#5b2c1d]' : 'hover:text-white'}`}>Agendar Sesión</NextLink>
          <NextLink href="/contacto" className={`transition-colors ${isLight ? 'hover:text-[#5b2c1d]' : 'hover:text-white'}`}>Contacto</NextLink>
        </nav>
        
        <NextLink 
          href="/portal" 
          className={`text-xs sm:text-sm font-bold tracking-wider uppercase transition-all px-5 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 bg-[#5b2c1d] text-white hover:bg-[#4a2317]`}
        >
          Portal de Alumnos
        </NextLink>
      </div>
    </header>
  );
}