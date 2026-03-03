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

      <div className="hidden lg:block">
        <Card className="border-none lg:border-border/50 shadow-sm overflow-hidden bg-white/80 backdrop-blur-sm rounded-xl">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 pl-6">Receipt #</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14">Date</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14">Tenant</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 text-right">Amount</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 text-center">Method</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedReceipts.map((receipt) => {
                const tenant = tenants.find(t => t.id === receipt.tenantId);
                return (
                  <TableRow key={receipt.id} className="hover:bg-slate-50/80 transition-all group">
                    <TableCell className="pl-6 py-5">
                      <span className="font-mono text-xs font-black text-slate-400">{receipt.receiptNumber}</span>
                    </TableCell>
                    <TableCell className="py-5">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{format(new Date(receipt.paymentDate), 'MMM d, yyyy')}</span>
                    </TableCell>
                    <TableCell className="py-5">
                      <span className="font-black text-slate-900 leading-none">{tenant?.name || "Unknown"}</span>
                    </TableCell>
                    <TableCell className="text-right py-5">
                      <span className="font-black text-slate-900 text-lg">KSh {receipt.amountPaid.toLocaleString()}</span>
                    </TableCell>
                    <TableCell className="text-center py-5">
                      <Badge className="bg-indigo-50 text-indigo-700 border-none font-black text-[9px] rounded-md uppercase px-2 py-0.5">{receipt.paymentMethod}</Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6 py-5">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-xl font-bold hover:bg-primary/5 hover:text-primary transition-all text-xs uppercase tracking-widest"
                        onClick={() => handleDownload(receipt.receiptNumber)}
                      >
                        <DownloadCloud className="w-4 h-4 mr-2" /> PDF
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
        {sortedReceipts.map((receipt) => {
          const tenant = tenants.find(t => t.id === receipt.tenantId);
          return (
            <Card key={receipt.id} className="border-none shadow-xl bg-white rounded-2xl p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <ReceiptIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-black text-slate-400">{receipt.receiptNumber}</span>
                    <h3 className="font-black text-slate-900">{tenant?.name || "Unknown"}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-slate-900">KSh {receipt.amountPaid.toLocaleString()}</span>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mt-1">{format(new Date(receipt.paymentDate), 'MMM d, yyyy')}</p>
                </div>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl mb-3">
                <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Method</span>
                <Badge className="bg-white text-indigo-700 border-none font-black text-[9px] rounded-md px-2 py-0.5">{receipt.paymentMethod}</Badge>
              </div>
              <Button 
                onClick={() => handleDownload(receipt.receiptNumber)}
                className="w-full h-11 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/20"
              >
                Download Receipt PDF
              </Button>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}
