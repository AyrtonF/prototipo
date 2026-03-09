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
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-serif dark:text-white mb-2">Gestão de Inventário</h1>
          <p className="text-zinc-500 text-sm tracking-widest uppercase">Showroom v2.0</p>
        </div>
        <Link 
          href="/admin/produtos/novo"
          className="bg-gold text-white px-8 py-4 rounded-full flex items-center space-x-3 hover:bg-black transition-all shadow-xl shadow-gold/20 group"
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
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 outline-none focus:border-gold transition-colors dark:text-white"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <select 
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 outline-none focus:border-gold transition-colors dark:text-white appearance-none text-sm uppercase tracking-widest font-bold"
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
              ? 'bg-zinc-800 border-zinc-800 text-white dark:bg-white dark:border-white dark:text-black' 
              : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400'
          }`}
        >
          <AlertTriangle size={16} />
          <span>Estoque Baixo</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-800">
              <th className="p-6">Item</th>
              <th className="p-6">Categoria</th>
              <th className="p-6">Preço</th>
              <th className="p-6 text-center">Estoque</th>
              <th className="p-6 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                <td className="p-6">
                  <div className="flex items-center space-x-4">
                    <img src={product.images[0]} className="w-12 h-16 rounded-lg object-cover bg-zinc-100" />
                    <span className="font-serif text-lg dark:text-white">{product.name}</span>
                  </div>
                </td>
                <td className="p-6 text-xs uppercase tracking-widest text-zinc-400">{product.category}</td>
                <td className="p-6 font-medium dark:text-zinc-200">{formatCurrency(product.price)}</td>
                <td className="p-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold ${
                    product.stock < 5 
                      ? 'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900 animate-pulse' 
                      : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}>
                    {product.stock} un
                  </span>
                </td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link href={`/admin/produtos/editar/${product.id}`} className="p-2 text-zinc-400 hover:text-gold transition-colors">
                      <Edit2 size={18} />
                    </Link>
                    <button onClick={() => confirm('Excluir este item?') && deleteProduct(product.id)} className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
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
