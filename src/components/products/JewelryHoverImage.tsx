"use client";

import { Product } from "@/types";
import { useState } from "react";

interface JewelryHoverImageProps {
  product: Product;
}

export default function JewelryHoverImage({ product }: JewelryHoverImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mainImage = product.images[0];
  const lifestyleImage = product.images[1] || mainImage;

  return (
    <div
      className="group relative h-full w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={mainImage}
        alt={product.name}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
          isHovered ? "scale-[1.04] opacity-0" : "scale-100 opacity-100"
        }`}
      />
      <img
        src={lifestyleImage}
        alt={`${product.name} lifestyle`}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
          isHovered ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
        }`}
      />
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.22),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(48,20,31,0.08))] transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
