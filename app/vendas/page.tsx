"use client";

import { FormEvent, useEffect, useState } from "react";
import { PackagePlus, Plus, ReceiptText, Trash2 } from "lucide-react";
import { useDemo } from "@/components/demo-provider";
import { DemoBanner, PageHeader, StatusBadge } from "@/components/ui";
import { money, saleStatus } from "@/lib/finance/calculations";

interface DraftItem { key: number; product: string; quantity: number; unitPrice: number }

export default function SalesPage() {
  const { customers, sales, addSale } = useDemo();
  const [items, setItems] = useState<DraftItem[]>([{ key: 1, product: "", quantity: 1, unitPrice: 0 }]);
  const [customerId, setCustomerId] = useState("");
  useEffect(() => {
    setCustomerId(new URLSearchParams(window.location.search).get("cliente") ?? "");
  }, []);
  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const customerName = (id: string) => customers.find(c => c.id === id)?.name ?? "Cliente";
  function update(key: number, patch: Partial<DraftItem>) { setItems(current => current.map(item => item.key === key ? { ...item, ...patch } : item)); }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!customerId || items.some(i => !i.product || i.unitPrice <= 0)) return;
    const data = new FormData(event.currentTarget);
    addSale({ customerId, items: items.map(({ product, quantity, unitPrice }) => ({ product, quantity, unitPrice })), date: String(data.get("date")), dueDate: String(data.get("dueDate")) });
    setItems([{ key: Date.now(), product: "", quantity: 1, unitPrice: 0 }]);
  }
  return <>
    <PageHeader eyebrow="Controle financeiro" title="Vendas a prazo" description="Registre uma nova compra e acompanhe as vendas anteriores." />
    <DemoBanner />
    <section className="grid gap-5 xl:grid-cols-[1fr_410px]">
      <form onSubmit={submit} className="panel p-5 sm:p-6"><div className="mb-6 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10"><PackagePlus size={21} /></span><div><h2 className="font-bold">Registrar nova venda</h2><p className="text-xs text-slate-400">Preencha os dados fictícios da compra.</p></div></div><div className="grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><label className="label">Cliente</label><select className="field" value={customerId} onChange={e => setCustomerId(e.target.value)} required><option value="">Selecione um cliente</option>{customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div><div><label className="label">Data da venda</label><input name="date" className="field" type="date" defaultValue="2026-11-09" required /></div><div><label className="label">Vencimento</label><input name="dueDate" className="field" type="date" defaultValue="2026-12-09" required /></div></div><div className="my-6 border-t border-slate-100 dark:border-white/10" /><div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-bold">Itens da venda</h3><button type="button" onClick={() => setItems([...items, { key: Date.now(), product: "", quantity: 1, unitPrice: 0 }])} className="flex items-center gap-1 text-xs font-bold text-brand-600"><Plus size={14} />Adicionar item</button></div><div className="space-y-3">{items.map((item, index) => <div key={item.key} className="grid gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-white/[.03] sm:grid-cols-[1fr_100px_130px_40px]"><div><label className="label">Produto {index + 1}</label><input className="field" value={item.product} onChange={e => update(item.key, { product: e.target.value })} placeholder="Nome do produto" required /></div><div><label className="label">Qtd.</label><input className="field" type="number" min="1" value={item.quantity} onChange={e => update(item.key, { quantity: Number(e.target.value) })} required /></div><div><label className="label">Preço unitário</label><input className="field" type="number" min="0.01" step="0.01" value={item.unitPrice || ""} onChange={e => update(item.key, { unitPrice: Number(e.target.value) })} placeholder="0,00" required /></div><button type="button" disabled={items.length === 1} onClick={() => setItems(items.filter(i => i.key !== item.key))} className="mt-auto grid size-10 place-items-center rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-30"><Trash2 size={17} /></button></div>)}</div><div className="mt-6 flex flex-col items-end border-t border-slate-100 pt-5 dark:border-white/10"><span className="text-xs text-slate-400">Valor total da venda</span><strong className="mt-1 text-3xl">{money(total)}</strong><button className="btn-primary mt-5 w-full sm:w-auto" disabled={total <= 0 || !customerId}><ReceiptText size={17} />Registrar venda demonstrativa</button></div></form>
      <aside className="space-y-5"><div className="rounded-2xl bg-[#14231d] p-6 text-white"><p className="text-xs font-semibold text-white/50">Resumo da venda</p><div className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><span className="text-white/60">Cliente</span><strong>{customerId ? customerName(customerId) : "Não selecionado"}</strong></div><div className="flex justify-between"><span className="text-white/60">Quantidade de itens</span><strong>{items.reduce((sum,i) => sum + i.quantity, 0)}</strong></div><div className="flex justify-between border-t border-white/10 pt-3"><span>Total</span><strong className="text-xl text-emerald-300">{money(total)}</strong></div></div></div><div className="panel overflow-hidden"><div className="border-b border-slate-100 p-5 dark:border-white/10"><h2 className="font-bold">Vendas recentes</h2></div>{sales.slice(0,5).map(sale => <div key={sale.id} className="flex items-center justify-between border-b border-slate-100 p-4 last:border-0 dark:border-white/10"><div><strong className="block text-xs">{customerName(sale.customerId)}</strong><span className="text-[10px] text-slate-400">{sale.items[0].product}</span></div><div className="text-right"><strong className="block text-xs">{money(sale.total)}</strong><StatusBadge status={saleStatus(sale)} /></div></div>)}</div></aside>
    </section>
  </>;
}
