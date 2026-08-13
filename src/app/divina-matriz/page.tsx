"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import mujerImg from "./mujer.jpg";
import {
  Heart,
  Headphones,
  CheckCircle,
  Quote,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Sun,
  Flame,
  Activity,
  Users,
  Award,
  BookOpen,
  Star,
  RefreshCw,
  ArrowDown
} from "lucide-react";

export default function DivinaMatrizPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showTopBar, setShowTopBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowTopBar(true);
      } else {
        setShowTopBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const faqs = [
    {
      q: "¿Necesito tener conocimientos previos de energía o espiritualidad?",
      a: "No. El curso está diseñado para guiarte paso a paso, desde lo más básico hasta lo más profundo, de manera amorosa y accesible."
    },
    {
      q: "No tengo matriz/útero físico (histerectomía), ¿este curso es para mí?",
      a: "¡Totalmente SÍ! El centro energético (chakra sacro/matriz) sigue intacto. De hecho, sanar el duelo del útero físico es un proceso hermoso que vivirás aquí."
    },
    {
      q: "Ya pasé la menopausia, ¿me sirve?",
      a: "Sí. La menopausia es la etapa de la 'Mujer Sabia'. Tu energía ya no fluye hacia afuera (sangre), sino hacia adentro (sabiduría). Este curso te ayudará a asentar ese poder."
    },
    {
      q: "¿Cuánto tiempo me lleva a la semana?",
      a: "Con 2 horas a la semana (entre ver la clase y hacer la activación) es suficiente. Tienes acceso de por vida para hacerlo a tu propio ritmo."
    }
  ];

  const curriculum = [
    {
      module: "Módulo 1",
      title: "El Útero como Portal Sagrado",
      description: "Anatomía física y energética del útero. Comprendiendo la 'vasija de creación'.",
      activation: "Meditación de Reconexión con el Latido Uterino."
    },
    {
      module: "Módulo 2",
      title: "Detox de Memorias Uterinas",
      description: "Cómo el útero guarda traumas, miedos y creencias. Identificación de fugas energéticas.",
      activation: "Limpieza y Drenaje Energético del Útero."
    },
    {
      module: "Módulo 3",
      title: "La Luna y tu Sangre",
      description: "Las 4 fases del ciclo menstrual y su correlación emocional/energética. Sanando la visión cultural de la menstruación (y qué pasa en la menopausia).",
      activation: "Honrando la Sangre Sagrada (Ritual de siembra o resignificación)."
    },
    {
      module: "Módulo 4",
      title: "Los Arquetipos Femeninos Heridos",
      description: "La niña herida, la mártir, la competidora. Cómo estos arquetipos viven en tu útero y cómo transformarlos a la Reina y la Bruja/Sabia.",
      activation: "Rescate de la Niña y Coronación de la Reina."
    },
    {
      module: "Módulo 5",
      title: "El Útero Materno y el Linaje",
      description: "Sanación del vínculo materno. Lo que heredaste en el útero de tu madre. El peso de las abuelas.",
      activation: "Corte de Lazos de Dolor con el Linaje Materno e Integración de su Fuerza."
    },
    {
      module: "Módulo 6",
      title: "Corte de Lazos Tóxicos",
      description: "Exparejas, energía sexual estancada, y abortos (físicos o energéticos). Cómo recuperar tu energía de otras personas.",
      activation: "Despido Energético de Vínculos del Pasado."
    },
    {
      module: "Módulo 7",
      title: "Dar a Luz a tu Nueva Versión",
      description: "Activación de la creatividad. El útero como imán de manifestación. Trazando tu nuevo camino.",
      activation: "Rito del Útero (Bendición de Creación)."
    }
  ];

  const benefits = [
    {
      title: "Sanación del linaje",
      desc: "Corte de lazos de dolor intergeneracional.",
      icon: Users
    },
    {
      title: "Reconexión",
      desc: "Escucha la voz intuitiva de tu útero.",
      icon: Sparkles
    },
    {
      title: "Claridad y Creatividad",
      desc: "Desbloqueo de tu energía creadora para manifestar proyectos y abundancia.",
      icon: Sun
    },
    {
      title: "Aceptación Corporal",
      desc: "Mejora en la relación con tu cuerpo, tu ciclo y tu sexualidad.",
      icon: ShieldCheck
    },
    {
      title: "Salud Cíclica",
      desc: "Herramientas energéticas y emocionales para aliviar síntomas del ciclo.",
      icon: Activity
    },
    {
      title: "Amor Propio Profundo",
      desc: "Un sentido renovado de merecimiento y dignidad.",
      icon: Heart
    },
    {
      title: "Liberación",
      desc: "Limpieza de vínculos tóxicos o del pasado que drenan tu energía.",
      icon: RefreshCw
    },
    {
      title: "Empoderamiento",
      desc: "Habitar tu poder femenino sin miedo ni culpa.",
      icon: Award
    }
  ];

  const targetAudience = [
    "Sienten desconexión, bloqueo o dolor en su zona pélvica/útero (incluso si no tienes útero físico, el útero energético permanece).",
    "Buscan sanar la relación con su madre y su linaje materno.",
    "Sienten que la culpa, el miedo o la vergüenza limitan su vida o su sexualidad.",
    "Están pasando por desequilibrios hormonales, ciclos irregulares o transición a la menopausia y buscan un enfoque integrativo.",
    "Desean potenciar su creatividad, intuición y magnetismo.",
    "Anhelan atraer relaciones (de pareja, amistad o trabajo) más sanas y alineadas desde un útero despejado de 'basura' energética."
  ];

  const testimonials = [
    {
      quote: "Nunca imaginé que mi dolor menstrual tenía tanto que ver con las historias de mi mamá y mi abuela. El Módulo 5 me voló la cabeza. Hoy mis ciclos son mucho más amables y siento una paz que no conocía.",
      author: "Mariana, 32 años"
    },
    {
      quote: "Llegué al curso sintiéndome vacía y desconectada de mi feminidad tras una relación tóxica. El ritual de corte de lazos fue un antes y un después. Recuperé mi energía vital y mis ganas de crear.",
      author: "Sofía, 28 años"
    },
    {
      quote: "No tengo útero físico por una histerectomía, y dudaba en hacer el curso. Fue la mejor decisión. Entendí que mi útero energético sigue ahí y pude sanar el duelo de su pérdida física. Me siento entera de nuevo.",
      author: "Aldy, 45 años"
    },
    {
      quote: "Estaba estancada en mi emprendimiento. Al hacer el detox de útero, descubrí que albergaba miedo al éxito de mis ancestras. Hoy mi creatividad fluye y mi negocio empezó a despegar. Literalmente di a luz a mi proyecto.",
      author: "Sil, 37 años"
    }
  ];

  return (
    <main className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] font-sans selection:bg-[#702e1d] selection:text-white">
      {/* Header Unificado */}
      <Navbar theme="dark" position="absolute" />

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center text-center px-6 sm:px-12 overflow-hidden bg-[#702e1d] text-white pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeZpo2viMiIttJFD_-2gyQiL5nQEngquW4CQC5VNQ0Pp0v5uDlh1kGsf0NRMZh9TNVEpDJx0g4dnSfG4yksswD6TueUIvd-yCjwM1dG0OFTbJ13IQS-q6Vtiy6_z3gsqtVOQJCRntkR4wivLXURvnYxR3I8VYG-LyMjEuRLabmKlL4OMkXKcqvMyswroJiBpjwIA_hLUKl9Arh34tOh3yL6RQvYWcwwJIDplLph15qeJ6YX73SSwEs"
            alt="Divina Matriz Banner"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#702e1d]/80 to-[#fbf9f5]" />

          {/* Capas de Geometría Sagrada / Uterina Sutil */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Geometría Central Vesica Piscis / Matriz */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] opacity-15 text-[#ffe088]">
              <svg viewBox="0 0 400 400" className="w-full h-full animate-pulse">
                <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="200" cy="130" r="90" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="200" cy="270" r="90" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="130" cy="200" r="90" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="270" cy="200" r="90" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <path d="M200 30 C 90 120, 70 280, 200 370 C 330 280, 310 120, 200 30 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
                <path d="M200 30 C 130 140, 150 260, 200 370" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <path d="M200 30 C 270 140, 250 260, 200 370" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </svg>
            </div>

            {/* Ilustración Uterina Botánica Esquina Inferior Izquierda */}
            <div className="absolute -bottom-16 -left-16 w-96 h-96 opacity-25 text-[#ffe088] rotate-12">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path d="M100 180 C 40 160, 20 80, 100 20 C 180 80, 160 160, 100 180 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <path d="M100 20 C 60 60, 80 120, 100 180" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M100 20 C 140 60, 120 120, 100 180" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Fases Lunares & Ondas Esquina Superior Derecha */}
            <div className="absolute -top-16 -right-16 w-96 h-96 opacity-25 text-[#ffe088] -rotate-12">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                <path d="M20 100 Q 100 20 180 100 Q 100 180 20 100 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            </div>
          </div>
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-[#ffe088] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase border border-white/20 shadow-sm">
            7 Semanas — 7 Clases — 7 Activaciones
          </span>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif tracking-tight drop-shadow-md text-[#ffe088] mt-2">
            Divina Matriz
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white/90 font-light italic">
            El Despertar de tu Útero Creador
          </h2>

          <p className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mt-2 font-light">
            Un viaje espiritual, terapéutico y energético hacia el centro de tu poder femenino. Sana memorias, libera bloqueos y reconecta con tu sabiduría cíclica.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <a
              href="https://wa.me/5492234480139?text=Hola%20Romi!%20Quiero%20sumarme%20al%20curso%20Divina%20Matriz"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#cba72f] via-[#e5c147] to-[#cba72f] hover:from-[#b59325] hover:to-[#b59325] text-[#241a00] font-bold text-base sm:text-lg rounded-full px-7 sm:px-9 py-4 sm:py-5 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-wider border border-[#ffe088]/50"
            >
              <Sparkles className="w-5 h-5 text-[#702e1d]" />
              <span>SÍ, QUIERO UNIRME</span>
              <span className="bg-[#702e1d] text-[#ffe088] text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full border border-[#ffe088]/40 shadow-inner tracking-tight lowercase">
                33 USD
              </span>
            </a>
            <a
              href="#introduccion"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-base sm:text-lg rounded-full px-8 py-5 backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-wider"
            >
              VER MÁS
              <ArrowDown className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Top Bar Pegajoso en Scroll */}
      <AnimatePresence>
        {showTopBar && (
          <motion.div
            initial={{ opacity: 0, y: -70 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -70 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-[120] bg-[#702e1d]/95 backdrop-blur-md border-b border-[#cba72f]/40 shadow-xl px-6 sm:px-12 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg sm:text-2xl text-[#ffe088] font-bold tracking-wide drop-shadow-sm">
                Divina Matriz
              </span>
              <span className="hidden md:inline-block text-xs text-white/70 font-light border-l border-white/20 pl-3">
                El Despertar de tu Útero Creador
              </span>
            </div>

            <a
              href="https://wa.me/5492234480139?text=Hola%20Romi!%20Quiero%20sumarme%20al%20curso%20Divina%20Matriz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#cba72f] hover:bg-[#b59325] text-[#241a00] font-bold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4" />
              <span>QUIERO SUMARME</span>
              <span className="bg-[#702e1d] text-[#ffe088] text-xs font-black px-2.5 py-0.5 rounded-full border border-[#ffe088]/40 shadow-inner tracking-tight lowercase">
                33 USD
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Introducción */}
      <section id="introduccion" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto scroll-mt-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="relative">
            <div className="rounded-t-[8rem] rounded-b-3xl overflow-hidden shadow-2xl relative z-10 aspect-[3/4] max-w-md mx-auto">
              <Image
                src={mujerImg}
                alt="Manos en el útero / Sanación femenina"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
            <div className="absolute top-6 -left-6 w-full h-full rounded-t-[8rem] rounded-b-3xl border-2 border-[#702e1d]/20 -z-10 hidden sm:block" />
          </div>

          <div className="flex flex-col gap-6 text-left">
            <h3 className="text-3xl sm:text-5xl font-serif text-[#702e1d] leading-tight">
              Tu útero es un portal sagrado de creación.
            </h3>
            <div className="w-16 h-1 bg-[#cba72f] rounded-full" />
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-light">
              Divina Matriz no es solo un curso; es un camino de retorno a casa. Durante siglos, la sabiduría de nuestro centro creador ha sido silenciada, llenándose de memorias de dolor, linaje y creencias limitantes.
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-light">
              Este programa de 7 semanas está diseñado para guiarte suavemente a través de las capas de tu ser, limpiando el terreno de tu útero (físico o energético) para que vuelva a florecer. Es un espacio terapéutico donde convergen la espiritualidad, la energía y la psicología profunda femenina.
            </p>
            <p className="text-[#702e1d] text-lg font-serif italic border-l-4 border-[#cba72f] pl-4 py-1">
              "Cuando sanas tu útero, sanas tu capacidad de dar vida a tus sueños, proyectos y a tu propio ser."
            </p>
          </div>
        </motion.div>
      </section>

      {/* Target Audience */}
      <section className="py-20 px-6 sm:px-12 bg-[#f5f3ef] border-y border-gray-200/60">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl sm:text-5xl font-serif text-[#702e1d] text-center mb-14">
            Este programa es ideal para mujeres que...
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {targetAudience.map((item, idx) => (
              <motion.div
                key={idx}
                className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200/80 flex items-start gap-4 transition-all duration-500 hover:bg-[#702e1d] hover:border-purple-500/60 hover:shadow-[0_0_25px_rgba(147,51,234,0.4),0_0_50px_rgba(168,85,247,0.2)] hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 rounded-full bg-[#702e1d]/10 text-[#702e1d] group-hover:bg-white/20 group-hover:text-[#ffe088] flex items-center justify-center shrink-0 mt-1 transition-colors duration-500">
                  <Heart className="w-5 h-5" />
                </div>
                <p className="text-gray-700 font-normal group-hover:text-white text-base leading-relaxed transition-colors duration-500">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto text-center">
        <h3 className="text-3xl sm:text-5xl font-serif text-[#702e1d] mb-14">
          Beneficios que Obtendrás
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={idx}
                className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col items-center transition-all duration-500 hover:bg-[#702e1d] hover:border-purple-500/60 hover:shadow-[0_0_25px_rgba(147,51,234,0.4),0_0_50px_rgba(168,85,247,0.2)] hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#cba72f]/10 text-[#735c00] group-hover:bg-white/20 group-hover:text-[#ffe088] flex items-center justify-center mb-4 transition-colors duration-500">
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-xl font-normal text-[#702e1d] group-hover:text-[#ffe088] mb-2 transition-colors duration-500">
                  {b.title}
                </h4>
                <p className="text-gray-600 font-normal group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-500">
                  {b.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 px-6 sm:px-12 bg-[#f5f3ef] border-y border-gray-200/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h3 className="text-3xl sm:text-5xl font-serif text-[#702e1d] mb-4">
              El Viaje de 7 Semanas
            </h3>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-normal">
              Un currículo paso a paso diseñado para transformar tu relación contigo misma.
            </p>
          </div>

          <div className="space-y-6">
            {curriculum.map((m, idx) => (
              <motion.div
                key={idx}
                className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200/80 transition-all duration-500 hover:bg-[#702e1d] hover:border-purple-500/60 hover:shadow-[0_0_25px_rgba(147,51,234,0.4),0_0_50px_rgba(168,85,247,0.2)] hover:-translate-y-1 text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#702e1d] group-hover:bg-[#cba72f] text-white group-hover:text-[#241a00] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider transition-colors duration-500">
                    {m.module}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#702e1d] group-hover:text-[#ffe088] font-normal transition-colors duration-500">
                    {m.title}
                  </h4>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-base mb-4 font-normal leading-relaxed transition-colors duration-500">
                  {m.description}
                </p>
                <div className="bg-[#f5f3ef] group-hover:bg-white/10 group-hover:border-white/20 p-4 rounded-xl flex items-start gap-3 border border-gray-200/50 transition-colors duration-500">
                  <Headphones className="w-5 h-5 text-[#cba72f] group-hover:text-[#ffe088] shrink-0 mt-0.5 transition-colors duration-500" />
                  <p className="text-sm text-gray-800 group-hover:text-white font-normal">
                    <strong className="text-[#702e1d] group-hover:text-[#ffe088]">Activación:</strong> {m.activation}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus & Pack Content */}
      <section id="unirme" className="py-20 px-6 sm:px-12 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-[#702e1d] to-[#4e1d10] text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-5xl font-serif text-[#ffe088] text-center mb-6">
              Bonus Especial: Rituales de Amor Propio
            </h3>
            <p className="text-white/80 text-center mb-10 max-w-3xl mx-auto font-normal text-base sm:text-lg">
              Para complementar tu viaje, te llevas esta guía práctica de rituales diarios para mantener la energía de tu útero vibrante y tu autoestima alta.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {[
                "Ritual de Auto-bendición matutina",
                "Baño Ritual de Limpieza Profunda",
                "Activación de Reconciliación con el Cuerpo",
                "Práctica de Espejo para la Vergüenza",
                "Ritual del Fuego Interno",
                "Audios de apoyo diario (SOS emocional)"
              ].map((bonus, i) => (
                <div
                  key={i}
                  className="group bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 text-center text-sm font-normal transition-all duration-500 hover:bg-white hover:text-[#702e1d] hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:-translate-y-1"
                >
                  {bonus}
                </div>
              ))}
            </div>

            <div className="border-t border-white/20 pt-10">
              <h4 className="text-2xl sm:text-3xl font-serif text-[#ffe088] text-center mb-8">
                Todo lo que te llevas:
              </h4>

              <ul className="space-y-4 max-w-xl mx-auto text-left mb-10">
                {[
                  "7 Clases Magistrales (Acceso de por vida)",
                  "7 Meditaciones / Activaciones Energéticas Uterinas",
                  "Workbook (Cuaderno de Trabajo) para cada semana",
                  "Bonus: Pack 'Rituales de Amor Propio'",
                  "Acceso a la Comunidad 'Círculo Matriz' (Espacio privado de contención)",
                  "1 Sesión de Preguntas y Respuestas Grupal (Grabada)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base font-normal text-white/90">
                    <CheckCircle className="w-5 h-5 text-[#ffe088] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <div className="mb-6 flex flex-col items-center gap-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#ffe088] font-bold">
                    Inversión Especial de Lanzamiento
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl sm:text-5xl font-serif font-bold text-[#ffe088] drop-shadow-md">
                      33 USD
                    </span>
                    <span className="text-sm text-white/50 line-through font-light">
                      120 USD
                    </span>
                  </div>
                </div>

                <a
                  href="https://wa.me/5492234480139?text=Hola%20Romi!%20Quiero%20sanar%20mi%20%C3%BAtero%20ahora%20con%20Divina%20Matriz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#cba72f] via-[#e5c147] to-[#cba72f] hover:from-[#b59325] hover:to-[#b59325] text-[#241a00] font-bold text-base sm:text-xl rounded-full px-8 sm:px-12 py-5 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-wider border border-[#ffe088]/50"
                >
                  <Flame className="w-6 h-6 text-[#702e1d]" />
                  <span>SÍ, QUIERO SANAR MI ÚTERO AHORA</span>
                  <span className="bg-[#702e1d] text-[#ffe088] text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full border border-[#ffe088]/40 shadow-inner tracking-tight lowercase">
                    33 USD
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 sm:px-12 bg-[#f5f3ef] border-y border-gray-200/60">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl sm:text-5xl font-serif text-[#702e1d] text-center mb-14">
            Voces del Círculo
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="group bg-white p-8 rounded-2xl shadow-sm relative text-left border border-gray-200/80 flex flex-col justify-between transition-all duration-500 hover:bg-[#702e1d] hover:border-purple-500/60 hover:shadow-[0_0_25px_rgba(147,51,234,0.4),0_0_50px_rgba(168,85,247,0.2)] hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Quote className="w-10 h-10 text-[#cba72f]/30 group-hover:text-[#ffe088]/40 absolute top-6 right-6 transition-colors duration-500" />
                <p className="text-gray-700 group-hover:text-white/95 italic font-normal leading-relaxed mb-6 relative z-10 text-base transition-colors duration-500">
                  "{t.quote}"
                </p>
                <p className="font-bold text-[#702e1d] group-hover:text-[#ffe088] text-sm uppercase tracking-wider transition-colors duration-500">
                  — {t.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 sm:px-12 max-w-4xl mx-auto">
        <h3 className="text-3xl sm:text-5xl font-serif text-[#702e1d] text-center mb-14">
          Preguntas Frecuentes
        </h3>

        <div className="space-y-4 text-left">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm transition-all duration-500 hover:bg-[#702e1d] hover:border-purple-500/60 hover:shadow-[0_0_25px_rgba(147,51,234,0.4),0_0_50px_rgba(168,85,247,0.2)]"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 font-serif text-lg sm:text-xl text-[#702e1d] group-hover:text-[#ffe088] font-normal transition-colors duration-500"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-6 h-6 text-[#cba72f] group-hover:text-[#ffe088] transition-transform duration-300 shrink-0 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-700 group-hover:text-white/90 font-normal leading-relaxed border-t border-gray-100 group-hover:border-white/20 pt-4 text-base transition-colors duration-500">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Unificado */}
      <Footer />
    </main>
  );
}
