"use client";

import { useThemeStore } from "@/store/themeStore";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-cream transition-all duration-300 hover:bg-white/20 active:scale-95"
      aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      {isDarkMode ? (
        <Sun size={20} className="text-white animate-in zoom-in duration-300" />
      ) : (
        <Moon size={20} className="text-cream animate-in zoom-in duration-300" />
      )}
    </button>
  );
}