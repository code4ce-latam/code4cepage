# Instalación de dependencias para HologramMeshBackground

## Comandos de instalación

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing simplex-noise
```

## Dependencias instaladas

- **three**: ^0.165.0 - Biblioteca 3D core
- **@react-three/fiber**: ^8.15.19 - React renderer para Three.js
- **@react-three/drei**: ^9.92.7 - Helpers y utilidades para R3F
- **@react-three/postprocessing**: ^2.15.3 - Efectos post-procesamiento (Bloom)
- **simplex-noise**: ^4.0.1 - Generador de ruido procedural para deformación orgánica

## Verificación

Después de instalar, ejecuta:

```bash
npm run dev
```

El efecto holográfico debería aparecer en la ruta "/" (Intro Screen).

## Notas

- El componente usa dynamic import con `ssr: false` para evitar problemas de SSR
- El efecto se adapta automáticamente a móviles (menos segmentos)
- Respeta `prefers-reduced-motion` para accesibilidad
- Pausa automáticamente cuando el documento está oculto

