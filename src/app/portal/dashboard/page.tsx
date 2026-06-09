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
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dashboard_theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dashboard_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dashboard_theme", "light");
    }
  }, [dark]);

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
      <div className={`min-h-screen flex ${dark ? 'bg-[#0f0f0f]' : 'bg-[#fdfbf7]'}`}>
        
        {/* Sidebar */}
        <aside className={`hidden lg:flex w-72 flex-col sticky top-0 h-screen ${dark ? 'bg-black text-white/80' : 'bg-[#1a1a1a] text-white'}`}>
          <div className="p-8">
            <Image
              src="/logo.png"
              alt="Logo"
              width={140}
              height={40}
              className="opacity-90 object-contain"
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
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all cursor-pointer ${activeTab === item.id ? 'bg-[#5b2c1d] text-white shadow-lg shadow-[#5b2c1d]/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
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
              className="flex items-center gap-4 text-white/50 hover:text-white transition-colors w-full text-left cursor-pointer"
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
              <h2 className={`text-3xl sm:text-4xl font-title ${dark ? 'text-white' : 'text-[#333333]'}`}>Hola, {alumno.name.split(' ')[0]}</h2>
              <p className={`font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Bienvenido a tu espacio de crecimiento.</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDark(!dark)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${dark ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'bg-[#5b2c1d]/10 text-[#5b2c1d]'}`}
              >
                {dark ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"/>
                  </svg>
                )}
              </button>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${dark ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'bg-[#5b2c1d]/10 text-[#5b2c1d]'}`}>
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
                <h3 className={`text-xl font-black uppercase tracking-widest ${dark ? 'text-white' : 'text-[#333333]'}`}>Mis Formaciones</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {alumno.formaciones?.map((formacion: any) => (
                  <NextLink 
                    key={formacion._id} 
                    href={`/portal/dashboard/formacion/${formacion.slug}`}
                    className={`group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border flex flex-col cursor-pointer ${dark ? 'bg-[#1a1a1a] border-white/5 hover:shadow-black/30' : 'bg-white border-gray-100'}`}
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
                      <h4 className={`text-xl font-bold mb-2 group-hover:text-[#d4af37] transition-colors ${dark ? 'text-white' : 'text-[#333333]'}`}>{formacion.title}</h4>
                      <p className={`text-sm line-clamp-2 mb-6 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{formacion.shortDescription}</p>

                    </div>
                  </NextLink>
                ))}

                {(!alumno.formaciones || alumno.formaciones.length === 0) && (
                  <div className={`col-span-full py-20 text-center rounded-3xl border-2 border-dashed ${dark ? 'bg-[#1a1a1a] border-white/5 text-gray-400' : 'bg-white border-gray-100 text-gray-400'}`}>
                    <p className="font-medium">Aún no estás inscrito en ninguna formación.</p>
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
              <h3 className={`text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-[#333333]'}`}>Próximas Sesiones</h3>
              <p className={dark ? 'text-gray-400' : 'text-gray-500'}>No tienes sesiones programadas por el momento.</p>
              <NextLink href="/sesiones" className="mt-8 inline-block bg-[#5b2c1d] text-white px-8 py-3 rounded-full font-bold">Agendar Sesión</NextLink>
            </m.div>
          )}

          {activeTab === 'perfil' && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-2xl p-10 rounded-3xl shadow-sm border ${dark ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-gray-100'}`}
            >
              <h3 className={`text-2xl font-bold mb-8 ${dark ? 'text-white' : 'text-[#333333]'}`}>Información del Perfil</h3>
              <div className="space-y-6">
                <div>
                  <label className={`block text-xs font-black uppercase mb-2 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Nombre Completo</label>
                  <p className={`text-lg font-bold ${dark ? 'text-white' : 'text-[#333333]'}`}>{alumno.name}</p>
                </div>
                <div>
                  <label className={`block text-xs font-black uppercase mb-2 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Email</label>
                  <p className={`text-lg font-bold ${dark ? 'text-white' : 'text-[#333333]'}`}>{alumno.email}</p>
                </div>
                <div className="pt-8">
                  <button className={`text-sm font-bold hover:underline cursor-pointer ${dark ? 'text-[#d4af37]' : 'text-[#5b2c1d]'}`}>Cambiar Contraseña</button>
                </div>
              </div>
            </m.div>
          )}
        </main>
      </div>
    </LazyMotion>
  );
}
