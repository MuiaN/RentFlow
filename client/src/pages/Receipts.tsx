import { useData } from "@/context/DataContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody
} from "@/components/ui/table";
import { Receipt as ReceiptIcon, DownloadCloud } from "lucide-react";
import { format } from "date-fns";

export default function Receipts() {
  const { receipts, tenants, invoices } = useData();
  const { toast } = useToast();

  const handleDownload = (receiptNumber: string) => {
    toast({
      title: "Downloading PDF",
      description: `Preparing download for receipt ${receiptNumber}...`,
    });
  };

  // Sort by payment date (newest first)
  const sortedReceipts = [...receipts].sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());

  return (
    <AppLayout>
      <div className="flex flex-col justify-between items-start gap-2 mb-8">
        <h2 className="text-3xl font-display font-bold">Payment Receipts</h2>
        <p className="text-muted-foreground text-lg">Historical records of all processed payments.</p>
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-slate-50/80">
            <TableRow>
              <TableHead className="font-semibold text-muted-foreground py-4">Receipt #</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Payment Date</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Tenant</TableHead>
              <TableHead className="font-semibold text-muted-foreground">For Invoice</TableHead>
              <TableHead className="font-semibold text-muted-foreground text-right">Amount Paid</TableHead>
              <TableHead className="font-semibold text-muted-foreground text-center">Method</TableHead>
              <TableHead className="font-semibold text-muted-foreground text-right">Document</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedReceipts.length > 0 ? (
              sortedReceipts.map((receipt) => {
                const tenant = tenants.find(t => t.id === receipt.tenantId);
                const invoice = invoices.find(i => i.id === receipt.invoiceId);
                
                return (
                  <TableRow key={receipt.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-mono text-xs font-semibold text-primary py-4 flex items-center gap-2">
                      <ReceiptIcon className="w-4 h-4 text-muted-foreground" /> {receipt.receiptNumber}
                    </TableCell>
                    <TableCell className="font-medium text-slate-600">{format(new Date(receipt.paymentDate), 'MMM d, yyyy')}</TableCell>
                    <TableCell className="font-semibold text-foreground">{tenant?.name || "Unknown"}</TableCell>
                    <TableCell className="text-slate-500 font-mono text-xs">{invoice?.invoiceNumber || "N/A"}</TableCell>
                    <TableCell className="text-right font-bold text-emerald-600">${receipt.amountPaid.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 shadow-none border-none">
                        {receipt.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-lg hover:bg-slate-100 transition-colors"
                        onClick={() => handleDownload(receipt.receiptNumber)}
                      >
                        <DownloadCloud className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  No receipts generated yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </AppLayout>
  );
}
