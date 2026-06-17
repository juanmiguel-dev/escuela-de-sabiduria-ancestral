"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

export default function RecuperarPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch('/api/auth/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Ocurrió un error. Reintenta luego.");
      } else {
        setSuccess(data.message || "Si el correo existe, recibirás un enlace de recuperación.");
        setEmail("");
      }
    } catch (err) {
      console.error("Reset request error:", err);
      setError("Ocurrió un error de red. Reintenta luego.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans relative">
      <Navbar theme="light" />

      <div className="flex-1 flex items-center justify-center p-6 mt-16 sm:mt-0">
        <motion.div 
          className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-[#f0eee9]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <Image
              src="/logo.png"
              alt="Romina Castañeda Logo"
              width={160}
              height={50}
              className="h-12 w-auto mx-auto mb-6 object-contain grayscale opacity-80"
            />
            <h2 className="text-2xl font-bold text-[#333333] mb-2">Recuperar Contraseña</h2>
            <p className="text-sm text-gray-500">
              Ingresa el correo electrónico asociado a tu cuenta y te enviaremos las instrucciones.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm font-medium border border-green-100">
                {success}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b2c1d] focus:ring-2 focus:ring-[#5b2c1d]/20 outline-none transition-all bg-[#fdfbf7]"
                placeholder="tu@correo.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !!success}
              className={`w-full bg-[#5b2c1d] hover:bg-[#4a2317] text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-3 ${loading || success ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              {loading ? "Enviando..." : "Enviar Enlace"}
            </button>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-gray-100">
            <NextLink href="/portal" className="text-sm font-bold text-[#5b2c1d] hover:underline flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Volver al inicio de sesión
            </NextLink>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
