"use client";

import { Product } from "@/types";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Minus, Package, Plus, ShoppingBag } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

interface QuizResultProps {
  recommendations: Product[];
  activeRecommendationIndex: number;
  quantity: number;
  availableUnits: number;
  onPreviousRecommendation: () => void;
  onNextRecommendation: () => void;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
  onAddToCart: () => void;
  onReset: () => void;
}

export default function QuizResult({
  recommendations,
  activeRecommendationIndex,
  quantity,
  availableUnits,
  onPreviousRecommendation,
  onNextRecommendation,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onAddToCart,
  onReset,
}: QuizResultProps) {
  const activeRecommendation = recommendations[activeRecommendationIndex] ?? recommendations[0];
  const previousRecommendation =
    recommendations.length > 1
      ? recommendations[(activeRecommendationIndex - 1 + recommendations.length) % recommendations.length]
      : undefined;
  const nextRecommendation =
    recommendations.length > 1 ? recommendations[(activeRecommendationIndex + 1) % recommendations.length] : undefined;

  if (!activeRecommendation) {
    return null;
  }

  return (
    <div className="w-full text-center animate-fade-in">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] uppercase tracking-[0.45em] text-copper">Sua assinatura olfativa</p>
        <h2 className="mt-4 font-serif text-4xl uppercase leading-[1.02] text-copper md:text-5xl">
          DESCOBRIMOS SUA ESSÊNCIA
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#4f433c]">
          Com base nas suas escolhas, selecionamos estas fragrâncias exclusivas que harmonizam perfeitamente com seu estilo e personalidade.
        </p>
      </div>

      <div className="mt-12 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onPreviousRecommendation}
          className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-[#bf6f35] text-white shadow-[0_10px_24px_rgba(48,20,31,0.12)] transition-transform hover:-translate-y-0.5"
          aria-label="Ver recomendação anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <h3 className="font-serif text-4xl uppercase leading-none text-copper md:text-5xl">
          {activeRecommendation.name}
        </h3>
        <button
          type="button"
          onClick={onNextRecommendation}
          className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-[#bf6f35] text-white shadow-[0_10px_24px_rgba(48,20,31,0.12)] transition-transform hover:-translate-y-0.5"
          aria-label="Ver próxima recomendação"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-6 grid gap-5 border-y border-[#e7ddd4] py-5 sm:grid-cols-3">
        <div className="text-center">
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#8f837a]">Intensidade</p>
          <p className="mt-2 text-[0.96rem] font-semibold text-[#1d1217]">{activeRecommendation.intensity ?? "-"}</p>
        </div>
        <div className="text-center">
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#8f837a]">Fixação</p>
          <p className="mt-2 text-[0.96rem] font-semibold text-[#1d1217]">{activeRecommendation.fixation ?? "-"}</p>
        </div>
        <div className="text-center">
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#8f837a]">Concentração</p>
          <p className="mt-2 text-[0.96rem] font-semibold text-[#1d1217]">{activeRecommendation.concentration ?? "-"}</p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl rounded-[2.5rem] border border-[#eadfd4] bg-white p-4 shadow-[0_24px_60px_rgba(48,20,31,0.08)] md:p-6">
        <div className="grid items-center gap-4 md:grid-cols-[0.82fr_1.36fr_0.82fr] md:gap-6">
          <div className="hidden justify-center md:flex">
            {previousRecommendation ? (
              <div className="flex h-56 w-full items-center justify-center rounded-[1.75rem] border border-[#f0e5db] bg-[#fcf8f4] p-4 opacity-45">
                <img
                  src={previousRecommendation.images[0]}
                  alt="Recomendação anterior"
                  className="h-full w-full object-contain"
                />
              </div>
            ) : null}
          </div>

          <div className="relative overflow-hidden rounded-4xl border border-[#eadfd4] bg-[linear-gradient(180deg,#ffffff_0%,#f9f4ef_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:p-5">
            <div className="absolute inset-x-8 top-6 h-20 rounded-full bg-[#fff6ef] blur-3xl" aria-hidden="true" />
            <div className="flex min-h-80 items-center justify-center md:min-h-104">
              <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-4xl bg-white/55 p-2 md:p-4">
                <img
                  src={activeRecommendation.images[0]}
                  alt={activeRecommendation.name}
                  className="h-full w-full rounded-3xl object-contain"
                />
              </div>
            </div>
          </div>

          <div className="hidden justify-center md:flex">
            {nextRecommendation ? (
              <div className="flex h-56 w-full items-center justify-center rounded-[1.75rem] border border-[#f0e5db] bg-[#fcf8f4] p-4 opacity-45">
                <img
                  src={nextRecommendation.images[0]}
                  alt="Próxima recomendação"
                  className="h-full w-full object-contain"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <div className="inline-flex h-12 items-center rounded-full bg-[#f2eeeb] px-1.5">
          <button
            type="button"
            onClick={onDecreaseQuantity}
            disabled={quantity <= 1}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1c1418] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Diminuir quantidade"
          >
            <Minus size={18} />
          </button>
          <span className="min-w-10 px-2 text-center text-sm font-medium text-[#1c1418]">{quantity}</span>
          <button
            type="button"
            onClick={onIncreaseQuantity}
            disabled={quantity >= Math.max(availableUnits, 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1c1418] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Aumentar quantidade"
          >
            <Plus size={18} />
          </button>
        </div>

        <button
          type="button"
          onClick={onAddToCart}
          disabled={availableUnits <= 0}
          className="inline-flex h-12 min-w-70 items-center justify-center gap-3 rounded-full bg-[#c87634] px-6 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-[#b86429] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingBag size={18} />
          <span>Adicionar à Sacola</span>
        </button>
      </div>

      <p className={cn("mt-3 text-center text-sm font-semibold text-[#d65f40]", availableUnits <= 0 ? "opacity-60" : "") }>
        <Package size={14} className="mr-2 inline-block align-[-2px]" />
        {availableUnits} unidades disponíveis
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-11 items-center justify-center rounded-full border border-[#e3d9d1] bg-white px-6 text-sm capitalize text-[#1c1217] transition-colors hover:bg-[#faf7f4]"
        >
          refazer quiz
        </button>
        <Link
          href="/perfumes"
          className="inline-flex h-11 items-center justify-center rounded-full border border-[#e3d9d1] bg-white px-6 text-sm capitalize text-[#1c1217] transition-colors hover:bg-[#faf7f4]"
        >
          ver todos os perfumes
        </Link>
      </div>
    </div>
  );
}
