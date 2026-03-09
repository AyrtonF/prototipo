"use client";

import { use } from "react";
import { useProductStore } from "@/store/productStore";
import { notFound } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { ShoppingBag, ChevronRight, Droplets, Diamond, Clock, Package } from "lucide-react";
import { useState } from "react";

export default function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const products = useProductStore(state => state.products);
  const product = products.find(p => p.slug === slug);
  const addToCart = useCartStore(state => state.addToCart);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-12 sm:pb-20 min-h-screen">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[10px] tracking-widest uppercase text-gray-400 mb-8 sm:mb-12 overflow-x-auto whitespace-nowrap">
        <a href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</a>
        <ChevronRight size={12} />
        <a href={product.category === 'perfumes' ? '/perfumes' : '/joias'} className="hover:text-black dark:hover:text-white transition-colors">
          {product.category === 'perfumes' ? 'Perfumes' : 'Semi-Joias'}
        </a>
        <ChevronRight size={12} />
        <span className="text-black dark:text-white font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
        {/* Gallery */}
        <div className="space-y-4 animate-fade-in-up">
          <div 
            className="aspect-4/5 overflow-hidden bg-zinc-50 dark:bg-zinc-800 relative rounded-3xl border border-gray-100 dark:border-zinc-800"
          >
             <img 
               src={product.images[activeImage]} 
               alt={product.name}
               className="w-full h-full object-cover"
             />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-800 border-2 rounded-xl transition-all ${
                    activeImage === idx 
                      ? 'border-gold ring-2 ring-gold/20' 
                      : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col animate-fade-in-up">
          <span className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4">
            {product.category === 'joias' ? 'Semi-Joia Fina' : 'Parfum Exclusivo'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-4 sm:mb-6 dark:text-white leading-tight">
            {product.name}
          </h1>
          
          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full text-[10px] uppercase tracking-widest font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <p className="text-2xl sm:text-3xl font-medium mb-8 sm:mb-12 dark:text-gray-200">
            {formatCurrency(product.price)}
          </p>
          
          <div className="space-y-8 sm:space-y-10 mb-8 sm:mb-12">
            <div>
              <h3 className="text-xs tracking-widest uppercase font-bold mb-4 text-gray-400">Descrição</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg font-light">
                {product.description}
              </p>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {product.category === 'perfumes' && (
                <>
                  {product.intensity && (
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                      <div className="text-[10px] tracking-widest uppercase text-zinc-400 mb-2 font-bold">Intensidade</div>
                      <div className="font-medium text-sm dark:text-white">{product.intensity}</div>
                    </div>
                  )}
                  {product.fixation && (
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                      <div className="text-[10px] tracking-widest uppercase text-zinc-400 mb-2 font-bold flex items-center gap-2">
                        <Clock size={12} />
                        Fixação
                      </div>
                      <div className="font-medium text-sm dark:text-white">{product.fixation}</div>
                    </div>
                  )}
                  {product.concentration && (
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 col-span-2">
                      <div className="text-[10px] tracking-widest uppercase text-zinc-400 mb-2 font-bold">Concentração</div>
                      <div className="font-medium text-sm dark:text-white">{product.concentration}</div>
                    </div>
                  )}
                </>
              )}
              
              {product.category === 'joias' && (
                <>
                  {product.material && (
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                      <div className="text-[10px] tracking-widest uppercase text-zinc-400 mb-2 font-bold">Material</div>
                      <div className="font-medium text-sm dark:text-white">{product.material}</div>
                    </div>
                  )}
                  {product.finish && (
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                      <div className="text-[10px] tracking-widest uppercase text-zinc-400 mb-2 font-bold">Acabamento</div>
                      <div className="font-medium text-sm dark:text-white">{product.finish}</div>
                    </div>
                  )}
                  {product.weight && (
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                      <div className="text-[10px] tracking-widest uppercase text-zinc-400 mb-2 font-bold">Peso</div>
                      <div className="font-medium text-sm dark:text-white">{product.weight}g</div>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                      <div className="text-[10px] tracking-widest uppercase text-zinc-400 mb-2 font-bold">Dimensões</div>
                      <div className="font-medium text-sm dark:text-white">{product.dimensions}</div>
                    </div>
                  )}
                </>
              )}
              
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 col-span-2">
                <div className="text-[10px] tracking-widest uppercase text-zinc-400 mb-2 font-bold flex items-center gap-2">
                  <Package size={12} />
                  Estoque
                </div>
                <div className="font-medium text-sm dark:text-white">
                  {product.stock > 0 ? `${product.stock} unidades disponíveis` : 'Indisponível'}
                </div>
              </div>
            </div>

            {product.details && product.details.length > 0 && (
              <div>
                <h3 className="text-xs tracking-widest uppercase font-bold mb-4 text-gray-400">Destaques</h3>
                <ul className="space-y-3">
                  {product.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button 
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className="w-full bg-black dark:bg-white dark:text-black text-white py-5 sm:py-6 uppercase text-xs tracking-[0.3em] font-bold hover:bg-gold dark:hover:bg-gold hover:text-white transition-all flex items-center justify-center space-x-4 mb-12 sm:mb-16 rounded-2xl shadow-xl hover:shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={18} />
            <span>{product.stock > 0 ? 'Adicionar à Sacola' : 'Indisponível'}</span>
          </button>

          {/* Luxury Section specific to Category */}
          {product.category === 'perfumes' && product.olfactoryNotes && (
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 sm:p-12 space-y-6 sm:space-y-8 rounded-3xl border border-gray-100 dark:border-zinc-800">
              <div className="flex items-center space-x-4 mb-4">
                <Droplets className="text-gold" />
                <h3 className="text-lg font-serif dark:text-white">Pirâmide Olfativa</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 relative">
                {/* Connecting Line */}
                <div className="hidden sm:block absolute top-4 left-0 w-full h-px bg-gray-200 dark:bg-zinc-700 z-0" />
                
                <div className="relative z-10 bg-zinc-50 dark:bg-zinc-900 sm:pr-4">
                  <span className="text-[10px] tracking-widest uppercase text-gold font-bold block mb-2">Topo (Saída)</span>
                  <p className="text-sm dark:text-gray-300">{product.olfactoryNotes.top}</p>
                </div>
                <div className="relative z-10 bg-zinc-50 dark:bg-zinc-900 sm:px-2">
                  <span className="text-[10px] tracking-widest uppercase text-gold font-bold block mb-2">Coração (Corpo)</span>
                  <p className="text-sm dark:text-gray-300">{product.olfactoryNotes.heart}</p>
                </div>
                <div className="relative z-10 bg-zinc-50 dark:bg-zinc-900 sm:pl-4">
                  <span className="text-[10px] tracking-widest uppercase text-gold font-bold block mb-2">Fundo (Base)</span>
                  <p className="text-sm dark:text-gray-300">{product.olfactoryNotes.base}</p>
                </div>
              </div>
            </div>
          )}

          {product.category === 'joias' && (
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 sm:p-12 space-y-6 sm:space-y-8 rounded-3xl border border-gray-100 dark:border-zinc-800">
              <div className="flex items-center space-x-4 mb-4">
                <Diamond className="text-gold" />
                <h3 className="text-lg font-serif dark:text-white">Especificações Técnicas</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-gray-400 block mb-2">Material Base</span>
                  <p className="text-sm dark:text-gray-300 font-medium">{product.material}</p>
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-gray-400 block mb-2">Acabamento</span>
                  <p className="text-sm dark:text-gray-300 font-medium">{product.finish}</p>
                </div>
                {product.weight && (
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-gray-400 block mb-2">Peso</span>
                    <p className="text-sm dark:text-gray-300 font-medium">{product.weight} gramas</p>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-gray-400 block mb-2">Dimensões</span>
                    <p className="text-sm dark:text-gray-300 font-medium">{product.dimensions}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
