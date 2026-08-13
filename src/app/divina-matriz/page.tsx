"use client";

import { HtmlCourseViewer } from "@/components/HtmlCourseViewer";
import { Navbar } from "@/components/Navbar";

const DIVINA_MATRIZ_HTML = `<!DOCTYPE html>
<html class="light" lang="es"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Divina Matriz: El Despertar de tu Útero Creador</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&amp;family=Plus+Jakarta+Sans:wght@400;600&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "surface-container": "#efeeea",
                      "primary-fixed-dim": "#ffb4a3",
                      "background": "#fbf9f5",
                      "inverse-on-surface": "#f2f0ed",
                      "surface-container-low": "#f5f3ef",
                      "error": "#ba1a1a",
                      "inverse-primary": "#ffb4a3",
                      "surface": "#fbf9f5",
                      "on-primary-fixed-variant": "#763221",
                      "on-error-container": "#93000a",
                      "surface-container-high": "#eae8e4",
                      "secondary-container": "#fecbcb",
                      "tertiary-fixed-dim": "#e9c349",
                      "on-secondary": "#ffffff",
                      "secondary-fixed": "#ffdad9",
                      "error-container": "#ffdad6",
                      "outline-variant": "#dac1bc",
                      "on-background": "#1b1c1a",
                      "surface-container-highest": "#e4e2de",
                      "tertiary-container": "#cba72f",
                      "on-tertiary-fixed": "#241a00",
                      "on-primary-container": "#ffc3b5",
                      "surface-bright": "#fbf9f5",
                      "secondary": "#7b5455",
                      "on-error": "#ffffff",
                      "secondary-fixed-dim": "#ecbaba",
                      "primary-fixed": "#ffdad2",
                      "on-primary": "#ffffff",
                      "surface-dim": "#dbdad6",
                      "inverse-surface": "#30312e",
                      "on-secondary-container": "#7a5354",
                      "surface-container-lowest": "#ffffff",
                      "surface-variant": "#e4e2de",
                      "primary": "#702e1d",
                      "on-secondary-fixed-variant": "#613d3e",
                      "on-tertiary": "#ffffff",
                      "primary-container": "#8e4432",
                      "on-tertiary-container": "#4e3d00",
                      "on-tertiary-fixed-variant": "#574500",
                      "tertiary-fixed": "#ffe088",
                      "surface-tint": "#944936",
                      "tertiary": "#735c00",
                      "on-surface": "#1b1c1a",
                      "on-primary-fixed": "#3c0700",
                      "outline": "#87726e",
                      "on-secondary-fixed": "#2f1314",
                      "on-surface-variant": "#54433f"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "gutter": "24px",
                      "margin-mobile": "20px",
                      "section-gap": "80px",
                      "unit": "8px",
                      "container-max": "1120px"
              },
              "fontFamily": {
                      "body-lg": [
                              "Plus Jakarta Sans"
                      ],
                      "display-lg-mobile": [
                              "EB Garamond"
                      ],
                      "display-lg": [
                              "EB Garamond"
                      ],
                      "headline-md": [
                              "EB Garamond"
                      ],
                      "headline-sm": [
                              "EB Garamond"
                      ],
                      "body-md": [
                              "Plus Jakarta Sans"
                      ],
                      "label-sm": [
                              "Plus Jakarta Sans"
                      ]
              },
              "fontSize": {
                      "body-lg": [
                              "18px",
                              {
                                      "lineHeight": "1.6",
                                      "fontWeight": "400"
                              }
                      ],
                      "display-lg-mobile": [
                              "36px",
                              {
                                      "lineHeight": "1.2",
                                      "fontWeight": "500"
                              }
                      ],
                      "display-lg": [
                              "48px",
                              {
                                      "lineHeight": "1.1",
                                      "letterSpacing": "-0.02em",
                                      "fontWeight": "500"
                              }
                      ],
                      "headline-md": [
                              "32px",
                              {
                                      "lineHeight": "1.3",
                                      "fontWeight": "400"
                              }
                      ],
                      "headline-sm": [
                              "24px",
                              {
                                      "lineHeight": "1.4",
                                      "fontWeight": "400"
                              }
                      ],
                      "body-md": [
                              "16px",
                              {
                                      "lineHeight": "1.6",
                                      "fontWeight": "400"
                              }
                      ],
                      "label-sm": [
                              "14px",
                              {
                                      "lineHeight": "1.2",
                                      "letterSpacing": "0.05em",
                                      "fontWeight": "600"
                              }
                      ]
              }
            },
          }
        }
    </script>
<style>
        .lunar-glow {
            box-shadow: 0 10px 40px -10px rgba(112, 46, 29, 0.08);
        }
        .lunar-glow:hover {
            box-shadow: 0 15px 50px -10px rgba(112, 46, 29, 0.12);
        }
        .glassmorphism {
            background: rgba(251, 249, 245, 0.7);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
        }
        .input-floating {
            border: none;
            border-bottom: 1px solid #cba72f;
            background: transparent;
            border-radius: 0;
            padding-left: 0;
            padding-right: 0;
        }
        .input-floating:focus {
            box-shadow: none;
            border-bottom: 2px solid #cba72f;
        }
        body {
            min-height: max(884px, 100dvh);
        }
    </style>
</head>
<body class="bg-background text-on-background font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
<!-- TopAppBar -->

<main class="pt-24 pb-section-gap">
<!-- Hero Section -->
<section class="relative w-full min-h-[795px] flex flex-col items-center justify-center text-center px-gutter overflow-hidden bg-surface-container-low py-20">
<div class="absolute inset-0 z-0">
<div class="bg-cover bg-center bg-no-repeat w-full h-full opacity-40" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeZpo2viMiIttJFD_-2gyQiL5nQEngquW4CQC5VNQ0Pp0v5uDlh1kGsf0NRMZh9TNVEpDJx0g4dnSfG4yksswD6TueUIvd-yCjwM1dG0OFTbJ13IQS-q6Vtiy6_z3gsqtVOQJCRntkR4wivLXURvnYxR3I8VYG-LyMjEuRLabmKlL4OMkXKcqvMyswroJiBpjwIA_hLUKl9Arh34tOh3yL6RQvYWcwwJIDplLph15qeJ6YX73SSwEs')"></div>
</div>
<div class="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
<span class="inline-block px-4 py-1.5 rounded-full bg-surface-container text-primary font-label-sm tracking-widest uppercase mb-4 shadow-sm border border-outline-variant/30">7 Semanas — 7 Clases — 7 Activaciones</span>
<h1 class="font-display-lg md:font-display-lg font-display-lg-mobile text-display-lg md:text-display-lg text-display-lg-mobile text-primary mb-2">Divina Matriz</h1>
<h2 class="font-headline-md text-headline-md text-on-surface-variant font-medium mb-6">El Despertar de tu Útero Creador</h2>
<p class="font-body-lg text-body-lg text-on-surface max-w-2xl mx-auto mb-10">
                    Un viaje espiritual, terapéutico y energético hacia el centro de tu poder femenino. Sana memorias, libera bloqueos y reconecta con tu sabiduría cíclica.
                </p>
<button class="bg-primary text-on-primary font-label-sm rounded-full px-10 py-4 shadow-lg hover:shadow-xl hover:bg-primary-container transition-all duration-300 active:scale-95 text-lg">
                    SÍ, QUIERO UNIRME
                </button>
</div>
<!-- Botanical decorative accent -->
<div class="absolute bottom-[-10%] left-[-5%] opacity-20 pointer-events-none rotate-12">
<svg fill="none" height="400" viewbox="0 0 100 100" width="400" xmlns="http://www.w3.org/2000/svg">
<path d="M50 90 C 20 80, 10 40, 50 10 C 90 40, 80 80, 50 90 Z" fill="none" stroke="#702e1d" stroke-width="0.5"></path>
<path d="M50 10 C 30 30, 40 60, 50 90" fill="none" stroke="#702e1d" stroke-width="0.5"></path>
<path d="M50 10 C 70 30, 60 60, 50 90" fill="none" stroke="#702e1d" stroke-width="0.5"></path>
</svg>
</div>
</section>
<!-- Introduction -->
<section class="py-section-gap px-gutter max-w-container-max mx-auto relative">
<div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
<div class="order-2 md:order-1 relative">
<div class="rounded-t-full rounded-b-lg overflow-hidden lunar-glow relative z-10 aspect-[3/4]">
<img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBRTAnI1IrRe3sUnj-UMPNt2-MkcoScZxPEau7B3tl6gXMXOG_SzUSbYs6xXR44uNMQTl6xQMTa2fMRP2WeeM3RNQXhlJWCR0aztDPNJFWJEGm5LnH7p62G8I6MaWJ70J8u1JlkMYeV9mfQ85BkaZ615VE4x5oR4hEXIkvDo3zFuJlC8zTvhmh_AzvM5pofBURGAvJj0keA00B5fYJ85aNBL4IkMClm0CR4bXDS0lExYJOY7HGrUlB"/>
</div>
<div class="absolute top-10 -left-10 w-full h-full rounded-t-full rounded-b-lg border-2 border-outline-variant/40 z-0"></div>
</div>
<div class="order-1 md:order-2 flex flex-col gap-6">
<h3 class="font-headline-md text-headline-md text-primary">Tu útero es un portal sagrado de creación.</h3>
<div class="w-12 h-0.5 bg-tertiary-container mb-4"></div>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Divina Matriz no es solo un curso; es un camino de retorno a casa. Durante siglos, la sabiduría de nuestro centro creador ha sido silenciada, llenándose de memorias de dolor, linaje y creencias limitantes.
                    </p>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Este programa de 7 semanas está diseñado para guiarte suavemente a través de las capas de tu ser, limpiando el terreno de tu útero (físico o energético) para que vuelva a florecer. Es un espacio terapéutico donde convergen la espiritualidad, la energía y la psicología profunda femenina.
                    </p>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed italic mt-4 text-secondary">
                        "Cuando sanas tu útero, sanas tu capacidad de dar vida a tus sueños, proyectos y a tu propio ser."
                    </p>
</div>
</div>
</section>
<!-- Target Audience -->
<section class="py-section-gap px-gutter bg-surface-container-low relative">
<div class="max-w-container-max mx-auto">
<h3 class="font-headline-md text-headline-md text-primary text-center mb-12">Este programa es ideal para mujeres que...</h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
<div class="flex items-start gap-4">
<span class="material-symbols-outlined text-tertiary mt-1">favorite</span>
<p class="font-body-md text-on-surface-variant">Sienten desconexión, bloqueo o dolor en su zona pélvica/útero (incluso si no tienes útero físico, el útero energético permanece).</p>
</div>
<div class="flex items-start gap-4">
<span class="material-symbols-outlined text-tertiary mt-1">favorite</span>
<p class="font-body-md text-on-surface-variant">Buscan sanar la relación con su madre y su linaje materno.</p>
</div>
<div class="flex items-start gap-4">
<span class="material-symbols-outlined text-tertiary mt-1">favorite</span>
<p class="font-body-md text-on-surface-variant">Sienten que la culpa, el miedo o la vergüenza limitan su vida o su sexualidad.</p>
</div>
<div class="flex items-start gap-4">
<span class="material-symbols-outlined text-tertiary mt-1">favorite</span>
<p class="font-body-md text-on-surface-variant">Están pasando por desequilibrios hormonales, ciclos irregulares o transición a la menopausia y buscan un enfoque integrativo.</p>
</div>
<div class="flex items-start gap-4">
<span class="material-symbols-outlined text-tertiary mt-1">favorite</span>
<p class="font-body-md text-on-surface-variant">Desean potenciar su creatividad, intuición y magnetismo.</p>
</div>
<div class="flex items-start gap-4">
<span class="material-symbols-outlined text-tertiary mt-1">favorite</span>
<p class="font-body-md text-on-surface-variant">Anhelan atraer relaciones (de pareja, amistad o trabajo) más sanas y alineadas desde un útero despejado de "basura" energética.</p>
</div>
</div>
</div>
</section>
<!-- Benefits -->
<section class="py-section-gap px-gutter max-w-container-max mx-auto text-center">
<h3 class="font-headline-md text-headline-md text-primary mb-12">Beneficios que Obtendrás</h3>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
<div class="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col items-center">
<span class="material-symbols-outlined text-tertiary-container text-4xl mb-4">psychiatry</span>
<h4 class="font-headline-sm text-primary mb-2">Sanación del linaje</h4>
<p class="font-body-md text-on-surface-variant text-sm">Corte de lazos de dolor intergeneracional.</p>
</div>
<div class="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col items-center">
<span class="material-symbols-outlined text-tertiary-container text-4xl mb-4">self_improvement</span>
<h4 class="font-headline-sm text-primary mb-2">Reconexión</h4>
<p class="font-body-md text-on-surface-variant text-sm">Escucha la voz intuitiva de tu útero.</p>
</div>
<div class="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col items-center">
<span class="material-symbols-outlined text-tertiary-container text-4xl mb-4">brightness_alert</span>
<h4 class="font-headline-sm text-primary mb-2">Claridad y Creatividad</h4>
<p class="font-body-md text-on-surface-variant text-sm">Desbloqueo de tu energía creadora para manifestar proyectos y abundancia.</p>
</div>
<div class="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col items-center">
<span class="material-symbols-outlined text-tertiary-container text-4xl mb-4">health_and_safety</span>
<h4 class="font-headline-sm text-primary mb-2">Aceptación Corporal</h4>
<p class="font-body-md text-on-surface-variant text-sm">Mejora en la relación con tu cuerpo, tu ciclo y tu sexualidad.</p>
</div>
<div class="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col items-center">
<span class="material-symbols-outlined text-tertiary-container text-4xl mb-4">water_drop</span>
<h4 class="font-headline-sm text-primary mb-2">Salud Cíclica</h4>
<p class="font-body-md text-on-surface-variant text-sm">Herramientas energéticas y emocionales para aliviar síntomas del ciclo.</p>
</div>
<div class="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col items-center">
<span class="material-symbols-outlined text-tertiary-container text-4xl mb-4">favorite_border</span>
<h4 class="font-headline-sm text-primary mb-2">Amor Propio Profundo</h4>
<p class="font-body-md text-on-surface-variant text-sm">Un sentido renovado de merecimiento y dignidad.</p>
</div>
<div class="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col items-center">
<span class="material-symbols-outlined text-tertiary-container text-4xl mb-4">group_remove</span>
<h4 class="font-headline-sm text-primary mb-2">Liberación</h4>
<p class="font-body-md text-on-surface-variant text-sm">Limpieza de vínculos tóxicos o del pasado que drenan tu energía.</p>
</div>
<div class="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col items-center">
<span class="material-symbols-outlined text-tertiary-container text-4xl mb-4">security</span>
<h4 class="font-headline-sm text-primary mb-2">Empoderamiento</h4>
<p class="font-body-md text-on-surface-variant text-sm">Habitar tu poder femenino sin miedo ni culpa.</p>
</div>
</div>
</section>
<!-- Curriculum -->
<section class="py-section-gap px-gutter bg-surface-container-low relative">
<div class="max-w-container-max mx-auto">
<h3 class="font-headline-md text-headline-md text-primary text-center mb-4">El Viaje de 7 Semanas</h3>
<p class="font-body-lg text-center text-on-surface-variant mb-12 max-w-2xl mx-auto">Un currículo paso a paso diseñado para transformar tu relación contigo misma.</p>
<div class="space-y-6">
<!-- Módulo 1 -->
<div class="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/30 hover:border-primary/50 transition-colors">
<div class="flex items-center gap-4 mb-4">
<span class="bg-primary-container text-on-primary-container font-label-sm px-3 py-1 rounded-full">Módulo 1</span>
<h4 class="font-headline-sm text-primary">El Útero como Portal Sagrado</h4>
</div>
<p class="font-body-md text-on-surface-variant mb-4">Anatomía física y energética del útero. Comprendiendo la "vasija de creación".</p>
<div class="bg-surface-container-low p-4 rounded-lg flex items-start gap-3">
<span class="material-symbols-outlined text-tertiary">headphones</span>
<p class="font-body-md text-sm text-on-surface-variant"><strong>Activación:</strong> Meditación de Reconexión con el Latido Uterino.</p>
</div>
</div>
<!-- Módulo 2 -->
<div class="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/30 hover:border-primary/50 transition-colors">
<div class="flex items-center gap-4 mb-4">
<span class="bg-primary-container text-on-primary-container font-label-sm px-3 py-1 rounded-full">Módulo 2</span>
<h4 class="font-headline-sm text-primary">Detox de Memorias Uterinas</h4>
</div>
<p class="font-body-md text-on-surface-variant mb-4">Cómo el útero guarda traumas, miedos y creencias. Identificación de fugas energéticas.</p>
<div class="bg-surface-container-low p-4 rounded-lg flex items-start gap-3">
<span class="material-symbols-outlined text-tertiary">headphones</span>
<p class="font-body-md text-sm text-on-surface-variant"><strong>Activación:</strong> Limpieza y Drenaje Energético del Útero.</p>
</div>
</div>
<!-- Módulo 3 -->
<div class="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/30 hover:border-primary/50 transition-colors">
<div class="flex items-center gap-4 mb-4">
<span class="bg-primary-container text-on-primary-container font-label-sm px-3 py-1 rounded-full">Módulo 3</span>
<h4 class="font-headline-sm text-primary">La Luna y tu Sangre</h4>
</div>
<p class="font-body-md text-on-surface-variant mb-4">Las 4 fases del ciclo menstrual y su correlación emocional/energética. Sanando la visión cultural de la menstruación (y qué pasa en la menopausia).</p>
<div class="bg-surface-container-low p-4 rounded-lg flex items-start gap-3">
<span class="material-symbols-outlined text-tertiary">headphones</span>
<p class="font-body-md text-sm text-on-surface-variant"><strong>Activación:</strong> Honrando la Sangre Sagrada (Ritual de siembra o resignificación).</p>
</div>
</div>
<!-- Módulo 4 -->
<div class="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/30 hover:border-primary/50 transition-colors">
<div class="flex items-center gap-4 mb-4">
<span class="bg-primary-container text-on-primary-container font-label-sm px-3 py-1 rounded-full">Módulo 4</span>
<h4 class="font-headline-sm text-primary">Los Arquetipos Femeninos Heridos</h4>
</div>
<p class="font-body-md text-on-surface-variant mb-4">La niña herida, la mártir, la competidora. Cómo estos arquetipos viven en tu útero y cómo transformarlos a la Reina y la Bruja/Sabia.</p>
<div class="bg-surface-container-low p-4 rounded-lg flex items-start gap-3">
<span class="material-symbols-outlined text-tertiary">headphones</span>
<p class="font-body-md text-sm text-on-surface-variant"><strong>Activación:</strong> Rescate de la Niña y Coronación de la Reina.</p>
</div>
</div>
<!-- Módulo 5 -->
<div class="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/30 hover:border-primary/50 transition-colors">
<div class="flex items-center gap-4 mb-4">
<span class="bg-primary-container text-on-primary-container font-label-sm px-3 py-1 rounded-full">Módulo 5</span>
<h4 class="font-headline-sm text-primary">El Útero Materno y el Linaje</h4>
</div>
<p class="font-body-md text-on-surface-variant mb-4">Sanación del vínculo materno. Lo que heredaste en el útero de tu madre. El peso de las abuelas.</p>
<div class="bg-surface-container-low p-4 rounded-lg flex items-start gap-3">
<span class="material-symbols-outlined text-tertiary">headphones</span>
<p class="font-body-md text-sm text-on-surface-variant"><strong>Activación:</strong> Corte de Lazos de Dolor con el Linaje Materno e Integración de su Fuerza.</p>
</div>
</div>
<!-- Módulo 6 -->
<div class="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/30 hover:border-primary/50 transition-colors">
<div class="flex items-center gap-4 mb-4">
<span class="bg-primary-container text-on-primary-container font-label-sm px-3 py-1 rounded-full">Módulo 6</span>
<h4 class="font-headline-sm text-primary">Corte de Lazos Tóxicos</h4>
</div>
<p class="font-body-md text-on-surface-variant mb-4">Exparejas, energía sexual estancada, y abortos (físicos o energéticos). Cómo recuperar tu energía de otras personas.</p>
<div class="bg-surface-container-low p-4 rounded-lg flex items-start gap-3">
<span class="material-symbols-outlined text-tertiary">headphones</span>
<p class="font-body-md text-sm text-on-surface-variant"><strong>Activación:</strong> Despido Energético de Vínculos del Pasado.</p>
</div>
</div>
<!-- Módulo 7 -->
<div class="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/30 hover:border-primary/50 transition-colors">
<div class="flex items-center gap-4 mb-4">
<span class="bg-primary-container text-on-primary-container font-label-sm px-3 py-1 rounded-full">Módulo 7</span>
<h4 class="font-headline-sm text-primary">Dar a Luz a tu Nueva Versión</h4>
</div>
<p class="font-body-md text-on-surface-variant mb-4">Activación de la creatividad. El útero como imán de manifestación. Trazando tu nuevo camino.</p>
<div class="bg-surface-container-low p-4 rounded-lg flex items-start gap-3">
<span class="material-symbols-outlined text-tertiary">headphones</span>
<p class="font-body-md text-sm text-on-surface-variant"><strong>Activación:</strong> Rito del Útero (Bendición de Creación).</p>
</div>
</div>
</div>
</div>
</section>
<!-- Bonus & Pack Content -->
<section class="py-section-gap px-gutter max-w-container-max mx-auto">
<div class="bg-primary-fixed-dim/20 rounded-3xl p-8 md:p-12">
<h3 class="font-headline-md text-primary text-center mb-8">Bonus Especial: Rituales de Amor Propio</h3>
<p class="font-body-md text-on-surface-variant text-center mb-8 max-w-3xl mx-auto">Para complementar tu viaje, te llevas esta guía práctica de rituales diarios para mantener la energía de tu útero vibrante y tu autoestima alta.</p>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
<div class="bg-surface p-4 rounded-xl shadow-sm">
<h5 class="font-label-sm text-primary mb-1">Ritual de Auto-bendición matutina</h5>
</div>
<div class="bg-surface p-4 rounded-xl shadow-sm">
<h5 class="font-label-sm text-primary mb-1">Baño Ritual de Limpieza Profunda</h5>
</div>
<div class="bg-surface p-4 rounded-xl shadow-sm">
<h5 class="font-label-sm text-primary mb-1">Activación de Reconciliación con el Cuerpo</h5>
</div>
<div class="bg-surface p-4 rounded-xl shadow-sm">
<h5 class="font-label-sm text-primary mb-1">Práctica de Espejo para la Vergüenza</h5>
</div>
<div class="bg-surface p-4 rounded-xl shadow-sm">
<h5 class="font-label-sm text-primary mb-1">Ritual del Fuego Interno</h5>
</div>
<div class="bg-surface p-4 rounded-xl shadow-sm">
<h5 class="font-label-sm text-primary mb-1">Audios de apoyo diario (SOS emocional)</h5>
</div>
</div>
<div class="border-t border-outline-variant/30 pt-12">
<h3 class="font-headline-sm text-primary text-center mb-8">Todo lo que te llevas:</h3>
<ul class="space-y-4 max-w-2xl mx-auto">
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-tertiary">check_circle</span>
<span class="font-body-md text-on-surface-variant">7 Clases Magistrales (Acceso de por vida)</span>
</li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-tertiary">check_circle</span>
<span class="font-body-md text-on-surface-variant">7 Meditaciones / Activaciones Energéticas Uterinas</span>
</li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-tertiary">check_circle</span>
<span class="font-body-md text-on-surface-variant">Workbook (Cuaderno de Trabajo) para cada semana</span>
</li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-tertiary">check_circle</span>
<span class="font-body-md text-on-surface-variant">Bonus: Pack "Rituales de Amor Propio"</span>
</li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-tertiary">check_circle</span>
<span class="font-body-md text-on-surface-variant">Acceso a la Comunidad "Círculo Matriz" (Espacio privado de contención)</span>
</li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-tertiary">check_circle</span>
<span class="font-body-md text-on-surface-variant">1 Sesión de Preguntas y Respuestas Grupal (Grabada)</span>
</li>
</ul>
<div class="text-center mt-10">
<button class="bg-primary text-on-primary font-label-sm rounded-full px-10 py-4 shadow-lg hover:shadow-xl hover:bg-primary-container transition-all duration-300 active:scale-95 text-lg">
                    SÍ, QUIERO SANAR MI ÚTERO AHORA
                </button>
</div>
</div>
</div>
</section>
<!-- Testimonials -->
<section class="py-section-gap px-gutter bg-surface-container-low">
<div class="max-w-container-max mx-auto">
<h3 class="font-headline-md text-primary text-center mb-12">Voces del Círculo</h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
<div class="bg-surface p-8 rounded-2xl shadow-sm relative">
<span class="material-symbols-outlined text-tertiary/20 text-6xl absolute top-4 right-4">format_quote</span>
<p class="font-body-md text-on-surface-variant italic mb-6 relative z-10">"Nunca imaginé que mi dolor menstrual tenía tanto que ver con las historias de mi mamá y mi abuela. El Módulo 5 me voló la cabeza. Hoy mis ciclos son mucho más amables y siento una paz que no conocía."</p>
<p class="font-label-sm text-primary">— Mariana, 32 años</p>
</div>
<div class="bg-surface p-8 rounded-2xl shadow-sm relative">
<span class="material-symbols-outlined text-tertiary/20 text-6xl absolute top-4 right-4">format_quote</span>
<p class="font-body-md text-on-surface-variant italic mb-6 relative z-10">"Llegué al curso sintiéndome vacía y desconectada de mi feminidad tras una relación tóxica. El ritual de corte de lazos fue un antes y un después. Recuperé mi energía vital y mis ganas de crear."</p>
<p class="font-label-sm text-primary">— Sofía, 28 años</p>
</div>
<div class="bg-surface p-8 rounded-2xl shadow-sm relative">
<span class="material-symbols-outlined text-tertiary/20 text-6xl absolute top-4 right-4">format_quote</span>
<p class="font-body-md text-on-surface-variant italic mb-6 relative z-10">"No tengo útero físico por una histerectomía, y dudaba en hacer el curso. Fue la mejor decisión. Entendí que mi útero energético sigue ahí y pude sanar el duelo de su pérdida física. Me siento entera de nuevo."</p>
<p class="font-label-sm text-primary">— Aldy, 45 años</p>
</div>
<div class="bg-surface p-8 rounded-2xl shadow-sm relative">
<span class="material-symbols-outlined text-tertiary/20 text-6xl absolute top-4 right-4">format_quote</span>
<p class="font-body-md text-on-surface-variant italic mb-6 relative z-10">"Estaba estancada en mi emprendimiento. Al hacer el detox de útero, descubrí que albergaba miedo al éxito de mis ancestras. Hoy mi creatividad fluye y mi negocio empezó a despegar. Literalmente di a luz a mi proyecto."</p>
<p class="font-label-sm text-primary">— Sil, 37 años</p>
</div>
</div>
</div>
</section>
<!-- FAQ -->
<section class="py-section-gap px-gutter max-w-container-max mx-auto">
<h3 class="font-headline-md text-primary text-center mb-12">Preguntas Frecuentes</h3>
<div class="space-y-6 max-w-3xl mx-auto">
<details class="group bg-surface p-6 rounded-xl border border-outline-variant/30 cursor-pointer">
<summary class="font-headline-sm text-primary list-none flex justify-between items-center">
                ¿Necesito tener conocimientos previos de energía o espiritualidad?
                <span class="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="font-body-md text-on-surface-variant mt-4">No. El curso está diseñado para guiarte paso a paso, desde lo más básico hasta lo más profundo, de manera amorosa y accesible.</p>
</details>
<details class="group bg-surface p-6 rounded-xl border border-outline-variant/30 cursor-pointer">
<summary class="font-headline-sm text-primary list-none flex justify-between items-center">
                No tengo matriz/útero físico (histerectomía), ¿este curso es para mí?
                <span class="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="font-body-md text-on-surface-variant mt-4">¡Totalmente SÍ! El centro energético (chakra sacro/matriz) sigue intacto. De hecho, sanar el duelo del útero físico es un proceso hermoso que vivirás aquí.</p>
</details>
<details class="group bg-surface p-6 rounded-xl border border-outline-variant/30 cursor-pointer">
<summary class="font-headline-sm text-primary list-none flex justify-between items-center">
                Ya pasé la menopausia, ¿me sirve?
                <span class="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="font-body-md text-on-surface-variant mt-4">Sí. La menopausia es la etapa de la "Mujer Sabia". Tu energía ya no fluye hacia afuera (sangre), sino hacia adentro (sabiduría). Este curso te ayudará a asentar ese poder.</p>
</details>
<details class="group bg-surface p-6 rounded-xl border border-outline-variant/30 cursor-pointer">
<summary class="font-headline-sm text-primary list-none flex justify-between items-center">
                ¿Cuánto tiempo me lleva a la semana?
                <span class="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="font-body-md text-on-surface-variant mt-4">Con 2 horas a la semana (entre ver la clase y hacer la activación) es suficiente. Tienes acceso de por vida para hacerlo a tu propio ritmo.</p>
</details>
</div>
</section>
</main>
<!-- Footer -->
<footer class="w-full py-section-gap bg-surface-container-lowest dark:bg-inverse-surface bg-surface-container-low dark:bg-surface-dim flat no shadows text-on-surface-variant ease-in-out duration-300 flex flex-col items-center text-center space-y-unit px-margin-mobile">
<span class="font-display-lg text-headline-sm text-primary dark:text-primary-fixed-dim mb-4 block">Divina Matriz</span>
<p class="font-body-md text-body-md mb-6">© 2024 Divina Matriz. Embodied Wisdom for the Sacred Feminine.</p>
<nav class="flex flex-wrap justify-center gap-6">
<a class="font-body-md text-body-md hover:text-primary transition-colors text-on-surface-variant" href="#">The Journey</a>
<a class="font-body-md text-body-md hover:text-primary transition-colors text-on-surface-variant" href="#">Our Philosophy</a>
<a class="font-body-md text-body-md hover:text-primary transition-colors text-on-surface-variant" href="#">Privacy Sanctuary</a>
<a class="font-body-md text-body-md hover:text-primary transition-colors text-on-surface-variant" href="#">Terms of Grace</a>
</nav>
</footer>
</body></html>`;

export default function DivinaMatrizPage() {
        return (
                <main className="min-h-screen bg-[#fbf9f5]">
                        {/* Opcional: Navbar unificado arriba */}
                        <Navbar theme="dark" position="absolute" />

                        <div className="w-full pt-16">
                                <HtmlCourseViewer
                                        html={DIVINA_MATRIZ_HTML}
                                        title="Divina Matriz: El Despertar de tu Útero Creador"
                                />
                        </div>
                </main>
        );
}
