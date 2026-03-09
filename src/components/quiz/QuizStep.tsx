"use client";

import { motion } from "framer-motion";

interface QuizStepProps {
  question: string;
  options: string[];
  onSelect: (option: string) => void;
  step: number;
  totalSteps: number;
}

export default function QuizStep({ question, options, onSelect, step, totalSteps }: QuizStepProps) {
  return (
    <div className="w-full max-w-2xl mx-auto text-center animate-fade-in-up">
      <div className="mb-8">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-bold">
          Passo {step} de {totalSteps}
        </span>
        <div className="w-full h-1 bg-gray-100 dark:bg-zinc-800 mt-4 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gold transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>
      
      <h2 className="text-3xl md:text-5xl font-serif mb-12 dark:text-white leading-tight">{question}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="group relative p-6 border border-gray-200 dark:border-zinc-700 rounded-xl hover:border-gold dark:hover:border-gold transition-all duration-300 hover:shadow-lg bg-white dark:bg-zinc-900"
          >
            <span className="text-lg font-medium dark:text-gray-200 group-hover:text-gold transition-colors">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
