'use client';

import { motion } from "framer-motion";

export function ChakanaBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Capa 1: Chakanas grandes y lentas */}
      <motion.div 
        initial={{ x: 0, y: 0 }}
        animate={{ 
          x: [-200, 200],
          y: [-100, 100]
        }}
        transition={{ 
          duration: 60, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "linear" 
        }}
        className="absolute inset-[-500px] opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M160 40H240V80H280V120H320V160H360V240H320V280H280V320H240V360H160V320H120V280H80V240H40V160H80V120H120V80H160V40Z' stroke='%235b2c1d' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "600px 600px"
        }}
      />

      {/* Capa 2: Chakanas medianas en otra dirección para irregularidad */}
      <motion.div 
        initial={{ x: 0, y: 0 }}
        animate={{ 
          x: [100, -100],
          y: [-150, 150]
        }}
        transition={{ 
          duration: 45, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "linear" 
        }}
        className="absolute inset-[-500px] opacity-[0.1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 30H180V60H210V90H240V120H270V180H240V210H210V240H180V270H120V240H90V210H60V180H30V120H60V90H90V60H120V30Z' stroke='%235b2c1d' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundPosition: "300px 150px",
          backgroundSize: "800px 800px"
        }}
      />
      
      {/* Overlay sutil para suavizar todo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf7]/5 via-transparent to-[#fdfbf7]/5" />
    </div>
  );
}
