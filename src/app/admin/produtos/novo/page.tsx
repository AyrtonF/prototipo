"use client";

import { useState, useRef } from "react";
import { useProductStore } from "@/store/productStore";
import { useRouter } from "next/navigation";
import { Product, Category, PerfumeIntensity, PerfumeFixation, JewelryMaterial } from "@/types";
import { ArrowLeft, Save, Sparkles, Image as ImageIcon, Upload, Plus, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";

export default function NovoProdutoPage() {
  const router = useRouter();
  const addProduct = useProductStore((state) => state.addProduct);
  const { showToast, ToastContainer } = useToast();
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputs = useRef<(HTMLInputElement | null)[]>([]);
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: "perfumes",
    description: "",
    images: ["", ""],
    stock: 0,
    tags: [],
    details: [""],
    // Perfume fields
    intensity: "Moderada",
    fixation: "Moderada",
    concentration: "",
    olfactoryNotes: { top: "", heart: "", base: "" },
    // Jewelry fields
    material: "Ouro",
    finish: "",
    weight: 0,
    dimensions: ""
  });

  const [tagInput, setTagInput] = useState("");

  const validate = () => {
    const errs = [];
    if (!formData.name) errs.push("name");
    if (!formData.price || formData.price <= 0) errs.push("price");
    if (formData.stock === undefined || formData.stock < 0) errs.push("stock");
    if (!formData.category) errs.push("category");
    if (!formData.images?.[0]) errs.push("img0");
    if (!formData.description) errs.push("description");
    
    // Validações específicas por categoria
    if (formData.category === "perfumes") {
      if (!formData.concentration) errs.push("concentration");
      if (!formData.olfactoryNotes?.top) errs.push("notes-top");
      if (!formData.olfactoryNotes?.heart) errs.push("notes-heart");
      if (!formData.olfactoryNotes?.base) errs.push("notes-base");
    } else if (formData.category === "joias") {
      if (!formData.finish) errs.push("finish");
      if (!formData.dimensions) errs.push("dimensions");
      // Segunda imagem é obrigatória para joias (imagem lifestyle)
      if (!formData.images?.[1]) errs.push("img1");
    }
    
    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Por favor, preencha todos os campos obrigatórios!", "error");
      return;
    }

    const newProduct: Product = {
      ...formData as Product,
      id: `p-${Date.now()}`,
      slug: formData.name?.toLowerCase().trim().replace(/\s+/g, '-') || "",
      tags: formData.tags || []
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
    // Não permite remover se tiver menos de 2 imagens (ou 2 para joias)
    const minImages = formData.category === "joias" ? 2 : 1;
    if ((formData.images?.length || 0) <= minImages) {
      showToast(`Mínimo de ${minImages === 2 ? "duas imagens" : "uma imagem"} obrigatório${minImages === 2 ? "s" : ""}!`, "error");
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <ToastContainer />
      
      <Link href="/admin" className="inline-flex items-center text-zinc-500 hover:text-black dark:hover:text-white mb-8 sm:mb-12 transition-colors uppercase text-[10px] tracking-widest font-bold">
        <ArrowLeft size={14} className="mr-2" />
        Voltar ao Inventário
      </Link>

      <div className="flex items-center space-x-4 mb-8 sm:mb-12">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
          <Sparkles size={20} className="sm:w-6 sm:h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif dark:text-white">Novo Produto</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Media Upload Section */}
        <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-serif dark:text-white flex items-center">
              <ImageIcon size={20} className="mr-2 text-amber-600" /> Imagens do Produto
            </h2>
            <button
              type="button"
              onClick={addImageSlot}
              className="px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <Plus size={16} />
              Adicionar Imagem
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formData.images?.map((imageUrl, index) => (
              <div key={index} className="space-y-4 relative">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] uppercase tracking-widest text-zinc-400 block font-bold">
                    {index === 0 && "Imagem Principal *"}
                    {index === 1 && formData.category === "joias" && "Lifestyle (pessoa usando) *"}
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
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-4">
                    <img src={imageUrl} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                )}

                {!imageUrl && (
                  <div className="aspect-square rounded-2xl bg-zinc-50 dark:bg-zinc-800 border-2 border-dashed border-zinc-200 dark:border-zinc-700 flex items-center justify-center mb-4">
                    <ImageIcon size={40} className="text-zinc-300 dark:text-zinc-600" />
                  </div>
                )}

                <div className="space-y-2">
                  <input 
                    type="text"
                    className={cn(
                      "w-full bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all dark:text-white text-sm",
                      errors.includes(`img${index}`) && "border-2 border-red-500"
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
                    className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-amber-50 dark:hover:bg-zinc-700 hover:border-amber-500 border-2 border-transparent transition-all flex items-center justify-center gap-3 group"
                  >
                    <Upload size={18} className="text-zinc-600 dark:text-zinc-400 group-hover:text-amber-600" />
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-amber-600">
                      Carregar do Dispositivo
                    </span>
                  </button>
                  
                  <input
                    ref={el => fileInputs.current[index] = el}
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
        <div className="bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-6">
          <h2 className="text-xl font-serif dark:text-white">Informações Básicas</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">Nome do Produto *</label>
              <input 
                type="text"
                className={cn(
                  "w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all dark:text-white font-serif text-lg",
                  errors.includes("name") && "border-2 border-red-500"
                )}
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Dior Sauvage Eau de Parfum"
              />
            </div>

            <div>
              <label className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">Categoria *</label>
              <select 
                className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all dark:text-white appearance-none uppercase text-xs font-bold tracking-widest"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as Category})}
              >
                <option value="perfumes">PERFUMES</option>
                <option value="joias">SEMI-JOIAS</option>
              </select>
            </div>

            <div>
              <label className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">Preço (R$) *</label>
              <input 
                type="number"
                min="0"
                step="0.01"
                className={cn(
                  "w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all dark:text-white",
                  errors.includes("price") && "border-2 border-red-500"
                )}
                value={formData.price}
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>

            <div className="lg:col-span-2">
              <label className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">Estoque *</label>
              <input 
                type="number"
                min="0"
                className={cn(
                  "w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all dark:text-white",
                  errors.includes("stock") && "border-2 border-red-500"
                )}
                value={formData.stock}
                onChange={e => setFormData({...formData, stock: Number(e.target.value)})}
              />
            </div>

            <div className="lg:col-span-2">
              <label className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">Descrição *</label>
              <textarea 
                rows={4}
                className={cn(
                  "w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all dark:text-white text-sm resize-none",
                  errors.includes("description") && "border-2 border-red-500"
                )}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Descrição do produto que aparecerá no showroom..."
              />
            </div>

            {/* Tags */}
            <div className="lg:col-span-2">
              <label className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">
                {formData.category === "perfumes" 
                  ? "Tags (Ex: Amadeirado, Intenso, Cítrico)" 
                  : "Tags (Ex: Elegante, Moderno, Clássico)"}
              </label>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                {formData.category === "perfumes" 
                  ? "Adicione características olfativas e de intensidade para os filtros" 
                  : "Adicione características de estilo para os filtros"}
              </p>
              <div className="flex gap-2 mb-3">
                <input 
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 dark:text-white text-sm"
                  placeholder={formData.category === "perfumes" 
                    ? "Ex: Amadeirado, Intenso..." 
                    : "Ex: Elegante, Minimalista..."}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags?.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs flex items-center gap-2 dark:text-white">
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
          <div className="bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-6">
            <h2 className="text-xl font-serif dark:text-white">Características do Perfume</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">Intensidade *</label>
                <select 
                  className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 dark:text-white text-sm"
                  value={formData.intensity}
                  onChange={e => setFormData({...formData, intensity: e.target.value as PerfumeIntensity})}
                >
                  <option value="Suave">Suave</option>
                  <option value="Moderada">Moderada</option>
                  <option value="Intensa">Intensa</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">Fixação *</label>
                <select 
                  className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 dark:text-white text-sm"
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
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">Concentração *</label>
                <input 
                  type="text"
                  className={cn(
                    "w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 dark:text-white text-sm",
                    errors.includes("concentration") && "border-2 border-red-500"
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
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 block">Notas de Topo</label>
                    <input 
                      type="text"
                      className={cn(
                        "w-full bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 dark:text-white text-sm",
                        errors.includes("notes-top") && "border-2 border-red-500"
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
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 block">Notas de Coração</label>
                    <input 
                      type="text"
                      className={cn(
                        "w-full bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 dark:text-white text-sm",
                        errors.includes("notes-heart") && "border-2 border-red-500"
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
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 block">Notas de Base</label>
                    <input 
                      type="text"
                      className={cn(
                        "w-full bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 dark:text-white text-sm",
                        errors.includes("notes-base") && "border-2 border-red-500"
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
            </div>
          </div>
        )}

        {/* Conditional Fields - Joias */}
        {formData.category === "joias" && (
          <div className="bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-6">
            <h2 className="text-xl font-serif dark:text-white">Características da Joia</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">Material *</label>
                <select 
                  className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 dark:text-white text-sm"
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
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">Acabamento *</label>
                <input 
                  type="text"
                  className={cn(
                    "w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 dark:text-white text-sm",
                    errors.includes("finish") && "border-2 border-red-500"
                  )}
                  value={formData.finish}
                  onChange={e => setFormData({...formData, finish: e.target.value})}
                  placeholder="Ex: Polido, Acetinado, Diamantado"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">Peso (gramas)</label>
                <input 
                  type="number"
                  min="0"
                  step="0.1"
                  className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 dark:text-white text-sm"
                  value={formData.weight}
                  onChange={e => setFormData({...formData, weight: Number(e.target.value)})}
                  placeholder="Ex: 15.5"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">Dimensões *</label>
                <input 
                  type="text"
                  className={cn(
                    "w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 dark:text-white text-sm",
                    errors.includes("dimensions") && "border-2 border-red-500"
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
            className="px-8 py-4 rounded-full border-2 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all text-center uppercase text-xs font-bold tracking-widest"
          >
            Cancelar
          </Link>
          <button 
            type="submit"
            className="bg-black dark:bg-white dark:text-black text-white px-12 py-4 rounded-full flex items-center justify-center space-x-3 hover:bg-amber-600 dark:hover:bg-amber-600 hover:text-white transition-all shadow-xl font-bold uppercase text-xs tracking-widest"
          >
            <Save size={18} />
            <span>Salvar Produto</span>
          </button>
        </div>
      </form>
    </div>
  );
}
