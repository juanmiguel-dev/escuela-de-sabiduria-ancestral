import Image from "next/image";

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
      <h2 className="font-title text-4xl sm:text-5xl md:text-6xl text-center text-[#5b2c1d] mb-12">Testimonios</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
        {testimonios.map((testimonio) => {
          if (!testimonio.nombre && !testimonio.mensaje) {
            return null; // No renderizar si no hay nombre ni mensaje
          }
          return (
            <div key={testimonio._key} className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
              {testimonio.avatarUrl && (
                <div className="w-full h-auto mb-4"> {/* Cambiado a full width */}
                  <Image
                    src={testimonio.avatarUrl}
                    alt={testimonio.nombre || "Testimonio"}
                    width={500} // Ajusta el ancho según sea necesario
                    height={300} // Ajusta la altura según sea necesario
                    className="object-cover w-full h-full rounded-lg" // Eliminado rounded-full
                  />
                </div>
              )}
              {testimonio.mensaje && <p className="text-gray-700 italic mb-4">"{testimonio.mensaje}"</p>}
              {testimonio.nombre && <p className="font-semibold text-[#5b2c1d]">- {testimonio.nombre}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
