import type { Metadata } from "next";
import localFont from "next/font/local";

const gwendolyn = localFont({
  src: "../public/fonts/Gwendolyn-Regular.ttf",
  variable: "--font-gwendolyn",
  weight: "400",
  style: "normal",
});
import "./globals.css";
import { TechBackground } from "@/components/TechBackground";

const cinzel = Cinzel({
  variable: "--font-cinzel",
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
        className={`${cinzel.variable} ${laBelleAurore.variable} font-hand antialiased`}
      >
        <TechBackground />
        {children}
      </body>
    </html>
  );
}
