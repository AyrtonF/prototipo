"use client";

import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import { formatCurrency } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/useToast";

export default function SacolaPage() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const products = useProductStore((state) => state.products);
  const productStatus = useProductStore((state) => state.status);
  const { showToast, ToastContainer } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const visibleCart = useMemo(() => {
    const validProductIds = new Set(products.map((product) => product.id));
    return cart.filter((item) => validProductIds.has(item.id));
  }, [cart, products]);

  const visibleTotalPrice = useMemo(
    () => visibleCart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [visibleCart]
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setIsMounted(true), 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (productStatus !== "ready") {
      return;
    }

    const validProductIds = new Set(products.map((product) => product.id));

    cart
      .filter((item) => !validProductIds.has(item.id))
      .forEach((item) => removeFromCart(item.id));
  }, [cart, productStatus, products, removeFromCart]);

  const handleCheckout = () => {
    if (!userName.trim()) {
      showToast("Por favor, digite seu nome.", "error");
      return;
    }

    const phoneNumber = "5581991530002"; 
    let message = `Olá! Meu nome é ${userName}. Gostaria de comprar os seguintes produtos:\n\n`;

    visibleCart.forEach((item, index) => {
      message += `${index + 1}x ${item.name} - ${formatCurrency(item.price)}\n`;
    });

    message += `\nTotal: ${formatCurrency(visibleTotalPrice)}\n\nPode me ajudar com o pedido?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    setShowModal(false);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-background px-6 pb-20 pt-40 text-center text-foreground">
        <div className="animate-pulse">
          <ShoppingBag size={48} className="mx-auto mb-6 text-muted" />
          <p className="text-[10px] uppercase tracking-widest text-muted">Carregando...</p>
        </div>
      </div>
    );
  }

  if (productStatus !== "ready") {
    return (
      <div className="min-h-screen bg-background px-6 pb-20 pt-40 text-center text-foreground">
        <div className="animate-pulse">
          <ShoppingBag size={48} className="mx-auto mb-6 text-muted" />
          <p className="text-[10px] uppercase tracking-widest text-muted">Carregando catálogo...</p>
        </div>
      </div>
    );
  }

  if (visibleCart.length === 0) {
    return (
      <div className="min-h-screen bg-background px-6 pb-20 pt-40 text-center text-foreground">
        <ToastContainer />
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-4xl border border-border bg-surface px-8 py-16 shadow-[0_20px_50px_rgba(48,20,31,0.05)]">
          <ShoppingBag size={52} className="mx-auto mb-6 text-muted" />
          <h1 className="mb-4 font-serif text-3xl text-foreground">Sua sacola está vazia</h1>
          <p className="mb-12 max-w-md text-[10px] uppercase tracking-[0.28em] text-muted">
            Explore nossa coleção e encontre algo especial.
          </p>
          <Link href="/" className="inline-flex items-center text-cream justify-center rounded-full bg-copper px-12 py-5 text-[10px] font-semibold uppercase tracking-[0.26em] text-foreground transition-colors hover:bg-[#42202e]">
            Voltar para a Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 pb-20 pt-32 text-foreground">
      <ToastContainer />
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <p className="text-[10px] uppercase tracking-[0.45em] text-copper">Sua seleção</p>
        <h1 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">Sua Sacola</h1>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-muted">
          Revise seus produtos, ajuste quantidades e finalize o pedido no WhatsApp com o atendimento da La Vie.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:gap-16">
        <div className="space-y-6">
          {visibleCart.map((item) => (
            <div key={item.id} className="flex items-center gap-5 rounded-4xl border border-border bg-surface p-4 shadow-[0_16px_40px_rgba(48,20,31,0.05)] animate-fade-in-up">
              <div className="h-28 w-24 overflow-hidden rounded-2xl bg-surface-2">
                <Image src={item.images[0]} alt={item.name} width={96} height={112} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-lg text-foreground">{item.name}</h3>
                <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-muted">{item.category === 'joias' ? 'Semi-Joia' : 'Perfume'}</p>
                <p className="font-semibold text-copper">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center space-x-4 rounded-full border border-border bg-surface-2 px-4 py-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-muted transition-colors hover:text-copper">
                  <Minus size={14} />
                </button>
                <span className="w-4 text-center text-sm font-bold text-foreground">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-muted transition-colors hover:text-copper">
                  <Plus size={14} />
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-muted transition-colors hover:text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="sticky top-32 h-fit space-y-8 rounded-4xl border border-border bg-surface p-8 shadow-[0_20px_50px_rgba(48,20,31,0.05)] lg:p-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-copper">Resumo</p>
            <h2 className="mt-4 font-serif text-2xl text-foreground">Finalização</h2>
          </div>
          <div className="flex justify-between text-[10px] uppercase tracking-[0.28em] text-muted">
            <span>Subtotal</span>
            <span>{formatCurrency(visibleTotalPrice)}</span>
          </div>
          <div className="flex justify-between border-b border-border pb-8 text-[10px] uppercase tracking-[0.28em] text-muted">
            <span>Envio</span>
            <span>Calculado no WhatsApp</span>
          </div>
          <div className="flex justify-between pt-4 font-serif text-xl text-foreground">
            <span>Total</span>
            <span className="text-copper">{formatCurrency(visibleTotalPrice)}</span>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex w-full items-center justify-center space-x-4 rounded-full bg-copper py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground transition-colors hover:bg-[#42202e]"
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
          <div className="relative w-full max-w-md animate-fade-in-up rounded-4xl border border-border bg-surface p-10 shadow-[0_24px_60px_rgba(48,20,31,0.12)]">
            <p className="text-[10px] uppercase tracking-[0.35em] text-copper">Quase lá</p>
            <h2 className="mb-4 mt-3 font-serif text-3xl text-foreground">Finalizar no WhatsApp</h2>
            <p className="mb-8 text-sm leading-7 text-muted">Diga-nos seu nome para iniciarmos o atendimento personalizado no WhatsApp.</p>
            
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted">Seu Nome</label>
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-foreground outline-none transition-colors focus:border-copper focus:ring-1 focus:ring-copper"
                  placeholder="Ex: Maria Silva"
                  autoFocus
                />
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full rounded-full bg-copper py-5 text-[10px] font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-[#42202e]"
              >
                Ir para o WhatsApp
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
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
