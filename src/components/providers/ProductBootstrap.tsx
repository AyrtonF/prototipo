"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/productStore";

export default function ProductBootstrap() {
  const loadProducts = useProductStore((state) => state.loadProducts);
  const status = useProductStore((state) => state.status);

  useEffect(() => {
    if (status === "idle") {
      void loadProducts();
    }
  }, [loadProducts, status]);

  return null;
}
