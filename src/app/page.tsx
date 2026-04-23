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
    <div className="bg-white text-wine">
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
                className="inline-flex items-center justify-center rounded-full bg-copper px-7 py-4 text-xs font-semibold uppercase tracking-[0.26em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#c97941]"
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
            <Image
              src="/Imagem-joia-homepage.png"
              alt="Joia editorial La Vie"
              width={1400}
              height={1100}
              sizes="(max-width: 1024px) 100vw, 50vw"
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
              className="mt-8 inline-flex items-center justify-center rounded-full bg-copper px-6 py-3 text-xs font-semibold uppercase tracking-[0.26em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#c97941]"
            >
              Confira
            </Link>
          </div>
        </div>
      </section>

      <ShowcaseCarouselSection
        title="Essências em destaque"
        subtitle="Essências que combinam com você"
        products={featuredPerfumes}
        ctaHref="/perfumes"
        ctaLabel="Ver tudo"
        emptyMessage="Nenhum produto disponível"
      />

      <ShowcaseCarouselSection
        title="Brilho Atemporal"
        subtitle="Brilhos que te destacam"
        products={featuredJewelry}
        ctaHref="/joias"
        ctaLabel="Ver tudo"
        emptyMessage="Nenhum produto disponível"
      />

      <section className="bg-white px-6 py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-120 overflow-hidden">
            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
              <Image
                src="/imagem-perfume-homepage.png"
                alt="Perfume em destaque"
                width={1400}
                height={1100}
                sizes="(max-width: 1024px) 100vw, 50vw"
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
              className="mt-10 inline-flex items-center justify-center rounded-full bg-copper px-7 py-4 text-xs font-semibold uppercase tracking-[0.26em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#c97941]"
            >
              Descubra agora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
