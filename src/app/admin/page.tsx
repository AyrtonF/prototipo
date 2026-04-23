"use client";

import { useProductStore } from "@/store/productStore";
import { formatCurrency } from "@/lib/utils";
import { Plus, Edit2, Trash2, Package, Search, Filter, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function AdminPage() {
  const { products, deleteProduct } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [filterStock, setFilterStock] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = filterCat === "all" || p.category === filterCat;
      const matchStock = !filterStock || p.stock < 5;
      return matchSearch && matchCat && matchStock;
    });
  }, [products, searchTerm, filterCat, filterStock]);

  return (
    <div className="min-h-screen bg-[#fbf6f1] px-6 pb-20 pt-32 text-[#1c1418]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="mb-2 font-serif text-4xl text-[#1c1418]">Gestão de Inventário</h1>
          <p className="text-sm uppercase tracking-widest text-[#8b7c72]">Showroom v2.0</p>
        </div>
        <Link 
          href="/admin/produtos/novo"
          className="group flex items-center space-x-3 rounded-full bg-copper px-8 py-4 text-white shadow-[0_18px_40px_rgba(190,108,53,0.2)] transition-colors hover:bg-[#c97941]"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" />
          <span className="uppercase text-[10px] tracking-widest font-bold">Cadastrar Novo Item</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="relative md:col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar por nome do produto..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-[#e3d8cf] bg-white py-4 pl-12 pr-4 text-[#1c1418] outline-none transition-colors focus:border-copper"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <select 
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-[#e3d8cf] bg-white py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-widest text-[#1c1418] outline-none transition-colors focus:border-copper"
          >
            <option value="all">Todas Categorias</option>
            <option value="perfumes">Perfumes</option>
            <option value="joias">Semi-Joias</option>
          </select>
        </div>
        <button 
          onClick={() => setFilterStock(!filterStock)}
          className={`flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl border transition-all uppercase text-[10px] tracking-widest font-bold ${
            filterStock 
              ? 'border-copper bg-copper text-white' 
              : 'border-[#e3d8cf] bg-white text-[#8b7c72]'
          }`}
        >
          <AlertTriangle size={16} />
          <span>Estoque Baixo</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-[#eadfd4] bg-white shadow-[0_20px_50px_rgba(48,20,31,0.05)]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#eadfd4] bg-[#fcf8f4] text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b7c72]">
              <th className="p-6">Item</th>
              <th className="p-6">Categoria</th>
              <th className="p-6">Preço</th>
              <th className="p-6 text-center">Estoque</th>
              <th className="p-6 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1e8e0]">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="group transition-colors hover:bg-[#fdf9f6]">
                <td className="p-6">
                  <div className="flex items-center space-x-4">
                    <img src={product.images[0]} className="h-16 w-12 rounded-lg bg-[#f2ece5] object-cover" />
                    <span className="font-serif text-lg text-[#1c1418]">{product.name}</span>
                  </div>
                </td>
                <td className="p-6 text-xs uppercase tracking-widest text-[#8b7c72]">{product.category}</td>
                <td className="p-6 font-medium text-[#1c1418]">{formatCurrency(product.price)}</td>
                <td className="p-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold ${
                    product.stock < 5 
                      ? 'bg-[#8a4f2a] text-white animate-pulse' 
                      : 'bg-[#f2ece5] text-[#7b665d]'
                  }`}>
                    {product.stock} un
                  </span>
                </td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link href={`/admin/produtos/editar/${product.id}`} className="p-2 text-[#8b7c72] transition-colors hover:text-copper">
                      <Edit2 size={18} />
                    </Link>
                    <button onClick={() => confirm('Excluir este item?') && deleteProduct(product.id)} className="p-2 text-[#8b7c72] transition-colors hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
