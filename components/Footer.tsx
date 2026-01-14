import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/site";

export default function Footer() {
  return (
    <footer className="text-white section-padding" style={{ backgroundColor: '#000000' }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Image
              src="/brand/code4ce-logo.png"
              alt="CODE4CE"
              width={180}
              height={60}
              className="mb-4"
            />
            <p className="text-gray-300 text-sm max-w-md">
              Construimos software a medida que automatiza procesos e integra
              datos, usando tecnología moderna e IA aplicada.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link 
                  href="#servicios" 
                  className="transition-colors"
                  style={{ color: '#6B7280' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#00D0C0'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link 
                  href="#metodologia" 
                  className="transition-colors"
                  style={{ color: '#6B7280' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#00D0C0'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                >
                  Metodología
                </Link>
              </li>
              <li>
                <Link 
                  href="#quienes-somos" 
                  className="transition-colors"
                  style={{ color: '#6B7280' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#00D0C0'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                >
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link 
                  href="#tecnologias" 
                  className="transition-colors"
                  style={{ color: '#6B7280' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#00D0C0'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                >
                  Tecnologías
                </Link>
              </li>
              <li>
                <Link 
                  href="#contacto" 
                  className="transition-colors"
                  style={{ color: '#6B7280' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#00D0C0'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors"
                  style={{ color: '#6B7280' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#00D0C0'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} CODE4CE. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

