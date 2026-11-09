"use client";

import Link from "next/link";
import { ArrowRight, Banknote, CalendarClock, CircleDollarSign, Plus, ReceiptText, UserPlus, Users, WalletCards } from "lucide-react";
import { DemoBanner, PageHeader, StatCard, StatusBadge } from "@/components/ui";
import { useDemo } from "@/components/demo-provider";
import { customerBalance, money, receivedThisMonth, saleStatus, totalReceivable } from "@/lib/finance/calculations";

const chart = [38, 49, 43, 58, 52, 70, 64, 82, 72, 92, 78, 100];

export default function DashboardPage() {
  const { customers, sales, payments } = useDemo();
  const debtors = customers.filter((customer) => customerBalance(customer.id, sales) > 0).length;
  const customerName = (id: string) => customers.find((customer) => customer.id === id)?.name ?? "Cliente";
  return <>
    <PageHeader eyebrow="Segunda-feira, 9 de novembro" title="Olá, Loja Oliveira 👋" description="Acompanhe o desempenho das suas vendas a prazo." action={<div className="flex gap-2"><Link href="/clientes" className="btn-secondary"><UserPlus size={17} />Novo cliente</Link><Link href="/vendas" className="btn-primary"><Plus size={17} />Nova venda</Link></div>} />
    <DemoBanner />
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total a receber" value={money(totalReceivable(sales))} change="+8,2%" detail="em 4 contas abertas" icon={<CircleDollarSign size={22} />} />
      <StatCard label="Recebido no mês" value={money(receivedThisMonth(payments, new Date("2026-11-09")))} change="+12,5%" detail="comparado ao mês anterior" icon={<Banknote size={22} />} tone="blue" />
      <StatCard label="Clientes cadastrados" value={String(customers.length)} change="+2 este mês" detail="base demonstrativa" icon={<Users size={22} />} tone="violet" />
      <StatCard label="Clientes com dívida" value={String(debtors)} detail={`${Math.round((debtors / customers.length) * 100)}% da sua base ativa`} icon={<CalendarClock size={22} />} tone="amber" />
    </section>
    <section className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
      <div className="panel p-5 sm:p-6">
        <div className="mb-7 flex items-start justify-between"><div><h2 className="font-bold">Fluxo financeiro</h2><p className="mt-1 text-xs text-slate-400">Recebimentos nos últimos 12 meses</p></div><select className="rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-xs dark:border-white/10"><option>Últimos 12 meses</option></select></div>
        <div className="flex h-52 items-end gap-2 sm:gap-4">
          {chart.map((value, index) => <div key={index} className="group flex h-full flex-1 items-end"><div className="relative w-full rounded-t-lg bg-emerald-100 transition-all duration-500 hover:bg-brand-500 dark:bg-emerald-500/15" style={{ height: `${value}%` }}><span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-[9px] text-white group-hover:block">{money(value * 11)}</span></div></div>)}
        </div>
        <div className="mt-3 grid grid-cols-12 gap-2 text-center text-[9px] uppercase text-slate-400">{["Dez","Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov"].map(m => <span key={m}>{m}</span>)}</div>
      </div>
      <div className="panel p-5 sm:p-6"><div className="mb-5 flex items-center justify-between"><div><h2 className="font-bold">Ações rápidas</h2><p className="mt-1 text-xs text-slate-400">Atalhos mais usados</p></div></div><div className="grid grid-cols-2 gap-3">
        {[{ href: "/vendas", icon: ReceiptText, label: "Nova venda", sub: "Registrar compra", color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10" }, { href: "/pagamentos", icon: WalletCards, label: "Receber", sub: "Lançar pagamento", color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10" }, { href: "/clientes", icon: UserPlus, label: "Novo cliente", sub: "Adicionar cadastro", color: "bg-violet-50 text-violet-600 dark:bg-violet-500/10" }, { href: "/clientes", icon: Users, label: "Ver clientes", sub: "Consultar saldos", color: "bg-amber-50 text-amber-600 dark:bg-amber-500/10" }].map(item => <Link key={item.label} href={item.href} className="rounded-2xl border border-slate-100 p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10"><span className={`mb-4 grid size-10 place-items-center rounded-xl ${item.color}`}><item.icon size={19} /></span><strong className="block text-sm">{item.label}</strong><small className="text-[10px] text-slate-400">{item.sub}</small></Link>)}
      </div></div>
    </section>
    <section className="mt-5 grid gap-5 xl:grid-cols-2">
      <div className="panel overflow-hidden"><div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-white/10"><div><h2 className="font-bold">Vendas recentes</h2><p className="mt-1 text-xs text-slate-400">Últimas movimentações registradas</p></div><Link href="/vendas" className="flex items-center gap-1 text-xs font-bold text-brand-600">Ver todas <ArrowRight size={14} /></Link></div><div className="divide-y divide-slate-100 dark:divide-white/10">{sales.slice(0,4).map(sale => <div key={sale.id} className="flex items-center gap-3 px-5 py-4"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-xs font-bold dark:bg-white/5">{customerName(sale.customerId).split(" ").map(n => n[0]).slice(0,2).join("")}</span><div className="min-w-0 flex-1"><strong className="block truncate text-sm">{customerName(sale.customerId)}</strong><span className="text-[11px] text-slate-400">{sale.items[0].product} · {new Date(`${sale.date}T12:00:00`).toLocaleDateString("pt-BR")}</span></div><div className="text-right"><strong className="block text-sm">{money(sale.total)}</strong><StatusBadge status={saleStatus(sale)} /></div></div>)}</div></div>
      <div className="panel overflow-hidden"><div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-white/10"><div><h2 className="font-bold">Pagamentos recentes</h2><p className="mt-1 text-xs text-slate-400">Valores recebidos por você</p></div><Link href="/pagamentos" className="flex items-center gap-1 text-xs font-bold text-brand-600">Ver todos <ArrowRight size={14} /></Link></div><div className="divide-y divide-slate-100 dark:divide-white/10">{payments.slice(0,4).map(payment => <div key={payment.id} className="flex items-center gap-3 px-5 py-4"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10"><WalletCards size={18} /></span><div className="min-w-0 flex-1"><strong className="block truncate text-sm">{customerName(payment.customerId)}</strong><span className="text-[11px] text-slate-400">{payment.method} · {new Date(`${payment.date}T12:00:00`).toLocaleDateString("pt-BR")}</span></div><strong className="text-sm text-brand-600">+ {money(payment.amount)}</strong></div>)}</div></div>
    </section>
  </>;
}
