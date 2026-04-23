"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useMemo, useState } from "react";
import { ChevronRight, Minus, Package, Plus, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { formatCurrency, cn } from "@/lib/utils";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import type { ToastType } from "@/components/ui/Toast";

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-t border-[#e8dfd8] py-4 first:border-t-0 first:pt-0 last:pb-0 sm:py-5">
      <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#96887f]">{label}</p>
      <p className="text-right text-[0.98rem] font-semibold text-[#1c1418]">{value}</p>
    </div>
  );
}

function RelatedProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produto/${product.slug}`} className="group block">
      <article className="flex h-full flex-col rounded-3xl border border-[#e5dcd5] bg-white px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(48,20,31,0.08)]">
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-[#ded6cf] bg-white p-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-56 w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-serif text-[0.92rem] uppercase tracking-[0.08em] text-[#1c1418] transition-colors group-hover:text-copper">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-semibold text-[#1c1418]">{formatCurrency(product.price)}</p>
        </div>
      </article>
    </Link>
  );
}

interface ProdutoContentProps {
  product: Product;
  products: Product[];
  addToCart: (product: Product) => void;
  updateStock: (id: string, amount: number) => void;
  showToast: (message: string, type?: ToastType) => void;
  ToastContainer: () => React.ReactElement;
}

function ProdutoContent({
  product,
  products,
  addToCart,
  updateStock,
  showToast,
  ToastContainer,
}: ProdutoContentProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const categoryLabel = product.category === "perfumes" ? "Perfumes" : "Semi-Joias";
  const breadcrumbLabel = product.category === "perfumes" ? product.tags[0] ?? categoryLabel : product.material ?? categoryLabel;

  const galleryImages = useMemo(() => {
    return product.images;
  }, [product.images]);

  const selectedImage = galleryImages[activeImage] ?? galleryImages[0] ?? product.images[0];
  const availableUnits = product.stock;

  const detailStats = useMemo(() => {
    if (product.category === "perfumes") {
      return [
        { label: "Intensidade", value: product.intensity ?? "-" },
        { label: "Fixação", value: product.fixation ?? "-" },
        { label: "Concentração", value: product.concentration ?? "-" },
      ];
    }

    return [
      { label: "Material", value: product.material ?? "-" },
      { label: "Peso", value: product.weight ? `${product.weight}g` : "-" },
      { label: "Acabamento", value: product.finish ?? "-" },
      { label: "Dimensões", value: product.dimensions ?? "-" },
    ];
  }, [product]);

  const relatedProducts = useMemo(() => {
    const currentTags = new Set(product.tags);

    return products
      .filter((candidate) => candidate.id !== product.id && candidate.category === product.category)
      .map((candidate) => {
        const sharedTags = candidate.tags.reduce((score, tag) => score + (currentTags.has(tag) ? 1 : 0), 0);
        const priceDistance = Math.abs(candidate.price - product.price);

        return {
          product: candidate,
          score: sharedTags * 1000 - priceDistance,
        };
      })
      .sort((left, right) => right.score - left.score)
      .slice(0, 4)
      .map((entry) => entry.product);
  }, [product, products]);

  const incrementQuantity = () => {
    setQuantity((current) => Math.min(current + 1, Math.max(product.stock, 1)));
  };

  const decrementQuantity = () => {
    setQuantity((current) => Math.max(current - 1, 1));
  };

  const handleAddToCart = () => {
    if (availableUnits <= 0) {
      return;
    }

    const unitsToAdd = Math.min(quantity, availableUnits);

    for (let index = 0; index < unitsToAdd; index += 1) {
      addToCart(product);
    }

    updateStock(product.id, -unitsToAdd);
    setQuantity(1);

    showToast(
      unitsToAdd === 1
        ? "1 unidade adicionada à sacola"
        : `${unitsToAdd} unidades adicionadas à sacola`,
      "success"
    );
  };

  return (
    <div className="min-h-screen bg-white px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
      <ToastContainer />

      <div className="mx-auto max-w-7xl">
        <nav className="mb-7 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-[0.72rem] text-[#8b7c72] sm:mb-10">
          <Link href="/" className="transition-colors hover:text-[#30141f]">
            Home
          </Link>
          <ChevronRight size={14} className="shrink-0 text-[#b9afa8]" />
          <Link href={`/${product.category}`} className="transition-colors hover:text-[#30141f]">
            {categoryLabel}
          </Link>
          <ChevronRight size={14} className="shrink-0 text-[#b9afa8]" />
          <span className="transition-colors hover:text-[#30141f]">{breadcrumbLabel}</span>
          <ChevronRight size={14} className="shrink-0 text-[#b9afa8]" />
          <span className="font-medium text-[#1c1418]">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] xl:gap-16">
          <section className="grid gap-5 md:grid-cols-[124px_minmax(0,1fr)] md:items-start md:gap-8">
            <div className="hidden md:flex flex-col gap-5 pt-1">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    "flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border bg-white p-2.5 transition-all duration-300",
                    activeImage === index
                      ? "border-[#1c1418] shadow-[0_12px_28px_rgba(48,20,31,0.08)]"
                      : "border-[#e4dbd4] hover:border-[#c7bbb1]"
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-contain object-center"
                  />
                </button>
              ))}
            </div>

            <div className="order-1 overflow-hidden rounded-[2.75rem] border border-[#ece1da] bg-[#f6f1ec] p-5 sm:p-7 md:order-0 md:min-h-132">
              <div className="flex min-h-88 items-center justify-center md:min-h-112">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="max-h-112 w-full object-contain object-center"
                />
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-1 md:hidden">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    "h-24 w-24 shrink-0 overflow-hidden rounded-3xl border bg-[#fbf8f4] p-2.5 transition-all",
                    activeImage === index ? "border-[#1c1418]" : "border-[#e4dbd4]"
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-contain object-center"
                  />
                </button>
              ))}
            </div>
          </section>

          <section className="flex flex-col pt-2">
            <div className="flex flex-wrap gap-2">
              {product.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#f1eeeb] px-3 py-1.5 text-[0.72rem] font-medium text-[#8c7f77]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-4 font-serif text-[2.45rem] uppercase leading-[0.95] tracking-[0.02em] text-[#111111] sm:text-[3.1rem] xl:text-[3.65rem]">
              {product.name}
            </h1>

            <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-[#7f7268]">
              {product.description}
            </p>

            <div className="mt-6">
              <div className="border-b border-[#e8dfd8] pb-4">
              </div>
              {detailStats.map((stat) => (
                <DetailStat key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </div>

            <div className="mt-6 inline-flex w-fit items-center gap-3 rounded-[1.25rem] bg-copper px-4 py-3 text-white shadow-[0_16px_32px_rgba(48,20,31,0.18)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                <Package size={20} />
              </div>
              <div className="text-sm font-semibold leading-tight">
                <div>{availableUnits} unidades</div>
                <div>disponíveis</div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-[#e8dfd8] pt-5 sm:flex-row sm:items-center">
              <div className="inline-flex h-12 items-center rounded-full bg-[#f2eeeb] px-1.5">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-[#1c1418] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Diminuir quantidade"
                >
                  <Minus size={18} />
                </button>
                <span className="min-w-10 px-2 text-center text-sm font-medium text-[#1c1418]">{quantity}</span>
                <button
                  type="button"
                  onClick={incrementQuantity}
                  disabled={availableUnits > 0 && quantity >= availableUnits}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-[#1c1418] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Aumentar quantidade"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={availableUnits <= 0}
                className="inline-flex h-12 flex-1 items-center justify-center gap-3 rounded-full bg-copper px-6 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-[#42202e] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingBag size={18} />
                <span>Adicionar à Sacola</span>
              </button>
            </div>
          </section>
        </div>

        <section className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-[1.45rem] uppercase tracking-[0.24em] text-[#3a322f] sm:text-[1.85rem]">
              VOCÊ TAMBÉM PODE GOSTAR
            </h2>
            <div className="mt-4 h-px w-full bg-[#bfb3aa]" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
            {relatedProducts.map((relatedProduct) => (
              <RelatedProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href={`/${product.category}`}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#e4dbd4] bg-white px-8 text-sm capitalize text-[#1c1418] transition-colors hover:bg-[#faf7f4]"
            >
              ver tudo
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const products = useProductStore((state) => state.products);
  const status = useProductStore((state) => state.status);
  const updateStock = useProductStore((state) => state.updateStock);
  const product = products.find((candidate) => candidate.slug === slug);
  const addToCart = useCartStore((state) => state.addToCart);
  const { showToast, ToastContainer } = useToast();

  if (status !== "ready") {
    return (
      <div className="min-h-screen bg-white px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.45em] text-copper">Coleção</p>
            <h1 className="mt-4 font-serif text-4xl uppercase leading-[1.02] text-copper md:text-5xl">
              Carregando produto
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#4f433c]">
              Sincronizando os dados do banco para abrir a ficha do produto.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  return (
    <ProdutoContent
      key={product.id}
      product={product}
      products={products}
      addToCart={addToCart}
      updateStock={updateStock}
      showToast={showToast}
      ToastContainer={ToastContainer}
    />
  );
}
