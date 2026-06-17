"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { getAlumnoByEmail } from "@/sanity/lib/queries";

export default function PortalAlumnos() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Búsqueda de alumno en Sanity por email
      const alumno = await getAlumnoByEmail(email);

      if (alumno && alumno.isActive) {
        // Mock de sesión: guardamos en localStorage
        localStorage.setItem("alumno_email", email);
        localStorage.setItem("alumno_name", alumno.name);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Ocurrió un error al intentar ingresar. Reintenta luego.");
      } else {
        localStorage.setItem("alumno_email", data.alumno.email);
        localStorage.setItem("alumno_name", data.alumno.name);
        router.push("/portal/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Ocurrió un error de red. Reintenta luego.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfbf7] flex flex-col md:flex-row font-sans relative">
      {/* Navbar superpuesta */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar theme="dark" position="absolute" />
      </div>

      {/* Mitad Izquierda - Imagen / Branding */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative overflow-hidden bg-black">
        <Image
          src="/inicio.JPG"
          alt="Fondo Portal"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-8 sm:p-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg mb-4">
              Tu viaje <br />
              <span className="text-[#d4af37] italic font-medium">interior</span>
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-md">
              Bienvenido de nuevo al Portal de Alumnos. Accede a tus formaciones y continúa tu camino de aprendizaje.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mitad Derecha - Formulario de Login */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-screen flex items-center justify-center p-8 sm:p-16 relative">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-10">
            <Image
              src="/logo.png"
              alt="Romina Castañeda Logo"
              width={200}
              height={60}
              className="h-16 w-auto mx-auto mb-6 object-contain grayscale opacity-80"
            />
            <h2 className="text-2xl font-bold text-[#333333]">Iniciar Sesión</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b2c1d] focus:ring-2 focus:ring-[#5b2c1d]/20 outline-none transition-all bg-white"
                placeholder="tu@correo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b2c1d] focus:ring-2 focus:ring-[#5b2c1d]/20 outline-none transition-all bg-white"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-[#5b2c1d] focus:ring-[#5b2c1d]" />
                <span className="text-gray-600">Recordarme</span>
              </label>
              <NextLink href="/portal/recuperar-password" className="font-bold text-[#5b2c1d] hover:underline">
                ¿Olvidaste tu contraseña?
              </NextLink>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#5b2c1d] hover:bg-[#4a2317] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              {loading ? "Verificando..." : "Ingresar al Portal"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            ¿Aún no eres alumno?{" "}
            <NextLink href="/#formaciones" className="font-bold text-[#5b2c1d] hover:underline">
              Ver formaciones
            </NextLink>
          </p>
        </motion.div>
      </div>
    </main>
  );
}