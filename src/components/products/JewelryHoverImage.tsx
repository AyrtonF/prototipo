"use client";

import { Product } from "@/types";
import { useState } from "react";

interface JewelryHoverImageProps {
  product: Product;
}

export default function JewelryHoverImage({ product }: JewelryHoverImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mainImage = product.images[0];
  const lifestyleImage = product.images[1] || mainImage; // Fallback to main if no lifestyle

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={mainImage} 
        alt={product.name}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      />
      <img 
        src={lifestyleImage} 
        alt={`${product.name} lifestyle`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
