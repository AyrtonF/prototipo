"use client";

import { useState, useMemo } from "react";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/products/ProductCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function JoiasPage() {
  const products = useProductStore((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [material, setMaterial] = useState("all");
  const [priceRange, setPriceRange] = useState(50000);
  const [showFilters, setShowFilters] = useState(false);

  const joias = products.filter((p) => p.category === "joias");

  const filteredJoias = useMemo(() => {
    return joias.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchMaterial = material === "all" || p.material === material;
      const matchPrice = p.price <= priceRange;
      return matchSearch && matchMaterial && matchPrice;
    });
  }, [joias, searchTerm, material, priceRange]);

  const resetFilters = () => {
    setSearchTerm("");
    setMaterial("all");
    setPriceRange(50000);
  };

  return (
    <div className="max-w-400 mx-auto px-4 sm:px-6 py-12 sm:py-20 min-h-screen">
      <header className="mb-12 sm:mb-20 text-center animate-fade-in-up">
        <span className="text-xs tracking-[0.4em] uppercase text-amber-600 font-bold block mb-4">Design Atemporal</span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-6 dark:text-white">Semi-Joias</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
          Peças que brilham com você, unindo design contemporâneo e acabamento de alta joalheria.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm"
          >
            <SlidersHorizontal size={18} className="text-amber-600" />
            <span className="font-bold text-sm uppercase tracking-widest">
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </span>
          </button>
        </div>

        {/* Filters Sidebar */}
        <aside className={`
          ${showFilters ? 'block' : 'hidden'} lg:block
          w-full lg:w-72 lg:shrink-0 space-y-6
        `}>
          <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-4xl border border-zinc-100 dark:border-zinc-800 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-xl dark:text-white">Filtros</h3>
              <button
                onClick={resetFilters}
                className="text-xs text-zinc-500 hover:text-amber-600 transition-colors uppercase tracking-widest font-bold"
              >
                Limpar
              </button>
            </div>

            <div className="space-y-8">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <input 
                  type="text"
                  placeholder="Buscar por nome..."
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500 dark:text-white transition-all"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Material */}
              <div>
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-4 font-bold">Material</span>
                <div className="flex flex-wrap gap-2">
                  {["all", "Ouro", "Prata", "Ouro Rose", "Banho de Ouro"].map(val => (
                    <button 
                      key={val}
                      onClick={() => setMaterial(val)}
                      className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${
                        material === val 
                          ? 'bg-linear-to-r from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/30' 
                          : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {val === 'all' ? 'Todos' : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Preço Máximo</span>
                  <span className="text-xs font-bold text-amber-600">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceRange)}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="50000" 
                  step="500"
                  value={priceRange}
                  onChange={e => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 mt-2">
                  <span>R$ 500</span>
                  <span>R$ 50.000</span>
                </div>
              </div>

              {/* Results Count */}
              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
                  <span className="font-bold text-amber-600">{filteredJoias.length}</span>
                  {' '}
                  {filteredJoias.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1 min-w-0">
          {filteredJoias.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-6">
                <Search size={32} className="text-zinc-400" />
              </div>
              <h3 className="text-2xl font-serif mb-3 dark:text-white">Nenhuma joia encontrada</h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                Tente ajustar os filtros para ver mais produtos
              </p>
              <button
                onClick={resetFilters}
                className="px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors font-bold uppercase text-xs tracking-widest"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-16">
              {filteredJoias.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
