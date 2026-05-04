import Image from "next/image";
import NextLink from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#f5f5f7] border-t border-gray-200/50 pt-16 pb-8 px-6 sm:px-12 font-sans mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <NextLink href="/">
              <Image
                src="/logo.png"
                alt="Romina Castañeda"
                width={160}
                height={50}
                className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity mb-6"
              />
            </NextLink>
            <p className="text-[#86868b] text-sm leading-relaxed max-w-sm">
              Acompañamiento en tu proceso de crecimiento personal y espiritual a través de formaciones y sesiones individuales.
            </p>
          </div>
          
          <div>
            <h4 className="text-[#1d1d1f] font-semibold text-xs uppercase tracking-widest mb-4">Explorar</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <NextLink href="/" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors">
                  Inicio
                </NextLink>
              </li>
              <li>
                <NextLink href="/formaciones" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors">
                  Formaciones
                </NextLink>
              </li>
              <li>
                <NextLink href="/sesiones" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors">
                  Sesiones
                </NextLink>
              </li>
              <li>
                <NextLink href="/portal" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors">
                  Portal de Alumnos
                </NextLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#1d1d1f] font-semibold text-xs uppercase tracking-widest mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <NextLink href="/contacto" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors">
                  Escríbenos
                </NextLink>
              </li>
              <li>
                <a href="mailto:hola@rominacastaneda.com" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors">
                  hola@rominacastaneda.com
                </a>
              </li>
              <li>
                <a href="#" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#86868b] font-medium">
            © {new Date().getFullYear()} Romina Castañeda. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-[#86868b] font-medium">
            <NextLink href="#" className="hover:text-[#1d1d1f] transition-colors">
              Política de Privacidad
            </NextLink>
            <NextLink href="#" className="hover:text-[#1d1d1f] transition-colors">
              Términos de Servicio
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
