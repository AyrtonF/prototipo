"use client";

import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = "info", onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />
  };

  const colors = {
    success: "bg-gold text-white",
    error: "bg-zinc-800 text-white border border-zinc-700",
    info: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
  };

  return (
    <div className={cn(
      "fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-fade-in-down backdrop-blur-md",
      colors[type]
    )}>
      <div className="shrink-0">
        {icons[type]}
      </div>
      <p className="text-sm font-medium">{message}</p>
      <button 
        onClick={onClose}
        className="shrink-0 ml-4 hover:opacity-70 transition-opacity"
      >
        <X size={18} />
      </button>
    </div>
  );
}
