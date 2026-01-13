import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-gray-text text-white section-padding">
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
                <Link href="#servicios" className="hover:text-teal-primary transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#metodologia" className="hover:text-teal-primary transition-colors">
                  Metodología
                </Link>
              </li>
              <li>
                <Link href="#casos-uso" className="hover:text-teal-primary transition-colors">
                  Casos de uso
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="hover:text-teal-primary transition-colors">
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
                  className="hover:text-teal-primary transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-primary transition-colors"
                >
                  WhatsApp
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

