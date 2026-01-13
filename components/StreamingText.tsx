"use client";

import { useEffect, useRef, useState } from "react";

interface StreamingTextProps {
  text: string;
  className?: string;
  delay?: number; // Delay en milisegundos antes de comenzar el streaming
}

export default function StreamingText({ text, className = "", delay = 0 }: StreamingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    
    // Resetear estado al cambiar el texto
    setDisplayText("");
    setIsComplete(false);
    setShowCursor(delay === 0); // Solo mostrar cursor si no hay delay
    indexRef.current = 0;

    // Efecto de escritura tipo streaming
    const writeText = () => {
      if (indexRef.current < text.length) {
        setDisplayText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        // Una vez completado, ocultar cursor después de un breve delay
        setIsComplete(true);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        // Ocultar cursor después de 500ms
        setTimeout(() => {
          if (cursorIntervalRef.current) {
            clearInterval(cursorIntervalRef.current);
            cursorIntervalRef.current = null;
          }
          setShowCursor(false);
        }, 500);
      }
    };

    // Iniciar escritura después del delay
    const writeSpeed = 80;
    const startWriting = () => {
      setShowCursor(true); // Mostrar cursor cuando comienza la escritura
      intervalRef.current = setInterval(writeText, writeSpeed);
      // Cursor parpadeante - solo mientras se escribe
      cursorIntervalRef.current = setInterval(() => {
        if (mountedRef.current) {
          setShowCursor((prev) => !prev);
        }
      }, 530);
    };
    
    const startDelay = delay > 0 
      ? setTimeout(startWriting, delay) 
      : startWriting();

    return () => {
      mountedRef.current = false;
      if (startDelay) {
        clearTimeout(startDelay);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
        cursorIntervalRef.current = null;
      }
    };
  }, [text]);

  // Efecto separado para detener el cursor cuando está completo
  useEffect(() => {
    if (isComplete) {
      const timeout = setTimeout(() => {
        if (cursorIntervalRef.current) {
          clearInterval(cursorIntervalRef.current);
          cursorIntervalRef.current = null;
        }
        setShowCursor(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isComplete]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{displayText}</span>
      {/* Cursor parpadeante - solo visible mientras se escribe */}
      {!isComplete && (
        <span
          className="inline-block transition-opacity duration-300"
          style={{
            opacity: showCursor ? 1 : 0,
            marginLeft: "4px",
            width: "2px",
            height: "1em",
            backgroundColor: "currentColor",
            verticalAlign: "baseline",
            display: "inline-block",
          }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

