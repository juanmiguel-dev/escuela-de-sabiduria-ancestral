'use client';

import { motion } from "framer-motion";

export function ChakanaBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div 
        initial={{ backgroundPosition: "0px 0px" }}
        animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10H60V20H70V30H80V40H90V60H80V70H70V80H60V90H40V80H30V70H20V60H10V40H20V30H30V20H40V10Z' stroke='%235b2c1d' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px"
        }}
      />
      {/* Overlay to ensure it's subtle and fades at the edges if needed, but the user wants to maintain the color */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fdfbf7]/50 to-transparent" />
    </div>
  );
}
