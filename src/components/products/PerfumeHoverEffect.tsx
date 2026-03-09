"use client";

import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface PerfumeHoverEffectProps {
  product: Product;
}

export default function PerfumeHoverEffect({ product }: PerfumeHoverEffectProps) {
  // Define a cor da névoa com base na tag principal
  const getAromaColor = () => {
    const tags = product.tags || [];
    if (tags.includes("Amadeirado")) return "from-amber-500/20";
    if (tags.includes("Floral")) return "from-rose-400/20";
    if (tags.includes("Cítrica")) return "from-cyan-400/20";
    if (tags.includes("Oriental")) return "from-purple-500/20";
    if (tags.includes("Doce")) return "from-orange-400/20";
    return "from-gold/20";
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden">
      {/* Dynamic Mist Layer */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t to-transparent mix-blend-screen perfume-mist animate-mist",
        getAromaColor()
      )} />
      
      {/* Subtle Particles Animation */}
      <div className="absolute inset-0 flex justify-center items-end pb-20">
        <div className="w-1 h-1 bg-white rounded-full animate-float-slow blur-[1px] mx-4" />
        <div className="w-2 h-2 bg-white/50 rounded-full animate-float-medium blur-[2px] mx-8" />
        <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-float-fast blur-[1px] mx-4" />
      </div>
    </div>
  );
}
