"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useState, useEffect } from "react";

interface NavbarProps {
  theme?: "light" | "dark";
  position?: "absolute" | "sticky";
}

export function Navbar({ theme = "dark", position = "absolute" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navBgClass = scrolled 
    ? (isLight ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 py-3 shadow-sm' : 'bg-black/40 backdrop-blur-xl border-b border-white/10 py-3 shadow-xl')
    : (isLight ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-4' : 'bg-transparent py-6');

  const textColorClass = isLight ? 'text-gray-800' : 'text-white/90';

  return (
    <header className={`fixed top-0 left-0 w-full px-6 sm:px-12 z-[100] flex items-center justify-between transition-all duration-500 ease-in-out ${navBgClass}`}>
      <NextLink href="/" className="relative z-10">
        <Image
          src="/logo.png"
          alt="Romina Castañeda Logo"
          width={176}
          height={58}
          className={`w-[100px] sm:w-[130px] md:w-[150px] h-auto object-contain transition-all duration-500 ${isLight ? 'filter invert opacity-90' : 'drop-shadow-sm'} ${scrolled ? 'scale-95' : 'scale-100'}`}
          priority
        />
      </NextLink>
      
      <div className="flex items-center gap-4 lg:gap-8">
        <nav className={`hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-bold tracking-[0.1em] uppercase ${textColorClass}`}>
          <NextLink href="/" className={`transition-all duration-300 hover:opacity-100 opacity-80 ${isLight ? 'hover:text-[#5b2c1d]' : 'hover:text-white'}`}>Inicio</NextLink>
          <NextLink href="/formaciones" className={`transition-all duration-300 hover:opacity-100 opacity-80 ${isLight ? 'hover:text-[#5b2c1d]' : 'hover:text-white'}`}>Formaciones</NextLink>
          <NextLink href="/sesiones" className={`transition-all duration-300 hover:opacity-100 opacity-80 ${isLight ? 'hover:text-[#5b2c1d]' : 'hover:text-white'}`}>Agendar Sesión</NextLink>
          <NextLink href="/contacto" className={`transition-all duration-300 hover:opacity-100 opacity-80 ${isLight ? 'hover:text-[#5b2c1d]' : 'hover:text-white'}`}>Contacto</NextLink>
        </nav>
        
        <NextLink 
          href="/portal" 
          className={`text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase transition-all duration-500 px-5 py-2.5 sm:px-7 sm:py-3 rounded-full shadow-lg hover:shadow-[#5b2c1d]/20 hover:-translate-y-0.5 active:translate-y-0 bg-[#5b2c1d] text-white hover:bg-[#4a2317]`}
        >
          Portal
        </NextLink>
      </div>
    </header>
  );
}