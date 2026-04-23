import type {
  Category,
  JewelryMaterial,
  Occasion,
  PerfumeFixation,
  PerfumeIntensity,
  Style,
} from "@/types";

export interface ProductRow {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  category: Category;
  description: string;
  images: string[] | null;
  stock: number;
  details: string[] | null;
  tags: string[] | null;
  olfactory_notes: {
    top: string;
    heart: string;
    base: string;
  } | null;
  intensity: PerfumeIntensity | null;
  fixation: PerfumeFixation | null;
  concentration: string | null;
  occasion: Occasion[] | null;
  style: Style[] | null;
  material: JewelryMaterial | null;
  finish: string | null;
  weight: number | string | null;
  dimensions: string | null;
  featured: boolean | null;
  active: boolean | null;
  sort_order: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Database {
  public: {
    Tables: {
      products: {
        Row: ProductRow;
        Insert: ProductRow;
        Update: Partial<ProductRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}