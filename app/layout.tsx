import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/site";
import Matomo from "@/components/Matomo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Software a medida para empresas`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "software a medida",
    "automatización de procesos",
    "integración de sistemas",
    "IA aplicada",
    "BI y analítica",
    "desarrollo web",
    "ERP",
    "CRM",
    "desarrollo de software",
    "inteligencia artificial",
    "automatización empresarial",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - Software a medida para empresas`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/brand/home.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Software a medida`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Software a medida para empresas`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/brand/home.jpg`],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      { url: "/brand/favicon.png", type: "image/png" },
    ],
    shortcut: "/brand/favicon.png",
    apple: "/brand/favicon.png",
  },
  verification: {
    // Preparado para Google Search Console - agregar cuando se tenga el código
    // google: "verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Matomo />
      </body>
    </html>
  );
}
