import { Unit, Tenant, Invoice, Receipt } from "./schema";

export const mockUnits: Unit[] = [
  { id: "u1", name: "Unit A1", propertyName: "Greenview Apartments", type: "1 Bedroom", rentAmount: 25000, status: "Occupied", assignedTenantId: "t1" },
  { id: "u2", name: "Unit B3", propertyName: "Riverside Court", type: "2 Bedroom", rentAmount: 45000, status: "Occupied", assignedTenantId: "t2" },
  { id: "u3", name: "Studio S2", propertyName: "Sunset Residency", type: "Studio", rentAmount: 18000, status: "Vacant", assignedTenantId: null },
  { id: "u4", name: "Unit C5", propertyName: "Royal Gardens", type: "3 Bedroom", rentAmount: 65000, status: "Occupied", assignedTenantId: "t3" },
  { id: "u5", name: "Unit D1", propertyName: "Greenview Apartments", type: "2 Bedroom", rentAmount: 35000, status: "Occupied", assignedTenantId: "t4" },
  { id: "u6", name: "Unit A2", propertyName: "Riverside Court", type: "1 Bedroom", rentAmount: 28000, status: "Vacant", assignedTenantId: null },
  { id: "u7", name: "Studio S1", propertyName: "Sunset Residency", type: "Studio", rentAmount: 18000, status: "Occupied", assignedTenantId: "t5" },
  { id: "u8", name: "Unit B1", propertyName: "Royal Gardens", type: "2 Bedroom", rentAmount: 50000, status: "Vacant", assignedTenantId: null },
  { id: "u9", name: "Unit C1", propertyName: "Greenview Apartments", type: "3 Bedroom", rentAmount: 55000, status: "Occupied", assignedTenantId: "t6" },
  { id: "u10", name: "Unit A3", propertyName: "Riverside Court", type: "1 Bedroom", rentAmount: 28000, status: "Occupied", assignedTenantId: "t7" },
  { id: "u11", name: "Studio S3", propertyName: "Sunset Residency", type: "Studio", rentAmount: 18000, status: "Vacant", assignedTenantId: null },
  { id: "u12", name: "Unit C2", propertyName: "Royal Gardens", type: "3 Bedroom", rentAmount: 65000, status: "Occupied", assignedTenantId: "t8" },
];

export const mockTenants: Tenant[] = [
  { id: "t1", name: "Brian Mwangi", phone: "+254 712 345678", email: "brian@example.com", assignedUnitId: "u1", rentAmount: 25000, leaseStartDate: "2023-01-15", paymentStatus: "Paid" },
  { id: "t2", name: "Faith Wanjiru", phone: "+254 722 987654", email: "faith@example.com", assignedUnitId: "u2", rentAmount: 45000, leaseStartDate: "2023-03-01", paymentStatus: "Due" },
  { id: "t3", name: "Daniel Otieno", phone: "+254 733 112233", email: "daniel@example.com", assignedUnitId: "u4", rentAmount: 65000, leaseStartDate: "2022-11-10", paymentStatus: "Overdue" },
  { id: "t4", name: "Mercy Njeri", phone: "+254 700 445566", email: "mercy@example.com", assignedUnitId: "u5", rentAmount: 35000, leaseStartDate: "2023-06-20", paymentStatus: "Paid" },
  { id: "t5", name: "John Kamau", phone: "+254 711 223344", email: "john@example.com", assignedUnitId: "u7", rentAmount: 18000, leaseStartDate: "2023-08-05", paymentStatus: "Due" },
  { id: "t6", name: "Sarah Ochieng", phone: "+254 722 556677", email: "sarah@example.com", assignedUnitId: "u9", rentAmount: 55000, leaseStartDate: "2022-05-12", paymentStatus: "Paid" },
  { id: "t7", name: "Kevin Kiprop", phone: "+254 733 889900", email: "kevin@example.com", assignedUnitId: "u10", rentAmount: 28000, leaseStartDate: "2023-09-01", paymentStatus: "Overdue" },
  { id: "t8", name: "Grace Mutuku", phone: "+254 700 111222", email: "grace@example.com", assignedUnitId: "u12", rentAmount: 65000, leaseStartDate: "2023-02-28", paymentStatus: "Paid" },
];

const today = new Date();
const currentMonth = today.toLocaleString('default', { month: 'long' });
const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1).toLocaleString('default', { month: 'long' });

export const mockInvoices: Invoice[] = [
  { id: "i1", invoiceNumber: "INV-2023-001", tenantId: "t1", unitId: "u1", month: currentMonth, amount: 25000, status: "Paid", dueDate: new Date(today.getFullYear(), today.getMonth(), 5).toISOString().split('T')[0] },
  { id: "i2", invoiceNumber: "INV-2023-002", tenantId: "t2", unitId: "u2", month: currentMonth, amount: 45000, status: "Due", dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).toISOString().split('T')[0] },
  { id: "i3", invoiceNumber: "INV-2023-003", tenantId: "t3", unitId: "u4", month: lastMonth, amount: 65000, status: "Overdue", dueDate: new Date(today.getFullYear(), today.getMonth() - 1, 5).toISOString().split('T')[0] },
  { id: "i4", invoiceNumber: "INV-2023-004", tenantId: "t4", unitId: "u5", month: currentMonth, amount: 35000, status: "Paid", dueDate: new Date(today.getFullYear(), today.getMonth(), 5).toISOString().split('T')[0] },
  { id: "i5", invoiceNumber: "INV-2023-005", tenantId: "t5", unitId: "u7", month: currentMonth, amount: 18000, status: "Due", dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5).toISOString().split('T')[0] },
  { id: "i6", invoiceNumber: "INV-2023-006", tenantId: "t6", unitId: "u9", month: currentMonth, amount: 55000, status: "Paid", dueDate: new Date(today.getFullYear(), today.getMonth(), 5).toISOString().split('T')[0] },
  { id: "i7", invoiceNumber: "INV-2023-007", tenantId: "t7", unitId: "u10", month: lastMonth, amount: 28000, status: "Overdue", dueDate: new Date(today.getFullYear(), today.getMonth() - 1, 5).toISOString().split('T')[0] },
  { id: "i8", invoiceNumber: "INV-2023-008", tenantId: "t8", unitId: "u12", month: currentMonth, amount: 65000, status: "Paid", dueDate: new Date(today.getFullYear(), today.getMonth(), 5).toISOString().split('T')[0] },
];

export const mockReceipts: Receipt[] = [
  { id: "r1", receiptNumber: "REC-2023-001", tenantId: "t1", invoiceId: "i1", amountPaid: 25000, paymentMethod: "Bank Transfer", paymentDate: new Date(today.getFullYear(), today.getMonth(), 2).toISOString().split('T')[0] },
  { id: "r2", receiptNumber: "REC-2023-002", tenantId: "t4", invoiceId: "i4", amountPaid: 35000, paymentMethod: "Cash", paymentDate: new Date(today.getFullYear(), today.getMonth(), 3).toISOString().split('T')[0] },
  { id: "r3", receiptNumber: "REC-2023-003", tenantId: "t6", invoiceId: "i6", amountPaid: 55000, paymentMethod: "Bank Transfer", paymentDate: new Date(today.getFullYear(), today.getMonth(), 4).toISOString().split('T')[0] },
  { id: "r4", receiptNumber: "REC-2023-004", tenantId: "t8", invoiceId: "i8", amountPaid: 65000, paymentMethod: "Bank Transfer", paymentDate: new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0] },
];
