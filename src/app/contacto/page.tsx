"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { motion } from "framer-motion";

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] font-sans selection:bg-[#5b2c1d] selection:text-white flex flex-col">
      {/* Header Minimalista (Fondo blanco puro, estilo Apple) */}
      <header className="w-full px-6 py-4 sm:px-12 z-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 border-b border-gray-200/50">
        <NextLink href="/">
          <Image
            src="/logo.png"
            alt="Romina Castañeda Logo"
            width={160}
            height={53}
            className="w-[120px] sm:w-[160px] h-auto object-contain filter invert"
            priority
          />
        </NextLink>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-800">
            <NextLink href="/" className="hover:text-[#5b2c1d] transition-colors">Inicio</NextLink>
            <NextLink href="/formaciones" className="hover:text-[#5b2c1d] transition-colors">Formaciones</NextLink>
            <NextLink href="/sesiones" className="hover:text-[#5b2c1d] transition-colors">Agendar Sesión</NextLink>
          </nav>
          <NextLink 
            href="/portal" 
            className="text-xs font-bold text-[#5b2c1d] tracking-wider hover:opacity-70 transition-opacity uppercase"
          >
            Portal
          </NextLink>
        </div>
      </header>

      {/* Contenido Principal */}
      <div className="flex-grow flex items-center justify-center px-6 py-24 sm:py-32">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Texto / Copywriting */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1d1d1f] leading-[1.05]">
              Hablemos.
            </h1>
            <p className="text-xl sm:text-2xl text-[#86868b] font-medium leading-relaxed max-w-md">
              Estamos aquí para acompañarte. Escríbenos para resolver tus dudas sobre formaciones, sesiones o colaboraciones.
            </p>
            
            <div className="pt-8 space-y-4">
              <div>
                <p className="text-sm font-bold text-[#1d1d1f] uppercase tracking-widest mb-1">Email Directo</p>
                <a href="mailto:hola@rominacastaneda.com" className="text-lg text-[#0066cc] hover:underline">hola@rominacastaneda.com</a>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1d1d1f] uppercase tracking-widest mb-1">Redes Sociales</p>
                <div className="flex gap-4">
                  <a href="#" className="text-lg text-[#0066cc] hover:underline">Instagram</a>
                  <a href="#" className="text-lg text-[#0066cc] hover:underline">YouTube</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulario Estilo Apple */}
          <motion.div 
            className="bg-white p-8 sm:p-12 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#86868b] ml-1">Nombre</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-5 py-4 bg-[#f5f5f7] hover:bg-[#ebebeb] focus:bg-white rounded-2xl border-2 border-transparent focus:border-[#0066cc] focus:ring-4 focus:ring-[#0066cc]/10 outline-none transition-all text-[#1d1d1f] font-medium"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#86868b] ml-1">Apellido</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 bg-[#f5f5f7] hover:bg-[#ebebeb] focus:bg-white rounded-2xl border-2 border-transparent focus:border-[#0066cc] focus:ring-4 focus:ring-[#0066cc]/10 outline-none transition-all text-[#1d1d1f] font-medium"
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#86868b] ml-1">Correo electrónico</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-5 py-4 bg-[#f5f5f7] hover:bg-[#ebebeb] focus:bg-white rounded-2xl border-2 border-transparent focus:border-[#0066cc] focus:ring-4 focus:ring-[#0066cc]/10 outline-none transition-all text-[#1d1d1f] font-medium"
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#86868b] ml-1">Mensaje</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full px-5 py-4 bg-[#f5f5f7] hover:bg-[#ebebeb] focus:bg-white rounded-2xl border-2 border-transparent focus:border-[#0066cc] focus:ring-4 focus:ring-[#0066cc]/10 outline-none transition-all text-[#1d1d1f] font-medium resize-none"
                    placeholder="¿En qué te podemos ayudar?"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full bg-[#1d1d1f] text-white font-medium py-4 rounded-2xl transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:bg-black hover:scale-[1.02] active:scale-[0.98]'}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      "Enviar mensaje"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div 
                className="text-center py-12 space-y-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1d1d1f]">Mensaje enviado</h3>
                <p className="text-[#86868b] max-w-sm mx-auto">
                  Gracias por comunicarte. Hemos recibido tu mensaje y te responderemos a la brevedad.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-[#0066cc] font-medium hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Footer Minimalista */}
      <footer className="py-8 bg-white border-t border-gray-200/50 flex items-center justify-center">
        <p className="text-xs text-[#86868b] font-medium">© {new Date().getFullYear()} Romina Castañeda. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}