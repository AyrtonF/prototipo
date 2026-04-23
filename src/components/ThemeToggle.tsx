"use client";

import { useThemeStore } from "@/store/themeStore";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--copper",
      isDarkMode ? "#30141f" : "#be6c35"
    );

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-cream transition-colors duration-300 hover:bg-white/20"
      aria-label={isDarkMode ? "Voltar para o cobre" : "Ativar tema vinho"}
      aria-pressed={isDarkMode}
    >
      {isDarkMode ? (
        <Sun size={20} className="text-white" />
      ) : (
        <Moon size={20} className="text-cream" />
      )}
    </button>
  );
}
