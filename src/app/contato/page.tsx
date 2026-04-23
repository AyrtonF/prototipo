"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "5511900000000";

export default function ContatoPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = encodeURIComponent(
      `Olá! Me chamo ${name || ""}. ${message || ""}`.trim()
    );

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-white px-6 py-16 text-wine md:py-20 lg:py-24">
      <section className="mx-auto max-w-4xl text-center">
        <p className="font-serif text-4xl uppercase tracking-[0.08em] text-copper md:text-5xl lg:text-[3.75rem]">
          ENTRE EM CONTATO
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-7 text-[#2e2523] md:text-[18px]">
          Converse com a gente por esse número <span className="font-semibold text-copper">(11) 9 0000-0000</span> ou escreva sua mensagem abaixo.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-12 w-full max-w-92 space-y-3 text-left sm:max-w-104">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nome*"
            className="h-10 w-full bg-[#d9d9d9] px-3 text-sm text-[#262626] outline-none placeholder:text-[#9a9a9a]"
          />

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Mensagem..."
            rows={8}
            className="min-h-56 w-full resize-none bg-[#d9d9d9] px-3 py-3 text-sm text-[#262626] outline-none placeholder:text-[#9a9a9a]"
          />

          <div className="pt-2 text-center">
            <button
              type="submit"
              className="inline-flex min-w-56 items-center justify-center rounded-full bg-copper px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-white transition-colors hover:bg-[#c97941]"
            >
              Enviar para WhatsApp
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}