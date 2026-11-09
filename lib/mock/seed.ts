import type { DemoState } from "@/types";

export const seedData: DemoState = {
  customers: [
    { id: "cli-1", name: "Marina Oliveira", phone: "(11) 98888-1204", cpf: "***.***.***-21", address: "Centro, São Paulo - SP", createdAt: "2026-01-15" },
    { id: "cli-2", name: "Carlos Mendes", phone: "(11) 97777-4301", cpf: "***.***.***-08", address: "Vila Mariana, São Paulo - SP", createdAt: "2026-02-03" },
    { id: "cli-3", name: "Fernanda Lima", phone: "(11) 96666-7720", cpf: "***.***.***-44", address: "Mooca, São Paulo - SP", createdAt: "2026-02-20" },
    { id: "cli-4", name: "Rafael Santos", phone: "(11) 95555-0945", cpf: "***.***.***-83", createdAt: "2026-03-01" },
    { id: "cli-5", name: "Juliana Costa", phone: "(11) 94444-6118", cpf: "***.***.***-35", address: "Pinheiros, São Paulo - SP", createdAt: "2026-03-08" },
  ],
  sales: [
    { id: "ven-1", customerId: "cli-1", items: [{ id: "i1", product: "Kit de cuidados", quantity: 2, unitPrice: 145 }], total: 290, paid: 100, date: "2026-10-28", dueDate: "2026-11-15" },
    { id: "ven-2", customerId: "cli-2", items: [{ id: "i2", product: "Tênis casual", quantity: 1, unitPrice: 380 }], total: 380, paid: 0, date: "2026-10-30", dueDate: "2026-11-10" },
    { id: "ven-3", customerId: "cli-3", items: [{ id: "i3", product: "Conjunto premium", quantity: 1, unitPrice: 520 }], total: 520, paid: 520, date: "2026-04-02", dueDate: "2026-05-02", paidAt: "2026-05-01" },
    { id: "ven-4", customerId: "cli-4", items: [{ id: "i4", product: "Mochila urbana", quantity: 1, unitPrice: 260 }], total: 260, paid: 60, date: "2026-11-02", dueDate: "2026-12-02" },
    { id: "ven-5", customerId: "cli-5", items: [{ id: "i5", product: "Acessórios", quantity: 3, unitPrice: 80 }], total: 240, paid: 0, date: "2026-11-05", dueDate: "2026-12-05" },
  ],
  payments: [
    { id: "pag-1", customerId: "cli-1", saleId: "ven-1", amount: 100, method: "Pix", date: "2026-11-03" },
    { id: "pag-2", customerId: "cli-3", saleId: "ven-3", amount: 520, method: "Dinheiro", date: "2026-05-01" },
    { id: "pag-3", customerId: "cli-4", saleId: "ven-4", amount: 60, method: "Pix", date: "2026-11-06" },
  ],
};
