import { z } from "zod";

export const unitSchema = z.object({
  id: z.string(),
  name: z.string(),
  propertyName: z.string(),
  type: z.string(),
  rentAmount: z.number(),
  status: z.enum(["Occupied", "Vacant"]),
  assignedTenantId: z.string().nullable(),
});

export const tenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  assignedUnitId: z.string().nullable(),
  rentAmount: z.number(),
  leaseStartDate: z.string(),
  paymentStatus: z.enum(["Paid", "Due", "Overdue"]),
});

export const invoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  tenantId: z.string(),
  unitId: z.string(),
  month: z.string(),
  amount: z.number(),
  status: z.enum(["Paid", "Due", "Overdue"]),
  dueDate: z.string(),
});

export const receiptSchema = z.object({
  id: z.string(),
  receiptNumber: z.string(),
  tenantId: z.string(),
  invoiceId: z.string(),
  amountPaid: z.number(),
  paymentMethod: z.enum(["Cash", "Bank Transfer"]),
  paymentDate: z.string(),
});

export type Unit = z.infer<typeof unitSchema>;
export type Tenant = z.infer<typeof tenantSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
export type Receipt = z.infer<typeof receiptSchema>;
