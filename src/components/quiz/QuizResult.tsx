"use client";

import { Product } from "@/types";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";

interface QuizResultProps {
  recommendations: Product[];
  onReset: () => void;
}

export default function QuizResult({ recommendations, onReset }: QuizResultProps) {
  return (
    <div className="w-full text-center animate-fade-in">
      <div className="mb-16">
        <span className="text-xs tracking-[0.4em] uppercase text-gold font-bold block mb-4">Sua Assinatura Olfativa</span>
        <h2 className="text-4xl md:text-6xl font-serif mb-6 dark:text-white">Descobrimos sua Essência</h2>
        <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
          Com base nas suas escolhas, selecionamos estas fragrâncias exclusivas que harmonizam perfeitamente com seu estilo e personalidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
        <button 
          onClick={onReset}
          className="px-8 py-4 border border-gray-300 dark:border-zinc-700 text-[10px] tracking-[0.2em] uppercase font-bold hover:border-gold hover:text-gold transition-colors dark:text-white"
        >
          Refazer Quiz
        </button>
        <Link 
          href="/perfumes"
          className="px-8 py-4 bg-black dark:bg-white dark:text-black text-white text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-gold dark:hover:bg-gold hover:text-white transition-colors"
        >
          Ver Todos os Perfumes
        </Link>
      </div>
    </div>
  );
}
