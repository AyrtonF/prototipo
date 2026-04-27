import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductBootstrap from "@/components/providers/ProductBootstrap";

const themeInitializer = `
(function () {
  try {
    var storedTheme = localStorage.getItem("luxury_showroom_theme");
    if (!storedTheme) return;

    var parsedTheme = JSON.parse(storedTheme);
    var isDarkMode = Boolean(parsedTheme && parsedTheme.state && parsedTheme.state.isDarkMode);

    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? "dark" : "light";
  } catch (error) {}
})();
`;

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-background font-sans text-foreground antialiased transition-colors duration-300">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitializer}
        </Script>
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
