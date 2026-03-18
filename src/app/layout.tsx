import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import { TechBackground } from "@/components/TechBackground";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Trans Advanced Technologies - 40 Años",
  description: "Cuatro décadas resolviendo desafíos complejos en infraestructura, integración y conectividad avanzada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${libreFranklin.variable} antialiased`}
      >
        <TechBackground />
        <div className="scanlines" />
        <div className="noise-bg" />
        {children}
      </body>
    </html>
  );
}
