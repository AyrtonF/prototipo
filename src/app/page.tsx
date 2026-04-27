import Link from "next/link";
import Image from "next/image";
import { getPublicProducts } from "@/lib/products/catalog";
import ShowcaseCarouselSection from "@/components/home/ShowcaseCarouselSection";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const products = await getPublicProducts();

  const featuredPerfumes = products.filter((product) => product.category === "perfumes").slice(0, 4);
  const featuredJewelry = products.filter((product) => product.category === "joias").slice(0, 4);

  return (
    /* bg-background e text-foreground garantem a troca automática de cores */
    <div className="bg-background text-foreground transition-colors duration-300">
      
      {/* SEÇÃO HERO: Mantida com bg-wine pois é a identidade visual fixa */}
      <section className="relative overflow-hidden bg-wine text-cream">
        <div className="absolute inset-0">
          <Image
            src="/perfume-home-principal.png"
            alt="Perfume principal da home"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right opacity-95"
          />
          {/* Gradiente dinâmico usando a cor wine do tema */}
          <div className="absolute inset-0 bg-linear-to-r from-wine/95 via-wine/80 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-7xl items-center px-6 py-16 md:px-12 lg:py-20">
          <div className="max-w-2xl">
            <p className="mb-6 text-[11px] uppercase tracking-[0.45em] text-[#e2aea2]">Coleção exclusiva</p>
            <h1 className="max-w-[10ch] font-serif text-5xl leading-[0.9] md:text-7xl lg:text-[4.85rem]">
              ENCONTRE A SUA
              <span className="block">ESSÊNCIA</span>
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-7 text-cream/80 md:text-[15px]">
              Responda ao nosso quiz exclusivo e descubra a fragrância ideal que traduz sua essência.
            </p>
            <div className="mt-10">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-full bg-copper px-7 py-4 text-xs font-semibold uppercase tracking-[0.26em] text-cream transition-all hover:scale-105 hover:bg-[#42202e] active:scale-95"
              >
                Descubra agora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DIA DOS NAMORADOS: Agora reage ao modo escuro */}
      <section className="bg-background px-6 py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.96fr_1.04fr]">
          <div className="overflow-hidden bg-surface shadow-[0_24px_60px_rgba(48,20,31,0.12)]">
            <Image
              src="/Imagem-joia-homepage.png"
              alt="Joia editorial La Vie"
              width={1400}
              height={1100}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative py-6 lg:pl-10">
            <p className="text-[11px] uppercase tracking-[0.45em] text-copper">Dia dos namorados</p>
            <h2 className="mt-4 max-w-[16ch] font-serif text-4xl leading-[1.04] text-copper md:text-5xl lg:text-[3.45rem]">
              NESTE DIA DOS NAMORADOS, CELEBRE O AMOR COM LA VIE.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-muted md:text-[15px]">
              Joias que selam o amor em cada detalhe. Peças que traduzem sentimentos em forma de brilho.
            </p>
            <Link
              href="/joias"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-copper px-6 py-3 text-xs font-semibold uppercase tracking-[0.26em] text-cream transition-all hover:bg-[#42202e]"
            >
              Confira
            </Link>
          </div>
        </div>
      </section>

      {/* CAROUSELS: Devem herdar as cores do container pai */}
      <ShowcaseCarouselSection
        title="Essências em destaque"
        subtitle="Essências que combinam com você"
        products={featuredPerfumes}
        ctaHref="/perfumes"
        ctaLabel="Ver tudo"
        emptyMessage="Nenhum produto disponível no momento"
      />

      <ShowcaseCarouselSection
        title="Brilho Atemporal"
        subtitle="Brilhos que te destacam"
        products={featuredJewelry}
        ctaHref="/joias"
        ctaLabel="Ver tudo"
        emptyMessage="Nenhum produto disponível no momento"
      />

      {/* SEÇÃO ASSINATURA: Adaptada para Dark Mode */}
      <section className="bg-background px-6 py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-120 overflow-hidden">
            <Image
              src="/imagem-perfume-homepage.png"
              alt="Perfume em destaque"
              width={1400}
              height={1100}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.45em] text-copper">Perfume de assinatura</p>
            <h2 className="mt-4 max-w-lg font-serif text-4xl leading-[1.04] text-copper md:text-5xl lg:text-[3.7rem]">
              ENCONTRE SUA ESSÊNCIA
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-muted md:text-[15px]">
              Responda ao nosso quiz exclusivo e descubra a fragrância ideal.
            </p>
            <Link
              href="/quiz"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-copper px-7 py-4 text-xs font-semibold uppercase tracking-[0.26em] text-cream transition-all hover:bg-[#42202e]"
            >
              Descubra agora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}