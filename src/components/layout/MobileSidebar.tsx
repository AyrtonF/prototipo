"use client";

import { X, Droplet, Sparkles, HelpCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const totalItems = useCartStore(state => state.totalItems());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsMounted(true), 0);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { href: '/quiz', label: 'Sua assinatura', icon: HelpCircle },
    { href: '/perfumes', label: 'Perfumes', icon: Droplet },
    { href: '/joias', label: 'Semi-Joias', icon: Sparkles },
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
          "fixed top-0 left-0 h-full w-80 bg-cream z-60 transition-transform duration-300 ease-in-out md:hidden shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#e6cfad] p-6">
            <Link href="/" onClick={onClose} className="text-xl font-serif tracking-[0.2em] uppercase flex items-center">
              <span className="text-wine">La</span>
              <span className="text-copper ml-2 font-medium">Vie</span>
            </Link>
            <button 
              type="button"
              onClick={onClose}
              className="relative flex cursor-pointer items-center justify-center rounded-full p-2 transition-colors hover:bg-white/60"
              aria-label="Fechar menu"
            >
              <X size={24} className="text-wine" />
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
                      "group flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-300",
                      isActive 
                        ? "bg-copper text-white shadow-lg shadow-copper/20" 
                        : "text-[#6e574d] hover:bg-white/70"
                    )}
                  >
                    <Icon 
                      size={20} 
                      className={cn(
                        "transition-colors",
                        isActive ? "text-white" : "text-[#a07d61] group-hover:text-copper"
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
            <div className="my-6 border-t border-[#e6cfad]" />

            {/* Sacola */}
            <Link
              href="/sacola"
              onClick={onClose}
              className={cn(
                "group flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-300",
                pathname === "/sacola"
                  ? "bg-copper text-white shadow-lg shadow-copper/20"
                  : "text-[#6e574d] hover:bg-white/70"
              )}
            >
              <div className="flex items-center gap-4">
                <ShoppingBag 
                  size={20} 
                  className={cn(
                    "transition-colors",
                    pathname === "/sacola" ? "text-white" : "text-[#a07d61] group-hover:text-copper"
                  )} 
                />
                <span className={cn(
                  "text-sm font-bold uppercase tracking-widest",
                  pathname === "/sacola" ? "text-white" : ""
                )}>
                  Sacola
                </span>
              </div>
              {isMounted && totalItems > 0 && (
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-bold",
                  pathname === "/sacola"
                    ? "bg-white text-copper"
                    : "bg-copper text-white"
                )}>
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
