import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { initialProducts } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

const featuredPerfumes = initialProducts.filter((product) => product.category === "perfumes").slice(0, 4);
const featuredJewelry = initialProducts.filter((product) => product.category === "joias").slice(0, 4);

function ShowcaseCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col items-center gap-4">
      <Link
        href={`/produto/${product.slug}`}
        className="flex h-75 w-full items-center justify-center border border-[#e9dbc4] bg-white px-6 py-8 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_24px_60px_rgba(48,20,31,0.08)]"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="text-center">
        <h3 className="font-serif text-[1.02rem] uppercase tracking-[0.08em] text-[#1f1418]">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-[#30141f]">{formatCurrency(product.price)}</p>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="bg-white text-wine">
      <section className="relative overflow-hidden bg-wine text-cream">
        <div className="absolute inset-0">
          <img
            src="/perfume-home-principal.png"
            alt="Perfume principal da home"
            className="h-full w-full object-cover object-right opacity-95"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(48,20,31,0.92)_0%,rgba(48,20,31,0.88)_34%,rgba(48,20,31,0.68)_52%,rgba(48,20,31,0.25)_70%,rgba(48,20,31,0.08)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(190,108,53,0.14),transparent_28%),radial-gradient(circle_at_50%_78%,rgba(226,174,162,0.12),transparent_18%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-7xl items-center px-6 py-16 md:px-12 lg:py-20">
          <div className="max-w-2xl">
            <p className="mb-6 text-[11px] uppercase tracking-[0.45em] text-rose/90">Coleção exclusiva</p>
            <h1 className="max-w-[10ch] font-serif text-5xl leading-[0.9] md:text-7xl lg:text-[4.85rem]">
              ENCONTRE A SUA
              <span className="block">ESSÊNCIA</span>
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-7 text-cream/80 md:text-[15px]">
              Responda ao nosso quiz exclusivo e descubra a fragrância ideal que traduz sua essência e valoriza sua personalidade. Encontre uma combinação perfeita que se harmoniza com seu estilo de vida de forma única.
            </p>
            <div className="mt-10">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center bg-copper px-7 py-4 text-xs font-semibold uppercase tracking-[0.26em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#c97941]"
              >
                Descubra agora
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.96fr_1.04fr]">
          <div className="overflow-hidden bg-white shadow-[0_22px_60px_rgba(48,20,31,0.08)]">
            <img
              src="/Imagem-joia-homepage.png"
              alt="Joia editorial La Vie"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative py-6 lg:pl-10">
            <svg
              className="absolute right-0 top-0 hidden h-80 w-80 opacity-90 lg:block"
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M100 172C56 148 20 118 20 78C20 50 41 30 67 30C83 30 93 38 100 50C107 38 117 30 133 30C159 30 180 50 180 78C180 118 144 148 100 172Z"
                stroke="#be6c35"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="text-[11px] uppercase tracking-[0.45em] text-copper">Dia dos namorados</p>
            <h2 className="mt-4 max-w-[16ch] font-serif text-4xl leading-[1.04] text-copper md:text-5xl lg:text-[3.45rem]">
              NESTE DIA DOS NAMORADOS, CELEBRE O AMOR COM LA VIE.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-[#5f4238] md:text-[15px]">
              Joias que selam o amor em cada detalhe. Peças que traduzem sentimentos em forma de brilho, eternizando conexões e tornando cada momento uma lembrança única.
            </p>
            <Link
              href="/joias"
              className="mt-8 inline-flex items-center justify-center bg-copper px-6 py-3 text-xs font-semibold uppercase tracking-[0.26em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#c97941]"
            >
              Confira
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-serif text-4xl uppercase tracking-[0.06em] text-[#1d1217] md:text-5xl">
              ESSÊNCIAS EM DESTAQUE
            </h2>
            <p className="mt-2 text-sm text-[#7b665d]">Essências que combinam com você</p>
          </div>

          <div className="relative mt-14">
            <button
              type="button"
              className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5d4c0] bg-white p-2 text-[#30141f] shadow-[0_12px_30px_rgba(48,20,31,0.12)] md:flex"
              aria-label="Voltar produtos em destaque"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredPerfumes.map((product) => (
                <ShowcaseCard key={product.id} product={product} />
              ))}
            </div>

            <button
              type="button"
              className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5d4c0] bg-white p-2 text-[#30141f] shadow-[0_12px_30px_rgba(48,20,31,0.12)] md:flex"
              aria-label="Avançar produtos em destaque"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/perfumes"
              className="inline-flex min-w-40 items-center justify-center rounded-full border border-[#e5d4c0] bg-white px-8 py-3 text-xs font-medium uppercase tracking-[0.22em] text-[#30141f] transition-colors duration-300 hover:bg-[#fff6e0]"
            >
              Ver tudo
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-serif text-4xl uppercase tracking-[0.06em] text-[#1d1217] md:text-5xl">
              BRILHO ATEMPORAL
            </h2>
            <p className="mt-2 text-sm text-[#7b665d]">Brilhos que te destacam</p>
          </div>

          <div className="relative mt-14">
            <button
              type="button"
              className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5d4c0] bg-white p-2 text-[#30141f] shadow-[0_12px_30px_rgba(48,20,31,0.12)] md:flex"
              aria-label="Voltar joias em destaque"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredJewelry.map((product) => (
                <ShowcaseCard key={product.id} product={product} />
              ))}
            </div>

            <button
              type="button"
              className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5d4c0] bg-white p-2 text-[#30141f] shadow-[0_12px_30px_rgba(48,20,31,0.12)] md:flex"
              aria-label="Avançar joias em destaque"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/joias"
              className="inline-flex min-w-40 items-center justify-center rounded-full border border-[#e5d4c0] bg-white px-8 py-3 text-xs font-medium uppercase tracking-[0.22em] text-[#30141f] transition-colors duration-300 hover:bg-[#fff6e0]"
            >
              Ver tudo
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-120 overflow-hidden">
           

            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                <img
                  src="/imagem-perfume-homepage.png"
                  alt="Perfume em destaque"
                  className="h-full w-full object-cover"
                />
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.45em] text-copper">Perfume de assinatura</p>
            <h2 className="mt-4 max-w-lg font-serif text-4xl leading-[1.04] text-copper md:text-5xl lg:text-[3.7rem]">
              ENCONTRE SUA ESSÊNCIA
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#5f4238] md:text-[15px]">
              Responda ao nosso quiz exclusivo e descubra a fragrância ideal que traduz sua essência e valoriza sua personalidade. Encontre uma combinação perfeita que se harmoniza com seu estilo de vida de forma única.
            </p>
            <Link
              href="/quiz"
              className="mt-10 inline-flex items-center justify-center bg-copper px-7 py-4 text-xs font-semibold uppercase tracking-[0.26em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#c97941]"
            >
              Descubra agora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
