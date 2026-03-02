import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useData } from "@/context/DataContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  CalendarDays, 
  Home, 
  CreditCard,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

export default function TenantProfile() {
  const [, params] = useRoute("/tenants/:id");
  const { tenants, units, invoices, markInvoicePaid } = useData();
  
  const [selectedMethod, setSelectedMethod] = useState<"Cash" | "Bank Transfer">("Bank Transfer");
  const [payDialogOpen, setPayDialogOpen] = useState(false);
  const [activeInvoiceId, setActiveInvoiceId] = useState<string | null>(null);

  const tenant = tenants.find(t => t.id === params?.id);
  
  if (!tenant) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <AlertCircle className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold">Tenant Not Found</h2>
          <Button asChild variant="link" className="mt-4"><Link href="/tenants">Back to Tenants</Link></Button>
        </div>
      </AppLayout>
    );
  }

  const unit = units.find(u => u.id === tenant.assignedUnitId);
  const tenantInvoices = invoices.filter(i => i.tenantId === tenant.id).sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

  const handlePay = () => {
    if (activeInvoiceId && selectedMethod) {
      markInvoicePaid(activeInvoiceId, selectedMethod);
      setPayDialogOpen(false);
      setActiveInvoiceId(null);
    }
  };

  return (
    <AppLayout>
      <div className="mb-6 px-2 lg:px-0">
        <Button variant="ghost" asChild className="pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground mb-4 hidden lg:inline-flex">
          <Link href="/tenants"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory</Link>
        </Button>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-primary to-accent text-white font-display text-xl lg:text-2xl font-bold flex items-center justify-center shadow-lg shadow-primary/20">
              {tenant.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-display font-black tracking-tight">{tenant.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-emerald-50 text-emerald-700 border-none font-bold text-[10px]">{tenant.paymentStatus === 'Paid' ? 'GOOD STANDING' : 'ACTION REQUIRED'}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 px-2 lg:px-0">
        {/* Left Column - Details */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-xl shadow-black/5 rounded-2xl">
            <CardHeader className="pb-2 px-6 pt-6">
              <CardTitle className="text-sm font-black text-muted-foreground uppercase tracking-widest">Contact Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary shadow-inner"><Mail className="w-5 h-5" /></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter leading-none mb-1">Email</span>
                  <span className="font-bold text-slate-900 break-all">{tenant.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-indigo-500 shadow-inner"><Phone className="w-5 h-5" /></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter leading-none mb-1">Phone</span>
                  <span className="font-bold text-slate-900">{tenant.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-black/5 bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl">
            <CardHeader className="pb-2 px-6 pt-6">
              <CardTitle className="text-sm font-black text-muted-foreground uppercase tracking-widest">Lease Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-6 pb-6 pt-2">
              <div className="bg-white/50 p-4 rounded-xl ring-1 ring-black/5">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Current Residence</p>
                {unit ? (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0"><Home className="w-5 h-5" /></div>
                    <div>
                      <p className="font-black text-slate-900 text-lg leading-tight">{unit.name}</p>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-tight">{unit.propertyName}</p>
                    </div>
                  </div>
                ) : (
                  <span className="text-muted-foreground italic">None assigned</span>
                )}
              </div>
              
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Rent Amount</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-black text-2xl text-slate-900">KSh {tenant.rentAmount.toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-muted-foreground">/mo</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Agreement Start</p>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-slate-700">{format(new Date(tenant.leaseStartDate), 'MMMM d, yyyy')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Invoices */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-xl shadow-black/5 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-6">
              <CardTitle className="font-display text-xl font-black">Billing History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {tenantInvoices.length > 0 ? (
                  tenantInvoices.map((invoice) => (
                    <div key={invoice.id} className="p-5 lg:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors group">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${
                          invoice.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' :
                          invoice.status === 'Overdue' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {invoice.status === 'Paid' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-lg leading-tight">{invoice.month} Rent</p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                            <span className="text-xs font-black text-slate-400 font-mono tracking-tighter">{invoice.invoiceNumber}</span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                              <div className="w-1 h-1 rounded-full bg-slate-300" />
                              Due {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-row sm:flex-col lg:flex-row items-center justify-between sm:items-end lg:items-center gap-4 lg:gap-8 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-50">
                        <div className="text-left sm:text-right">
                          <p className="font-black text-xl text-slate-900 leading-none">KSh {invoice.amount.toLocaleString()}</p>
                          <div className="mt-1.5 flex lg:justify-end">
                            {invoice.status === 'Paid' ? 
                              <Badge className="bg-emerald-50 text-emerald-700 border-none font-black text-[9px] px-2 py-0.5 rounded-md">PAID</Badge> : 
                              <Badge className={`${invoice.status === 'Overdue' ? 'bg-rose-50 text-rose-700 animate-pulse' : 'bg-amber-50 text-amber-700'} border-none font-black text-[9px] px-2 py-0.5 rounded-md`}>
                                {invoice.status.toUpperCase()}
                              </Badge>
                            }
                          </div>
                        </div>
                        
                        {invoice.status !== 'Paid' && (
                          <Dialog open={payDialogOpen && activeInvoiceId === invoice.id} onOpenChange={(open) => {
                            setPayDialogOpen(open);
                            if(open) setActiveInvoiceId(invoice.id);
                          }}>
                            <DialogTrigger asChild>
                              <Button className="rounded-xl shadow-lg shadow-primary/20 h-10 px-6 font-black text-xs uppercase tracking-widest shrink-0 w-full sm:w-auto">Pay</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md rounded-3xl mx-4">
                              <DialogHeader>
                                <DialogTitle className="font-display text-2xl font-black">Record Payment</DialogTitle>
                                <DialogDescription className="font-medium">
                                  Mark invoice {invoice.invoiceNumber} as paid.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-6 space-y-6">
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-1">
                                  <span className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">Amount Due</span>
                                  <span className="text-4xl font-black text-slate-900 tracking-tighter">KSh {invoice.amount.toLocaleString()}</span>
                                </div>
                                <div className="space-y-3">
                                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Payment Method</label>
                                  <Select value={selectedMethod} onValueChange={(v: any) => setSelectedMethod(v)}>
                                    <SelectTrigger className="h-14 rounded-2xl border-slate-200 bg-white font-bold text-slate-700">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl">
                                      <SelectItem value="Bank Transfer" className="rounded-xl font-bold">Bank Transfer</SelectItem>
                                      <SelectItem value="Cash" className="rounded-xl font-bold">Cash Payment</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button className="w-full h-14 rounded-2xl text-md font-black shadow-xl shadow-primary/30" onClick={handlePay}>
                                  Confirm Payment
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 mb-4 shadow-inner">
                      <FileText className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-slate-900">No invoices yet</p>
                    <p className="text-sm font-medium mt-1">When this tenant has billing history, it will appear here.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
