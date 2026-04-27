"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/products/ProductCard";
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";

const materialOptions = ["all", "Ouro", "Prata", "Ouro Rose", "Banho de Ouro"];

const ITEMS_PER_PAGE = 9;

export default function JoiasPage() {
  const products = useProductStore((state) => state.products);
  const status = useProductStore((state) => state.status);
  const [searchTerm, setSearchTerm] = useState("");
  const [material, setMaterial] = useState("all");
  const [priceRange, setPriceRange] = useState(1000000);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const joias = products.filter((product) => product.category === "joias");

  const filteredJoias = useMemo(() => {
    return joias.filter((product) => {
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchMaterial = material === "all" || product.material === material;
      const matchPrice = product.price <= priceRange;
      return matchSearch && matchMaterial && matchPrice;
    });
  }, [joias, searchTerm, material, priceRange]);

  const totalPages = Math.max(1, Math.ceil(filteredJoias.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const visibleJoias = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredJoias.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredJoias, safeCurrentPage]);

  if (status !== "ready") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-copper">
        <div>
          <p className="font-serif text-2xl uppercase tracking-[0.3em]">Carregando joias...</p>
          <p className="mt-3 text-sm text-muted">Buscando o catálogo no Supabase.</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-foreground">
        <div>
          <p className="text-[11px] uppercase tracking-[0.45em] text-copper">Catálogo vazio</p>
          <h1 className="mt-4 font-serif text-4xl uppercase leading-[1.05] md:text-5xl">Nenhum produto cadastrado</h1>
          <p className="mt-4 text-sm text-muted">Cadastre joias no painel administrativo para exibir esta coleção.</p>
        </div>
      </div>
    );
  }

  const resetFilters = () => {
    setSearchTerm("");
    setMaterial("all");
    setPriceRange(50000);
    setCurrentPage(1);
  };

  const visibleStart = filteredJoias.length > 0 ? (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const visibleEnd = Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredJoias.length);

  return (
    <div className="min-h-screen bg-background px-4 pb-16 pt-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link href="/joias" aria-current="page" className="text-foreground transition-colors hover:text-copper">
            Semi-joias
          </Link>
        </div>

        <div className="mb-8 flex flex-col gap-3 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.45em] text-copper">Design Atemporal</p>
            <h1 className="mt-2 font-serif text-4xl uppercase tracking-[0.06em] text-foreground md:text-5xl lg:text-6xl">
              Semi-joias
            </h1>
          </div>
          <p className="text-sm text-muted">
            Exibindo {visibleStart}-{visibleEnd} de {filteredJoias.length} Produtos
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters((value) => !value)}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-[0_14px_34px_rgba(48,20,31,0.06)]"
            >
              <SlidersHorizontal size={18} className="text-copper" />
              <span className="text-sm font-bold uppercase tracking-widest text-foreground">
                {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
              </span>
            </button>
          </div>

          <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-62.5 lg:shrink-0`}>
            <div className="sticky top-24 rounded-[1.75rem] border border-border bg-surface p-6 shadow-[0_18px_50px_rgba(48,20,31,0.06)] sm:p-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <h3 className="font-serif text-xl text-foreground">Filtros</h3>
                <button
                  onClick={resetFilters}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-copper text-cream transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#42202e]"
                  aria-label="Limpar filtros"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-8">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <input
                    type="text"
                    placeholder="Buscar por nome..."
                    className="w-full rounded-full border border-transparent bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted focus:border-border focus:bg-surface focus:ring-2 focus:ring-[#e8c7b9]/50"
                    value={searchTerm}
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-foreground"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div>
                  <span className="mb-4 block text-[9px] font-bold uppercase tracking-widest text-muted">Material</span>
                  <div className="flex flex-wrap gap-2">
                    {materialOptions.map((value) => (
                      <button
                        key={value}
                        onClick={() => {
                          setMaterial(value);
                          setCurrentPage(1);
                        }}
                        className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                          material === value
                            ? "bg-copper text-cream shadow-[0_12px_24px_rgba(190,108,53,0.22)]"
                            : "bg-background text-muted hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                      >
                        {value === "all" ? "Todos" : value}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted">Preço</span>
                    <span className="text-xs font-bold text-copper">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(priceRange)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="1000000"
                    step="500"
                    value={priceRange}
                    onChange={(event) => {
                      setPriceRange(Number(event.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full cursor-pointer accent-copper"
                  />
                  <div className="mt-2 flex justify-between text-[10px] text-muted">
                    <span>R$ 500</span>
                    <span>R$ 1.000.000</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowFilters(false)}
                  className="flex h-12 w-full items-center justify-center rounded-full bg-copper text-xs font-semibold uppercase tracking-[0.26em] text-cream transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#42202e]"
                >
                  Aplicar Filtro
                </button>

                <div className="border-t border-border pt-5">
                  <p className="text-center text-sm text-muted">
                    <span className="font-bold text-copper">{filteredJoias.length}</span>{" "}
                    {filteredJoias.length === 1 ? "produto encontrado" : "produtos encontrados"}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {filteredJoias.length === 0 ? (
                <div className="py-20 text-center">
                <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-surface-2 text-muted">
                  <Search size={32} />
                </div>
                <h3 className="mb-3 font-serif text-2xl text-foreground">Nenhuma joia encontrada</h3>
                <p className="mb-6 text-muted">Tente ajustar os filtros para ver mais produtos</p>
                <button
                  onClick={resetFilters}
                  className="rounded-full bg-copper px-8 py-3 text-xs font-bold uppercase tracking-widest text-cream transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#42202e]"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 sm:gap-y-14">
                  {visibleJoias.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <div className="mt-12 border-t border-border pt-8">
                  <div className="flex items-center justify-between gap-4 text-sm text-muted">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                      disabled={currentPage === 1}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft size={16} />
                      <span>Previous</span>
                    </button>

                    <div className="flex items-center gap-2 text-sm">
                      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          aria-current={page === currentPage ? "page" : undefined}
                          className={`min-w-8 rounded-lg px-3 py-2 text-center transition-colors ${
                            page === currentPage ? "bg-surface-2 text-foreground" : "text-muted hover:bg-black/5 dark:hover:bg-white/5"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
