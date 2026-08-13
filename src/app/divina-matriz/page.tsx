"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
  RefreshCw
} from "lucide-react";

export default function DivinaMatrizPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

          <div className="pt-6">
            <a
              href="#unirme"
              className="inline-flex items-center gap-3 bg-[#cba72f] hover:bg-[#b59325] text-[#241a00] font-bold text-base sm:text-lg rounded-full px-10 py-5 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-wider"
            >
              <Sparkles className="w-5 h-5" />
              SÍ, QUIERO UNIRME
            </a>
          </div>
        </motion.div>
      </section>

      {/* Introducción */}
      <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBRTAnI1IrRe3sUnj-UMPNt2-MkcoScZxPEau7B3tl6gXMXOG_SzUSbYs6xXR44uNMQTl6xQMTa2fMRP2WeeM3RNQXhlJWCR0aztDPNJFWJEGm5LnH7p62G8I6MaWJ70J8u1JlkMYeV9mfQ85BkaZ615VE4x5oR4hEXIkvDo3zFuJlC8zTvhmh_AzvM5pofBURGAvJj0keA00B5fYJ85aNBL4IkMClm0CR4bXDS0lExYJOY7HGrUlB"
                alt="Manos en el útero"
                fill
                className="object-cover"
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
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 rounded-full bg-[#702e1d]/10 text-[#702e1d] flex items-center justify-center shrink-0 mt-1">
                  <Heart className="w-5 h-5" />
                </div>
                <p className="text-gray-700 text-base leading-relaxed font-light">
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
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center hover:border-[#702e1d]/30 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#cba72f]/10 text-[#735c00] flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-xl font-medium text-[#702e1d] mb-2">
                  {b.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed font-light">
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
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-light">
              Un currículo paso a paso diseñado para transformar tu relación contigo misma.
            </p>
          </div>

          <div className="space-y-6">
            {curriculum.map((m, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:border-[#702e1d]/40 transition-all text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#702e1d] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {m.module}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#702e1d] font-medium">
                    {m.title}
                  </h4>
                </div>
                <p className="text-gray-700 text-base mb-4 font-light leading-relaxed">
                  {m.description}
                </p>
                <div className="bg-[#f5f3ef] p-4 rounded-xl flex items-start gap-3 border border-gray-200/50">
                  <Headphones className="w-5 h-5 text-[#cba72f] shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-800 font-medium">
                    <strong className="text-[#702e1d]">Activación:</strong> {m.activation}
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
            <p className="text-white/80 text-center mb-10 max-w-3xl mx-auto font-light text-base sm:text-lg">
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
                <div key={i} className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 text-center text-sm font-medium">
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
                  <li key={i} className="flex items-start gap-3 text-base font-light text-white/90">
                    <CheckCircle className="w-5 h-5 text-[#ffe088] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-3 bg-[#cba72f] hover:bg-[#b59325] text-[#241a00] font-bold text-lg rounded-full px-12 py-5 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-wider"
                >
                  <Flame className="w-6 h-6" />
                  SÍ, QUIERO SANAR MI ÚTERO AHORA
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
                className="bg-white p-8 rounded-2xl shadow-sm relative text-left border border-gray-100 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Quote className="w-10 h-10 text-[#cba72f]/30 absolute top-6 right-6" />
                <p className="text-gray-700 italic font-light leading-relaxed mb-6 relative z-10 text-base">
                  "{t.quote}"
                </p>
                <p className="font-bold text-[#702e1d] text-sm uppercase tracking-wider">
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
              className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 font-serif text-lg sm:text-xl text-[#702e1d] font-medium"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-6 h-6 text-[#cba72f] transition-transform duration-300 shrink-0 ${
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
                    <div className="px-6 pb-6 text-gray-700 font-light leading-relaxed border-t border-gray-100 pt-4 text-base">
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
