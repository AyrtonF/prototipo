"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { Menu, Search, ShoppingBag, ChevronRight, X } from 'lucide-react';
import MobileSidebar from '@/components/layout/MobileSidebar';
import ThemeToggle from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import { useProductStore } from '@/store/productStore';

export default function Navbar() {
  const totalItems = useCartStore(state => state.totalItems());
  const products = useProductStore((state) => state.products);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    const animationFrame = window.requestAnimationFrame(() => {
      setIsMounted(true);
      handleScroll();
    });
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const searchResults = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    const normalizeText = (value: string) =>
      value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    return products
      .filter((product) => {
        const searchableText = normalizeText([
          product.name,
          product.description,
          product.tags.join(" "),
          product.category,
        ].join(" "));

        return searchableText.includes(normalizeText(normalizedQuery));
      })
      .slice(0, 5);
  }, [products, searchTerm]);

  const navLinks = [
    { href: '/quiz', label: 'Sua assinatura' },
    { href: '/perfumes', label: 'Perfumes' },
    { href: '/joias', label: 'Semi-Joias' },
  ];

  return (
    <>
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-copper text-cream shadow-[0_10px_30px_rgba(48,20,31,0.1)] transition-all duration-500 ease-in-out",
        isScrolled ? "bg-copper/95 backdrop-blur-md" : "bg-copper"
      )}>
        <div className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-4 sm:px-6 md:gap-6 md:px-8">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={cn(
              "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 transition-colors duration-300 hover:bg-white/20",
              isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
            aria-label="Abrir menu"
          >
            <Menu size={22} className="text-cream" />
          </button>

          {/* Brand Logo */}
          <Link href="/" className={cn(
            "relative flex w-fit flex-col items-center gap-1 leading-none transition-opacity duration-300",
            isSidebarOpen ? "opacity-0 md:opacity-100" : "opacity-100"
          )}>
            <span className="relative block h-11 w-11 shrink-0 md:h-12 md:w-12">
              <Image
                src="/La vie (bege claro).png"
                alt="La Vie"
                fill
                sizes="56px"
                className="object-contain"
                priority
              />
            </span>
            <span className="font-serif text-[0.72rem] uppercase tracking-[0.38em] text-cream md:text-[0.78rem]">
              La Vie
            </span>
          </Link>

          <div className="relative hidden flex-1 md:flex">
            <label className="relative flex w-full items-center">
              <Search size={16} className="pointer-events-none absolute left-4 text-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search for products..."
                className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-10 text-sm text-foreground outline-none placeholder:text-muted"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 inline-flex h-6 w-6 items-center justify-center rounded-full text-muted transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                  aria-label="Limpar busca"
                >
                  <X size={14} />
                </button>
              )}
            </label>

            {searchTerm.trim() && (
              <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_24px_60px_rgba(48,20,31,0.12)]">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted">
                    Resultados
                  </p>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                    {searchResults.length} encontrados
                  </span>
                </div>

                <div className="max-h-96 overflow-auto py-2">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/produto/${product.slug}`}
                        onClick={() => setSearchTerm("")}
                        className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-serif text-[1rem] text-foreground">
                            {product.name}
                          </p>
                          <p className="mt-1 text-[0.72rem] uppercase tracking-[0.22em] text-muted">
                            {product.category === "perfumes" ? "Perfume" : "Semi-Joia"}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-copper">
                          <span className="text-sm font-semibold">
                            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}
                          </span>
                          <ChevronRight size={16} />
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <p className="text-sm text-muted">Nenhum resultado encontrado.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Menu - Desktop */}
          <div className="hidden items-center gap-8 xl:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={cn(
                    "group relative py-2 text-[10px] font-semibold uppercase tracking-[0.3em] transition-colors duration-300",
                    isActive 
                      ? "text-cream" 
                      : "text-cream/80 hover:text-cream"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute bottom-0 left-0 h-[1.5px] bg-cream transition-all duration-500 ease-in-out",
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  )} />
                </Link>
              );
            })}
          </div>

          {/* Utility Actions */}
          <div className="ml-auto flex items-center gap-4 md:gap-5">
            <ThemeToggle />

            <Link href="/sacola" className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-cream transition-colors duration-300 hover:bg-white/20">
              <ShoppingBag size={20} className="stroke-[1.5px]" />
              {isMounted && totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#30141f] text-[9px] font-bold text-cream shadow-lg shadow-[#30141f]/20 animate-fade-in">
                  {totalItems}
                </span>
              )}
            </Link>

          </div>
        </div>
      </nav>
    </>
  );
}
