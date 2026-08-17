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
      <div className={`min-h-screen flex transition-colors duration-300 font-sans ${dark ? 'bg-[#0a0a0c] text-white' : 'bg-[#f7f6f2] text-[#1c1c1e]'}`}>
        
        {/* Sidebar */}
        <aside className={`hidden lg:flex w-72 flex-col sticky top-0 h-screen border-r transition-colors ${dark ? 'bg-[#0e0e12] text-white/80 border-white/[0.08]' : 'bg-white text-gray-800 border-black/[0.06]'}`}>
          <div className="p-8 pb-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={140}
              height={40}
              className="opacity-90 object-contain"
            />
          </div>

          <nav className="flex-grow px-4 space-y-1.5 mt-8">
            {[
              { id: 'mis-cursos', label: 'Mis Formaciones', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
              { id: 'sesiones', label: 'Mis Sesiones', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
              { id: 'perfil', label: 'Mi Perfil', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all cursor-pointer border ${
                    isActive 
                      ? dark 
                        ? 'bg-[#d4af37]/15 text-[#f5d77f] border-[#d4af37]/30 shadow-sm' 
                        : 'bg-[#5b2c1d] text-white border-[#5b2c1d] shadow-sm'
                      : dark 
                        ? 'text-white/60 hover:bg-white/[0.04] hover:text-white border-transparent' 
                        : 'text-gray-600 hover:bg-black/[0.03] hover:text-gray-900 border-transparent'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d={item.icon}></path>
                  </svg>
                  <span className="font-semibold text-xs tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-6 mt-auto border-t border-white/[0.06]">
            <button 
              onClick={() => {
                localStorage.removeItem("alumno_email");
                localStorage.removeItem("alumno_name");
                router.push("/portal");
              }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-colors w-full text-left cursor-pointer ${
                dark ? 'text-white/40 hover:text-white hover:bg-white/[0.04]' : 'text-gray-500 hover:text-gray-900 hover:bg-black/[0.03]'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6 sm:p-10 lg:p-14 overflow-y-auto max-h-screen">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/[0.06]">
            <div>
              <span className={`text-[11px] font-semibold tracking-widest uppercase ${dark ? 'text-[#d4af37]' : 'text-[#5b2c1d]'}`}>
                Portal de Alumnos
              </span>
              <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight mt-1 ${dark ? 'text-white' : 'text-[#1c1c1e]'}`}>
                Hola, {alumno.name.split(' ')[0]}
              </h2>
              <p className={`text-xs sm:text-sm mt-0.5 ${dark ? 'text-white/50' : 'text-gray-500'}`}>
                Bienvenido a tu espacio de crecimiento y aprendizaje.
              </p>
            </div>
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <button
                onClick={() => setDark(!dark)}
                title={dark ? "Modo Claro" : "Modo Oscuro"}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                  dark ? 'bg-white/[0.05] border-white/[0.08] text-[#d4af37] hover:bg-white/[0.1]' : 'bg-black/[0.04] border-black/[0.06] text-[#5b2c1d] hover:bg-black/[0.08]'
                }`}
              >
                {dark ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"/>
                  </svg>
                )}
              </button>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border ${
                dark ? 'bg-[#d4af37]/15 border-[#d4af37]/30 text-[#f5d77f]' : 'bg-[#5b2c1d]/10 border-[#5b2c1d]/20 text-[#5b2c1d]'
              }`}>
                {alumno.name[0]}
              </div>
            </div>
          </header>

          {/* Cursos Enrolados */}
          {activeTab === 'mis-cursos' && (
            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-base font-semibold tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
                  Tus Cursos y Formaciones
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {alumno.formaciones?.map((formacion: any) => (
                  <NextLink 
                    key={formacion._id} 
                    href={`/portal/dashboard/formacion/${formacion.slug}`}
                    className={`group rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col cursor-pointer ${
                      dark 
                        ? 'bg-[#121217] border-white/[0.08] hover:border-white/20 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]' 
                        : 'bg-white border-black/[0.06] hover:border-black/15 shadow-sm hover:shadow-lg'
                    }`}
                  >
                    <div className="relative aspect-video overflow-hidden bg-black/40">
                      {formacion.imageUrl ? (
                        <Image
                          src={formacion.imageUrl}
                          alt={formacion.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                        <span className="bg-white/95 text-black px-5 py-2 rounded-full font-semibold text-xs shadow-xl tracking-tight flex items-center gap-1.5">
                          Ingresar al curso &rarr;
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <h4 className={`text-base font-semibold tracking-tight mb-2 group-hover:text-[#d4af37] transition-colors ${dark ? 'text-white' : 'text-gray-900'}`}>
                          {formacion.title}
                        </h4>
                        <p className={`text-xs line-clamp-2 leading-relaxed ${dark ? 'text-white/50' : 'text-gray-500'}`}>
                          {formacion.shortDescription || 'Acceso al contenido y material exclusivo.'}
                        </p>
                      </div>
                      <div className="pt-5 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[#d4af37] tracking-tight">
                          Contenido habilitado
                        </span>
                        <span className={`text-xs font-semibold group-hover:translate-x-1 transition-transform ${dark ? 'text-white/60' : 'text-gray-700'}`}>
                          Ver clases &rarr;
                        </span>
                      </div>
                    </div>
                  </NextLink>
                ))}

                {(!alumno.formaciones || alumno.formaciones.length === 0) && (
                  <div className={`col-span-full py-16 text-center rounded-3xl border border-dashed ${dark ? 'bg-white/[0.02] border-white/10 text-white/40' : 'bg-white border-black/10 text-gray-400'}`}>
                    <p className="text-sm font-medium">Aún no estás inscrito en ninguna formación.</p>
                    <NextLink href="/#formaciones" className="text-[#d4af37] font-semibold text-xs mt-3 inline-block hover:underline">Explorar cursos</NextLink>
                  </div>
                )}
              </div>
            </m.div>
          )}

          {activeTab === 'sesiones' && (
            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-4 text-[#d4af37]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>Próximas Sesiones</h3>
              <p className={`text-xs max-w-sm mx-auto mb-6 ${dark ? 'text-white/40' : 'text-gray-500'}`}>No tienes sesiones individuales programadas por el momento.</p>
              <NextLink href="/sesiones" className="inline-flex items-center gap-2 bg-[#5b2c1d] text-white px-6 py-2.5 rounded-full font-semibold text-xs tracking-wide shadow-md hover:brightness-110 transition-all">Agendar Sesión</NextLink>
            </m.div>
          )}

          {activeTab === 'perfil' && (
            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`max-w-xl p-8 rounded-3xl border ${dark ? 'bg-[#121217] border-white/[0.08]' : 'bg-white border-black/[0.06] shadow-sm'}`}
            >
              <h3 className={`text-lg font-semibold tracking-tight mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>Información del Perfil</h3>
              <div className="space-y-5">
                <div className={`p-4 rounded-2xl border ${dark ? 'bg-white/[0.02] border-white/[0.05]' : 'bg-gray-50 border-black/[0.04]'}`}>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${dark ? 'text-white/40' : 'text-gray-400'}`}>Nombre Completo</label>
                  <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{alumno.name}</p>
                </div>
                <div className={`p-4 rounded-2xl border ${dark ? 'bg-white/[0.02] border-white/[0.05]' : 'bg-gray-50 border-black/[0.04]'}`}>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${dark ? 'text-white/40' : 'text-gray-400'}`}>Email</label>
                  <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{alumno.email}</p>
                </div>
              </div>
            </m.div>
          )}
        </main>
      </div>
    </LazyMotion>
  );
}
