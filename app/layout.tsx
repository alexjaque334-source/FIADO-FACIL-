import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DemoProvider } from "@/components/demo-provider";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: { default: "Fiado Fácil", template: "%s | Fiado Fácil" },
  description: "Plataforma demonstrativa para controle de vendas a prazo.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Fiado Fácil", statusBarStyle: "default" },
};

export const viewport: Viewport = { themeColor: "#168451", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" suppressHydrationWarning><body><DemoProvider><AppShell>{children}</AppShell></DemoProvider><script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}))}` }} /></body></html>;
}
