import { addMonths, isBefore, parseISO } from "date-fns";
import type { Payment, Sale, SaleStatus } from "@/types";

export const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const saleBalance = (sale: Sale) => Math.max(0, sale.total - sale.paid);

export const saleStatus = (sale: Sale): SaleStatus => {
  if (sale.paid >= sale.total) return "quitada";
  if (sale.paid > 0) return "parcial";
  return "aberta";
};

export const customerBalance = (customerId: string, sales: Sale[]) =>
  sales.filter((sale) => sale.customerId === customerId).reduce((sum, sale) => sum + saleBalance(sale), 0);

export const totalReceivable = (sales: Sale[]) => sales.reduce((sum, sale) => sum + saleBalance(sale), 0);

export const receivedThisMonth = (payments: Payment[], reference = new Date()) =>
  payments
    .filter((payment) => {
      const date = parseISO(payment.date);
      return date.getMonth() === reference.getMonth() && date.getFullYear() === reference.getFullYear();
    })
    .reduce((sum, payment) => sum + payment.amount, 0);

export const expiryDate = (sale: Sale) => (sale.paidAt ? addMonths(parseISO(sale.paidAt), 6) : null);

export const isOverdue = (sale: Sale, today = new Date()) => saleStatus(sale) !== "quitada" && isBefore(parseISO(sale.dueDate), today);
