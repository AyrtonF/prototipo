"use client";

import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

export default function SacolaPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCartStore();
  const { showToast, ToastContainer } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");

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

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-40 text-center min-h-screen">
        <ToastContainer />
        <ShoppingBag size={48} className="mx-auto mb-6 text-gray-200 dark:text-gray-700" />
        <h1 className="text-3xl font-serif mb-4 dark:text-white">Sua sacola está vazia</h1>
        <p className="text-gray-400 mb-12 uppercase text-[10px] tracking-widest">Explore nossa coleção e encontre algo especial.</p>
        <Link href="/produtos" className="inline-block bg-black dark:bg-white dark:text-black text-white px-12 py-5 uppercase text-[10px] tracking-widest hover:bg-gold dark:hover:bg-gold hover:text-white transition-luxury">
          Voltar para a Loja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <ToastContainer />
      <h1 className="text-4xl font-serif mb-16 text-center dark:text-white">Sua Sacola</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={item.id} className="flex space-x-6 py-6 border-b border-gray-100 dark:border-zinc-800 items-center animate-fade-in-up">
              <div className="w-24 h-32 bg-cream dark:bg-zinc-800 overflow-hidden rounded-lg">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg dark:text-white">{item.name}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">{item.category === 'joias' ? 'Semi-Joia' : 'Perfume'}</p>
                <p className="font-medium dark:text-gray-300">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center space-x-4 border border-gray-200 dark:border-zinc-700 px-4 py-2 rounded-lg">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-gold transition-luxury dark:text-gray-300">
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold w-4 text-center dark:text-white">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-gold transition-luxury dark:text-gray-300">
                  <Plus size={14} />
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-luxury">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-cream dark:bg-zinc-900 p-12 h-fit space-y-8 sticky top-32 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h2 className="text-2xl font-serif dark:text-white">Resumo</h2>
          <div className="flex justify-between text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
            <span>Subtotal</span>
            <span>{formatCurrency(totalPrice())}</span>
          </div>
          <div className="flex justify-between text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-zinc-800">
            <span>Envio</span>
            <span>Calculado no WhatsApp</span>
          </div>
          <div className="flex justify-between text-xl font-serif pt-4 dark:text-white">
            <span>Total</span>
            <span className="text-gold">{formatCurrency(totalPrice())}</span>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="w-full bg-black dark:bg-white dark:text-black text-white py-6 uppercase text-[10px] tracking-[0.3em] font-bold hover:bg-gold dark:hover:bg-gold hover:text-white transition-luxury flex items-center justify-center space-x-4 rounded-xl"
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
          <div className="relative bg-white dark:bg-zinc-900 w-full max-w-md p-12 rounded-2xl animate-fade-in-up border border-gray-100 dark:border-zinc-800">
            <h2 className="text-3xl font-serif mb-4 dark:text-white">Quase lá</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Diga-nos seu nome para iniciarmos o atendimento personalizado no WhatsApp.</p>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] tracking-widest uppercase text-gray-400 block mb-2 font-bold">Seu Nome</label>
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 py-3 px-4 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-luxury dark:text-white"
                  placeholder="Ex: Maria Silva"
                  autoFocus
                />
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-gold text-white py-5 uppercase text-[10px] tracking-widest font-bold hover:bg-black dark:hover:bg-white dark:hover:text-black transition-luxury rounded-lg"
              >
                Ir para o WhatsApp
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full text-[10px] tracking-widest uppercase text-gray-400 hover:text-black dark:hover:text-white transition-luxury"
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
