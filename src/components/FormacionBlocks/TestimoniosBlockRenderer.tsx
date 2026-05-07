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
        {testimonios.map((testimonio) => (
          <div key={testimonio._key} className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            {testimonio.avatarUrl && (
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src={testimonio.avatarUrl}
                  alt={testimonio.nombre}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
            )}
            <p className="text-gray-700 italic mb-4">"{testimonio.mensaje}"</p>
            <p className="font-semibold text-[#5b2c1d]">- {testimonio.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
