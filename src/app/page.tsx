"use client";

import Link from "next/link";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/products/ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const products = useProductStore((state) => state.products);
  const featuredPerfumes = products.filter(p => p.category === 'perfumes').slice(0, 3);
  const featuredJewelry = products.filter(p => p.category === 'joias').slice(0, 3);

  return (
    <div className="flex flex-col bg-zinc-50 dark:bg-zinc-950">
      
      {/* 1. Immersive Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Main Hero Background with Gradient Overlays */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="/foto-home.png" 
            alt="Luxe Background"
            className="w-full h-full object-cover scale-105 animate-pulse-slow"
          />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-zinc-50 dark:from-zinc-950 to-transparent z-20" />
        </div>
        
        <div className="relative z-30 text-center px-6 md:px-12 animate-fade-up max-w-5xl">
          <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase mb-8 block font-bold text-white/80">
            A Arte da Sofisticação
          </span>
          <h1 className="text-6xl md:text-9xl font-serif mb-12 text-white leading-[0.9] drop-shadow-2xl">
            Redefinindo o <br />
            <span className="italic text-gold">Luxo</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <Link 
              href="/perfumes" 
              className="w-full md:w-64 py-5 bg-white text-zinc-900 hover:bg-gold hover:text-white transition-all duration-500 uppercase text-[10px] tracking-[0.3em] font-bold rounded-full shadow-2xl"
            >
              Coleção de Perfumes
            </Link>
            <Link 
              href="/joias" 
              className="w-full md:w-64 py-5 border border-white/30 text-white backdrop-blur-md hover:bg-white hover:text-zinc-900 transition-all duration-500 uppercase text-[10px] tracking-[0.3em] font-bold rounded-full"
            >
              Semi-Joias Finas
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Discover Quiz Section - Minimalist Banner */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-zinc-900 dark:bg-zinc-900 rounded-[2.5rem] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between group">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 md:max-w-xl text-center md:text-left mb-12 md:mb-0">
              <div className="inline-flex items-center space-x-3 text-gold mb-6">
                <Sparkles size={18} />
                <span className="text-xs uppercase tracking-[0.3em] font-bold">Consultoria Digital</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
                Descubra sua Assinatura Olfativa
              </h2>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10 max-w-md">
                Responda ao nosso quiz exclusivo e encontre a fragrância que harmoniza com sua essência e estilo de vida.
              </p>
              <Link href="/quiz" className="inline-flex items-center space-x-6 text-white group/btn">
                <span className="text-xs uppercase tracking-[0.4em] font-bold border-b border-gold pb-2 group-hover/btn:text-gold transition-colors">Iniciar Experiência</span>
                <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover/btn:border-gold group-hover/btn:bg-gold transition-all duration-500">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </div>

            <div className="relative z-10 md:w-1/3 aspect-square bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
              <img 
                src="/quiz.png"
                alt="Quiz Experience"
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Curated Selection Sections */}
      <div className="space-y-40 pb-40">
        
        {/* Perfumes Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-md animate-fade-up">
              <span className="text-gold font-bold text-[10px] tracking-[0.5em] uppercase mb-4 block">Parfums de Niche</span>
              <h2 className="text-5xl md:text-7xl font-serif dark:text-white mb-6">Essências <br /> em Destaque</h2>
              <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">Uma seleção rigorosa de fragrâncias raras que definem a presença e o caráter de quem as usa.</p>
            </div>
            <Link href="/perfumes" className="flex items-center space-x-4 text-xs uppercase tracking-[0.3em] font-bold hover:text-gold transition-colors pb-2 border-b border-zinc-200 dark:border-zinc-800 dark:text-zinc-300">
              <span>Explorar Todos</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredPerfumes.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Jewelry Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-md animate-fade-up">
              <span className="text-gold font-bold text-[10px] tracking-[0.5em] uppercase mb-4 block">Haute Joaillerie</span>
              <h2 className="text-5xl md:text-7xl font-serif dark:text-white mb-6">Brilho <br /> Atemporal</h2>
              <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">Peças banhadas a ouro 18k e ródio, desenhadas para capturar a luz e a admiração em cada movimento.</p>
            </div>
            <Link href="/joias" className="flex items-center space-x-4 text-xs uppercase tracking-[0.3em] font-bold hover:text-gold transition-colors pb-2 border-b border-zinc-200 dark:border-zinc-800 dark:text-zinc-300">
              <span>Explorar Todas</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredJewelry.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>

    </div>
  );
}
