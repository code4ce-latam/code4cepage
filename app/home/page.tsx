"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Button } from "@/components/Buttons";
import { Monitor, Layers, Database, Cloud, Brain } from "lucide-react";
import {
  heroCopy,
  services,
  methodology,
  technologyCategories,
  aboutUs,
  siteConfig,
} from "@/content/site";

// Iconos para las categorías de tecnología
const TechnologyIcons = {
  frontend: Monitor,
  backend: Layers,
  database: Database,
  "cloud-devops": Cloud,
  "ai-ml": Brain,
};

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.details 
          ? `${data.error}: ${data.details}` 
          : data.error || 'Error al enviar el mensaje';
        throw new Error(errorMessage);
      }

      setFormSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setFormSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el mensaje');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <Section id="hero" className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#39005E' }}>
                {heroCopy.headline}
              </h1>
              <p className="text-xl mb-8 max-w-2xl" style={{ color: '#6B7280' }}>
                {heroCopy.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button href="#servicios" variant="outline">
                  {heroCopy.ctaSecondary}
                </Button>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-primary/20 to-[#39005E]/20 rounded-lg blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              <Image
                src="/brand/home.jpg"
                alt="Tecnología e innovación"
                width={350}
                height={263}
                className="rounded-xl shadow-2xl transition-all duration-500 group-hover:scale-[1.02] object-cover w-full"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 35px 60px -12px rgba(57, 0, 94, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                }}
                priority
                quality={95}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Servicios */}
      <Section id="servicios" background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#39005E' }}>
            Servicios
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
            Soluciones tecnológicas personalizadas para resolver problemas reales de tu negocio.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card group hover:border-teal-primary transition-all duration-300">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 transition-colors duration-300 group-hover:text-teal-primary" style={{ color: '#39005E' }}>
                {service.title}
              </h3>
              <p style={{ color: '#6B7280' }}>{service.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Metodología */}
      <Section id="metodologia">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#39005E' }}>
            Cómo trabajamos
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
            Metodología ágil con entregas por sprints y foco en resultados medibles.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-0">
          <div className="space-y-4 relative">
            {methodology.map((step, index) => {
              // Colores para cada paso según la imagen
              const stepColors = [
                '#9333EA', // Morado (Paso 1)
                '#EC4899', // Rosa (Paso 2)
                '#EF4444', // Rojo (Paso 3)
                '#DC2626', // Rojo oscuro (Paso 4)
                '#F97316', // Naranja (Paso 5)
              ];
              
              const stepColor = stepColors[index] || '#39005E';
              
              return (
                <div key={index} className="relative">
                  <div
                    className="relative bg-white rounded-xl shadow-sm p-6 pl-20 sm:pl-28 hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Indicador numerado */}
                    <div 
                      className="absolute left-4 sm:left-8 top-6 w-12 h-12 rounded-xl text-white flex items-center justify-center text-lg font-bold shadow-md z-20"
                      style={{ backgroundColor: stepColor }}
                    >
                      {step.step}
                    </div>
                    
                    {/* Contenido */}
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>
                        {step.title}
                      </h3>
                      <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Línea vertical conectora - desde el centro del paso 1 hasta el inicio del paso 5 */}
          <div 
            className="absolute hidden sm:block left-[calc(2rem+1.5rem)]" 
            style={{ 
              top: '3rem', 
              bottom: 'calc(1rem + 1.5rem)', 
              width: '2px', 
              background: 'linear-gradient(to bottom, #9333EA 0%, #EC4899 25%, #EF4444 50%, #DC2626 75%, #F97316 100%)', 
              zIndex: 1,
              transform: 'translateX(-50%)'
            }}
          ></div>
        </div>
      </Section>

      {/* Tecnologías */}
      <Section id="tecnologias" background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#39005E' }}>
            Tecnologías
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
            Stack moderno y probado para construir soluciones escalables.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologyCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-xl p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              style={{
                background: category.gradient,
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: category.iconColor }}
                >
                  {(() => {
                    const IconComponent = TechnologyIcons[category.id as keyof typeof TechnologyIcons];
                    return IconComponent ? <IconComponent size={24} /> : null;
                  })()}
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#111827' }}>
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: tech.color }}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Quiénes somos */}
      <Section id="quienes-somos">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#39005E' }}>
            Quiénes somos
          </h2>
        </div>
        <div className="space-y-16 max-w-5xl mx-auto">
          {aboutUs.map((section, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="relative group overflow-hidden rounded-xl shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#39005E]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-xl"></div>
                  <Image
                    src={index === 0 
                      ? "/brand/who_am_i_1.jpg"
                      : index === 1
                      ? "/brand/who_am_i_2.jpg"
                      : "/brand/who_am_i_3.jpg"
                    }
                    alt={section.title}
                    width={600}
                    height={400}
                    className="rounded-xl transition-all duration-500 group-hover:scale-110 object-cover"
                    quality={90}
                  />
                </div>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#39005E' }}>
                  {section.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#6B7280' }}>
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* En qué podemos ayudarte */}
      <Section id="contacto" background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#39005E' }}>
            ¿En qué podemos ayudarte?
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
            Agendemos una reunión para entender tus necesidades y proponer una solución.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2"
                style={{ color: '#39005E' }}
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                style={{ 
                  borderColor: '#E5E7EB',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#39005E';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(57, 0, 94, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                style={{ color: '#39005E' }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                style={{ borderColor: '#E5E7EB' }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#39005E';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(57, 0, 94, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
                style={{ color: '#39005E' }}
              >
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none resize-none"
                style={{ borderColor: '#E5E7EB' }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#39005E';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(57, 0, 94, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            <Button 
              type="submit" 
              variant="primary" 
              className="w-full"
              disabled={isLoading || formSubmitted}
            >
              {isLoading ? "Enviando..." : formSubmitted ? "Enviado ✓" : "Enviar"}
            </Button>
          </form>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ color: '#6B7280' }}>
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition-colors hover:underline flex items-center gap-2"
              style={{ color: '#39005E' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#00D0C0'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#39005E'}
            >
              <Image
                src="/brand/email.jpg"
                alt="Email"
                width={28}
                height={28}
                className="object-contain"
              />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}

