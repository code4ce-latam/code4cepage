"use client";

import { useRef, useEffect, useCallback } from "react";

interface HoloVectorLinesBackgroundProps {
  hoverActive?: boolean;
  mouse?: { x: number; y: number };
}

interface Neuron {
  id: number;
  layer: number; // Capa a la que pertenece (0 = input, N = output)
  position: { x: number; y: number }; // Posición actual en el canvas
  basePosition: { x: number; y: number }; // Posición base (centro del movimiento)
  activation: number; // Nivel de activación (0-1)
  baseActivation: number; // Activación base para animación
  phase: number; // Fase para animación suave
  movePhase: number; // Fase para movimiento horizontal
  moveSpeed: number; // Velocidad de movimiento horizontal
  moveAmplitude: number; // Amplitud del movimiento horizontal
  floatPhase: number; // Fase para movimiento flotante vertical
  floatSpeed: number; // Velocidad del movimiento flotante
}

interface Connection {
  from: number; // ID de neurona origen
  to: number; // ID de neurona destino
  weight: number; // Peso de la conexión (para visualización)
  pulseProgress: number; // Progreso del pulso de activación (0-1)
  active: boolean; // Si hay un pulso activo
}

interface Pulse {
  connectionId: number; // ID de la conexión
  progress: number; // Progreso del pulso (0-1)
  speed: number; // Velocidad del pulso
}

export default function HoloVectorLinesBackground({
  hoverActive = false,
  mouse = { x: 0, y: 0 },
}: HoloVectorLinesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const neuronsRef = useRef<Neuron[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const hoverLerpRef = useRef(0);
  const timeRef = useRef(0);
  const lastPulseTimeRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const currentConfigRef = useRef<any>(null);

  // Paleta de colores para cambio animado (máximo 5 colores)
  const colorPalette = [
    "#000000", // 1. Negro
    "#00D0C0", // 2. Teal principal
    "#00AFA3", // 3. Teal oscuro
    "#F86828", // 4. Naranja acento
    "#333333", // 5. Gris oscuro
  ];

  // Configuración responsive mejorada
  const getConfig = (width: number) => {
    // Determinar tamaño de pantalla
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const isDesktop = width >= 1024;
    const isLargeDesktop = width >= 1280;

    // Calcular márgenes (responsive)
    let leftMarginPercent = 0.08; // 8% por defecto
    if (isMobile) {
      leftMarginPercent = 0.05; // 5% en móviles
    } else if (isTablet) {
      leftMarginPercent = 0.06; // 6% en tablets
    } else if (isDesktop) {
      leftMarginPercent = 0.08; // 8% en desktop
    } else if (isLargeDesktop) {
      leftMarginPercent = 0.1; // 10% en pantallas grandes
    }

    // Configuración base
    const baseConfig = {
      pulseSpeed: 0.7,
      pulseInterval: 2.2,
      colorTransitionDuration: 2.5,
      activationWaveSpeed: 0.4,
      movementSpeed: 0.35,
      movementAmplitude: 10,
      floatSpeed: 0.45,
      floatAmplitude: 12,
      leftMarginPercent,
    };

    // Ajustar dimensiones según tamaño de pantalla
    if (isMobile) {
      return {
        ...baseConfig,
        numLayers: 3, // Menos capas para móviles
        neuronsPerLayer: [3, 4, 3], // Menos neuronas por capa
        layerSpacing: 50, // Espaciado más compacto
        neuronSpacing: 28, // Espaciado vertical más compacto
        neuronRadius: 2.0, // Neuronas más pequeñas
        lineWidth: 0.8, // Líneas más delgadas
      };
    } else if (isTablet) {
      return {
        ...baseConfig,
        numLayers: 5,
        neuronsPerLayer: [5, 6, 7, 5, 3],
        layerSpacing: 90,
        neuronSpacing: 42,
        neuronRadius: 3.0,
        lineWidth: 1.1,
      };
    } else if (isDesktop) {
      return {
        ...baseConfig,
        numLayers: 5,
        neuronsPerLayer: [6, 8, 10, 7, 4],
        layerSpacing: 120,
        neuronSpacing: 50,
        neuronRadius: 3.5,
        lineWidth: 1.2,
      };
    } else {
      // Large desktop
      return {
        ...baseConfig,
        numLayers: 5,
        neuronsPerLayer: [6, 8, 10, 7, 4],
        layerSpacing: 140,
        neuronSpacing: 55,
        neuronRadius: 3.5,
        lineWidth: 1.2,
      };
    }
  };

  // Convertir hex a rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Interpolar entre dos colores hex
  const interpolateColor = (color1: string, color2: string, t: number) => {
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);

    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);

    // Función de easing suave
    const smoothT = t * t * (3 - 2 * t);

    const r = Math.round(r1 + (r2 - r1) * smoothT);
    const g = Math.round(g1 + (g2 - g1) * smoothT);
    const b = Math.round(b1 + (b2 - b1) * smoothT);

    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  // Inicializar red neuronal
  const initNeuralNetwork = useCallback((width: number, height: number) => {
    const neurons: Neuron[] = [];
    const connections: Connection[] = [];
    let neuronId = 0;

    // Obtener configuración según tamaño de pantalla
    const config = getConfig(width);
    currentConfigRef.current = config;

    // Calcular el ancho total de la red
    const totalNetworkWidth = (config.numLayers - 1) * config.layerSpacing;

    // Calcular la altura máxima de la red (capa con más neuronas)
    const maxNeurons = Math.max(...config.neuronsPerLayer);
    const totalNetworkHeight = (maxNeurons - 1) * config.neuronSpacing;

    // Distribución responsive: ajustar según tamaño de pantalla
    const isMobile = width < 640;

    let leftSectionWidth: number;
    let rightSectionWidth: number;
    let gapBetweenSections: number;

    let startX: number;

    if (isMobile) {
      // En móviles: centrar la red neuronal horizontalmente (debajo del contenido)
      startX = width / 2 - totalNetworkWidth / 2;
    } else {
      // En desktop: distribución 1/3 - 2/3
      leftSectionWidth = width / 3;
      rightSectionWidth = (width * 2) / 3;

      // El punto de división entre las secciones
      const divisionPoint = leftSectionWidth;

      // Centrar la red neuronal en el área derecha
      const rightAreaStart = divisionPoint;
      const rightAreaCenter = rightAreaStart + rightSectionWidth / 2;

      // Centrar la red neuronal en el centro del área derecha
      // Asegurar que no se salga de los límites
      const minX = rightAreaStart + 10; // Margen mínimo desde el borde
      const maxX = width - 10; // Margen mínimo desde el borde derecho
      startX = rightAreaCenter - totalNetworkWidth / 2;

      // Ajustar si la red se sale de los límites
      if (startX < minX) {
        startX = minX;
      } else if (startX + totalNetworkWidth > maxX) {
        startX = maxX - totalNetworkWidth;
      }
    }

    // Centrar la red verticalmente en la pantalla
    // En móviles, posicionar antes del botón sin traslapes ni al final
    let startY: number;
    if (isMobile) {
      // SOLUCIÓN DEFINITIVA: Calcular áreas ocupadas por cada elemento y evitar superposiciones

      // 1. Calcular padding y márgenes del contenedor
      const containerPaddingTop = Math.max(height * 0.01, 8); // clamp(1vh, 2vh, 3vh) - usar mínimo seguro
      const containerPaddingBottom = Math.max(height * 0.02, 16); // clamp(2vh, 3vh, 4vh) - usar mínimo seguro
      const containerPaddingLeft = width * 0.05; // 5% del ancho
      const containerPaddingRight = width * 0.05; // 5% del ancho

      // 2. Calcular áreas ocupadas por cada elemento (con márgenes de seguridad)
      const safetyMargin = 20; // Margen de seguridad adicional para evitar traslapes
      const gapSize = 24; // gap del contenedor (clamp(1rem, 2vh, 1.5rem))

      // Logo
      const logoTop = containerPaddingTop;
      const logoHeight = 90;
      const logoBottom = logoTop + logoHeight;
      const logoLeft = containerPaddingLeft;
      const logoRight = width - containerPaddingRight;

      // Texto "Automatización e IA"
      const textTop = logoBottom + gapSize;
      const textHeight = 60; // Aumentado para seguridad
      const textBottom = textTop + textHeight;
      const textLeft = containerPaddingLeft;
      const textRight = width - containerPaddingRight;

      // Tagline
      const taglineTop = textBottom + gapSize;
      const taglineHeight = 32; // Aumentado para seguridad
      const taglineBottom = taglineTop + taglineHeight;
      const taglineLeft = containerPaddingLeft;
      const taglineRight = width - containerPaddingRight;

      // Botón
      const buttonMarginTop = 8; // mt-2
      const buttonTop = taglineBottom + gapSize + buttonMarginTop;
      const buttonHeight = 48;
      const buttonBottom = buttonTop + buttonHeight;
      const buttonLeft = containerPaddingLeft;
      const buttonRight = width - containerPaddingRight;

      // 3. Calcular área disponible para la red neuronal
      // La red neuronal debe estar completamente debajo del botón
      const minSpacingAfterButton = 120; // Espacio mínimo después del botón - aumentado para ubicar más abajo
      const availableTop = buttonBottom + minSpacingAfterButton;
      const availableBottom = height - containerPaddingBottom;
      const availableHeight = availableBottom - availableTop;

      // 4. Verificar si hay espacio suficiente para la red neuronal
      if (availableHeight < totalNetworkHeight + 40) {
        // Si no hay espacio suficiente, reducir el tamaño de la red o no mostrarla
        // Por ahora, ajustar la posición para que quepa
        startY =
          availableTop + Math.min(totalNetworkHeight, availableHeight - 40) / 2;
      } else {
        // Hay espacio suficiente, centrar la red neuronal en el área disponible
        startY = availableTop + availableHeight / 2;
      }

      // 5. Verificación final: asegurar que la red neuronal NO se superponga con ningún elemento
      // Calcular el mínimo top requerido para evitar superposiciones con TODOS los elementos
      const networkLeft = startX;
      const networkRight = startX + totalNetworkWidth;

      // Calcular mínimos requeridos para cada elemento (solo si hay superposición horizontal)
      const minTopForLogo =
        networkLeft < logoRight && networkRight > logoLeft
          ? logoBottom + safetyMargin + totalNetworkHeight / 2
          : 0;

      const minTopForText =
        networkLeft < textRight && networkRight > textLeft
          ? textBottom + safetyMargin + totalNetworkHeight / 2
          : 0;

      const minTopForTagline =
        networkLeft < taglineRight && networkRight > taglineLeft
          ? taglineBottom + safetyMargin + totalNetworkHeight / 2
          : 0;

      const minTopForButton =
        networkLeft < buttonRight && networkRight > buttonLeft
          ? buttonBottom + safetyMargin + totalNetworkHeight / 2
          : 0;

      // Usar el mayor de todos los mínimos requeridos
      const requiredMinTop = Math.max(
        minTopForLogo,
        minTopForText,
        minTopForTagline,
        minTopForButton,
        availableTop + totalNetworkHeight / 2 // Mínimo absoluto después del botón
      );

      // Aplicar el mínimo requerido
      if (startY < requiredMinTop) {
        startY = requiredMinTop;
      }

      // 6. Verificar límites de la pantalla (después de aplicar mínimos)
      const finalNetworkTop = startY - totalNetworkHeight / 2;
      const finalNetworkBottom = startY + totalNetworkHeight / 2;

      if (finalNetworkTop < containerPaddingTop) {
        startY = containerPaddingTop + totalNetworkHeight / 2;
      }

      if (finalNetworkBottom > height - containerPaddingBottom) {
        startY = height - containerPaddingBottom - totalNetworkHeight / 2;
      }

      // 7. Verificación final absoluta: re-verificar que esté debajo del botón después de ajustes
      const finalAbsoluteMinTop = buttonBottom + minSpacingAfterButton;
      if (startY - totalNetworkHeight / 2 < finalAbsoluteMinTop) {
        startY = finalAbsoluteMinTop + totalNetworkHeight / 2;

        // Si aún no cabe después de este ajuste, ajustar al límite de pantalla
        if (startY + totalNetworkHeight / 2 > height - containerPaddingBottom) {
          startY = height - containerPaddingBottom - totalNetworkHeight / 2;

          // Si después de este ajuste aún se traslapa con el botón, no mostrar la red
          // (o reducir su tamaño - por ahora ajustamos al mínimo)
          if (startY - totalNetworkHeight / 2 < buttonBottom + 50) {
            startY = buttonBottom + 50 + totalNetworkHeight / 2;
          }
        }
      }

      // 8. Ajuste adicional: mover la red neuronal más abajo si hay espacio disponible
      // Calcular espacio disponible en la parte inferior
      const availableSpaceBelow =
        height - containerPaddingBottom - (startY + totalNetworkHeight / 2);
      if (availableSpaceBelow > 40) {
        // Si hay más de 40px de espacio disponible, mover la red un poco más abajo
        const extraSpacing = Math.min(availableSpaceBelow - 20, 60); // Máximo 60px adicional
        startY += extraSpacing;

        // Verificar que no se salga de la pantalla
        if (startY + totalNetworkHeight / 2 > height - containerPaddingBottom) {
          startY = height - containerPaddingBottom - totalNetworkHeight / 2;
        }
      }
    } else {
      // En desktop: centrar verticalmente
      startY = height / 2;
    }

    // Crear neuronas por capa
    for (let layer = 0; layer < config.numLayers; layer++) {
      const numNeurons = config.neuronsPerLayer[layer];
      const layerX = startX + layer * config.layerSpacing;
      const totalHeight = (numNeurons - 1) * config.neuronSpacing;
      const layerStartY = startY - totalHeight / 2;

      for (let i = 0; i < numNeurons; i++) {
        const neuronY = layerStartY + i * config.neuronSpacing;
        neurons.push({
          id: neuronId,
          layer,
          position: { x: layerX, y: neuronY },
          basePosition: { x: layerX, y: neuronY },
          activation: 0,
          baseActivation: Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
          movePhase: Math.random() * Math.PI * 2,
          moveSpeed: 0.25 + Math.random() * 0.6, // Movimiento más acelerado
          moveAmplitude: config.movementAmplitude * (0.6 + Math.random() * 0.8),
          floatPhase: Math.random() * Math.PI * 2, // Fase para movimiento flotante vertical
          floatSpeed: config.floatSpeed * (0.7 + Math.random() * 0.6), // Velocidad flotante individual
        });
        neuronId++;
      }
    }

    // Crear conexiones entre capas adyacentes
    for (let layer = 0; layer < config.numLayers - 1; layer++) {
      const currentLayerNeurons = neurons.filter((n) => n.layer === layer);
      const nextLayerNeurons = neurons.filter((n) => n.layer === layer + 1);

      currentLayerNeurons.forEach((fromNeuron) => {
        nextLayerNeurons.forEach((toNeuron) => {
          connections.push({
            from: fromNeuron.id,
            to: toNeuron.id,
            weight: 0.3 + Math.random() * 0.4, // Peso aleatorio entre 0.3 y 0.7
            pulseProgress: 0,
            active: false,
          });
        });
      });
    }

    neuronsRef.current = neurons;
    connectionsRef.current = connections;
  }, []);

  // Actualizar red neuronal
  const updateNetwork = useCallback(
    (width: number, height: number, delta: number) => {
      const neurons = neuronsRef.current;
      const connections = connectionsRef.current;
      const pulses = pulsesRef.current;
      const config = currentConfigRef.current || getConfig(width);

      // Generar nuevos pulsos periódicamente
      if (timeRef.current - lastPulseTimeRef.current >= config.pulseInterval) {
        // Encontrar conexiones de la primera capa (input)
        const inputConnections = connections.filter((conn) => {
          const fromNeuron = neurons.find((n) => n.id === conn.from);
          return fromNeuron && fromNeuron.layer === 0;
        });

        if (inputConnections.length > 0) {
          // Crear pulso en una conexión aleatoria de la primera capa
          const randomConn =
            inputConnections[
              Math.floor(Math.random() * inputConnections.length)
            ];
          const connIndex = connections.findIndex(
            (c) => c.from === randomConn.from && c.to === randomConn.to
          );

          if (connIndex !== -1) {
            connections[connIndex].active = true;
            connections[connIndex].pulseProgress = 0;
            pulses.push({
              connectionId: connIndex,
              progress: 0,
              speed: config.pulseSpeed,
            });
          }
        }

        lastPulseTimeRef.current = timeRef.current;
      }

      // Actualizar pulsos existentes
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed * delta;

        if (pulse.progress >= 1) {
          // El pulso llegó al final, activar neuronas de destino y crear nuevos pulsos
          const conn = connections[pulse.connectionId];
          const toNeuron = neurons.find((n) => n.id === conn.to);

          if (toNeuron) {
            // Activar neurona de destino
            toNeuron.activation = Math.min(1, toNeuron.activation + 0.3);

            // Si no es la última capa, crear pulsos en las conexiones siguientes
            const config = currentConfigRef.current || getConfig(width);
            if (toNeuron.layer < config.numLayers - 1) {
              const nextConnections = connections.filter(
                (c) => c.from === toNeuron.id
              );
              nextConnections.forEach((nextConn) => {
                const nextConnIndex = connections.findIndex(
                  (c) => c.from === nextConn.from && c.to === nextConn.to
                );
                if (
                  nextConnIndex !== -1 &&
                  !connections[nextConnIndex].active
                ) {
                  connections[nextConnIndex].active = true;
                  connections[nextConnIndex].pulseProgress = 0;
                  pulses.push({
                    connectionId: nextConnIndex,
                    progress: 0,
                    speed: config.pulseSpeed,
                  });
                }
              });
            }
          }

          // Desactivar conexión y eliminar pulso
          conn.active = false;
          conn.pulseProgress = 0;
          pulses.splice(i, 1);
        } else {
          // Actualizar progreso del pulso en la conexión
          connections[pulse.connectionId].pulseProgress = pulse.progress;
        }
      }

      // Actualizar activación y posición de neuronas
      neurons.forEach((neuron) => {
        // Decaimiento de activación
        neuron.activation *= 0.95;

        // Obtener configuración
        const config = currentConfigRef.current || getConfig(width);

        // Onda base de activación suave
        neuron.phase += config.activationWaveSpeed * delta;
        const waveActivation = Math.sin(neuron.phase) * 0.1 + 0.1;
        neuron.activation = Math.max(
          neuron.baseActivation + waveActivation,
          neuron.activation
        );
        neuron.activation = Math.min(1, neuron.activation);

        // Movimiento flotante suave de los nodos
        neuron.movePhase += neuron.moveSpeed * delta * config.movementSpeed;
        neuron.floatPhase += neuron.floatSpeed * delta;

        // Movimiento horizontal suave (más sutil)
        const moveX = Math.cos(neuron.movePhase) * neuron.moveAmplitude * 0.5;

        // Movimiento vertical flotante (más pronunciado, como flotando)
        const floatY = Math.sin(neuron.floatPhase) * config.floatAmplitude;

        // Movimiento circular suave adicional para efecto flotante
        const floatX =
          Math.sin(neuron.floatPhase * 0.5) * neuron.moveAmplitude * 0.3;

        neuron.position.x = neuron.basePosition.x + moveX + floatX;
        neuron.position.y = neuron.basePosition.y + floatY;
      });
    },
    []
  );

  // Dibujar red neuronal
  const drawNetwork = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      multiplier: number
    ) => {
      ctx.clearRect(0, 0, width, height);

      const neurons = neuronsRef.current;
      const connections = connectionsRef.current;
      const config = currentConfigRef.current || getConfig(width);

      // Color sincronizado para toda la red - cambia cíclicamente
      const colorCycle =
        (timeRef.current / config.colorTransitionDuration) %
        colorPalette.length;
      const currentColorIndex = Math.floor(colorCycle);
      const nextColorIndex = (currentColorIndex + 1) % colorPalette.length;
      const t = colorCycle - currentColorIndex;

      const currentColor = colorPalette[currentColorIndex];
      const nextColor = colorPalette[nextColorIndex];
      const baseColor = interpolateColor(currentColor, nextColor, t);

      // Dibujar conexiones primero (para que queden detrás de los nodos)
      connections.forEach((conn, index) => {
        const fromNeuron = neurons.find((n) => n.id === conn.from);
        const toNeuron = neurons.find((n) => n.id === conn.to);

        if (!fromNeuron || !toNeuron) return;

        // Calcular opacidad basada en peso y pulso (más tenue y profesional)
        let connectionAlpha = 0.03 + conn.weight * 0.05;

        // Aumentar opacidad si hay pulso activo (más sutil y elegante)
        if (conn.active && conn.pulseProgress > 0) {
          const pulseIntensity = Math.sin(conn.pulseProgress * Math.PI);
          connectionAlpha += pulseIntensity * 0.12;
        }

        // Aumentar con hover (más sutil)
        connectionAlpha = Math.min(
          0.18,
          connectionAlpha * (1 + multiplier * 0.15)
        );

        ctx.save();

        // Dibujar línea de conexión con gradiente suave
        ctx.strokeStyle = hexToRgba(baseColor, connectionAlpha);
        ctx.lineWidth = config.lineWidth;
        ctx.shadowBlur = 0.5 + (conn.active ? 1.5 : 0); // Glow más sutil
        ctx.shadowColor = hexToRgba(baseColor, connectionAlpha * 0.3); // Sombra más tenue
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        ctx.moveTo(fromNeuron.position.x, fromNeuron.position.y);
        ctx.lineTo(toNeuron.position.x, toNeuron.position.y);
        ctx.stroke();

        // Dibujar punto de pulso si está activo (más pequeño y elegante)
        if (conn.active && conn.pulseProgress > 0) {
          const pulseX =
            fromNeuron.position.x +
            (toNeuron.position.x - fromNeuron.position.x) * conn.pulseProgress;
          const pulseY =
            fromNeuron.position.y +
            (toNeuron.position.y - fromNeuron.position.y) * conn.pulseProgress;

          const pulseAlpha = Math.sin(conn.pulseProgress * Math.PI) * 0.7;
          ctx.fillStyle = hexToRgba(baseColor, pulseAlpha);
          ctx.shadowBlur = 4;
          ctx.shadowColor = hexToRgba(baseColor, pulseAlpha * 0.5);
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // Dibujar neuronas (mejorado para aspecto más profesional)
      neurons.forEach((neuron) => {
        // Tamaño dinámico basado en activación (más sutil)
        const size = config.neuronRadius + neuron.activation * 2.5;
        const baseAlpha = 0.25 + neuron.activation * 0.4;
        const finalAlpha = Math.min(0.85, baseAlpha * (1 + multiplier * 0.15));

        ctx.save();

        // Glow exterior más sutil y elegante
        ctx.shadowBlur = 6 + neuron.activation * 5;
        ctx.shadowColor = hexToRgba(baseColor, finalAlpha * 0.5);

        // Círculo exterior de la neurona (más pequeño y elegante)
        ctx.fillStyle = hexToRgba(baseColor, finalAlpha);
        ctx.beginPath();
        ctx.arc(neuron.position.x, neuron.position.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo más brillante cuando está activo (más sutil)
        if (neuron.activation > 0.25) {
          const coreAlpha = Math.min(1, finalAlpha * 1.1);
          ctx.fillStyle = hexToRgba(baseColor, coreAlpha);
          ctx.shadowBlur = 3;
          ctx.shadowColor = hexToRgba(baseColor, coreAlpha * 0.4);
          ctx.beginPath();
          ctx.arc(
            neuron.position.x,
            neuron.position.y,
            size * 0.45,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Punto central muy pequeño para detalle adicional
        if (neuron.activation > 0.4) {
          ctx.fillStyle = hexToRgba(baseColor, finalAlpha * 1.3);
          ctx.shadowBlur = 2;
          ctx.beginPath();
          ctx.arc(
            neuron.position.x,
            neuron.position.y,
            size * 0.2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        ctx.restore();
      });
    },
    []
  );

  // Loop de animación
  const animate = useCallback(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Pausar si el documento está oculto
    if (typeof document !== "undefined" && document.hidden) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    // Usar dimensiones lógicas del canvas (después del scale DPR)
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Lerp suave del hover (solo para efectos visuales)
    hoverLerpRef.current += (hoverActive ? 1 : 0 - hoverLerpRef.current) * 0.08;
    const multiplier = hoverLerpRef.current;

    // Si reduced motion, dibujar estático
    if (reducedMotionRef.current) {
      ctx.clearRect(0, 0, width, height);
      const neurons = neuronsRef.current;
      const connections = connectionsRef.current;
      const config = currentConfigRef.current || getConfig(width);

      const colorCycle =
        (timeRef.current / config.colorTransitionDuration) %
        colorPalette.length;
      const currentColorIndex = Math.floor(colorCycle);
      const color = colorPalette[currentColorIndex];

      // Dibujar solo algunas conexiones estáticas
      connections.slice(0, Math.min(15, connections.length)).forEach((conn) => {
        const fromNeuron = neurons.find((n) => n.id === conn.from);
        const toNeuron = neurons.find((n) => n.id === conn.to);
        if (!fromNeuron || !toNeuron) return;

        ctx.save();
        ctx.strokeStyle = hexToRgba(color, 0.05);
        ctx.lineWidth = config.lineWidth;
        ctx.beginPath();
        ctx.moveTo(fromNeuron.position.x, fromNeuron.position.y);
        ctx.lineTo(toNeuron.position.x, toNeuron.position.y);
        ctx.stroke();
        ctx.restore();
      });

      // Dibujar algunas neuronas estáticas
      neurons.slice(0, Math.min(10, neurons.length)).forEach((neuron) => {
        ctx.save();
        ctx.fillStyle = hexToRgba(color, 0.3);
        ctx.beginPath();
        ctx.arc(
          neuron.position.x,
          neuron.position.y,
          config.neuronRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    // Actualizar tiempo
    const lastTime = timeRef.current;
    const currentTime = performance.now() / 1000;
    const delta = currentTime - lastTime;
    timeRef.current = currentTime;

    // Actualizar y dibujar
    updateNetwork(width, height, delta);
    drawNetwork(ctx, width, height, multiplier);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateNetwork, drawNetwork, hoverActive]);

  // Setup canvas
  const setupCanvas = useCallback(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Esperar a que el canvas esté en el DOM
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      if (typeof requestAnimationFrame !== "undefined") {
        requestAnimationFrame(() => setupCanvas());
      }
      return;
    }

    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Obtener configuración actual
    const currentConfig = getConfig(rect.width);

    // Reinicializar red neuronal si está vacía o si cambió la configuración
    const needsReinit =
      neuronsRef.current.length === 0 ||
      !currentConfigRef.current ||
      currentConfigRef.current.numLayers !== currentConfig.numLayers ||
      currentConfigRef.current.layerSpacing !== currentConfig.layerSpacing ||
      currentConfigRef.current.neuronSpacing !== currentConfig.neuronSpacing ||
      currentConfigRef.current.leftMarginPercent !==
        currentConfig.leftMarginPercent;

    if (needsReinit) {
      initNeuralNetwork(rect.width, rect.height);
    }
  }, [initNeuralNetwork]);

  // Efecto principal
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Verificar prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;

    const handleReducedMotion = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };

    mediaQuery.addEventListener("change", handleReducedMotion);

    // Setup inicial con delay para asegurar que el canvas esté en el DOM
    const timeoutId = setTimeout(() => {
      setupCanvas();
      if (typeof performance !== "undefined") {
        timeRef.current = performance.now() / 1000;
        lastPulseTimeRef.current = timeRef.current;
      }
      animate();
    }, 100);

    // Manejar resize
    const handleResize = () => {
      setupCanvas();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      mediaQuery.removeEventListener("change", handleReducedMotion);
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [setupCanvas, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
