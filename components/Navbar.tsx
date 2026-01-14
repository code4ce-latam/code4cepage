"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./Buttons";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#servicios", label: "Servicios" },
    { href: "#metodologia", label: "Cómo trabajamos" },
    { href: "#tecnologias", label: "Tecnologías" },
    { href: "#quienes-somos", label: "Quiénes somos" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/home" className="flex-shrink-0">
            <Image
              src="/brand/code4ce-mark.png"
              alt="CODE4CE"
              width={130}
              height={47}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 font-medium"
                style={{ color: '#6B7280' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#39005E'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
              >
                {link.label}
              </Link>
            ))}
            <Button href="#contacto" variant="primary">
              Contacto
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-text focus:outline-none focus:ring-2 focus:ring-teal-primary rounded"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-light">
            <div className="space-y-4 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-ui hover:text-teal-primary transition-colors duration-200 font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-light">
              <Button
                href="#contacto"
                variant="primary"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

