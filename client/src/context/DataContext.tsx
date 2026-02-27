import React, { createContext, useContext, useState, ReactNode } from "react";
import { Unit, Tenant, Invoice, Receipt } from "@shared/schema";
import { mockUnits, mockTenants, mockInvoices, mockReceipts } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface DataContextType {
  units: Unit[];
  tenants: Tenant[];
  invoices: Invoice[];
  receipts: Receipt[];
  assignTenant: (unitId: string, tenantId: string) => void;
  markInvoicePaid: (invoiceId: string, method: "Cash" | "Bank Transfer") => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useState<Unit[]>(mockUnits);
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [receipts, setReceipts] = useState<Receipt[]>(mockReceipts);
  const { toast } = useToast();

  const assignTenant = (unitId: string, tenantId: string) => {
    setUnits((prev) =>
      prev.map((u) =>
        u.id === unitId ? { ...u, assignedTenantId: tenantId, status: "Occupied" } : u
      )
    );
    setTenants((prev) =>
      prev.map((t) =>
        t.id === tenantId ? { ...t, assignedUnitId: unitId } : t
      )
    );
    toast({
      title: "Tenant Assigned",
      description: "The unit status has been updated to Occupied.",
    });
  };

  const markInvoicePaid = (invoiceId: string, method: "Cash" | "Bank Transfer") => {
    const invoice = invoices.find((i) => i.id === invoiceId);
    if (!invoice) return;

    // Update invoice status
    setInvoices((prev) =>
      prev.map((i) => (i.id === invoiceId ? { ...i, status: "Paid" } : i))
    );

    // Create receipt
    const newReceipt: Receipt = {
      id: `r${Date.now()}`,
      receiptNumber: `REC-${new Date().getFullYear()}-${String(receipts.length + 1).padStart(3, "0")}`,
      tenantId: invoice.tenantId,
      invoiceId: invoice.id,
      amountPaid: invoice.amount,
      paymentMethod: method,
      paymentDate: new Date().toISOString().split("T")[0],
    };
    setReceipts((prev) => [newReceipt, ...prev]);

    // Check if tenant has other due/overdue invoices to update tenant status
    setTenants((prev) =>
      prev.map((t) => {
        if (t.id === invoice.tenantId) {
          const tenantInvoices = invoices.filter((i) => i.tenantId === t.id && i.id !== invoiceId);
          const hasOverdue = tenantInvoices.some((i) => i.status === "Overdue");
          const hasDue = tenantInvoices.some((i) => i.status === "Due");
          
          let paymentStatus: "Paid" | "Due" | "Overdue" = "Paid";
          if (hasOverdue) paymentStatus = "Overdue";
          else if (hasDue) paymentStatus = "Due";

          return { ...t, paymentStatus };
        }
        return t;
      })
    );

    toast({
      title: "Payment Processed",
      description: `Invoice ${invoice.invoiceNumber} marked as paid via ${method}.`,
    });
  };

  return (
    <DataContext.Provider
      value={{ units, tenants, invoices, receipts, assignTenant, markInvoicePaid }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
