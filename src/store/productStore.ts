import { create } from "zustand";
import { loadCatalog, productToRow } from "@/lib/products/catalog";
import { getBrowserSupabaseClient } from "@/lib/supabase/browser";
import { Product } from "@/types";

interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "ready" | "error";
  error: string | null;
  loadProducts: (force?: boolean) => Promise<void>;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, amount: number) => void;
}

export const useProductStore = create<ProductState>()(
  (set, get) => ({
    products: [],
    status: "idle",
    error: null,
    loadProducts: async (force = false) => {
      const currentStatus = get().status;

        if (!force && (currentStatus === "loading" || currentStatus === "ready")) {
        return;
      }

      set({ status: "loading", error: null });

      try {
        const client = getBrowserSupabaseClient();
        const products = await loadCatalog(client, force);

        set({ products, status: "ready", error: null });
      } catch {
        set({ products: [], status: "ready", error: null });
      }
    },
    addProduct: (product) => {
      const nextProducts = [...get().products, product];
      set({ products: nextProducts });

      void (async () => {
        const client = getBrowserSupabaseClient();
        const { error } = await client.from("products").insert(productToRow(product, nextProducts.length - 1) as never);

        if (error) {
          console.error("Failed to persist new product", error);
        }
      })();
    },
    updateProduct: (id, updates) => {
      const nextProducts = get().products.map((product) => (product.id === id ? { ...product, ...updates } : product));
      set({ products: nextProducts });

      const updatedProduct = nextProducts.find((product) => product.id === id);

      if (!updatedProduct) {
        return;
      }

      void (async () => {
        const client = getBrowserSupabaseClient();
        const sortOrder = nextProducts.findIndex((product) => product.id === id);
        const { error } = await client.from("products").upsert(productToRow(updatedProduct, sortOrder) as never, {
          onConflict: "id",
        });

        if (error) {
          console.error("Failed to persist product update", error);
        }
      })();
    },
    deleteProduct: (id) => {
      const nextProducts = get().products.filter((product) => product.id !== id);
      set({ products: nextProducts });

      void (async () => {
        const client = getBrowserSupabaseClient();
        const { error } = await client.from("products").delete().eq("id", id);

        if (error) {
          console.error("Failed to delete product", error);
        }
      })();
    },
    updateStock: (id, amount) => {
      const nextProducts = get().products.map((product) =>
        product.id === id ? { ...product, stock: Math.max(0, product.stock + amount) } : product
      );

      set({ products: nextProducts });

      const updatedProduct = nextProducts.find((product) => product.id === id);

      if (!updatedProduct) {
        return;
      }

      void (async () => {
        const client = getBrowserSupabaseClient();
        const sortOrder = nextProducts.findIndex((product) => product.id === id);
        const { error } = await client.from("products").upsert(productToRow(updatedProduct, sortOrder) as never, {
          onConflict: "id",
        });

        if (error) {
          console.error("Failed to persist stock change", error);
        }
      })();
    },
  })
);
