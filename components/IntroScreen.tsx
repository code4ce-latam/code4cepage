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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-white z-[9999] relative overflow-hidden"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fondo de líneas vectoriales holográficas */}
      {mounted && <HoloVectorLinesBackground hoverActive={isHovered} />}

      {/* Contenido a la izquierda */}
      <div 
        className="absolute inset-0 flex items-center z-10" 
        style={{ 
          zIndex: 10, 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-start',
          paddingLeft: 'clamp(5%, 8vw, 10%)',
          paddingRight: '0'
        }}
      >
        <div className="text-right space-y-6 animate-fade-in" style={{ 
          maxWidth: 'clamp(40%, 33.33vw, 33.33%)', 
          width: 'clamp(40%, 33.33vw, 33.33%)' 
        }}>
          <div className="relative flex justify-end">
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

          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#111827' }}>
            <StreamingText text="Automatización e IA" />
          </h2>

          <p className="text-base sm:text-lg" style={{ color: '#6B7280' }}>
            {siteConfig.tagline}
          </p>

          <button
            onClick={() => router.push("/home")}
            className="mt-4 px-8 py-3 text-white rounded-lg font-bold transition-colors duration-200"
            style={{ backgroundColor: '#00D0C0' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00AFA3'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00D0C0'}
          >
            {introCopy.button}
          </button>
        </div>
      </div>
    </div>
  );
}

