import { Unit, Tenant, Invoice, Receipt } from "@shared/schema";

export const mockUnits: Unit[] = [
  { id: "u1", name: "Apt 101", propertyName: "Sunset Towers", type: "1 Bed / 1 Bath", rentAmount: 1200, status: "Occupied", assignedTenantId: "t1" },
  { id: "u2", name: "Apt 102", propertyName: "Sunset Towers", type: "2 Bed / 2 Bath", rentAmount: 1600, status: "Occupied", assignedTenantId: "t2" },
  { id: "u3", name: "Apt 201", propertyName: "Sunset Towers", type: "Studio", rentAmount: 950, status: "Vacant", assignedTenantId: null },
  { id: "u4", name: "Unit A", propertyName: "Oakwood Estates", type: "3 Bed / 2 Bath", rentAmount: 2100, status: "Occupied", assignedTenantId: "t3" },
  { id: "u5", name: "Unit B", propertyName: "Oakwood Estates", type: "2 Bed / 1 Bath", rentAmount: 1450, status: "Vacant", assignedTenantId: null },
];

export const mockTenants: Tenant[] = [
  { id: "t1", name: "Sarah Jenkins", phone: "(555) 123-4567", email: "sarah.j@example.com", assignedUnitId: "u1", rentAmount: 1200, leaseStartDate: "2023-08-01", paymentStatus: "Paid" },
  { id: "t2", name: "Marcus Rossi", phone: "(555) 987-6543", email: "m.rossi@example.com", assignedUnitId: "u2", rentAmount: 1600, leaseStartDate: "2022-11-15", paymentStatus: "Due" },
  { id: "t3", name: "Priya Patel", phone: "(555) 456-7890", email: "priya.p@example.com", assignedUnitId: "u4", rentAmount: 2100, leaseStartDate: "2024-01-01", paymentStatus: "Overdue" },
];

export const mockInvoices: Invoice[] = [
  { id: "i1", invoiceNumber: "INV-2024-001", tenantId: "t1", unitId: "u1", month: "May 2024", amount: 1200, status: "Paid", dueDate: "2024-05-05" },
  { id: "i2", invoiceNumber: "INV-2024-002", tenantId: "t2", unitId: "u2", month: "May 2024", amount: 1600, status: "Due", dueDate: "2024-05-05" },
  { id: "i3", invoiceNumber: "INV-2024-003", tenantId: "t3", unitId: "u4", month: "April 2024", amount: 2100, status: "Overdue", dueDate: "2024-04-05" },
  { id: "i4", invoiceNumber: "INV-2024-004", tenantId: "t3", unitId: "u4", month: "May 2024", amount: 2100, status: "Overdue", dueDate: "2024-05-05" },
];

export const mockReceipts: Receipt[] = [
  { id: "r1", receiptNumber: "REC-2024-001", tenantId: "t1", invoiceId: "i1", amountPaid: 1200, paymentMethod: "Bank Transfer", paymentDate: "2024-05-02" },
];
