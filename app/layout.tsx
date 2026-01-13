import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${siteConfig.name} - Software a medida para empresas`,
  description:
    "Construimos software a medida que automatiza procesos e integra datos, usando tecnología moderna e IA aplicada.",
  keywords: [
    "software a medida",
    "automatización de procesos",
    "integración de sistemas",
    "IA aplicada",
    "BI y analítica",
    "desarrollo web",
    "ERP",
    "CRM",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} - Software a medida para empresas`,
    description:
      "Construimos software a medida que automatiza procesos e integra datos, usando tecnología moderna e IA aplicada.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

