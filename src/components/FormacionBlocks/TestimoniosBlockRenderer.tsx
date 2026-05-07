import Image from "next/image";
import { motion } from "framer-motion";

interface TestimonialItem {
  _key: string;
  nombre: string;
  mensaje: string;
  avatarUrl?: string;
}

interface TestimoniosBlockProps {
  testimonios: TestimonialItem[];
}

export function TestimoniosBlockRenderer({ testimonios }: TestimoniosBlockProps) {
  if (!testimonios || testimonios.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#fdfbf7] py-16 sm:py-24">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-title text-4xl sm:text-5xl md:text-6xl text-center text-[#5b2c1d] mb-16 tracking-tight"
      >
        Testimonios
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto px-6">
        {testimonios.map((testimonio, idx) => {
          if (!testimonio.nombre && !testimonio.mensaje && !testimonio.avatarUrl) {
            return null;
          }
          return (
            <motion.div 
              key={testimonio._key} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-[#f0eee9] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col items-center text-center group"
            >
              {testimonio.avatarUrl && (
                <div className="w-full mb-8 overflow-hidden rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-500">
                  <Image
                    src={testimonio.avatarUrl}
                    alt={testimonio.nombre || "Testimonio"}
                    width={600}
                    height={400}
                    className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              {testimonio.mensaje && (
                <p className="text-gray-700 italic text-lg leading-relaxed mb-6 font-medium">
                  "{testimonio.mensaje}"
                </p>
              )}
              {testimonio.nombre && (
                <p className="font-bold text-[#5b2c1d] uppercase tracking-[0.2em] text-sm mt-auto">
                  — {testimonio.nombre}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
