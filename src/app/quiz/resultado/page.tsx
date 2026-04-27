"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/useToast";
import QuizResult from "@/components/quiz/QuizResult";
import { Product } from "@/types";

export default function QuizResultadoPage() {
  return (
    <Suspense fallback={<QuizResultadoFallback />}>
      <QuizResultadoContent />
    </Suspense>
  );
}

function QuizResultadoFallback() {
  return (
    <div className="min-h-screen bg-background px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">
        <p className="text-[11px] uppercase tracking-[0.45em] text-copper">Sua assinatura olfativa</p>
        <h1 className="mt-4 font-serif text-4xl uppercase leading-[1.02] text-copper md:text-5xl">
          Carregando recomendações
        </h1>
      </div>
    </div>
  );
}

function QuizResultadoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const products = useProductStore((state) => state.products);
  const status = useProductStore((state) => state.status);
  const updateStock = useProductStore((state) => state.updateStock);
  const addToCart = useCartStore((state) => state.addToCart);
  const { showToast, ToastContainer } = useToast();
  const [activeRecommendationIndex, setActiveRecommendationIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const ids = searchParams.get("ids") ?? "";

  const recommendations = useMemo(() => {
    return ids
      .split(",")
      .map((id) => products.find((product) => product.id === id))
      .filter((product): product is Product => Boolean(product));
  }, [ids, products]);

  const activeRecommendation = recommendations[activeRecommendationIndex] ?? recommendations[0];
  const availableUnits = activeRecommendation?.stock ?? 0;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveRecommendationIndex(0);
      setQuantity(1);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [ids]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQuantity(1);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [activeRecommendation?.id]);

  const goToPreviousRecommendation = () => {
    if (recommendations.length <= 1) {
      return;
    }

    setActiveRecommendationIndex((current) => (current - 1 + recommendations.length) % recommendations.length);
  };

  const goToNextRecommendation = () => {
    if (recommendations.length <= 1) {
      return;
    }

    setActiveRecommendationIndex((current) => (current + 1) % recommendations.length);
  };

  const decrementQuantity = () => {
    setQuantity((current) => Math.max(current - 1, 1));
  };

  const incrementQuantity = () => {
    setQuantity((current) => Math.min(current + 1, Math.max(availableUnits, 1)));
  };

  const handleAddToCart = () => {
    if (!activeRecommendation || availableUnits <= 0) {
      return;
    }

    const unitsToAdd = Math.min(quantity, availableUnits);

    for (let index = 0; index < unitsToAdd; index += 1) {
      addToCart(activeRecommendation);
    }

    updateStock(activeRecommendation.id, -unitsToAdd);
    setQuantity(1);

    showToast(
      unitsToAdd === 1 ? "1 unidade adicionada à sacola" : `${unitsToAdd} unidades adicionadas à sacola`,
      "success"
    );
  };

  const handleReset = () => {
    router.push("/quiz");
  };

  if (status !== "ready") {
    return (
      <div className="min-h-screen bg-background px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">
          <p className="text-[11px] uppercase tracking-[0.45em] text-copper">Sua assinatura olfativa</p>
          <h1 className="mt-4 font-serif text-4xl uppercase leading-[1.02] text-copper md:text-5xl">
            Carregando recomendações
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
            Estamos sincronizando os perfumes do banco para calcular o resultado do quiz.
          </p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-background px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">
          <p className="text-[11px] uppercase tracking-[0.45em] text-copper">Sua assinatura olfativa</p>
          <h1 className="mt-4 font-serif text-4xl uppercase leading-[1.02] text-copper md:text-5xl">
            Resultado indisponível
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
            Não encontramos perfumes selecionados para este resultado. Volte ao quiz para refazer suas escolhas.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-copper px-6 text-sm font-semibold uppercase tracking-[0.22em] text-cream transition-colors hover:bg-[#42202e]"
          >
            voltar ao quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <ToastContainer />

      <div className="mx-auto max-w-7xl py-4 sm:py-8 lg:py-10">
        <QuizResult
          recommendations={recommendations}
          activeRecommendationIndex={activeRecommendationIndex}
          quantity={quantity}
          availableUnits={availableUnits}
          onPreviousRecommendation={goToPreviousRecommendation}
          onNextRecommendation={goToNextRecommendation}
          onDecreaseQuantity={decrementQuantity}
          onIncreaseQuantity={incrementQuantity}
          onAddToCart={handleAddToCart}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}