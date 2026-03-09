"use client";

import { useState } from "react";
import QuizStep from "@/components/quiz/QuizStep";
import QuizResult from "@/components/quiz/QuizResult";
import { useProductStore } from "@/store/productStore";
import { Product } from "@/types";

const questions = [
  {
    question: "Que tipo de fragrância desperta seus sentidos?",
    options: ["Doce", "Cítrica", "Amadeirada", "Floral", "Oriental"],
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

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const products = useProductStore((state) => state.products);

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
    // Filter only perfumes
    const perfumes = products.filter(p => p.category === 'perfumes');
    
    // Scoring system
    const scoredProducts = perfumes.map(product => {
      let score = 0;
      
      // Check tags against category preference
      if (product.tags.includes(finalAnswers.category)) score += 3;
      
      // Check intensity
      if (product.intensity === finalAnswers.intensity) score += 2;
      
      // Check occasion
      if (product.occasion?.includes(finalAnswers.occasion as any)) score += 1;
      
      // Check style
      if (product.style?.includes(finalAnswers.style as any)) score += 1;

      return { product, score };
    });

    // Sort by score and pick top 3
    const topPicks = scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.product);

    setRecommendations(topPicks);
    setStep(questions.length); // Move to result view
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-6 bg-cream/30 dark:bg-black">
      {step < questions.length ? (
        <QuizStep 
          question={questions[step].question}
          options={questions[step].options}
          onSelect={handleSelect}
          step={step + 1}
          totalSteps={questions.length}
        />
      ) : (
        <QuizResult recommendations={recommendations} onReset={resetQuiz} />
      )}
    </div>
  );
}
