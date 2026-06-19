"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Suspense } from "react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token || !email) {
      setError("El enlace de recuperación es inválido o está incompleto.");
    } else {
      // Si ambos están presentes, nos aseguramos de no mostrar error inicial
      setError("");
    }
  }, [token, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !email) return;

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newPassword: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Ocurrió un error. Reintenta luego.");
      } else {
        setSuccess("¡Contraseña actualizada exitosamente!");
        setTimeout(() => {
          router.push("/portal");
        }, 3000);
      }
    } catch (err) {
      console.error("Reset error:", err);
      setError("Ocurrió un error de red. Reintenta luego.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <h2 className="text-2xl font-bold text-[#333333] mb-2">Crear nueva contraseña</h2>
        <p className="text-sm text-gray-500">
          Para tu cuenta {email}
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
            {success} Redirigiendo al login...
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Nueva Contraseña</label>
          <input
            type="password"
            required
            disabled={!token || !email || !!success}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b2c1d] focus:ring-2 focus:ring-[#5b2c1d]/20 outline-none transition-all bg-[#fdfbf7]"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Confirmar Contraseña</label>
          <input
            type="password"
            required
            disabled={!token || !email || !!success}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b2c1d] focus:ring-2 focus:ring-[#5b2c1d]/20 outline-none transition-all bg-[#fdfbf7]"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !token || !email || !!success}
          className={`w-full bg-[#5b2c1d] hover:bg-[#4a2317] text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-3 ${loading || !token || !email || success ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
          {loading ? "Actualizando..." : "Actualizar Contraseña"}
        </button>
      </form>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans relative">
      <Navbar theme="light" />

      <div className="flex-1 flex items-center justify-center p-6 mt-16 sm:mt-0">
        <Suspense fallback={<div className="p-10 text-center">Cargando...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
