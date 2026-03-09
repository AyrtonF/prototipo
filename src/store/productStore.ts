import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { initialProducts } from '@/data/products';
import { Product } from '@/types';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, amount: number) => void;
  resetToInitial: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: initialProducts,
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      updateStock: (id, amount) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, stock: Math.max(0, p.stock + amount) } : p
          ),
        })),
      resetToInitial: () => set({ products: initialProducts }),
    }),
    {
      name: 'luxe-products-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
