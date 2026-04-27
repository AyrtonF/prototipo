"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

interface ShowcaseCarouselSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  ctaHref: string;
  ctaLabel: string;
  emptyMessage: string;
}

function ShowcaseCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col items-center gap-4">
      <Link
        href={`/produto/${product.slug}`}
        /* Substituído bg-white por bg-surface e borda fixa por variável */
        className="relative flex h-75 w-full items-center justify-center border border-[#e2aea233] bg-surface px-6 py-8 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_24px_60px_rgba(48,20,31,0.12)]"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="text-center">
        {/* Títulos agora usam text-foreground para adaptar ao dark mode */}
        <h3 className="font-serif text-[1.02rem] uppercase tracking-[0.08em] text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-wine dark:text-[#e2aea2]">{formatCurrency(product.price)}</p>
      </div>
    </article>
  );
}

export default function ShowcaseCarouselSection({
  title,
  subtitle,
  products,
  ctaHref,
  ctaLabel,
  emptyMessage,
}: ShowcaseCarouselSectionProps) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const maxStartIndex = Math.max(products.length - visibleCount, 0);

  const visibleProducts = useMemo(() => {
    if (products.length === 0) return [];
    return products.slice(startIndex, startIndex + visibleCount);
  }, [products, startIndex]);

  const goToPrevious = () => {
    setStartIndex((currentIndex) => (currentIndex <= 0 ? maxStartIndex : currentIndex - 1));
  };

  const goToNext = () => {
    setStartIndex((currentIndex) => (currentIndex >= maxStartIndex ? 0 : currentIndex + 1));
  };

  return (
    /* bg-background garante que a seção mude de branco para o preto do dark mode */
    <section className="bg-background px-6 py-20 md:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-4xl uppercase tracking-[0.06em] text-foreground md:text-5xl">
            {title}
          </h2>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
        </div>

        {products.length === 0 ? (
          <div className="mt-14 flex min-h-80 items-center justify-center rounded-[1.75rem] border border-[#e2aea21a] bg-surface px-6 text-center shadow-sm">
            <p className="text-sm uppercase tracking-[0.22em] text-copper">{emptyMessage}</p>
          </div>
        ) : (
          <div className="relative mt-14">
            {/* Botões de navegação adaptados */}
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute -left-10 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#e2aea233] bg-surface p-2 text-foreground shadow-lg transition-transform hover:scale-110 md:flex lg:-left-14"
              aria-label={`Voltar ${title.toLowerCase()}`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {visibleProducts.map((product) => (
                <ShowcaseCard key={product.id} product={product} />
              ))}
            </div>

            <button
              type="button"
              onClick={goToNext}
              className="absolute -right-10 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#e2aea233] bg-surface p-2 text-foreground shadow-lg transition-transform hover:scale-110 md:flex lg:-right-14"
              aria-label={`Avançar ${title.toLowerCase()}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href={ctaHref}
            /* Botão "Ver tudo" agora usa bg-surface e text-foreground */
            className="inline-flex min-w-40 items-center justify-center rounded-full border border-[#e2aea24d] bg-surface px-8 py-3 text-xs font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:bg-[#42202e] hover:text-[#ffeec9]"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}