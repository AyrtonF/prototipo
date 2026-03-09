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
      "https://www.chanel.com/images/t_one/w_0.51,h_0.51,c_crop/q_auto:good,f_autoplus,fl_lossy,dpr_1.1/w_1240/n-5-eau-de-parfum-spray-3-4fl-oz--packshot-default-125530-9564912943134.jpg",
      "https://cdn.awsli.com.br/600x700/2643/2643166/produto/236950674/n--5-chanel-paris---eau-de-parfum-feminino-100ml---56zjuf21s8.png"
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
      "https://acdn-us.mitiendanube.com/stores/001/066/168/products/whatsapp-image-2022-07-11-at-14-44-401-77d1f48d462b93ae7316575616055975-640-0.webp",
      "https://cdn.awsli.com.br/2500x2500/2429/2429224/produto/230492928/1920-ecpzxipfhm.jpg"
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
      "https://acdn-us.mitiendanube.com/stores/001/066/168/products/bleu_de_chanel_eau_de_parfum_100ml_219287743_2_e35476fba22ead6af92840ac28f8f972-2a44849dc4a2ee408417313519043814-640-0.webp",
      "https://a-static.mlcdn.com.br/%7Bw%7Dx%7Bh%7D/perfume-miniatura-bleu-chanel-eau-de-parfum-15ml-masculino/oliststore/mglc65bvo06fjhy6/35c14211b9f3e04b624064942e350190.jpeg"
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
      "https://cdn.sistemawbuy.com.br/arquivos/a48e76d3b4ff8b6e919e194fd7dfcfed/uploads/images/creed-classics-aventus-4x5-1-696e227827ca81.jpg",
      "https://cdn.awsli.com.br/2500x2500/1851/1851229/produto/120119669/176277f30d.jpg"
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
      "https://cdn.sistemawbuy.com.br/arquivos/feb5eb39b3a2004abcc3bcd79041ba64/produtos/649ccf10d1809/20230628212349-649ccf15a6188.jpg",
      "https://panvelprd.vteximg.com.br/arquivos/ids/202173"
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
      "https://http2.mlstatic.com/D_NQ_NP_697280-MLA79482290013_092024-O.webp",
      "https://images.tcdn.com.br/img/img_prod/1323238/perfume_feminino_eau_de_parfum_good_girl_carolina_herrera_80ml_5845_1_7d0f9094b75344333e5c9e46cdd29bf4.jpg"
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
      "https://stg-global-ysl.dw-sites-intl.com/on/demandware.static/-/Sites-ysl-master-catalog/default/dwfa66aa60/pdp/WW-50424YSL/pdp-sec03-img-desk.jpg",
      "https://panvelprd.vteximg.com.br/arquivos/ids/190628"
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
      "https://dz9gx61wwkybv.cloudfront.net/Custom/Content/Products/18/64/18647_perfume-versace-eros-masculino-parfum-pr-7997-8011003877904_l5_638938823058491782.webp",
      "https://leloynparfums.com.br/cdn/shop/files/PRODUTOSLELOYN_48_36855362-4a55-4165-b2d7-d554c595f176.png?v=1769570919&width=1024"
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
      "https://cdn.sistemawbuy.com.br/arquivos/feb5eb39b3a2004abcc3bcd79041ba64/produtos/6420bc5b8d546/20230326184256-6420bc60c5af3.jpg",
      "https://lebiscuit.vtexassets.com/arquivos/ids/19063941-600-600/17264952103387.jpg?v=638633342619900000&width=400&height=400&format=webp&quality=75"
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
      "https://cdn.vnda.com.br/950x/delmondostore/2024/09/12/18_47_45_184_18_9_7_788_burberry_goddessintense_02.jpg?v=1726177665",
      "https://preview.redd.it/disappointed-goddess-burberry-different-from-what-i-tested-v0-z2xwahxjjebe1.jpeg?auto=webp&s=cda0188a4dafc57dfe34fc111d4a04da130f6d64"
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
      "https://www.crownjewelersnyc.com/cdn/shop/files/20241127_130858_1401919.jpg?v=1732743297",
      "https://tiffany.vtexassets.com/arquivos/ids/171912/colar-tiffany-t-smile-em-ouro-branco-com-diamantes-67513312_4.jpg?v=638285957027630000"
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
      "https://jadorecouture.ca/cdn/shop/products/PhotoRoom_20230331_143433.jpg?v=1728488759",
      "https://img.chrono24.com/images/uhren/44575059-pm1siszgf2ig6txe2foaicvd-ExtraLarge.jpg"
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
    name: "Tiffany T1 Ring",
    slug: "tiffany-t1-ring",
    price: 18900.00,
    category: "joias",
    description: "Anel icônico Tiffany T1 em ouro 18k, símbolo de força e elegância contemporânea.",
    images: [
      "https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-tt1-ring-67795121_1010332_ED.jpg?&op_usm=1.75,1.0,6.0&$cropN=0.1,0.1,0.8,0.8&defaultImage=NoImageAvailableInternal&",
      "https://www.tiffany.ae/media/catalog/product/cache/46a956959a004a49ac6cd6becd157f77/5/2/52f85bf3342640be46033bfd7c0db283.jpg"
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
      "https://img.sofia.sk/mediagallery/sofia_system/image/product/types/Xw/2/3/5/45532-pandora-moments-naramok-so-zirkonovym-zapinanim-m-590038c01.webp",
      "https://pandorajoias.vtexassets.com/arquivos/ids/187417/PNGTRPNT_SS22_A_Feb_Val_giftset_03_RGB--99-.png?v=638816088923030000"
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
      "https://swarovski.vtexassets.com/arquivos/ids/193552/Name_3555.jpg?v=637814268419770000",
      "https://cdn.brandfield.com/media/catalog/product/cache/2148b6ececc229623c3ab7d3f3406f16/s/w/swarovski-infinity-ketting--oneindigheidssymbool-en-hart--wit--gemengde-metaalafwerking-swarovski-5518865_1__uftlriczmbxi3yyd.jpg"
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
      "https://joiasgold.vteximg.com.br/arquivos/ids/212109-1000-1000/Brinco-de-Ouro-18K-Perola-Modelo-Gota-Pendurada-70mm-br20223-Joias-gold.jpg?v=637176394878030000",
      "https://joiasgold.vteximg.com.br/arquivos/ids/212110-1000-1000/Brinco-de-Ouro-18K-Perola-Modelo-Gota-Pendurada-70mm-br20223-Joias-gold-modelo.jpg?v=637176396150930000"
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
    name: "Tiffany Setting Diamond Solitaire Ring",
    slug: "tiffany-setting-solitaire-ring",
    price: 15800.00,
    category: "joias",
    description: "Anel clássico de diamante solitário com diamante lapidação brilhante em montagem de seis garras.",
    images: [
      "https://media.tiffany.com/is/image/tco/40318486_RG_MAIN1X1",
      "https://www.beladora.com/cdn/shop/files/product-image-505296-2.jpg?v=1734127485&width=1445"
    ],
    stock: 2,
    details: ["Diamante VVS1", "Certificado GIA", "Platina"],
    tags: ["Anel", "Platina", "Diamante"],
    material: "Platina",
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
      "https://ak1.ostkcdn.com/images/products/is/images/direct/a4f1d88df72cdf93651c9f35cb17a2f64bfaba5c/Miadora-Five-Heart-Charm-Station-Bracelet-14K-Yellow-Gold.jpg?imwidth=714&impolicy=medium&carousel=true",
      "https://ak1.ostkcdn.com/images/products/is/images/direct/c51a7ff367caf98772b2fa7b7a4829d28e8a504e/Miadora-Five-Heart-Charm-Station-Bracelet-14K-Yellow-Gold.jpg?imwidth=714&impolicy=medium&carousel=true"
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
      "https://brazilgems.com/cdn/shop/files/emerald-teardrop-18k-gold-plated-necklace-earring-setemerald-teardrop-18k-gold-plated-necklace-earring-set14gp4529-109-431255.jpg?v=1728093896&width=5000",
      "https://brazilgems.com/cdn/shop/files/emerald-teardrop-18k-gold-plated-necklace-earring-setemerald-teardrop-18k-gold-plated-necklace-earring-set14gp4529-109-590678.jpg?v=1728093896&width=1325"
    ],
    stock: 4,
    details: ["Trabalho manual", "Design exclusivo", "Peça única"],
    tags: ["Conjunto", "Ouro", "Elegante"],
    material: "Ouro",
    finish: "Diamantado",
    weight: 24.5,
    dimensions: "Colar 42cm + Brincos 1.5cm"
  },
];
