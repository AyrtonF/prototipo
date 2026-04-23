"use client";

import { useState, useRef } from "react";
import { useProductStore } from "@/store/productStore";
import { useRouter } from "next/navigation";
import { Product, Category, PerfumeIntensity, PerfumeFixation, JewelryMaterial, Occasion, Style } from "@/types";
import { ArrowLeft, Save, Sparkles, Image as ImageIcon, Upload, Plus, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";

const perfumeOccasions: Occasion[] = ["Dia a dia", "Trabalho", "Noite", "Eventos especiais"];
const perfumeStyles: Style[] = ["Elegante", "Moderno", "Clássico", "Ousado"];

function toggleSelection<T>(values: T[] | undefined, value: T) {
  const currentValues = values ?? [];
  return currentValues.includes(value)
    ? currentValues.filter((item) => item !== value)
    : [...currentValues, value];
}

function formatPriceInput(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const amount = Number(digits) / 100;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

function parsePriceInput(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) / 100 : undefined;
}

export default function NovoProdutoPage() {
  const router = useRouter();
  const addProduct = useProductStore((state) => state.addProduct);
  const { showToast, ToastContainer } = useToast();
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputs = useRef<(HTMLInputElement | null)[]>([]);
  const [priceInput, setPriceInput] = useState("");
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: undefined,
    category: "perfumes",
    description: "",
    images: ["", ""],
    stock: undefined,
    tags: [],
    details: [""],
    // Perfume fields
    intensity: "Moderada",
    fixation: "Moderada",
    concentration: "",
    olfactoryNotes: { top: "", heart: "", base: "" },
    occasion: [],
    style: [],
    // Jewelry fields
    material: "Ouro",
    finish: "",
    weight: undefined,
    dimensions: ""
  });

  const [tagInput, setTagInput] = useState("");

  const validate = (data: Partial<Product> = formData) => {
    const errs = [];
    if (!data.name) errs.push("name");
    if (!data.price || data.price <= 0) errs.push("price");
    if (data.stock === undefined || data.stock < 0) errs.push("stock");
    if (!data.category) errs.push("category");
    if (!data.images?.[0]) errs.push("img0");
    if (!data.description) errs.push("description");
    
    // Validações específicas por categoria
    if (data.category === "perfumes") {
      if (!data.concentration) errs.push("concentration");
      if (!data.olfactoryNotes?.top) errs.push("notes-top");
      if (!data.olfactoryNotes?.heart) errs.push("notes-heart");
      if (!data.olfactoryNotes?.base) errs.push("notes-base");
      if (!data.occasion?.length) errs.push("occasion");
      if (!data.style?.length) errs.push("style");
    } else if (data.category === "joias") {
      if (!data.finish) errs.push("finish");
      if (!data.dimensions) errs.push("dimensions");
    }
    
    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedData = {
      ...formData,
      price: parsePriceInput(priceInput) ?? formData.price,
    };

    if (!validate(normalizedData)) {
      showToast("Por favor, preencha todos os campos obrigatórios!", "error");
      return;
    }

    const newProduct: Product = {
      ...normalizedData as Product,
      id: `p-${Date.now()}`,
      slug: normalizedData.name?.toLowerCase().trim().replace(/\s+/g, '-') || "",
      tags: normalizedData.tags || []
    };
    
    addProduct(newProduct);
    showToast("Produto adicionado com sucesso!", "success");
    setTimeout(() => router.push('/admin'), 1500);
  };

  const handleFileUpload = (file: File, imageIndex: number) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...(formData.images || [])];
      newImages[imageIndex] = reader.result as string;
      setFormData({ ...formData, images: newImages });
    };
    reader.readAsDataURL(file);
  };

  const addImageSlot = () => {
    setFormData({
      ...formData,
      images: [...(formData.images || []), ""]
    });
  };

  const removeImageSlot = (index: number) => {
    const minImages = 1;
    if ((formData.images?.length || 0) <= minImages) {
      showToast("Mínimo de uma imagem obrigatório!", "error");
      return;
    }
    
    const newImages = formData.images?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, images: newImages });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()]
      });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(t => t !== tag) || []
    });
  };

  return (
    <div className="min-h-screen bg-[#fbf6f1] px-4 pb-12 pt-32 text-[#1c1418] sm:px-6 sm:pb-20">
      <ToastContainer />
      
      <Link href="/admin" className="mb-8 inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-[#8b7c72] transition-colors hover:text-copper sm:mb-12">
        <ArrowLeft size={14} className="mr-2" />
        Voltar ao Inventário
      </Link>

      <div className="flex items-center space-x-4 mb-8 sm:mb-12">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-copper text-cream shadow-[0_14px_30px_rgba(190,108,53,0.18)] sm:h-12 sm:w-12">
          <Sparkles size={20} className="sm:h-6 sm:w-6" />
        </div>
        <h1 className="font-serif text-3xl text-[#1c1418] sm:text-4xl">Novo Produto</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Media Upload Section */}
        <div className="rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-[0_20px_50px_rgba(48,20,31,0.05)] sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center font-serif text-lg text-[#1c1418]">
              <ImageIcon size={20} className="mr-2 text-copper" /> Imagens do Produto
            </h2>
            <button
              type="button"
              onClick={addImageSlot}
              className="flex items-center gap-2 rounded-xl bg-copper px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#c97941]"
            >
              <Plus size={16} />
              Adicionar Imagem
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formData.images?.map((imageUrl, index) => (
              <div key={index} className="space-y-4 relative">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] block font-bold uppercase tracking-widest text-[#8b7c72]">
                    {index === 0 && "Imagem Principal *"}
                    {index === 1 && formData.category === "joias" && "Lifestyle (pessoa usando) - opcional"}
                    {index === 1 && formData.category === "perfumes" && "Imagem Secundária"}
                    {index > 1 && `Imagem ${index + 1}`}
                  </label>
                  {index > 0 && (formData.category === "perfumes" || index > 1) && (
                    <button
                      type="button"
                      onClick={() => removeImageSlot(index)}
                      className="text-red-500 hover:text-red-700"
                      title="Remover imagem"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {imageUrl && (
                  <div className="relative mb-4 overflow-hidden rounded-2xl bg-[#f6f1eb] aspect-square">
                    <img src={imageUrl} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                )}

                {!imageUrl && (
                  <div className="mb-4 flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-[#e7dbd0] bg-[#fbf6f1]">
                    <ImageIcon size={40} className="text-[#d7c1a7]" />
                  </div>
                )}

                <div className="space-y-2">
                  <input 
                    type="text"
                    className={cn(
                      "w-full rounded-xl bg-[#fbf6f1] p-3 text-sm text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper",
                      errors.includes(`img${index}`) ? "border-2 border-red-500" : ""
                    )}
                    placeholder="Cole URL da imagem..."
                    value={imageUrl}
                    onChange={e => {
                      const newImages = [...(formData.images || [])];
                      newImages[index] = e.target.value;
                      setFormData({...formData, images: newImages});
                    }}
                  />
                  
                  <button
                    type="button"
                    onClick={() => fileInputs.current[index]?.click()}
                    className="group flex w-full items-center justify-center gap-3 rounded-xl border-2 border-transparent bg-[#f2ece5] px-4 py-3 transition-all hover:border-[#d9c0a8] hover:bg-[#f8efe6]"
                  >
                    <Upload size={18} className="text-[#7b665d] transition-colors group-hover:text-copper" />
                    <span className="text-sm font-medium text-[#7b665d] transition-colors group-hover:text-copper">
                      Carregar do Dispositivo
                    </span>
                  </button>
                  
                  <input
                    ref={el => { fileInputs.current[index] = el; }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-6 rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-[0_20px_50px_rgba(48,20,31,0.05)] sm:p-10">
          <h2 className="font-serif text-xl text-[#1c1418]">Informações Básicas</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="text-[9px] block mb-2 font-bold uppercase tracking-widest text-[#8b7c72]">Nome do Produto *</label>
              <input 
                type="text"
                className={cn(
                  "w-full rounded-xl bg-[#fbf6f1] p-4 font-serif text-lg text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper",
                  errors.includes("name") ? "border-2 border-red-500" : ""
                )}
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Dior Sauvage Eau de Parfum"
              />
            </div>

            <div>
              <label className="text-[9px] block mb-2 font-bold uppercase tracking-widest text-[#8b7c72]">Categoria *</label>
              <select 
                className="w-full appearance-none rounded-xl bg-[#fbf6f1] p-4 text-xs font-bold uppercase tracking-widest text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as Category})}
              >
                <option value="perfumes">PERFUMES</option>
                <option value="joias">SEMI-JOIAS</option>
              </select>
            </div>

            <div>
              <label className="text-[9px] block mb-2 font-bold uppercase tracking-widest text-[#8b7c72]">Preço (R$) *</label>
              <input 
                type="text"
                inputMode="numeric"
                className={cn(
                  "w-full rounded-xl bg-[#fbf6f1] p-4 text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper",
                  errors.includes("price") ? "border-2 border-red-500" : ""
                )}
                value={priceInput}
                onChange={(e) => {
                  const formatted = formatPriceInput(e.target.value);
                  setPriceInput(formatted);
                  setFormData({ ...formData, price: parsePriceInput(formatted) });
                }}
                placeholder="R$ 0,00"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="text-[9px] block mb-2 font-bold uppercase tracking-widest text-[#8b7c72]">Estoque *</label>
              <input 
                type="number"
                min="0"
                className={cn(
                  "w-full rounded-xl bg-[#fbf6f1] p-4 text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper",
                  errors.includes("stock") ? "border-2 border-red-500" : ""
                )}
                value={formData.stock ?? ''}
                onChange={e => setFormData({...formData, stock: e.target.value ? Number(e.target.value) : undefined})}
                placeholder="0"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="text-[9px] block mb-2 font-bold uppercase tracking-widest text-[#8b7c72]">Descrição *</label>
              <textarea 
                rows={4}
                className={cn(
                  "w-full rounded-xl bg-[#fbf6f1] p-4 text-sm text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper resize-none",
                  errors.includes("description") ? "border-2 border-red-500" : ""
                )}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Descrição do produto que aparecerá no showroom..."
              />
            </div>

            {/* Tags */}
            <div className="lg:col-span-2">
              <label className="text-[9px] block mb-2 font-bold uppercase tracking-widest text-[#8b7c72]">
                {formData.category === "perfumes"
                  ? "Tags (Ex: Amadeirado, Intenso, Cítrico)"
                  : "Tags (Ex: Elegante, Moderno, Clássico)"}
              </label>
              <p className="mb-3 text-xs text-[#8b7c72]">
                {formData.category === "perfumes"
                  ? "Adicione características olfativas e de intensidade para os filtros"
                  : "Adicione características de estilo para os filtros"}
              </p>
              <div className="mb-3 flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="flex-1 rounded-xl bg-[#fbf6f1] p-3 text-sm text-[#1c1418] outline-none focus:ring-2 focus:ring-copper"
                  placeholder={
                    formData.category === "perfumes"
                      ? "Ex: Amadeirado, Intenso..."
                      : "Ex: Elegante, Minimalista..."
                  }
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="rounded-xl bg-copper px-4 py-2 text-white transition-colors hover:bg-[#c97941]"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags?.map((tag) => (
                  <span key={tag} className="flex items-center gap-2 rounded-full bg-[#f2ece5] px-4 py-2 text-xs text-[#1c1418]">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conditional Fields - Perfumes */}
        {formData.category === "perfumes" && (
          <div className="space-y-6 rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-[0_20px_50px_rgba(48,20,31,0.05)] sm:p-10">
            <h2 className="font-serif text-xl text-[#1c1418]">Características do Perfume</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-[9px] block mb-2 font-bold uppercase tracking-widest text-[#8b7c72]">Intensidade *</label>
                <select 
                  className="w-full rounded-xl bg-[#fbf6f1] p-4 text-sm text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper"
                  value={formData.intensity}
                  onChange={e => setFormData({...formData, intensity: e.target.value as PerfumeIntensity})}
                >
                  <option value="Suave">Suave</option>
                  <option value="Moderada">Moderada</option>
                  <option value="Intensa">Intensa</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] block mb-2 font-bold uppercase tracking-widest text-[#8b7c72]">Fixação *</label>
                <select 
                  className="w-full rounded-xl bg-[#fbf6f1] p-4 text-sm text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper"
                  value={formData.fixation}
                  onChange={e => setFormData({...formData, fixation: e.target.value as PerfumeFixation})}
                >
                  <option value="Fraca">Fraca (2-4h)</option>
                  <option value="Moderada">Moderada (4-6h)</option>
                  <option value="Forte">Forte (6-8h)</option>
                  <option value="Muito Forte">Muito Forte (8h+)</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] block mb-2 font-bold uppercase tracking-widest text-[#8b7c72]">Concentração *</label>
                <input 
                  type="text"
                  className={cn(
                    "w-full rounded-xl bg-[#fbf6f1] p-4 text-sm text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper",
                    errors.includes("concentration") ? "border-2 border-red-500" : ""
                  )}
                  value={formData.concentration}
                  onChange={e => setFormData({...formData, concentration: e.target.value})}
                  placeholder="Ex: Eau de Parfum"
                />
              </div>

              <div className="lg:col-span-3">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-4 font-bold">Notas Olfativas *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="mb-2 block text-xs text-[#8b7c72]">Notas de Topo</label>
                    <input 
                      type="text"
                      className={cn(
                        "w-full rounded-xl bg-[#fbf6f1] p-3 text-sm text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper",
                        errors.includes("notes-top") ? "border-2 border-red-500" : ""
                      )}
                      value={formData.olfactoryNotes?.top}
                      onChange={e => setFormData({
                        ...formData, 
                        olfactoryNotes: {...formData.olfactoryNotes!, top: e.target.value}
                      })}
                      placeholder="Ex: Bergamota, Limão"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs text-[#8b7c72]">Notas de Coração</label>
                    <input 
                      type="text"
                      className={cn(
                        "w-full rounded-xl bg-[#fbf6f1] p-3 text-sm text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper",
                        errors.includes("notes-heart") ? "border-2 border-red-500" : ""
                      )}
                      value={formData.olfactoryNotes?.heart}
                      onChange={e => setFormData({
                        ...formData, 
                        olfactoryNotes: {...formData.olfactoryNotes!, heart: e.target.value}
                      })}
                      placeholder="Ex: Jasmim, Rosa"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs text-[#8b7c72]">Notas de Base</label>
                    <input 
                      type="text"
                      className={cn(
                        "w-full rounded-xl bg-[#fbf6f1] p-3 text-sm text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper",
                        errors.includes("notes-base") ? "border-2 border-red-500" : ""
                      )}
                      value={formData.olfactoryNotes?.base}
                      onChange={e => setFormData({
                        ...formData, 
                        olfactoryNotes: {...formData.olfactoryNotes!, base: e.target.value}
                      })}
                      placeholder="Ex: Sândalo, Âmbar"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-[#eadfd4] bg-[#fcf8f4] p-5">
                  <label className="text-[9px] block font-bold uppercase tracking-widest text-[#8b7c72]">Ocasiões *</label>
                  <p className="mt-2 text-xs text-[#8b7c72]">Selecione uma ou mais ocasiões de uso.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {perfumeOccasions.map((occasion) => {
                      const isActive = formData.occasion?.includes(occasion);

                      return (
                        <button
                          key={occasion}
                          type="button"
                          onClick={() => setFormData({ ...formData, occasion: toggleSelection(formData.occasion, occasion) })}
                          className={cn(
                            "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all",
                            isActive
                              ? "border-copper bg-copper text-white"
                              : "border-[#e3d8cf] bg-white text-[#7b665d] hover:border-copper hover:text-copper",
                            errors.includes("occasion") ? "ring-2 ring-red-500" : ""
                          )}
                        >
                          {occasion}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-3xl border border-[#eadfd4] bg-[#fcf8f4] p-5">
                  <label className="text-[9px] block font-bold uppercase tracking-widest text-[#8b7c72]">Estilo *</label>
                  <p className="mt-2 text-xs text-[#8b7c72]">Escolha o estilo que melhor representa a fragrância.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {perfumeStyles.map((style) => {
                      const isActive = formData.style?.includes(style);

                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setFormData({ ...formData, style: toggleSelection(formData.style, style) })}
                          className={cn(
                            "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all",
                            isActive
                              ? "border-copper bg-copper text-white"
                              : "border-[#e3d8cf] bg-white text-[#7b665d] hover:border-copper hover:text-copper",
                            errors.includes("style") ? "ring-2 ring-red-500" : ""
                          )}
                        >
                          {style}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conditional Fields - Joias */}
        {formData.category === "joias" && (
          <div className="space-y-6 rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-[0_20px_50px_rgba(48,20,31,0.05)] sm:p-10">
            <h2 className="font-serif text-xl text-[#1c1418]">Características da Joia</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[9px] block mb-2 font-bold uppercase tracking-widest text-[#8b7c72]">Material *</label>
                <select 
                  className="w-full rounded-xl bg-[#fbf6f1] p-4 text-sm text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper"
                  value={formData.material}
                  onChange={e => setFormData({...formData, material: e.target.value as JewelryMaterial})}
                >
                  <option value="Ouro">Ouro 18k</option>
                  <option value="Prata">Prata 925</option>
                  <option value="Ouro Rose">Ouro Rosé 18k</option>
                  <option value="Aço Inoxidável">Aço Inoxidável</option>
                  <option value="Banho de Ouro">Banho de Ouro</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] block mb-2 font-bold uppercase tracking-widest text-[#8b7c72]">Acabamento *</label>
                <input 
                  type="text"
                  className={cn(
                    "w-full rounded-xl bg-[#fbf6f1] p-4 text-sm text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper",
                    errors.includes("finish") ? "border-2 border-red-500" : ""
                  )}
                  value={formData.finish}
                  onChange={e => setFormData({...formData, finish: e.target.value})}
                  placeholder="Ex: Polido, Acetinado, Diamantado"
                />
              </div>

              <div>
                <label className="text-[9px] block mb-2 font-bold uppercase tracking-widest text-[#8b7c72]">Peso (gramas)</label>
                <input 
                  type="number"
                  min="0"
                  step="0.1"
                  className="w-full rounded-xl bg-[#fbf6f1] p-4 text-sm text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper"
                  value={formData.weight ?? ''}
                  onChange={e => setFormData({...formData, weight: e.target.value ? Number(e.target.value) : undefined})}
                  placeholder="Ex: 15.5"
                />
              </div>

              <div>
                <label className="text-[9px] block mb-2 font-bold uppercase tracking-widest text-[#8b7c72]">Dimensões *</label>
                <input 
                  type="text"
                  className={cn(
                    "w-full rounded-xl bg-[#fbf6f1] p-4 text-sm text-[#1c1418] outline-none transition-all focus:ring-2 focus:ring-copper",
                    errors.includes("dimensions") ? "border-2 border-red-500" : ""
                  )}
                  value={formData.dimensions}
                  onChange={e => setFormData({...formData, dimensions: e.target.value})}
                  placeholder="Ex: 45cm de comprimento, Tamanho 16"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
          <Link 
            href="/admin"
            className="rounded-full border border-[#e3d8cf] px-8 py-4 text-center text-xs font-bold uppercase tracking-widest text-[#7b665d] transition-colors hover:border-copper hover:text-copper"
          >
            Cancelar
          </Link>
          <button 
            type="submit"
            className="flex items-center justify-center space-x-3 rounded-full bg-copper px-12 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_18px_40px_rgba(190,108,53,0.2)] transition-colors hover:bg-[#c97941]"
          >
            <Save size={18} />
            <span>Salvar Produto</span>
          </button>
        </div>
      </form>
    </div>
  );
}
