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
import { Receipt as ReceiptIcon, DownloadCloud, Search } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Receipts() {
  const { receipts, tenants, invoices } = useData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDownload = (receiptNumber: string) => {
    toast({
      title: "Downloading PDF",
      description: `Preparing download for receipt ${receiptNumber}...`,
    });
  };

  const filteredReceipts = receipts.filter(r => {
    const tenant = tenants.find(t => t.id === r.tenantId);
    return (
      r.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sort by payment date (newest first)
  const sortedReceipts = [...filteredReceipts].sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());

  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 px-2 lg:px-0">
        <div>
          <h2 className="text-2xl lg:text-3xl font-display font-black tracking-tight text-slate-900">Payment Receipts</h2>
          <p className="text-muted-foreground mt-1 font-medium">History of all successful transactions.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search receipts..." 
            className="pl-10 h-11 rounded-xl bg-white border-slate-200 focus:ring-primary/20 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-none lg:border-border/50 shadow-xl lg:shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm rounded-2xl lg:rounded-xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80 hidden lg:table-header-group">
              <TableRow>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 pl-6">Receipt #</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14">Date</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14">Tenant</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 text-right">Amount</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 text-center">Method</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="grid grid-cols-1 lg:table-row-group gap-4 p-4 lg:p-0">
              {sortedReceipts.length > 0 ? (
                sortedReceipts.map((receipt) => {
                  const tenant = tenants.find(t => t.id === receipt.tenantId);
                  const invoice = invoices.find(i => i.id === receipt.invoiceId);
                  
                  return (
                    <TableRow key={receipt.id} className="hover:bg-slate-50/80 transition-all group border border-slate-100 lg:border-0 rounded-2xl lg:rounded-none flex flex-col lg:table-row mb-2 lg:mb-0 bg-white lg:bg-transparent shadow-sm lg:shadow-none">
                      <TableCell className="pl-4 lg:pl-6 py-3 lg:py-5 lg:table-cell flex justify-between items-center lg:block">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center lg:hidden">
                            <ReceiptIcon className="w-4 h-4" />
                          </div>
                          <span className="font-mono text-xs font-black text-slate-400 bg-slate-50 lg:bg-transparent px-2 py-1 rounded-md">{receipt.receiptNumber}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2 lg:py-5 px-4 lg:table-cell flex justify-between items-center lg:block">
                        <span className="lg:hidden text-[10px] font-black text-muted-foreground uppercase tracking-widest">Paid On</span>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{format(new Date(receipt.paymentDate), 'MMM d, yyyy')}</span>
                      </TableCell>
                      <TableCell className="py-2 lg:py-5 px-4 lg:table-cell flex justify-between items-center lg:block">
                        <span className="lg:hidden text-[10px] font-black text-muted-foreground uppercase tracking-widest">Tenant</span>
                        <span className="font-black text-slate-900 leading-none">{tenant?.name || "Unknown"}</span>
                      </TableCell>
                      <TableCell className="py-2 lg:py-5 px-4 lg:table-cell flex justify-between items-center lg:text-right lg:block">
                        <span className="lg:hidden text-[10px] font-black text-muted-foreground uppercase tracking-widest">Amount</span>
                        <span className="font-black text-slate-900 text-lg">KSh {receipt.amountPaid.toLocaleString()}</span>
                      </TableCell>
                      <TableCell className="py-2 lg:py-5 px-4 lg:table-cell flex justify-between items-center lg:text-center lg:block">
                        <span className="lg:hidden text-[10px] font-black text-muted-foreground uppercase tracking-widest">Method</span>
                        <Badge className="bg-indigo-50 text-indigo-700 border-none font-black text-[9px] rounded-md tracking-tighter uppercase px-2 py-0.5">{receipt.paymentMethod}</Badge>
                      </TableCell>
                      <TableCell className="text-right pr-4 lg:pr-6 py-4 lg:py-5 px-4 lg:table-cell flex justify-end border-t border-slate-50 lg:border-0">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="rounded-xl font-bold hover:bg-primary/5 hover:text-primary transition-all w-full lg:w-auto text-xs uppercase tracking-widest h-10 px-4"
                          onClick={() => handleDownload(receipt.receiptNumber)}
                        >
                          <DownloadCloud className="w-4 h-4 mr-2" /> PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="p-12 text-center text-muted-foreground">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 mx-auto mb-4 shadow-inner">
                      <Search className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-slate-900">No receipts found</p>
                    <p className="text-sm font-medium mt-1">Try adjusting your search terms.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </AppLayout>
  );
}
