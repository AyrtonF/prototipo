"use client";

import { useSearchParams } from "next/navigation";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/products/ProductCard";
import { useState, useMemo, Suspense } from "react";

function ProductListContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('cat');
  
  const products = useProductStore((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || 'todos');
  const [priceRange, setPriceRange] = useState<number>(1000);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedCategory === 'todos' || p.category === selectedCategory;
      const matchPrice = p.price <= priceRange;
      return matchCat && matchPrice;
    });
  }, [selectedCategory, priceRange, products]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <header className="mb-20 text-center animate-fade-in-up">
        <span className="text-xs tracking-[0.4em] uppercase text-gold font-bold block mb-4">Curadoria Completa</span>
        <h1 className="text-5xl md:text-7xl font-serif mb-6 dark:text-white">Nossa Coleção</h1>
        <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
          Explore nossa seleção completa de fragrâncias de nicho e joias com design exclusivo.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-12 animate-fade-in-up">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <h3 className="font-serif text-xl mb-8 border-b border-gray-100 dark:border-zinc-800 pb-4 dark:text-white">Filtrar por</h3>
            
            <div className="space-y-8">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-gray-400 block mb-4 font-bold">Categoria</span>
                <div className="flex flex-col space-y-4 text-xs tracking-widest uppercase">
                  {['todos', 'perfumes', 'joias'].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left transition-luxury relative group w-fit ${
                        selectedCategory === cat 
                          ? 'text-gold font-bold' 
                          : 'text-gray-500 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {cat === 'todos' ? 'Ver Tudo' : cat === 'joias' ? 'Semi-Joias' : 'Perfumes'}
                      <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-transform duration-300 ${
                        selectedCategory === cat ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] tracking-widest uppercase text-gray-400 block mb-4 font-bold">Preço Máximo</span>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-gold h-1 bg-gray-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-4 text-[10px] tracking-widest text-gray-400 uppercase font-bold">
                  <span>R$ 0</span>
                  <span className="text-black dark:text-white">R$ {priceRange}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="animate-fade-in-up">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-gray-400 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800">
              <p className="italic text-lg">Nenhum produto encontrado nesta seleção.</p>
              <button 
                onClick={() => {setSelectedCategory('todos'); setPriceRange(1000);}}
                className="mt-6 text-xs uppercase tracking-widest text-gold font-bold border-b border-gold pb-1"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProdutosPage() {
  return (
    <Suspense fallback={<div className="p-40 text-center uppercase tracking-[0.4em] text-gold animate-pulse font-serif text-2xl">Carregando coleção...</div>}>
      <ProductListContent />
    </Suspense>
  );
}
