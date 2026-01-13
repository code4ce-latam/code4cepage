# CODE4CE - Landing Page

Sitio web corporativo para CODE4CE, empresa de desarrollo de software a medida.

## Stack Tecnológico

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **React 18**

## Características

- ✅ Intro Screen con efecto typewriter (pantalla de bienvenida)
- ✅ Landing page completa con todas las secciones
- ✅ Diseño responsive y accesible
- ✅ Navegación suave con anclas
- ✅ Formulario de contacto
- ✅ Typewriter effect custom (sin librerías externas)

## Estructura del Proyecto

```
codeforcepage/
├── app/
│   ├── layout.tsx          # Layout principal con metadata
│   ├── page.tsx            # Intro Screen (página inicial)
│   ├── home/
│   │   └── page.tsx        # Landing principal
│   └── globals.css         # Estilos globales
├── components/
│   ├── IntroScreen.tsx     # Pantalla de bienvenida
│   ├── Typewriter.tsx      # Componente typewriter custom
│   ├── Navbar.tsx          # Navegación sticky
│   ├── Footer.tsx           # Footer
│   ├── Section.tsx          # Wrapper de secciones
│   └── Buttons.tsx         # Componentes de botones
├── content/
│   └── site.ts             # Contenido y textos del sitio
└── public/
    └── brand/
        ├── code4ce-logo.png    # Logo principal
        └── code4ce-mark.png    # Logo abreviado
```

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Agregar assets de logos:

Coloca los siguientes archivos en `public/brand/`:
- `code4ce-logo.png` (logo principal)
- `code4ce-mark.png` (logo abreviado)

3. Ejecutar en desarrollo:

```bash
npm run dev
```

4. Abrir en el navegador:

```
http://localhost:3000
```

## Rutas

- `/` - Intro Screen (pantalla de bienvenida con typewriter)
- `/home` - Landing page principal con todas las secciones

## Notas

- El formulario de contacto actualmente hace `console.log` y muestra un mensaje de confirmación. La arquitectura está lista para integrar con un backend.
- El efecto typewriter está implementado con React hooks y no usa librerías externas.
- Los logos deben estar en formato PNG y optimizados para web.

## Build para Producción

```bash
npm run build
npm start
```

## Licencia

Privado - CODE4CE

