import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";
import { TechBackground } from "@/components/TechBackground";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ROMINA CASTAÑEDA",
  description: "Plataforma de talleres y videos de Romina Castañeda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${caveat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
