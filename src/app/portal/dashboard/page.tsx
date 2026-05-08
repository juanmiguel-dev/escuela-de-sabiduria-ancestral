"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { getAlumnoByEmail } from "@/sanity/lib/queries";

export default function StudentDashboard() {
  const router = useRouter();
  const [alumno, setAlumno] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("mis-cursos");

  useEffect(() => {
    const userEmail = localStorage.getItem("alumno_email");
    
    if (!userEmail) {
      router.push("/portal");
      return;
    }

    async function loadAlumno() {
      try {
        const data = await getAlumnoByEmail(userEmail!);
        if (!data) {
          router.push("/portal");
          return;
        }
        setAlumno(data);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAlumno();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#5b2c1d] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!alumno || !alumno.isActive) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold text-[#333333] mb-4">Acceso Denegado</h1>
        <p className="text-gray-600 mb-8 max-w-md">No se encontró una cuenta activa con este correo. Por favor, contacta con soporte si crees que esto es un error.</p>
        <NextLink href="/portal" className="bg-[#5b2c1d] text-white px-8 py-3 rounded-full font-bold">Volver al Login</NextLink>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#fdfbf7] flex">
        
        {/* Sidebar */}
        <aside className="hidden lg:flex w-72 bg-[#1a1a1a] flex-col sticky top-0 h-screen text-white">
          <div className="p-8">
            <Image
              src="/logo.png"
              alt="Logo"
              width={140}
              height={40}
              className="brightness-0 invert opacity-90 object-contain"
            />
          </div>

          <nav className="flex-grow px-4 space-y-2 mt-8">
            {[
              { id: 'mis-cursos', label: 'Mis Formaciones', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
              { id: 'sesiones', label: 'Mis Sesiones', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
              { id: 'perfil', label: 'Mi Perfil', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-[#5b2c1d] text-white shadow-lg shadow-[#5b2c1d]/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                </svg>
                <span className="font-bold text-sm uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-8 mt-auto border-t border-white/10">
            <button 
              onClick={() => {
                localStorage.removeItem("alumno_email");
                localStorage.removeItem("alumno_name");
                router.push("/portal");
              }}
              className="flex items-center gap-4 text-white/50 hover:text-white transition-colors w-full text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span className="font-bold text-xs uppercase tracking-widest">Salir</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6 sm:p-12 lg:p-16 overflow-y-auto max-h-screen">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-title text-[#333333]">Hola, {alumno.name.split(' ')[0]}</h2>
              <p className="text-gray-500 font-medium">Bienvenido a tu espacio de crecimiento.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#5b2c1d]/10 flex items-center justify-center text-[#5b2c1d] font-bold text-lg">
                {alumno.name[0]}
              </div>
            </div>
          </header>

          {/* Cursos Enrolados */}
          {activeTab === 'mis-cursos' && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#333333] uppercase tracking-widest">Mis Formaciones</h3>
                <span className="text-sm font-bold text-[#5b2c1d] bg-[#5b2c1d]/5 px-4 py-1 rounded-full">
                  {alumno.formaciones?.length || 0} cursos
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {alumno.formaciones?.map((formacion: any) => (
                  <NextLink 
                    key={formacion._id} 
                    href={`/portal/dashboard/formacion/${formacion.slug}`}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {formacion.imageUrl && (
                        <Image
                          src={formacion.imageUrl}
                          alt={formacion.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white text-[#5b2c1d] px-6 py-2 rounded-full font-bold shadow-lg">Entrar al curso</span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h4 className="text-xl font-bold text-[#333333] mb-2 group-hover:text-[#5b2c1d] transition-colors">{formacion.title}</h4>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-6">{formacion.shortDescription}</p>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-[#d4af37]"></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-[10px] font-black uppercase text-gray-400">Progreso</span>
                        <span className="text-[10px] font-black uppercase text-[#d4af37]">33%</span>
                      </div>
                    </div>
                  </NextLink>
                ))}

                {(!alumno.formaciones || alumno.formaciones.length === 0) && (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                    <p className="text-gray-400 font-medium">Aún no estás inscrito en ninguna formación.</p>
                    <NextLink href="/#formaciones" className="text-[#5b2c1d] font-bold mt-4 inline-block hover:underline">Explorar cursos</NextLink>
                  </div>
                )}
              </div>
            </m.div>
          )}

          {activeTab === 'sesiones' && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold text-[#333333] mb-2">Próximas Sesiones</h3>
              <p className="text-gray-500">No tienes sesiones programadas por el momento.</p>
              <NextLink href="/sesiones" className="mt-8 inline-block bg-[#5b2c1d] text-white px-8 py-3 rounded-full font-bold">Agendar Sesión</NextLink>
            </m.div>
          )}

          {activeTab === 'perfil' && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-[#333333] mb-8">Información del Perfil</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-2">Nombre Completo</label>
                  <p className="text-lg font-bold text-[#333333]">{alumno.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-2">Email</label>
                  <p className="text-lg font-bold text-[#333333]">{alumno.email}</p>
                </div>
                <div className="pt-8">
                  <button className="text-sm font-bold text-[#5b2c1d] hover:underline">Cambiar Contraseña</button>
                </div>
              </div>
            </m.div>
          )}
        </main>
      </div>
    </LazyMotion>
  );
}
