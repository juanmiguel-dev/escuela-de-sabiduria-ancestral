import type { Metadata } from "next";
import { La_Belle_Aurore } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { TechBackground } from "@/components/TechBackground";

const playfairDisplay = Playfair_Display({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

 

const laBelleAurore = La_Belle_Aurore({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
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
        className={`${playfairDisplay.variable} ${laBelleAurore.variable} font-hand antialiased`}
      >
        <TechBackground />
        {children}
      </body>
    </html>
  );
}
