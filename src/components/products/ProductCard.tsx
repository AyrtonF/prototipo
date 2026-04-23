"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import JewelryHoverImage from "@/components/products/JewelryHoverImage";
import PerfumeHoverEffect from "@/components/products/PerfumeHoverEffect";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore(state => state.addToCart);
  const showJewelryHover = product.category === "joias";
  const showPerfumeHover = product.category === "perfumes";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#eadfd7] bg-white transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(48,20,31,0.08)]">
      <div className="relative overflow-hidden bg-[#f3efec] p-3 sm:p-4">
        <Link
          href={`/produto/${product.slug}`}
          className="relative block overflow-hidden rounded-3xl bg-white"
          style={{ aspectRatio: "1 / 1.12" }}
        >
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              "opacity-0 bg-[radial-gradient(circle_at_50%_35%,rgba(190,108,53,0.12),transparent_68%)] group-hover:opacity-100"
            )}
          />

          {showJewelryHover ? (
            <div className="relative z-10 h-full w-full">
              <JewelryHoverImage product={product} />
            </div>
          ) : (
            <>
              <img
                src={product.images[0]}
                alt={product.name}
                className={cn(
                  "relative z-10 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                )}
              />
              {showPerfumeHover && <PerfumeHoverEffect product={product} />}
            </>
          )}
        </Link>
      </div>

      <div className="relative flex flex-1 flex-col gap-4 px-5 pb-6 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 text-center sm:text-left">
            <Link href={`/produto/${product.slug}`}>
              <h3 className="font-serif text-[1.05rem] uppercase tracking-[0.08em] text-[#1d1217] transition-colors duration-300 group-hover:text-copper">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm font-semibold text-[#1d1217] transition-colors duration-300 group-hover:text-copper">
              {formatCurrency(product.price)}
            </p>
          </div>

          <button
            onClick={(event) => {
              event.preventDefault();
              addToCart(product);
            }}
            className={cn(
              "mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-white shadow-[0_16px_32px_rgba(190,108,53,0.22)] transition-all duration-500 ease-out",
              "bg-copper group-hover:-translate-y-0.5 group-hover:bg-[#c97941]"
            )}
            aria-label={`Adicionar ${product.name} à sacola`}
          >
            <ShoppingBag size={19} />
          </button>
        </div>
      </div>
    </article>
  );
}
