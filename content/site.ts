export const siteConfig = {
  name: "CODE4CE",
  email: "info@code4ce.com",
  whatsapp: "+1234567890", // placeholder
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://code4ce.com",
  description: "Construimos software a medida que automatiza procesos e integra datos, usando tecnología moderna e IA aplicada.",
};

export const introCopy = {
  title: "CODE4CE",
  typewriter: [
    "Software a medida para empresas.",
    "Automatización e integraciones que sí funcionan.",
    "IA aplicada para ahorrar tiempo y reducir errores.",
  ],
  button: "Empezar",
};

export const heroCopy = {
  headline: "Construimos software a medida que automatiza procesos e integra datos",
  subheadline: "Usando tecnología moderna e IA aplicada para resolver problemas reales de operación, ventas, inventario, finanzas y gestión.",
  ctaPrimary: "Agendar reunión",
  ctaSecondary: "Ver servicios",
};

export const services = [
  {
    title: "IA",
    description: "Soluciones de inteligencia artificial para automatizar procesos, analizar datos y tomar decisiones. Algoritmos personalizados e integración de herramientas de aprendizaje automático para impulsar tu negocio.",
    icon: "🤖",
  },
  {
    title: "Software a medida",
    description: "Soluciones de software personalizadas para tu negocio. Aplicaciones web, móviles y de escritorio que impulsan la eficiencia y la innovación en tu empresa.",
    icon: "💻",
  },
  {
    title: "Integración",
    description: "Integración de sistemas empresariales para comunicación fluida entre tus plataformas. APIs personalizadas y soluciones de middleware para que todos tus sistemas trabajen en armonía.",
    icon: "🔌",
  },
  {
    title: "Soporte",
    description: "Mantenimiento continuo y soporte técnico para garantizar que tus sistemas funcionen de manera óptima. Resolución de problemas, actualizaciones y asistencia técnica siempre disponible.",
    icon: "🛡️",
  },
];

export const methodology = [
  {
    step: "01",
    title: "Descubrimiento",
    description: "Entendemos tu proceso, problemas y objetivos. Definimos alcance y métricas de éxito.",
  },
  {
    step: "02",
    title: "Prototipo",
    description: "Diseñamos y validamos la solución antes de construir. Ajustes rápidos sin costo alto.",
  },
  {
    step: "03",
    title: "Construcción por sprints",
    description: "Entregas cada 2-3 semanas con demos funcionales. Iteramos con feedback continuo.",
  },
  {
    step: "04",
    title: "Integración & QA",
    description: "Conectamos con sistemas existentes. Pruebas exhaustivas y documentación técnica.",
  },
  {
    step: "05",
    title: "Go-live + mejora continua",
    description: "Despliegue controlado, capacitación y soporte. Mejoras basadas en uso real.",
  },
];

export const aboutUs = [
  {
    title: "Somos Code4ce: fuerza, tecnología y soluciones de software a medida",
    description: "Soluciones digitales a medida que impulsan tu negocio. En Code4ce nos especializamos en crear herramientas tecnológicas personalizadas para resolver desafíos reales. Diseñamos y desarrollamos software a medida, aplicaciones web y móviles, integraciones entre sistemas y soluciones basadas en inteligencia artificial. Nuestro enfoque es claro: entender tu necesidad, construir con precisión y ayudarte a crecer con la fuerza del código.",
  },
  {
    title: "Tecnología aplicada para resolver problemas reales",
    description: "Automatizamos procesos, integramos sistemas y aplicamos inteligencia artificial para que tu empresa opere mejor y tome decisiones más inteligentes. En Code4ce trabajamos contigo para entender tu operación y desarrollar soluciones que realmente generen valor. Nuestra experiencia técnica está al servicio de tu negocio.",
  },
  {
    title: "Un equipo ágil, técnico y comprometido con tu crecimiento",
    description: "Somos una startup ecuatoriana con visión global. En Code4ce combinamos experiencia técnica, enfoque personalizado y acompañamiento constante para ayudarte a alcanzar tus objetivos digitales. Desde el primer contacto hasta el soporte post-lanzamiento, estamos contigo en cada etapa del camino.",
  },
];

export const technologyCategories = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "F",
    gradient: "linear-gradient(135deg, rgba(0, 208, 192, 0.1) 0%, rgba(0, 175, 163, 0.1) 100%)",
    iconColor: "#00D0C0",
    technologies: [
      { name: "Next.js", color: "#39005E" },
      { name: "React", color: "#00D0C0" },
      { name: "TypeScript", color: "#00AFA3" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "B",
    gradient: "linear-gradient(135deg, rgba(250, 106, 45, 0.1) 0%, rgba(250, 106, 45, 0.15) 100%)",
    iconColor: "#FA6A2D",
    technologies: [
      { name: "Node.js", color: "#FA6A2D" },
      { name: "Python", color: "#39005E" },
      { name: ".NET", color: "#00D0C0" },
      { name: "REST APIs", color: "#00AFA3" },
      { name: "GraphQL", color: "#00D0C0" },
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: "D",
    gradient: "linear-gradient(135deg, rgba(57, 0, 94, 0.1) 0%, rgba(57, 0, 94, 0.15) 100%)",
    iconColor: "#39005E",
    technologies: [
      { name: "PostgreSQL", color: "#39005E" },
      { name: "MongoDB", color: "#00D0C0" },
      { name: "SQL Server", color: "#00AFA3" },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    icon: "C",
    gradient: "linear-gradient(135deg, rgba(250, 106, 45, 0.1) 0%, rgba(250, 106, 45, 0.15) 100%)",
    iconColor: "#FA6A2D",
    technologies: [
      { name: "AWS", color: "#FA6A2D" },
      { name: "Docker", color: "#00D0C0" },
      { name: "Kubernetes", color: "#39005E" },
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: "AI",
    gradient: "linear-gradient(135deg, rgba(0, 208, 192, 0.1) 0%, rgba(0, 175, 163, 0.1) 100%)",
    iconColor: "#00D0C0",
    technologies: [
      { name: "OpenAI API", color: "#00D0C0" },
      { name: "Gemini", color: "#00AFA3" },
    ],
  },
];


