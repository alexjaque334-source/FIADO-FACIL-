"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock3, MapPin, Phone, ReceiptText, WalletCards } from "lucide-react";
import { useDemo } from "@/components/demo-provider";
import { PageHeader, StatusBadge } from "@/components/ui";
import { customerBalance, expiryDate, money, saleBalance, saleStatus } from "@/lib/finance/calculations";

export default function CustomerProfilePage() {
  const params = useParams<{ id: string }>();
  const { customers, sales, payments } = useDemo();
  const customer = customers.find(c => c.id === params.id);
  if (!customer) return <div className="panel p-10 text-center"><h1 className="text-xl font-bold">Cliente não encontrado</h1><Link href="/clientes" className="btn-primary mt-5">Voltar</Link></div>;
  const customerSales = sales.filter(s => s.customerId === customer.id);
  const customerPayments = payments.filter(p => p.customerId === customer.id);
  return <>
    <Link href="/clientes" className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-600"><ArrowLeft size={15} />Voltar para clientes</Link>
    <PageHeader title={customer.name} description="Perfil financeiro demonstrativo do cliente." action={<div className="flex gap-2"><Link href={`/pagamentos?cliente=${customer.id}`} className="btn-secondary"><WalletCards size={17} />Receber</Link><Link href={`/vendas?cliente=${customer.id}`} className="btn-primary"><ReceiptText size={17} />Nova venda</Link></div>} />
    <section className="grid gap-5 lg:grid-cols-[320px_1fr]">
      <div className="space-y-5"><div className="panel p-6"><span className="grid size-16 place-items-center rounded-2xl bg-brand-50 text-xl font-bold text-brand-700 dark:bg-brand-500/10">{customer.name.split(" ").map(n => n[0]).slice(0,2).join("")}</span><h2 className="mt-4 font-bold">Informações do cliente</h2><div className="mt-5 space-y-4 text-sm text-slate-500"><p className="flex gap-3"><Phone size={17} className="text-slate-400" />{customer.phone}</p><p className="flex gap-3"><MapPin size={17} className="text-slate-400" />{customer.address || "Endereço não informado"}</p><p className="flex gap-3"><Calendar size={17} className="text-slate-400" />Cliente desde {new Date(`${customer.createdAt}T12:00:00`).toLocaleDateString("pt-BR")}</p></div></div><div className="rounded-2xl bg-[#14231d] p-6 text-white"><p className="text-xs font-semibold text-white/50">Saldo devedor atual</p><p className="mt-2 text-3xl font-bold">{money(customerBalance(customer.id, sales))}</p><p className="mt-4 text-[11px] text-white/50">Calculado com base nas vendas demonstrativas.</p></div></div>
      <div className="space-y-5"><div className="panel overflow-hidden"><div className="border-b border-slate-100 p-5 dark:border-white/10"><h2 className="font-bold">Compras e dívidas</h2><p className="mt-1 text-xs text-slate-400">Acompanhe os itens e o andamento dos pagamentos.</p></div><div className="divide-y divide-slate-100 dark:divide-white/10">{customerSales.map(sale => { const exp = expiryDate(sale); return <div key={sale.id} className="p-5"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><strong className="text-sm">{sale.items.map(i => i.product).join(", ")}</strong><p className="mt-1 text-[11px] text-slate-400">Venda em {new Date(`${sale.date}T12:00:00`).toLocaleDateString("pt-BR")} · Vence em {new Date(`${sale.dueDate}T12:00:00`).toLocaleDateString("pt-BR")}</p></div><div className="text-left sm:text-right"><strong className="block">{money(sale.total)}</strong><StatusBadge status={saleStatus(sale)} /></div></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5"><div className="h-full rounded-full bg-brand-500" style={{ width: `${Math.min(100, (sale.paid / sale.total) * 100)}%` }} /></div><div className="mt-2 flex justify-between text-[10px] text-slate-400"><span>Pago: {money(sale.paid)}</span><span>Restante: {money(saleBalance(sale))}</span></div>{sale.paidAt && <div className="mt-4 flex gap-2 rounded-xl bg-emerald-50 p-3 text-[11px] text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200"><Clock3 size={15} className="shrink-0" /><span>Quitada em {new Date(`${sale.paidAt}T12:00:00`).toLocaleDateString("pt-BR")}. Histórico elegível para expiração em {exp?.toLocaleDateString("pt-BR")} — regra apenas demonstrativa.</span></div>}</div>; })}</div></div>
        <div className="panel overflow-hidden"><div className="border-b border-slate-100 p-5 dark:border-white/10"><h2 className="font-bold">Histórico de pagamentos</h2></div>{customerPayments.length ? <div className="divide-y divide-slate-100 dark:divide-white/10">{customerPayments.map(payment => <div key={payment.id} className="flex items-center justify-between p-5"><div><strong className="block text-sm">Pagamento via {payment.method}</strong><span className="text-[11px] text-slate-400">{new Date(`${payment.date}T12:00:00`).toLocaleDateString("pt-BR")}</span></div><strong className="text-brand-600">+ {money(payment.amount)}</strong></div>)}</div> : <p className="p-8 text-center text-sm text-slate-400">Nenhum pagamento registrado.</p>}</div>
      </div>
    </section>
  </>;
}
