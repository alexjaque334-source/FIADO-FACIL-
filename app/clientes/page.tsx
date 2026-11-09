"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { ChevronRight, Plus, Search, UserRound, Users, X } from "lucide-react";
import { useDemo } from "@/components/demo-provider";
import { DemoBanner, PageHeader } from "@/components/ui";
import { customerBalance, money } from "@/lib/finance/calculations";

export default function CustomersPage() {
  const { customers, sales, addCustomer } = useDemo();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const list = useMemo(() => customers.filter(c => `${c.name} ${c.phone} ${c.cpf}`.toLowerCase().includes(query.toLowerCase())), [customers, query]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addCustomer({ name: String(data.get("name")), phone: String(data.get("phone")), cpf: "***.***.***-00", address: String(data.get("address") || "") });
    setOpen(false);
  }
  return <>
    <PageHeader eyebrow="Relacionamento" title="Clientes" description="Acompanhe seus clientes e os saldos em aberto." action={<Dialog.Root open={open} onOpenChange={setOpen}><Dialog.Trigger asChild><button className="btn-primary"><Plus size={17} />Adicionar cliente</button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" /><Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#14231d]"><div className="mb-6 flex items-start justify-between"><div><Dialog.Title className="text-xl font-bold">Novo cliente</Dialog.Title><Dialog.Description className="mt-1 text-sm text-slate-400">Use somente dados fictícios nesta demonstração.</Dialog.Description></div><Dialog.Close className="grid size-9 place-items-center rounded-full bg-slate-100 dark:bg-white/5"><X size={17} /></Dialog.Close></div><form onSubmit={submit} className="space-y-4"><div><label className="label">Nome completo</label><input name="name" className="field" placeholder="Ex.: Ana Souza (fictício)" required /></div><div className="grid gap-4 sm:grid-cols-2"><div><label className="label">Telefone fictício</label><input name="phone" className="field" placeholder="(00) 00000-0000" required /></div><div><label className="label">CPF</label><input name="cpf" className="field" value="Não coletado na demo" disabled /></div></div><div><label className="label">Endereço opcional</label><input name="address" className="field" placeholder="Bairro e cidade fictícios" /></div><button className="btn-primary w-full" type="submit">Adicionar cliente demonstrativo</button></form></Dialog.Content></Dialog.Portal></Dialog.Root>} />
    <DemoBanner />
    <div className="panel mb-5 flex flex-col gap-3 p-4 sm:flex-row sm:items-center"><div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3 dark:border-white/10"><Search size={17} className="text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} className="w-full bg-transparent py-3 text-sm" placeholder="Buscar por nome, telefone ou CPF mascarado..." /></div><select className="field sm:w-48"><option>Todos os clientes</option><option>Com dívida</option><option>Sem dívida</option></select></div>
    <div className="panel overflow-hidden"><div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_30px] gap-4 border-b border-slate-100 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-white/10 md:grid"><span>Cliente</span><span>Contato</span><span>Cadastro</span><span>Saldo devedor</span><span /></div><div className="divide-y divide-slate-100 dark:divide-white/10">{list.map(customer => { const balance = customerBalance(customer.id, sales); return <Link href={`/clientes/${customer.id}`} key={customer.id} className="grid gap-3 px-5 py-4 transition hover:bg-slate-50 dark:hover:bg-white/[.02] md:grid-cols-[1.5fr_1fr_1fr_1fr_30px] md:items-center md:gap-4"><div className="flex items-center gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-700 dark:bg-brand-500/10">{customer.name.split(" ").map(n => n[0]).slice(0,2).join("")}</span><span><strong className="block text-sm">{customer.name}</strong><small className="text-[11px] text-slate-400">{customer.cpf}</small></span></div><span className="text-xs text-slate-500">{customer.phone}</span><span className="text-xs text-slate-500">{new Date(`${customer.createdAt}T12:00:00`).toLocaleDateString("pt-BR")}</span><span><strong className={balance > 0 ? "text-sm text-slate-900 dark:text-white" : "text-sm text-emerald-600"}>{money(balance)}</strong><small className="block text-[10px] text-slate-400">{balance > 0 ? "em aberto" : "sem pendências"}</small></span><ChevronRight size={17} className="hidden text-slate-300 md:block" /></Link>; })}</div>{list.length === 0 && <div className="grid place-items-center p-12 text-center"><span className="mb-3 grid size-14 place-items-center rounded-full bg-slate-100 text-slate-400 dark:bg-white/5"><Users /></span><strong>Nenhum cliente encontrado</strong><p className="mt-1 text-xs text-slate-400">Tente ajustar os termos da busca.</p></div>}</div>
  </>;
}
