"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
    <main className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-[#5b2c1d] selection:text-white">
      <Navbar theme="dark" position="absolute" />

      {/* Hero Header para Contacto */}
      <section className="relative h-[45vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/inicio-2.jpeg"
          alt="Fondo Contacto"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-transparent to-black/40 z-10" />
        
        <motion.div 
          className="relative z-20 text-center mt-12 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block text-xs sm:text-sm text-[#d4af37] font-bold tracking-[0.3em] uppercase mb-4 drop-shadow-md">
            Conecta con nosotros
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white drop-shadow-lg font-title tracking-wide">
            Contacto
          </h1>
        </motion.div>
      </section>

      {/* Contenedor del Formulario y Texto */}
      <section className="relative z-30 max-w-6xl mx-auto px-6 pb-24 -mt-16 sm:-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Texto / Copywriting */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 lg:sticky lg:top-32"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#333333] mb-6">
              Hablemos.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Estamos aquí para acompañarte. Escríbenos para resolver tus dudas sobre formaciones, sesiones o colaboraciones.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#5b2c1d]/10 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5b2c1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Email Directo</p>
                  <a href="mailto:hola@rominacastaneda.com" className="text-lg text-[#5b2c1d] hover:text-[#4a2317] font-medium transition-colors">hola@rominacastaneda.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#5b2c1d]/10 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5b2c1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Redes Sociales</p>
                  <div className="flex gap-4">
                    <a href="#" className="text-lg text-[#5b2c1d] hover:text-[#4a2317] font-medium transition-colors">Instagram</a>
                    <a href="#" className="text-lg text-[#5b2c1d] hover:text-[#4a2317] font-medium transition-colors">YouTube</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div 
            className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Nombre</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b2c1d] focus:ring-2 focus:ring-[#5b2c1d]/20 outline-none transition-all bg-gray-50/50"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Apellido</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b2c1d] focus:ring-2 focus:ring-[#5b2c1d]/20 outline-none transition-all bg-gray-50/50"
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Correo electrónico</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b2c1d] focus:ring-2 focus:ring-[#5b2c1d]/20 outline-none transition-all bg-gray-50/50"
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Mensaje</label>
                  <textarea 
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b2c1d] focus:ring-2 focus:ring-[#5b2c1d]/20 outline-none transition-all bg-gray-50/50 resize-none"
                    placeholder="¿En qué te podemos ayudar?"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full bg-[#5b2c1d] hover:bg-[#4a2317] text-white font-bold py-4 rounded-xl transition-all shadow-lg text-lg flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-xl'}`}
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
                className="text-center py-16 space-y-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-24 h-24 bg-[#5b2c1d]/10 text-[#5b2c1d] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-3xl font-black text-[#333333]">¡Mensaje enviado!</h3>
                <p className="text-gray-600 text-lg max-w-md mx-auto">
                  Gracias por comunicarte. Hemos recibido tu mensaje y te responderemos a la brevedad.
                </p>
                <div className="pt-8">
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-8 py-3 rounded-xl transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
      
      {/* Footer Unificado */}
      <Footer />
    </main>
  );
}