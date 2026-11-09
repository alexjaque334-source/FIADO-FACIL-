import { AlertTriangle, ArrowDownRight, ArrowUpRight } from "lucide-react";

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div>{eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-[.16em] text-brand-600">{eyebrow}</p>}<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1><p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{description}</p></div>{action}</div>;
}

export function DemoBanner() {
  return <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={17} /><p className="text-xs leading-relaxed"><strong>Modo demonstrativo.</strong> Use somente informações fictícias. Nenhum dado é salvo permanentemente ou protegido por backup.</p></div>;
}

export function StatCard({ label, value, change, icon, tone = "green", detail }: { label: string; value: string; change?: string; icon: React.ReactNode; tone?: "green" | "blue" | "amber" | "violet"; detail?: string }) {
  const colors = { green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10", blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10", amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10", violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/10" };
  return <div className="animate-fade-up rounded-2xl border border-slate-200/70 bg-white p-5 shadow-card dark:border-white/10 dark:bg-white/[.04]"><div className="flex items-start justify-between"><div className={`grid size-11 place-items-center rounded-xl ${colors[tone]}`}>{icon}</div>{change && <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${change.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>{change.startsWith("+") ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{change}</span>}</div><p className="mt-5 text-xs font-semibold text-slate-400">{label}</p><p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>{detail && <p className="mt-1 text-[11px] text-slate-400">{detail}</p>}</div>;
}

export function StatusBadge({ status }: { status: "aberta" | "parcial" | "quitada" | "vencida" }) {
  const style = { aberta: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300", parcial: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300", quitada: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300", vencida: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300" };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${style[status]}`}>{status}</span>;
}
