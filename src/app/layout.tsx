import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductBootstrap from "@/components/providers/ProductBootstrap";

export const metadata: Metadata = {
  title: "La Vie | Joias e Perfumes",
  description: "Showroom editorial de joias e perfumes com identidade visual em tons de creme, cobre e vinho.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased font-sans bg-cream text-wine transition-colors duration-300">
        <ProductBootstrap />
        <Navbar />
        <main className="min-h-screen pt-18">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
