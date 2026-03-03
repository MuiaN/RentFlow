import { useData } from "@/context/DataContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody
} from "@/components/ui/table";
import { FileText, Plus, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default function Invoices() {
  const { invoices, tenants } = useData();

  // Sort by due date (newest first)
  const sortedInvoices = [...invoices].sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold">Invoices</h2>
          <p className="text-muted-foreground mt-1">Track all billing and rent collection.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl px-6 h-11">
          <Plus className="w-4 h-4 mr-2" /> Generate Invoice
        </Button>
      </div>

      <div className="hidden lg:block">
        <Card className="border-none lg:border-border/50 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm rounded-xl">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 pl-6">Invoice #</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14">Tenant</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14">Period</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14">Due Date</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 text-right">Amount</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 text-center">Status</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedInvoices.map((invoice) => {
                const tenant = tenants.find(t => t.id === invoice.tenantId);
                return (
                  <TableRow key={invoice.id} className="hover:bg-slate-50/80 transition-all group">
                    <TableCell className="pl-6 py-5">
                      <span className="font-mono text-xs font-black text-slate-400">{invoice.invoiceNumber}</span>
                    </TableCell>
                    <TableCell className="py-5">
                      <span className="font-black text-slate-900 leading-none">{tenant?.name || "Unknown"}</span>
                    </TableCell>
                    <TableCell className="py-5">
                      <span className="font-bold text-slate-600">{invoice.month}</span>
                    </TableCell>
                    <TableCell className="py-5">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{format(new Date(invoice.dueDate), 'MMM d, yyyy')}</span>
                    </TableCell>
                    <TableCell className="text-right py-5">
                      <span className="font-black text-slate-900 text-lg">KSh {invoice.amount.toLocaleString()}</span>
                    </TableCell>
                    <TableCell className="text-center py-5">
                      {invoice.status === 'Paid' ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-none font-black text-[9px] rounded-md">PAID</Badge>
                      ) : invoice.status === 'Overdue' ? (
                        <Badge className="bg-rose-50 text-rose-700 border-none font-black text-[9px] rounded-md animate-pulse">OVERDUE</Badge>
                      ) : (
                        <Badge className="bg-amber-50 text-amber-700 border-none font-black text-[9px] rounded-md">DUE</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6 py-5">
                      <Button variant="ghost" size="sm" asChild className="rounded-xl font-bold hover:bg-primary/5 hover:text-primary transition-all">
                        <Link href={`/tenants/${invoice.tenantId}`} className="flex items-center justify-center gap-2">
                          Manage <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>

      <div className="lg:hidden space-y-4">
        {sortedInvoices.map((invoice) => {
          const tenant = tenants.find(t => t.id === invoice.tenantId);
          return (
            <Card key={invoice.id} className="border-none shadow-xl bg-white rounded-2xl p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] font-black text-slate-400">{invoice.invoiceNumber}</span>
                    {invoice.status === 'Paid' ? (
                      <Badge className="bg-emerald-50 text-emerald-700 border-none font-black text-[8px] rounded-md px-1.5 py-0">PAID</Badge>
                    ) : (
                      <Badge className={`${invoice.status === 'Overdue' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'} border-none font-black text-[8px] rounded-md px-1.5 py-0`}>
                        {invoice.status.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-black text-slate-900 text-lg">{tenant?.name || "Unknown"}</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{invoice.month} Rent</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-slate-900">KSh {invoice.amount.toLocaleString()}</span>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mt-1">Due {format(new Date(invoice.dueDate), 'MMM d, yyyy')}</p>
                </div>
              </div>
              <Button asChild className="w-full h-11 rounded-xl font-bold bg-slate-50 text-slate-600 hover:bg-slate-100 border-none" variant="outline">
                <Link href={`/tenants/${invoice.tenantId}`}>View Billing Details</Link>
              </Button>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}
