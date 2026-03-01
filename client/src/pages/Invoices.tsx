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

      <Card className="border-border/50 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-slate-50/80">
            <TableRow>
              <TableHead className="font-semibold text-muted-foreground">Invoice #</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Tenant</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Period</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Due Date</TableHead>
              <TableHead className="font-semibold text-muted-foreground text-right">Amount</TableHead>
              <TableHead className="font-semibold text-muted-foreground text-center">Status</TableHead>
              <TableHead className="font-semibold text-muted-foreground text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedInvoices.map((invoice) => {
              const tenant = tenants.find(t => t.id === invoice.tenantId);
              
              return (
                <TableRow key={invoice.id} className="hover:bg-slate-50 transition-colors group">
                  <TableCell className="font-mono text-xs font-medium text-slate-500 py-4">{invoice.invoiceNumber}</TableCell>
                  <TableCell className="font-semibold text-foreground">{tenant?.name || "Unknown"}</TableCell>
                  <TableCell className="font-medium text-slate-600">{invoice.month}</TableCell>
                  <TableCell className="text-slate-500">{format(new Date(invoice.dueDate), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-right font-bold text-slate-900">KSh {invoice.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    {invoice.status === 'Paid' ? (
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Paid</Badge>
                    ) : invoice.status === 'Overdue' ? (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Overdue</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Due</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">
                      <Link href={`/tenants/${invoice.tenantId}`}>
                        View <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </AppLayout>
  );
}
