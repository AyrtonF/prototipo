"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";
import JewelryHoverImage from "./JewelryHoverImage";
import PerfumeHoverEffect from "./PerfumeHoverEffect";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore(state => state.addToCart);

  return (
    <div className="group relative flex flex-col h-full bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:shadow-[0_32px_64px_-15px_rgba(0,0,0,0.15)] border border-zinc-100 dark:border-zinc-800">
      
      {/* Media Section */}
      <div className="relative aspect-3/4 overflow-hidden bg-zinc-50 dark:bg-zinc-800">
        <Link href={`/produto/${product.slug}`} className="block w-full h-full">
           {product.category === 'joias' ? (
             <JewelryHoverImage product={product} />
           ) : (
             <div className="relative w-full h-full">
               <PerfumeHoverEffect product={product} />
               <img 
                 src={product.images[0]} 
                 alt={product.name}
                 className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
               />
             </div>
           )}
        </Link>

        {/* Add Action */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="absolute bottom-6 right-6 w-14 h-14 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md text-zinc-900 dark:text-white rounded-full flex items-center justify-center shadow-2xl translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out hover:bg-gold hover:text-white z-20"
        >
          <ShoppingBag size={20} />
        </button>
      </div>

      {/* Info Section */}
      <div className="flex flex-col p-8 flex-1 justify-between text-center">
        <div>
          <span className="text-[9px] uppercase tracking-[0.4em] text-gold font-bold mb-3 block">
            {product.category === 'joias' ? 'Haute Joaillerie' : 'Parfum de Niche'}
          </span>
          <Link href={`/produto/${product.slug}`}>
            <h3 className="font-serif text-2xl mb-4 text-zinc-900 dark:text-white group-hover:text-gold transition-colors duration-300">
              {product.name}
            </h3>
          </Link>
          
          {/* Tooltips/Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {product.tags?.map(tag => (
              <span key={tag} className="text-[8px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full font-medium">
                {tag}
              </span>
            ))}
            {product.intensity && (
              <span className="text-[8px] uppercase tracking-widest bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-3 py-1.5 rounded-full font-bold">
                {product.intensity}
              </span>
            )}
          </div>
        </div>

        <p className="text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 border-t border-zinc-50 dark:border-zinc-800 pt-6">
          {formatCurrency(product.price)}
        </p>
      </div>
    </div>
  );
}
