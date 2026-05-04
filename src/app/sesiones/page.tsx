"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { motion } from "framer-motion";

export default function SesionesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulamos un envío de formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-[#5b2c1d] selection:text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full px-6 py-6 sm:px-12 z-50 flex items-center justify-between bg-transparent">
        <NextLink href="/">
          <Image
            src="/logo.png"
            alt="Romina Castañeda Logo"
            width={220}
            height={73}
            className="w-[160px] sm:w-[220px] h-auto object-contain drop-shadow-sm"
            priority
          />
        </NextLink>
        <NextLink 
          href="/" 
          className="text-sm font-bold text-white tracking-wider hover:text-gray-200 transition-colors drop-shadow-md uppercase"
        >
          Volver al Inicio
        </NextLink>
      </header>

      {/* Hero Header para Sesiones */}
      <section className="relative h-[45vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/inicio-2.jpeg"
          alt="Fondo Sesiones"
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
            Acompañamiento Personalizado
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white drop-shadow-lg font-title tracking-wide">
            Reserva tu Sesión
          </h1>
        </motion.div>
      </section>

      {/* Contenedor del Formulario */}
      <section className="relative z-30 max-w-3xl mx-auto px-6 pb-24 -mt-16 sm:-mt-24">
        <motion.div 
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="p-8 sm:p-12">
            {!isSuccess ? (
              <>
                <div className="text-center mb-10">
                  <p className="text-gray-600 text-lg">
                    Completa el siguiente formulario para solicitar un espacio. Me pondré en contacto contigo a la brevedad para confirmar la disponibilidad.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Nombre */}
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700">Nombre Completo</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b2c1d] focus:ring-2 focus:ring-[#5b2c1d]/20 outline-none transition-all bg-gray-50/50"
                        placeholder="Ej. Ana García"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700">Correo Electrónico</label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b2c1d] focus:ring-2 focus:ring-[#5b2c1d]/20 outline-none transition-all bg-gray-50/50"
                        placeholder="tu@correo.com"
                      />
                    </div>

                    {/* Día deseado */}
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700">Día de Preferencia</label>
                      <input 
                        type="date" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b2c1d] focus:ring-2 focus:ring-[#5b2c1d]/20 outline-none transition-all bg-gray-50/50 text-gray-700"
                      />
                    </div>

                    {/* Hora deseada */}
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700">Horario de Preferencia</label>
                      <select 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b2c1d] focus:ring-2 focus:ring-[#5b2c1d]/20 outline-none transition-all bg-gray-50/50 text-gray-700"
                      >
                        <option value="">Selecciona un horario</option>
                        <option value="manana">Mañana (9:00 - 13:00)</option>
                        <option value="tarde">Tarde (14:00 - 18:00)</option>
                        <option value="noche">Noche (18:00 - 21:00)</option>
                      </select>
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Motivo de Consulta (Opcional)</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b2c1d] focus:ring-2 focus:ring-[#5b2c1d]/20 outline-none transition-all bg-gray-50/50 resize-none"
                      placeholder="Cuéntame brevemente qué te gustaría trabajar en nuestra sesión..."
                    ></textarea>
                  </div>

                  {/* Submit */}
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
                          Enviando Solicitud...
                        </>
                      ) : (
                        "Solicitar Reserva"
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <motion.div 
                className="text-center py-16 space-y-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-24 h-24 bg-[#5b2c1d]/10 text-[#5b2c1d] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <h2 className="text-3xl font-black text-[#333333]">¡Solicitud Recibida!</h2>
                <p className="text-gray-600 text-lg max-w-md mx-auto">
                  Gracias por tu interés. Me pondré en contacto contigo al correo que proporcionaste para confirmar la fecha y hora de nuestra sesión.
                </p>
                <div className="pt-8">
                  <NextLink href="/" className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-8 py-3 rounded-xl transition-colors">
                    Volver al Inicio
                  </NextLink>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100 flex flex-col items-center justify-center">
        <Image
          src="/logo.png"
          alt="Romina Castañeda Footer Logo"
          width={140}
          height={45}
          className="h-10 w-auto object-contain opacity-40 grayscale"
        />
      </footer>
    </main>
  );
}