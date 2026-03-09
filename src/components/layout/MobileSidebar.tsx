"use client";

import { X, Home, Droplet, Sparkles, HelpCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import ThemeToggle from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const totalItems = useCartStore(state => state.totalItems());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/perfumes', label: 'Perfumes', icon: Droplet },
    { href: '/joias', label: 'Semi-Joias', icon: Sparkles },
    { href: '/quiz', label: 'Quiz', icon: HelpCircle },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-white dark:bg-zinc-950 z-60 transition-transform duration-300 ease-in-out md:hidden shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
            <Link href="/" onClick={onClose} className="text-xl font-serif tracking-[0.2em] uppercase flex items-center">
              <span className="text-zinc-900 dark:text-white">Luxe</span>
              <span className="text-gold ml-2 font-medium">Showroom</span>
            </Link>
            <button 
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors relative flex items-center justify-center cursor-pointer"
              aria-label="Fechar menu"
            >
              <X size={24} className="text-zinc-900 dark:text-white" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-8 px-6">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group",
                      isActive 
                        ? "bg-gold text-white shadow-lg shadow-gold/20" 
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    )}
                  >
                    <Icon 
                      size={20} 
                      className={cn(
                        "transition-colors",
                        isActive ? "text-white" : "text-zinc-400 group-hover:text-gold"
                      )} 
                    />
                    <span className={cn(
                      "text-sm font-bold uppercase tracking-widest",
                      isActive ? "text-white" : ""
                    )}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-zinc-200 dark:border-zinc-800" />

            {/* Sacola */}
            <Link
              href="/sacola"
              onClick={onClose}
              className={cn(
                "flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 group",
                pathname === "/sacola"
                  ? "bg-gold text-white shadow-lg shadow-gold/20"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              <div className="flex items-center gap-4">
                <ShoppingBag 
                  size={20} 
                  className={cn(
                    "transition-colors",
                    pathname === "/sacola" ? "text-white" : "text-zinc-400 group-hover:text-gold"
                  )} 
                />
                <span className={cn(
                  "text-sm font-bold uppercase tracking-widest",
                  pathname === "/sacola" ? "text-white" : ""
                )}>
                  Sacola
                </span>
              </div>
              {totalItems > 0 && (
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-bold",
                  pathname === "/sacola"
                    ? "bg-white text-gold"
                    : "bg-gold text-white"
                )}>
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold">
                Modo Noturno
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
