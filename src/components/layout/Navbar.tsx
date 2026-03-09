"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { ShoppingBag } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const totalItems = useCartStore(state => state.totalItems());
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/perfumes', label: 'Perfumes' },
    { href: '/joias', label: 'Semi-Joias' },
    { href: '/quiz', label: 'Quiz' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out",
      isScrolled 
        ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl py-4 border-b border-gray-100 dark:border-zinc-800 shadow-sm" 
        : "bg-transparent py-8"
    )}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="text-2xl font-serif tracking-[0.2em] uppercase flex items-center group">
          <span className="text-zinc-900 dark:text-white transition-colors duration-500">Luxe</span>
          <span className="text-gold ml-2 font-medium">Showroom</span>
        </Link>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={cn(
                  "text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-300 relative py-2",
                  isActive 
                    ? "text-gold" 
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 h-[1.5px] bg-gold transition-all duration-500 ease-in-out",
                  isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                )} />
              </Link>
            );
          })}
        </div>

        {/* Utility Actions */}
        <div className="flex items-center space-x-8">
          <ThemeToggle />
          
          <Link href="/sacola" className="relative group text-zinc-900 dark:text-white">
            <ShoppingBag size={22} className="group-hover:text-gold transition-colors duration-300 stroke-[1.5px]" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold shadow-lg shadow-gold/20 animate-fade-in">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
