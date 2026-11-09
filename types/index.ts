export type SaleStatus = "aberta" | "parcial" | "quitada";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  address?: string;
  createdAt: string;
}

export interface SaleItem {
  id: string;
  product: string;
  quantity: number;
  unitPrice: number;
}

export interface Sale {
  id: string;
  customerId: string;
  items: SaleItem[];
  total: number;
  paid: number;
  date: string;
  dueDate: string;
  paidAt?: string;
}

export interface Payment {
  id: string;
  customerId: string;
  saleId?: string;
  amount: number;
  method: "Pix" | "Dinheiro" | "Cartão" | "Transferência";
  date: string;
}

export interface DemoState {
  customers: Customer[];
  sales: Sale[];
  payments: Payment[];
}
