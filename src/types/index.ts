export type Category = 'perfumes' | 'joias';
export type PerfumeIntensity = 'Suave' | 'Moderada' | 'Intensa';
export type Occasion = 'Dia a dia' | 'Trabalho' | 'Noite' | 'Eventos especiais';
export type Style = 'Elegante' | 'Moderno' | 'Clássico' | 'Ousado';
export type JewelryMaterial = 'Ouro' | 'Prata' | 'Ouro Rose' | 'Aço Inoxidável' | 'Banho de Ouro';
export type PerfumeFixation = 'Fraca' | 'Moderada' | 'Forte' | 'Muito Forte';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[]; // [0] = main, [1] = lifestyle/hover, [2+] = detail
  stock: number;
  details: string[];
  tags: string[]; // For quiz matching
  
  // Specific for perfumes
  olfactoryNotes?: {
    top: string;
    heart: string;
    base: string;
  };
  intensity?: PerfumeIntensity;
  fixation?: PerfumeFixation;
  concentration?: string; // Eau de Parfum, Eau de Toilette, etc.
  occasion?: Occasion[];
  style?: Style[];

  // Specific for jewelry
  material?: JewelryMaterial;
  finish?: string;
  weight?: number; // em gramas
  dimensions?: string; // exemplo: "18cm de comprimento"
}

export interface CartItem extends Product {
  quantity: number;
}
