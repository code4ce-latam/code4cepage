"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Image from "next/image";
import StreamingText from "./StreamingText";
import { introCopy, siteConfig } from "@/content/site";

// Dynamic import con error boundary para que no rompa la página
const HoloVectorLinesBackground = dynamic(
  () => import("./HoloVectorLinesBackground"),
  { 
    ssr: false,
    loading: () => null,
  }
);

export default function IntroScreen() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Detectar si es móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-white z-[9999] relative overflow-hidden"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fondo de líneas vectoriales holográficas - solo en desktop */}
      {mounted && !isMobile && <HoloVectorLinesBackground hoverActive={isHovered} isMobile={false} />}

      {/* Contenido - responsive: horizontal en desktop, vertical en móvil */}
      <div 
        className="absolute inset-0 flex z-10" 
        style={{ 
          zIndex: 10, 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center', 
          justifyContent: isMobile ? 'center' : 'flex-start',
          paddingLeft: isMobile ? 'clamp(5%, 8vw, 10%)' : 'clamp(5%, 8vw, 10%)',
          paddingRight: isMobile ? 'clamp(5%, 8vw, 10%)' : '0',
          paddingTop: isMobile ? '0' : '0',
        }}
      >
        <div className={`animate-fade-in ${isMobile ? 'text-center w-full max-w-md flex flex-col items-center justify-center relative' : 'text-right'}`} style={{ 
          maxWidth: isMobile ? '90%' : 'clamp(40%, 33.33vw, 33.33%)', 
          width: isMobile ? '90%' : 'clamp(40%, 33.33vw, 33.33%)',
          gap: isMobile ? 'clamp(1rem, 2vh, 1.5rem)' : '1.5rem',
          paddingTop: isMobile ? 'clamp(1vh, 2vh, 3vh)' : '0',
          paddingBottom: isMobile ? 'clamp(2vh, 3vh, 4vh)' : '0',
        }}>
          <div className={`relative flex ${isMobile ? 'justify-center' : 'justify-end'}`}>
            <Image
              src="/brand/code4ce-logo-no-bg.png"
              alt="CODE4CE"
              width={300}
              height={100}
              priority
              className="object-contain"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>

          <h2 className={`font-bold ${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'}`} style={{ color: '#39005E' }}>
            <StreamingText text="Fuerza, tecnología y soluciones de software a medida" />
          </h2>

          {/* Red neuronal dentro del contenedor en móvil - antes del botón */}
          {mounted && isMobile && (
            <div className="relative w-full" style={{ 
              height: '200px', 
              marginTop: 'clamp(1rem, 2vh, 1.5rem)',
              minHeight: '150px'
            }}>
              <HoloVectorLinesBackground hoverActive={isHovered} isMobile={true} />
            </div>
          )}

          <button
            onClick={() => router.push("/home")}
            className={`px-8 py-3 text-white rounded-lg font-bold transition-colors duration-200 ${isMobile ? 'mt-2' : 'mt-4'}`}
            style={{ backgroundColor: '#FA6A2D' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E85A1F'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FA6A2D'}
          >
            {introCopy.button}
          </button>
        </div>
      </div>
    </div>
  );
}

