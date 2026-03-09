import { Product } from "@/types";

export const initialProducts: Product[] = [
  // --- PERFUMES (10) ---
  {
    id: "p1",
    name: "Chanel No. 5",
    slug: "chanel-no-5",
    price: 980.00,
    category: "perfumes",
    description: "A essência da feminilidade. Um buquê floral aldeídico lendário.",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 15,
    details: ["Extrato de perfume", "Frasco icônico", "Notas de Neroli e Baunilha"],
    tags: ["Floral", "Clássico", "Intenso"],
    intensity: "Intensa",
    fixation: "Muito Forte",
    concentration: "Extrait de Parfum",
    olfactoryNotes: { top: "Neroli, Aldeídos", heart: "Rosa de Maio, Jasmim", base: "Sândalo, Baunilha" }
  },
  {
    id: "p2",
    name: "Dior Sauvage",
    slug: "dior-sauvage",
    price: 750.00,
    category: "perfumes",
    description: "Uma composição radicalmente fresca, bruta e nobre ao mesmo tempo.",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588405748353-0574ad299491?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 22,
    details: ["Eau de Parfum", "Vaporizador de viagem", "Notas de Bergamota e Âmbar"],
    tags: ["Amadeirado", "Cítrica", "Moderada"],
    intensity: "Moderada",
    fixation: "Forte",
    concentration: "Eau de Parfum",
    olfactoryNotes: { top: "Bergamota da Calábria", heart: "Pimenta de Szechuan", base: "Ambroxan" }
  },
  {
    id: "p3",
    name: "Bleu de Chanel",
    slug: "bleu-de-chanel",
    price: 820.00,
    category: "perfumes",
    description: "Um elogio à liberdade masculina em uma fragrância aromática-amadeirada.",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616949755610-8c9ad0e2717d?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 10,
    details: ["Eau de Toilette", "Design minimalista", "Aromático intenso"],
    tags: ["Amadeirado", "Fresco", "Elegante"],
    intensity: "Moderada",
    fixation: "Moderada",
    concentration: "Eau de Toilette",
    olfactoryNotes: { top: "Limão, Hortelã", heart: "Gengibre, Jasmim", base: "Sândalo, Cedro" }
  },
  {
    id: "p4",
    name: "Creed Aventus",
    slug: "creed-aventus",
    price: 2450.00,
    category: "perfumes",
    description: "Inspirado pela vida dramática de um imperador histórico que celebrou força e sucesso.",
    images: [
      "https://images.unsplash.com/photo-1615160037565-5c5f4705500e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615396899839-a9927cf422d3?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 4,
    details: ["Millesime", "Ingredientes raros", "Símbolo de poder"],
    tags: ["Amadeirado", "Oriental", "Intenso"],
    intensity: "Intensa",
    fixation: "Muito Forte",
    concentration: "Millesime",
    olfactoryNotes: { top: "Abacaxi, Groselha", heart: "Bétula, Patchouli", base: "Almíscar, Âmbar" }
  },
  {
    id: "p5",
    name: "La Vie Est Belle",
    slug: "la-vie-est-belle",
    price: 640.00,
    category: "perfumes",
    description: "Uma declaração universal à beleza da vida.",
    images: [
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605651202774-7d5637b5e2af?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 18,
    details: ["Eau de Parfum", "Frasco sorriso de cristal", "Iris Pallida"],
    tags: ["Doce", "Floral", "Feminino"],
    intensity: "Intensa",
    fixation: "Forte",
    concentration: "Eau de Parfum",
    olfactoryNotes: { top: "Pêra, Amora", heart: "Íris, Flor de Laranjeira", base: "Pralinê, Baunilha" }
  },
  {
    id: "p6",
    name: "Good Girl",
    slug: "good-girl",
    price: 690.00,
    category: "perfumes",
    description: "É tão bom ser má. Uma fragrância poderosa e sensual.",
    images: [
      "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594125311687-3b1b3e560dbd?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 3,
    details: ["Frasco Stiletto", "Tuberosa e Fava Tonka", "Design de luxo"],
    tags: ["Oriental", "Intenso", "Ousado"],
    intensity: "Intensa",
    fixation: "Forte",
    concentration: "Eau de Parfum",
    olfactoryNotes: { top: "Amêndoa, Café", heart: "Jasmim Sambac, Tuberosa", base: "Fava Tonka, Cacau" }
  },
  {
    id: "p7",
    name: "Libre YSL",
    slug: "libre-ysl",
    price: 780.00,
    category: "perfumes",
    description: "A liberdade de viver tudo com excesso.",
    images: [
      "https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 12,
    details: ["Lavanda Floral", "Frasco Couture", "Logotipo Cassandre"],
    tags: ["Floral", "Fresco", "Moderno"],
    intensity: "Moderada",
    fixation: "Moderada",
    concentration: "Eau de Parfum",
    olfactoryNotes: { top: "Mandarina, Lavanda", heart: "Flor de Laranjeira", base: "Baunilha de Madagascar" }
  },
  {
    id: "p8",
    name: "Versace Eros",
    slug: "versace-eros",
    price: 590.00,
    category: "perfumes",
    description: "O perfume que interpreta a masculinidade sublime através de uma aura luminosa.",
    images: [
      "https://images.unsplash.com/photo-1615396899839-a9927cf422d3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 20,
    details: ["Menta e Maçã Verde", "Design Medusa", "Fresco oriental"],
    tags: ["Cítrica", "Oriental", "Vibrante"],
    intensity: "Moderada",
    fixation: "Moderada",
    concentration: "Eau de Toilette",
    olfactoryNotes: { top: "Menta, Maçã Verde", heart: "Fava Tonka, Ambroxan", base: "Baunilha, Vetiver" }
  },
  {
    id: "p9",
    name: "Acqua di Giò",
    slug: "acqua-di-gio",
    price: 610.00,
    category: "perfumes",
    description: "A essência do Mediterrâneo em uma fragrância aquática.",
    images: [
      "https://images.unsplash.com/photo-1595425964071-b3b0d2d6c975?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 15,
    details: ["Notas marinhas", "Frescor atemporal", "Frasco fosco"],
    tags: ["Cítrica", "Fresco", "Aquático"],
    intensity: "Suave",
    fixation: "Fraca",
    concentration: "Eau de Toilette",
    olfactoryNotes: { top: "Limão, Bergamota", heart: "Notas Marinhas, Jacinto", base: "Cedro, Musgo" }
  },
  {
    id: "p10",
    name: "Burberry Goddess",
    slug: "burberry-goddess",
    price: 850.00,
    category: "perfumes",
    description: "Uma fragrância aromática gourmand liderada por um trio poderoso de baunilhas.",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 6,
    details: ["Refilável", "Baunilha Infusion", "Elegância britânica"],
    tags: ["Doce", "Oriental", "Suave"],
    intensity: "Moderada",
    fixation: "Forte",
    concentration: "Eau de Parfum Intense",
    olfactoryNotes: { top: "Infusão de Baunilha", heart: "Lavanda, Baunilha Caviar", base: "Baunilha Absolute" }
  },

  // --- JOIAS (10) ---
  {
    id: "j1",
    name: "Tiffany T Smile",
    slug: "tiffany-t-smile",
    price: 12500.00,
    category: "joias",
    description: "Um ícone gráfico da Tiffany, este pingente é elegante e moderno.",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 2,
    details: ["Ouro 18k", "Corrente ajustável", "Design minimalista"],
    tags: ["Colar", "Ouro", "Minimalista"],
    material: "Ouro",
    finish: "Polido",
    weight: 15.5,
    dimensions: "45cm de comprimento"
  },
  {
    id: "j2",
    name: "Cartier Love Bracelet",
    slug: "cartier-love-bracelet",
    price: 45000.00,
    category: "joias",
    description: "Um símbolo de amor eterno, a pulseira Love é o ícone absoluto da joalheria.",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573408302185-924b75c7423c?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 1,
    details: ["Parafusos icônicos", "Sistema de fechamento único", "Ouro Rosa"],
    tags: ["Pulseira", "Ouro", "Luxo"],
    material: "Ouro Rose",
    finish: "Polido",
    weight: 32.0,
    dimensions: "17cm de diâmetro interno"
  },
  {
    id: "j3",
    name: "BVLGARI B.zero1",
    slug: "bvlgari-bzero1",
    price: 18900.00,
    category: "joias",
    description: "Inspirado no anfiteatro mais famoso do mundo, o Coliseu.",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 3,
    details: ["Design espiral", "Ouro e Cerâmica Branca", "Clássico italiano"],
    tags: ["Anel", "Ouro", "Moderno"],
    material: "Ouro",
    finish: "Diamantado",
    weight: 12.8,
    dimensions: "Tamanho 16 (ajustável)"
  },
  {
    id: "j4",
    name: "Pandora Moments",
    slug: "pandora-moments",
    price: 850.00,
    category: "joias",
    description: "A pulseira clássica para colecionar suas histórias.",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 45,
    details: ["Prata 925", "Fecho barril", "Personalizável"],
    tags: ["Pulseira", "Prata", "Casual"],
    material: "Prata",
    finish: "Acetinado",
    weight: 6.5,
    dimensions: "18cm (ajustável)"
  },
  {
    id: "j5",
    name: "Swarovski Infinity",
    slug: "swarovski-infinity",
    price: 1100.00,
    category: "joias",
    description: "O símbolo do infinito adornado com cristais brilhantes.",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019019620-658519702844?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 12,
    details: ["Cristais lapidados", "Banho de Ródio", "Brilho intenso"],
    tags: ["Colar", "Prata", "Brilhante"],
    material: "Prata",
    finish: "Brilhante",
    weight: 3.2,
    dimensions: "40cm + extensor 5cm"
  },
  {
    id: "j6",
    name: "Brincos de Pérola Luxe",
    slug: "brincos-perola",
    price: 2400.00,
    category: "joias",
    description: "Pérolas Akoya selecionadas montadas em ouro 18k.",
    images: [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 8,
    details: ["Pérolas Naturais 8mm", "Pino em Ouro", "Clássico eterno"],
    tags: ["Brinco", "Ouro", "Pérola"],
    material: "Ouro",
    finish: "Natural",
    weight: 2.8,
    dimensions: "8mm de diâmetro (pérola)"
  },
  {
    id: "j7",
    name: "Anel Diamante Solitário",
    slug: "anel-solitario",
    price: 15800.00,
    category: "joias",
    description: "O anel de noivado clássico com diamante de 1 quilate.",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 2,
    details: ["Diamante VVS1", "Certificado GIA", "Ouro Branco"],
    tags: ["Anel", "Ouro", "Diamante"],
    material: "Ouro",
    finish: "Polido",
    weight: 4.5,
    dimensions: "Tamanho 14"
  },
  {
    id: "j8",
    name: "Pulseira Pingentes Ouro",
    slug: "pulseira-pingentes",
    price: 5200.00,
    category: "joias",
    description: "Pulseira elos portugueses com pingentes de sorte.",
    images: [
      "https://images.unsplash.com/photo-1573408302185-924b75c7423c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 5,
    details: ["Elo Português", "Pingentes maciços", "Ouro 18k"],
    tags: ["Pulseira", "Ouro", "Personalizado"],
    material: "Ouro",
    finish: "Polido",
    weight: 18.2,
    dimensions: "19cm (ajustável)"
  },
  {
    id: "j9",
    name: "Conjunto Ouro 18k",
    slug: "conjunto-ouro-18k",
    price: 8900.00,
    category: "joias",
    description: "Conjunto completo com colar e brincos em ouro trabalhado.",
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc5e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 4,
    details: ["Trabalho manual", "Design exclusivo", "Peça única"],
    tags: ["Conjunto", "Ouro", "Elegante"],
    material: "Ouro",
    finish: "Diamantado",
    weight: 24.5,
    dimensions: "Colar 42cm + Brincos 1.5cm"
  },
  {
    id: "j10",
    name: "Alexandre Hekkers Bangle",
    slug: "alexandre-hekkers",
    price: 3200.00,
    category: "joias",
    description: "Bracelete rígido com design orgânico contemporâneo.",
    images: [
      "https://images.unsplash.com/photo-1630019020506-600712963364?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019019620-658519702844?q=80&w=1000&auto=format&fit=crop"
    ],
    stock: 7,
    details: ["Prata 925 banhada", "Feito à mão", "Minimalista"],
    tags: ["Pulseira", "Prata", "Moderno"],
    material: "Banho de Ouro",
    finish: "Escovado",
    weight: 8.9,
    dimensions: "16cm diâmetro interno"
  }
];
