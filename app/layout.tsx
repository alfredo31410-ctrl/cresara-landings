import type { Metadata } from "next";
import "./globals.css";
import { MetaPixel } from "@/app/components/MetaPixel";

export const metadata: Metadata = {
  title: "Cressara",
  description: "Landings de cursos gratuitos de Cressara.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Playfair+Display:wght@800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body><MetaPixel />{children}</body>
    </html>
  );
}
