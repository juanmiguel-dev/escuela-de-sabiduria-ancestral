"use client";

import { useEffect, useState } from "react";
import { m, Variants, LazyMotion, domAnimation } from "framer-motion";
import Image from "next/image";
import NextLink from "next/link";
import { getLandingData, getFormaciones, getTalleres } from "@/sanity/lib/queries";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/HeroSlider";

export default function Home() {
  const [landingData, setLandingData] = useState<any>(null);
  const [formaciones, setFormaciones] = useState<any[]>([]);
  const [talleres, setTalleres] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [landing, forms, talls] = await Promise.all([
          getLandingData(),
          getFormaciones(),
          getTalleres()
        ]);
        if (landing) setLandingData(landing);
        if (forms) setFormaciones(forms);
        if (talls) setTalleres(talls);
      } catch (error) {
        console.error("Error loading Sanity data:", error);
      }
    }
    loadData();
  }, []);

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <LazyMotion features={domAnimation}>
      <main className="h-screen w-full selection:bg-[#333333] selection:text-white overflow-hidden font-sans relative text-gray-900">

        {/* Header Unificado */}
        <Navbar theme="dark" position="absolute" />

        {/* Hero Slider Section (Única Sección) */}
        {landingData?.heroSlides && landingData.heroSlides.length > 0 ? (
          <HeroSlider slides={landingData.heroSlides} />
        ) : (
          <section className="h-screen w-full bg-black flex items-center justify-center">
            <p className="text-white">Cargando...</p>
          </section>
        )}

      </main>
    </LazyMotion>
  );
}
);
}