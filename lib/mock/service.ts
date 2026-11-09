import type { Customer, DemoState, Payment, Sale, SaleItem } from "@/types";
import { saleBalance } from "@/lib/finance/calculations";

const id = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const demoService = {
  addCustomer(state: DemoState, input: Omit<Customer, "id" | "createdAt">): DemoState {
    return { ...state, customers: [{ ...input, id: id("cli"), createdAt: new Date().toISOString().slice(0, 10) }, ...state.customers] };
  },

  addSale(state: DemoState, input: { customerId: string; items: Omit<SaleItem, "id">[]; date: string; dueDate: string }): DemoState {
    const items = input.items.map((item) => ({ ...item, id: id("item") }));
    const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const sale: Sale = { ...input, items, total, paid: 0, id: id("ven") };
    return { ...state, sales: [sale, ...state.sales] };
  },

  addPayment(state: DemoState, input: Omit<Payment, "id">): DemoState {
    let remaining = input.amount;
    const eligible = state.sales
      .filter((sale) => sale.customerId === input.customerId && (!input.saleId || sale.id === input.saleId) && saleBalance(sale) > 0)
      .sort((a, b) => a.date.localeCompare(b.date));
    if (remaining <= 0 || remaining > eligible.reduce((sum, sale) => sum + saleBalance(sale), 0)) throw new Error("O pagamento deve ser maior que zero e não pode superar o saldo devedor.");
    const now = input.date;
    const sales = state.sales.map((sale) => {
      const target = eligible.find((item) => item.id === sale.id);
      if (!target || remaining <= 0) return sale;
      const allocated = Math.min(remaining, saleBalance(sale));
      remaining -= allocated;
      const paid = sale.paid + allocated;
      return { ...sale, paid, paidAt: paid >= sale.total ? now : sale.paidAt };
    });
    return { ...state, sales, payments: [{ ...input, id: id("pag") }, ...state.payments] };
  },
};
