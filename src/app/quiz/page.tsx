"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/productStore";
import { useThemeStore } from "@/store/themeStore";
import { cn } from "@/lib/utils";
import { Occasion, Style } from "@/types";

const questions = [
  {
    question: "Que tipo de fragrância desperta seus sentidos?",
    options: ["Doce", "Cítrica", "Amadeirado", "Floral", "Oriental"],
    key: "category"
  },
  {
    question: "Qual intensidade você prefere?",
    options: ["Suave", "Moderada", "Intensa"],
    key: "intensity"
  },
  {
    question: "Para qual ocasião você procura o perfume?",
    options: ["Dia a dia", "Trabalho", "Noite", "Eventos especiais"],
    key: "occasion"
  },
  {
    question: "Qual estilo mais combina com você?",
    options: ["Elegante", "Moderno", "Clássico", "Ousado"],
    key: "style"
  }
];

function QuizLogoSpace() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-center">
      <div className="relative flex h-72 w-full items-center justify-center sm:h-80 md:h-104">
        <span className="relative block h-44 w-44 sm:h-52 sm:w-52 md:h-56 md:w-56">
          <Image
            key={isDarkMode ? "quiz-logo-dark" : "quiz-logo-light"}
            src={isDarkMode ? "/logo-quizz-cream.svg" : "/logo-quizz.svg"}
            alt="La Vie"
            fill
            sizes="224px"
            className="object-contain"
            priority
          />
        </span>
      </div>
    </div>
  );
}

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const products = useProductStore((state) => state.products);
  const status = useProductStore((state) => state.status);

  if (status !== "ready") {
    return (
      <div className="min-h-screen bg-background px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">
          <p className="text-[11px] uppercase tracking-[0.45em] text-copper">Sua assinatura</p>
          <h1 className="mt-4 font-serif text-4xl uppercase leading-[1.02] text-copper md:text-5xl">Carregando quiz</h1>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
            Aguarde enquanto sincronizamos o catálogo remoto para montar as recomendações.
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[step];

  const handleSelect = (option: string) => {
    const currentQuestion = questions[step];
    const newAnswers = { ...answers, [currentQuestion.key]: option };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, string>) => {
    const perfumes = products.filter(p => p.category === 'perfumes');
    const occasionAnswer = finalAnswers.occasion as Occasion | undefined;
    const styleAnswer = finalAnswers.style as Style | undefined;

    const scoredProducts = perfumes.map(product => {
      let score = 0;

      if (product.tags.includes(finalAnswers.category)) score += 3;

      if (product.intensity === finalAnswers.intensity) score += 2;

      if (occasionAnswer && product.occasion?.includes(occasionAnswer)) score += 1;

      if (styleAnswer && product.style?.includes(styleAnswer)) score += 1;

      return { product, score };
    });

    const topPicks = scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.product);

    if (topPicks.length === 0) {
      return;
    }

    router.push(`/quiz/resultado?ids=${encodeURIComponent(topPicks.map((item) => item.id).join(","))}`);
  };

  return (
    <div className="min-h-screen bg-background px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="grid items-center gap-10 py-6 md:grid-cols-[minmax(300px,0.92fr)_1.08fr] md:gap-14 lg:py-10">
          <QuizLogoSpace />

          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.45em] text-copper">Sua assinatura</p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.02] text-copper md:text-5xl lg:text-[3.55rem]">
              ENCONTRE A SUA ESSÊNCIA
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-muted">
              Responda ao nosso quiz exclusivo e descubra a fragrância ideal que traduz sua essência e valoriza sua personalidade.
              Encontre uma combinação perfeita que se harmoniza com seu estilo de vida de forma única.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-3xl pb-12 text-center sm:mt-14 lg:mt-20">
          <div className="mb-8">
            <p className="text-[0.95rem] font-medium text-foreground">passo {step + 1} de {questions.length}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full bg-copper transition-all duration-500"
                style={{ width: `${(step / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="mx-auto max-w-3xl font-serif text-3xl leading-[1.1] text-foreground md:text-4xl">
            {currentQuestion.question}
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={cn(
                  "flex h-14 items-center justify-center rounded-2xl bg-surface-2 text-[1.02rem] font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#42202e] hover:text-[#ffeec9] hover:shadow-[0_16px_30px_rgba(48,20,31,0.2)]"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
