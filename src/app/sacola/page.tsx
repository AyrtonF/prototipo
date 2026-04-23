"use client";

import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast";

export default function SacolaPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCartStore();
  const { showToast, ToastContainer } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCheckout = () => {
    if (!userName.trim()) {
      showToast("Por favor, digite seu nome.", "error");
      return;
    }

    const phoneNumber = "5511999999999"; 
    let message = `Olá! Meu nome é ${userName}. Gostaria de comprar os seguintes produtos:\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}x ${item.name} - ${formatCurrency(item.price)}\n`;
    });

    message += `\nTotal: ${formatCurrency(totalPrice())}\n\nPode me ajudar com o pedido?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    setShowModal(false);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#fbf6f1] px-6 pb-20 pt-40 text-center text-[#1c1418]">
        <div className="animate-pulse">
          <ShoppingBag size={48} className="mx-auto mb-6 text-[#d7c1a7]" />
          <p className="text-[10px] uppercase tracking-widest text-[#8b7c72]">Carregando...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#fbf6f1] px-6 pb-20 pt-40 text-center text-[#1c1418]">
        <ToastContainer />
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-4xl border border-[#eadfd4] bg-white px-8 py-16 shadow-[0_20px_50px_rgba(48,20,31,0.05)]">
          <ShoppingBag size={52} className="mx-auto mb-6 text-[#d7c1a7]" />
          <h1 className="mb-4 font-serif text-3xl text-[#1c1418]">Sua sacola está vazia</h1>
          <p className="mb-12 max-w-md text-[10px] uppercase tracking-[0.28em] text-[#8b7c72]">
            Explore nossa coleção e encontre algo especial.
          </p>
          <Link href="/" className="inline-flex items-center justify-center rounded-full bg-copper px-12 py-5 text-[10px] font-semibold uppercase tracking-[0.26em] text-white transition-colors hover:bg-[#c97941]">
            Voltar para a Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf6f1] px-6 pb-20 pt-32 text-[#1c1418]">
      <ToastContainer />
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <p className="text-[10px] uppercase tracking-[0.45em] text-copper">Sua seleção</p>
        <h1 className="mt-4 font-serif text-4xl text-[#1c1418] md:text-5xl">Sua Sacola</h1>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[#6e574d]">
          Revise seus produtos, ajuste quantidades e finalize o pedido no WhatsApp com o atendimento da La Vie.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:gap-16">
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-5 rounded-4xl border border-[#eadfd4] bg-white p-4 shadow-[0_16px_40px_rgba(48,20,31,0.05)] animate-fade-in-up">
              <div className="h-28 w-24 overflow-hidden rounded-2xl bg-[#f6f1eb]">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-lg text-[#1c1418]">{item.name}</h3>
                <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#8b7c72]">{item.category === 'joias' ? 'Semi-Joia' : 'Perfume'}</p>
                <p className="font-semibold text-[#c87634]">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center space-x-4 rounded-full border border-[#e6d8cd] bg-[#fcf8f4] px-4 py-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-[#7b665d] transition-colors hover:text-copper">
                  <Minus size={14} />
                </button>
                <span className="w-4 text-center text-sm font-bold text-[#1c1418]">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-[#7b665d] transition-colors hover:text-copper">
                  <Plus size={14} />
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-[#c0b1a7] transition-colors hover:text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="sticky top-32 h-fit space-y-8 rounded-4xl border border-[#eadfd4] bg-white p-8 shadow-[0_20px_50px_rgba(48,20,31,0.05)] lg:p-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-copper">Resumo</p>
            <h2 className="mt-4 font-serif text-2xl text-[#1c1418]">Finalização</h2>
          </div>
          <div className="flex justify-between text-[10px] uppercase tracking-[0.28em] text-[#8b7c72]">
            <span>Subtotal</span>
            <span>{formatCurrency(totalPrice())}</span>
          </div>
          <div className="flex justify-between border-b border-[#eadfd4] pb-8 text-[10px] uppercase tracking-[0.28em] text-[#8b7c72]">
            <span>Envio</span>
            <span>Calculado no WhatsApp</span>
          </div>
          <div className="flex justify-between pt-4 font-serif text-xl text-[#1c1418]">
            <span>Total</span>
            <span className="text-copper">{formatCurrency(totalPrice())}</span>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex w-full items-center justify-center space-x-4 rounded-full bg-copper py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-colors hover:bg-[#c97941]"
          >
            <span>Finalizar Pedido</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-md animate-fade-in-up rounded-4xl border border-[#eadfd4] bg-white p-10 shadow-[0_24px_60px_rgba(48,20,31,0.12)]">
            <p className="text-[10px] uppercase tracking-[0.35em] text-copper">Quase lá</p>
            <h2 className="mb-4 mt-3 font-serif text-3xl text-[#1c1418]">Finalizar no WhatsApp</h2>
            <p className="mb-8 text-sm leading-7 text-[#6e574d]">Diga-nos seu nome para iniciarmos o atendimento personalizado no WhatsApp.</p>
            
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#8b7c72]">Seu Nome</label>
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded-xl border border-[#eadfd4] bg-[#fbf6f1] px-4 py-3 text-[#1c1418] outline-none transition-colors focus:border-copper focus:ring-1 focus:ring-copper"
                  placeholder="Ex: Maria Silva"
                  autoFocus
                />
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full rounded-full bg-copper py-5 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#c97941]"
              >
                Ir para o WhatsApp
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full text-[10px] uppercase tracking-widest text-[#8b7c72] transition-colors hover:text-[#1c1418]"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
