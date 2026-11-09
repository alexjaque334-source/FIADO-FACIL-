"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CheckCircle2, HandCoins, WalletCards } from "lucide-react";
import { useDemo } from "@/components/demo-provider";
import { DemoBanner, PageHeader } from "@/components/ui";
import { customerBalance, money, saleBalance } from "@/lib/finance/calculations";

export default function PaymentsPage() {
  const { customers, sales, payments, addPayment } = useDemo();
  const [customerId, setCustomerId] = useState("");
  useEffect(() => {
    setCustomerId(new URLSearchParams(window.location.search).get("cliente") ?? "");
  }, []);
  const [saleId, setSaleId] = useState("");
  const [amount, setAmount] = useState(0);
  const openSales = useMemo(() => sales.filter(s => s.customerId === customerId && saleBalance(s) > 0), [sales, customerId]);
  const limit = saleId ? saleBalance(sales.find(s => s.id === saleId)!) : customerBalance(customerId, sales);
  const customerName = (id: string) => customers.find(c => c.id === id)?.name ?? "Cliente";
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (addPayment({ customerId, saleId: saleId || undefined, amount, method: String(data.get("method")) as "Pix" | "Dinheiro" | "Cartão" | "Transferência", date: String(data.get("date")) })) setAmount(0);
  }
  return <>
    <PageHeader eyebrow="Entradas" title="Recebimentos" description="Registre pagamentos parciais ou quite uma dívida demonstrativa." />
    <DemoBanner />
    <section className="grid gap-5 xl:grid-cols-[1fr_1.05fr]">
      <form onSubmit={submit} className="panel p-5 sm:p-6"><div className="mb-6 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10"><HandCoins size={22} /></span><div><h2 className="font-bold">Registrar pagamento</h2><p className="text-xs text-slate-400">O valor será abatido da venda escolhida ou das mais antigas.</p></div></div><div className="space-y-4"><div><label className="label">Cliente</label><select className="field" value={customerId} onChange={e => { setCustomerId(e.target.value); setSaleId(""); setAmount(0); }} required><option value="">Selecione um cliente</option>{customers.filter(c => customerBalance(c.id, sales) > 0).map(c => <option key={c.id} value={c.id}>{c.name} — {money(customerBalance(c.id, sales))}</option>)}</select></div><div><label className="label">Dívida a receber</label><select className="field" value={saleId} onChange={e => { setSaleId(e.target.value); setAmount(0); }} disabled={!customerId}><option value="">Abater das dívidas mais antigas</option>{openSales.map(s => <option key={s.id} value={s.id}>{s.items[0].product} — saldo {money(saleBalance(s))}</option>)}</select></div><div className="grid gap-4 sm:grid-cols-2"><div><label className="label">Forma de pagamento</label><select name="method" className="field"><option>Pix</option><option>Dinheiro</option><option>Cartão</option><option>Transferência</option></select></div><div><label className="label">Data</label><input name="date" className="field" type="date" defaultValue="2026-11-09" required /></div></div><div><div className="flex justify-between"><label className="label">Valor recebido</label>{customerId && <button type="button" onClick={() => setAmount(limit)} className="text-[11px] font-bold text-brand-600">Quitar saldo total</button>}</div><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">R$</span><input className="field pl-12 text-xl font-bold" type="number" min="0.01" max={limit || undefined} step="0.01" value={amount || ""} onChange={e => setAmount(Number(e.target.value))} placeholder="0,00" required /></div>{customerId && <p className="mt-2 text-[11px] text-slate-400">Saldo disponível para abatimento: <strong>{money(limit)}</strong></p>}</div><div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[.03]"><div className="flex justify-between text-sm"><span className="text-slate-500">Saldo atual</span><strong>{money(limit)}</strong></div><div className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-sm dark:border-white/10"><span className="text-slate-500">Saldo após pagamento</span><strong className="text-brand-600">{money(Math.max(0, limit - amount))}</strong></div></div><button className="btn-primary w-full" disabled={!customerId || amount <= 0 || amount > limit}><CheckCircle2 size={17} />Confirmar pagamento demonstrativo</button></div></form>
      <div className="panel overflow-hidden"><div className="border-b border-slate-100 p-5 dark:border-white/10"><h2 className="font-bold">Histórico de pagamentos</h2><p className="mt-1 text-xs text-slate-400">Últimos recebimentos da demonstração.</p></div><div className="divide-y divide-slate-100 dark:divide-white/10">{payments.map(payment => <div key={payment.id} className="flex items-center gap-4 p-5"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10"><WalletCards size={19} /></span><div className="min-w-0 flex-1"><strong className="block truncate text-sm">{customerName(payment.customerId)}</strong><span className="text-[11px] text-slate-400">{payment.method} · {new Date(`${payment.date}T12:00:00`).toLocaleDateString("pt-BR")}</span></div><div className="text-right"><strong className="block text-sm text-brand-600">+ {money(payment.amount)}</strong><span className="text-[10px] text-slate-400">Confirmado</span></div></div>)}</div></div>
    </section>
  </>;
}
