import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import { TechBackground } from "@/components/TechBackground";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
    <html lang="en">
      <body
        className={`${cinzel.variable} antialiased`}
      >
        <TechBackground />
        <div className="scanlines" />
        <div className="noise-bg" />
        {children}
      </body>
    </html>
  );
}
