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

      <Card className="border-none lg:border-border/50 shadow-xl lg:shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm rounded-2xl lg:rounded-xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80 hidden lg:table-header-group">
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
            <TableBody className="grid grid-cols-1 lg:table-row-group gap-4 p-4 lg:p-0">
              {sortedInvoices.map((invoice) => {
                const tenant = tenants.find(t => t.id === invoice.tenantId);
                
                return (
                  <TableRow key={invoice.id} className="hover:bg-slate-50/80 transition-all group border border-slate-100 lg:border-0 rounded-2xl lg:rounded-none flex flex-col lg:table-row mb-2 lg:mb-0 bg-white lg:bg-transparent shadow-sm lg:shadow-none">
                    <TableCell className="pl-4 lg:pl-6 py-3 lg:py-5 lg:table-cell flex justify-between items-center lg:block">
                      <span className="lg:hidden text-[10px] font-black text-muted-foreground uppercase tracking-widest">ID</span>
                      <span className="font-mono text-xs font-black text-slate-400 bg-slate-50 lg:bg-transparent px-2 py-1 rounded-md">{invoice.invoiceNumber}</span>
                    </TableCell>
                    <TableCell className="py-2 lg:py-5 px-4 lg:table-cell flex justify-between items-center lg:block">
                      <span className="lg:hidden text-[10px] font-black text-muted-foreground uppercase tracking-widest">Tenant</span>
                      <span className="font-black text-slate-900 leading-none">{tenant?.name || "Unknown"}</span>
                    </TableCell>
                    <TableCell className="py-2 lg:py-5 px-4 lg:table-cell flex justify-between items-center lg:block">
                      <span className="lg:hidden text-[10px] font-black text-muted-foreground uppercase tracking-widest">Month</span>
                      <span className="font-bold text-slate-600">{invoice.month}</span>
                    </TableCell>
                    <TableCell className="py-2 lg:py-5 px-4 lg:table-cell flex justify-between items-center lg:block">
                      <span className="lg:hidden text-[10px] font-black text-muted-foreground uppercase tracking-widest">Due Date</span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{format(new Date(invoice.dueDate), 'MMM d, yyyy')}</span>
                    </TableCell>
                    <TableCell className="py-2 lg:py-5 px-4 lg:table-cell flex justify-between items-center lg:text-right lg:block">
                      <span className="lg:hidden text-[10px] font-black text-muted-foreground uppercase tracking-widest">Amount</span>
                      <span className="font-black text-slate-900">KSh {invoice.amount.toLocaleString()}</span>
                    </TableCell>
                    <TableCell className="py-2 lg:py-5 px-4 lg:table-cell flex justify-between items-center lg:text-center lg:block">
                      <span className="lg:hidden text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</span>
                      {invoice.status === 'Paid' ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-none font-black text-[9px] rounded-md">PAID</Badge>
                      ) : invoice.status === 'Overdue' ? (
                        <Badge className="bg-rose-50 text-rose-700 border-none font-black text-[9px] rounded-md animate-pulse">OVERDUE</Badge>
                      ) : (
                        <Badge className="bg-amber-50 text-amber-700 border-none font-black text-[9px] rounded-md">DUE</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-4 lg:pr-6 py-4 lg:py-5 px-4 lg:table-cell flex justify-end border-t border-slate-50 lg:border-0">
                      <Button variant="ghost" size="sm" asChild className="rounded-xl font-bold hover:bg-primary/5 hover:text-primary transition-all w-full lg:w-auto">
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
        </div>
      </Card>
    </AppLayout>
  );
}
