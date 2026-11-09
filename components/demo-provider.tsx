"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { toast } from "sonner";
import { seedData } from "@/lib/mock/seed";
import { demoService } from "@/lib/mock/service";
import type { Customer, DemoState, Payment, SaleItem } from "@/types";

interface DemoContextValue extends DemoState {
  addCustomer: (input: Omit<Customer, "id" | "createdAt">) => void;
  addSale: (input: { customerId: string; items: Omit<SaleItem, "id">[]; date: string; dueDate: string }) => void;
  addPayment: (input: Omit<Payment, "id">) => boolean;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(seedData);
  const value = useMemo<DemoContextValue>(() => ({
    ...state,
    addCustomer(input) {
      setState((current) => demoService.addCustomer(current, input));
      toast.success("Cliente adicionado ao ambiente demonstrativo");
    },
    addSale(input) {
      setState((current) => demoService.addSale(current, input));
      toast.success("Venda demonstrativa registrada");
    },
    addPayment(input) {
      try {
        setState((current) => demoService.addPayment(current, input));
        toast.success("Pagamento demonstrativo registrado");
        return true;
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Não foi possível registrar o pagamento");
        return false;
      }
    },
  }), [state]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo deve ser usado dentro de DemoProvider");
  return context;
};
