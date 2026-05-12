'use client';

import { motion, useScroll, useTransform } from "framer-motion";

export function ChakanaBackground() {
  const { scrollYProgress } = useScroll();

  // Transformaciones basadas en el scroll para un movimiento sutil up/down
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Capa 1: Chakanas grandes con movimiento sutil on-scroll */}
      <motion.div 
        className="absolute inset-[-200px] opacity-[0.035]"
        style={{
          y: y1,
          x: x1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M160 40H240V80H280V120H320V160H360V240H320V280H280V320H240V360H160V320H120V280H80V240H40V160H80V120H120V80H160V40Z' stroke='%235b2c1d' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "600px 600px"
        }}
      />

      {/* Capa 2: Chakanas medianas con movimiento opuesto */}
      <motion.div 
        className="absolute inset-[-200px] opacity-[0.025]"
        style={{
          y: y2,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 30H180V60H210V90H240V120H270V180H240V210H210V240H180V270H120V240H90V210H60V180H30V120H60V90H90V60H120V30Z' stroke='%235b2c1d' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundPosition: "300px 150px",
          backgroundSize: "800px 800px"
        }}
      />
      
      {/* Overlay sutil para suavizar todo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf7]/40 via-transparent to-[#fdfbf7]/40" />
    </div>
  );
}
