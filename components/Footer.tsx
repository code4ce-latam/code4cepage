import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/site";

export default function Footer() {
  return (
    <footer className="text-white section-padding" style={{ backgroundColor: '#39005E' }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Image
              src="/brand/code4ce-logo-no-bg.png"
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
                  className="transition-colors flex items-center gap-2"
                  style={{ color: '#6B7280' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#00D0C0'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                >
                  <Image
                    src="/brand/email.jpg"
                    alt="Email"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} CODE4CE. Todos los derechos reservados.</p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-gray-500">
              <span className="text-xs">Construido con:</span>
              <span className="text-gray-400">Next.js</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">Tailwind CSS</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">TypeScript</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">Cursor AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

