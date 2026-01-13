"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Button } from "@/components/Buttons";
import {
  heroCopy,
  services,
  methodology,
  useCases,
  technologies,
  differentiators,
  metrics,
  testimonials,
  faqs,
  siteConfig,
} from "@/content/site";

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", company: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <Section id="hero" className="pt-32 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <Image
              src="/brand/code4ce-logo.png"
              alt="CODE4CE"
              width={300}
              height={100}
              priority
            />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-text mb-6">
            {heroCopy.headline}
          </h1>
          <p className="text-xl text-gray-ui mb-8 max-w-2xl mx-auto">
            {heroCopy.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#contacto" variant="primary">
              {heroCopy.ctaPrimary}
            </Button>
            <Button href="#servicios" variant="outline">
              {heroCopy.ctaSecondary}
            </Button>
          </div>
        </div>
      </Section>

      {/* Servicios */}
      <Section id="servicios" background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-text mb-4">
            Servicios
          </h2>
          <p className="text-gray-ui max-w-2xl mx-auto">
            Soluciones tecnológicas personalizadas para resolver problemas reales
            de operación, ventas, inventario, finanzas y gestión.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="card">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-text mb-2">
                {service.title}
              </h3>
              <p className="text-gray-ui">{service.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Metodología */}
      <Section id="metodologia">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-text mb-4">
            Cómo trabajamos
          </h2>
          <p className="text-gray-ui max-w-2xl mx-auto">
            Metodología ágil con entregas por sprints y foco en resultados
            medibles.
          </p>
        </div>
        <div className="space-y-8 max-w-4xl mx-auto">
          {methodology.map((step, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-6 items-start"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-teal-primary text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                  {step.step}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-text mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-ui">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Casos de uso */}
      <Section id="casos-uso" background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-text mb-4">
            Casos de uso
          </h2>
          <p className="text-gray-ui max-w-2xl mx-auto">
            Soluciones reales para problemas comunes en empresas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <div key={index} className="card">
              <h3 className="text-lg font-semibold text-gray-text mb-2">
                {useCase.title}
              </h3>
              <p className="text-gray-ui text-sm">{useCase.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Tecnologías */}
      <Section id="tecnologias">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-text mb-4">
            Tecnologías
          </h2>
          <p className="text-gray-ui max-w-2xl mx-auto">
            Stack moderno y probado para construir soluciones escalables.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gray-50 border border-gray-light rounded-full text-gray-text font-medium hover:border-teal-primary hover:text-teal-primary transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </Section>

      {/* Por qué CODE4CE */}
      <Section id="por-que" background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-text mb-4">
            Por qué CODE4CE
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">
                {metric.value}
              </div>
              <p className="text-gray-ui">{metric.label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((diff, index) => (
            <div key={index} className="card">
              <h3 className="text-lg font-semibold text-gray-text mb-2">
                {diff.title}
              </h3>
              <p className="text-gray-ui text-sm">{diff.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonios */}
      <Section id="testimonios">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-text mb-4">
            Testimonios
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card">
              <p className="text-gray-ui mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              <div>
                <p className="font-semibold text-gray-text">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-ui">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-text mb-4">
            Preguntas frecuentes
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <h3 className="text-lg font-semibold text-gray-text mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-ui">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contacto */}
      <Section id="contacto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-text mb-4">
            Contacto
          </h2>
          <p className="text-gray-ui max-w-2xl mx-auto">
            Agendemos una reunión para entender tus necesidades y proponer una
            solución.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-text mb-2"
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
                className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-primary focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-text mb-2"
              >
                Empresa
              </label>
              <input
                type="text"
                id="company"
                required
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-primary focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-text mb-2"
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
                className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-primary focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-text mb-2"
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
                className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-primary focus:border-transparent resize-none"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              {formSubmitted ? "Enviado ✓" : "Enviar"}
            </Button>
          </form>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-gray-ui">
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-teal-primary transition-colors"
            >
              📧 {siteConfig.email}
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-primary transition-colors"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}

