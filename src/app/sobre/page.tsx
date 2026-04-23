const WHATSAPP_NUMBER = "5581991530002";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá, gostaria de saber mais sobre a La Vie."
);

export default function SobrePage() {
  return (
    <div className="bg-white text-wine">
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 md:px-8 md:pb-20 md:pt-20 lg:pb-24 lg:pt-24">
        <div className="text-center">
          <p className="font-serif text-4xl uppercase tracking-[0.08em] text-copper md:text-5xl lg:text-[3.75rem]">
            CONHEÇA LA VIE
          </p>
          <p className="mt-4 text-[17px] italic text-[#3e312d] md:text-[18px]">vida, luz, lavie.</p>
        </div>

        <div id="sobre" className="mt-20 grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div className="text-center lg:text-left">
            <p className="font-serif text-3xl uppercase tracking-[0.14em] text-copper md:text-[2.6rem]">SOBRE</p>
            <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-6 text-[#39302d] lg:mx-0 lg:max-w-xl">
              La Vie é uma marca de semijoias e perfumes que une estética, vida e identidade. Seus produtos são pensados para valorizar a presença e individualidade de cada consumidor, criando uma experiência sensorial única.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-6 text-[#39302d] lg:mx-0 lg:max-w-xl">
              A marca se conecta com pessoas determinadas, ajudando a construir suas trajetórias com confiança e autenticidade.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-w-60 items-center justify-center rounded-full bg-copper px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-[#c97941]"
              >
                Entrar em contato
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-104 overflow-hidden rounded-4xl shadow-[0_20px_60px_rgba(48,20,31,0.12)]">
              <img
                src="/sobre-lavie.png"
                alt="Frasco La Vie em fundo rosado"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div id="contato" className="sr-only" />
      </section>
    </div>
  );
}