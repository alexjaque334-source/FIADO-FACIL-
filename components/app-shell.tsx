"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart3, Bell, CircleDollarSign, Menu, Moon, Plus, ReceiptText, Search, Settings, Sun, Users, WalletCards, X } from "lucide-react";
import { Toaster } from "sonner";

const nav = [
  { href: "/dashboard", label: "Visão geral", icon: BarChart3 },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/vendas", label: "Vendas", icon: ReceiptText },
  { href: "/pagamentos", label: "Recebimentos", icon: WalletCards },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobile, setMobile] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-[#f4f6f3] text-slate-900 transition-colors dark:bg-[#0d1512] dark:text-slate-100">
      <aside className={`fixed inset-y-0 left-0 z-50 w-[264px] border-r border-slate-200/70 bg-white p-5 transition-transform dark:border-white/10 dark:bg-[#101b17] lg:translate-x-0 ${mobile ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/20"><CircleDollarSign size={23} /></span>
            <span><strong className="block text-lg leading-5 tracking-tight">Fiado Fácil</strong><small className="text-xs text-slate-400">gestão descomplicada</small></span>
          </Link>
          <button className="lg:hidden" onClick={() => setMobile(false)} aria-label="Fechar menu"><X /></button>
        </div>
        <nav className="mt-10 space-y-1.5">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Menu principal</p>
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return <Link key={item.href} href={item.href} onClick={() => setMobile(false)} className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${active ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"}`}><Icon size={19} />{item.label}</Link>;
          })}
        </nav>
        <div className="absolute inset-x-5 bottom-5">
          <Link href="/configuracoes" className="mb-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5"><Settings size={19} />Configurações</Link>
          <div className="rounded-2xl bg-[#14231d] p-4 text-white">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold"><span className="size-2 rounded-full bg-amber-400" />Ambiente demonstrativo</div>
            <p className="text-[11px] leading-relaxed text-white/60">Os dados não são salvos e somem ao atualizar a página.</p>
          </div>
        </div>
      </aside>
      {mobile && <button className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobile(false)} aria-label="Fechar menu" />}
      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200/70 bg-[#f4f6f3]/90 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#0d1512]/90 sm:px-7">
          <button onClick={() => setMobile(true)} className="grid size-10 place-items-center rounded-xl bg-white shadow-sm dark:bg-white/5 lg:hidden" aria-label="Abrir menu"><Menu size={20} /></button>
          <div className="hidden w-full max-w-sm items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-400 shadow-sm dark:border-white/10 dark:bg-white/5 sm:flex"><Search size={17} /><span className="text-sm">Busca rápida...</span><kbd className="ml-auto rounded border px-1.5 py-0.5 text-[10px]">⌘ K</kbd></div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/vendas" className="hidden items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-600/15 transition hover:bg-brand-700 sm:flex"><Plus size={17} />Nova venda</Link>
            <button onClick={() => setDark(!dark)} className="grid size-10 place-items-center rounded-xl bg-white text-slate-500 shadow-sm dark:bg-white/5 dark:text-slate-300" aria-label="Alternar tema">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button className="relative grid size-10 place-items-center rounded-xl bg-white text-slate-500 shadow-sm dark:bg-white/5"><Bell size={18} /><span className="absolute right-2 top-2 size-2 rounded-full bg-red-500 ring-2 ring-white" /></button>
            <div className="ml-1 hidden items-center gap-2 border-l border-slate-200 pl-3 dark:border-white/10 sm:flex"><span className="grid size-9 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">LO</span><span className="text-sm"><strong className="block text-xs">Loja Oliveira</strong><small className="text-[10px] text-slate-400">Conta demo</small></span></div>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 sm:p-7 lg:p-8">{children}</main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
