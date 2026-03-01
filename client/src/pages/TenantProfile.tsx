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
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground mb-4">
          <Link href="/tenants"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory</Link>
        </Button>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent text-white font-display text-2xl font-bold flex items-center justify-center shadow-lg shadow-primary/20">
              {tenant.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold">{tenant.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-slate-100">{tenant.paymentStatus === 'Paid' ? 'Account Good Standing' : 'Action Required'}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-display">Contact Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"><Mail className="w-4 h-4" /></div>
                <span className="font-medium text-foreground">{tenant.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"><Phone className="w-4 h-4" /></div>
                <span className="font-medium text-foreground">{tenant.phone}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-lg font-display">Lease Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Assigned Unit</p>
                {unit ? (
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-lg">{unit.name}</span>
                    <span className="text-muted-foreground">@ {unit.propertyName}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground italic">None</span>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Rent Amount</p>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-xl">KSh {tenant.rentAmount.toLocaleString()}</span><span className="text-muted-foreground">/ month</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Lease Started</p>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{format(new Date(tenant.leaseStartDate), 'MMMM d, yyyy')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Invoices */}
        <div className="lg:col-span-2">
          <Card className="border-border/50 shadow-sm h-full">
            <CardHeader className="border-b border-border/50 bg-slate-50/50 pb-4">
              <CardTitle className="font-display text-xl">Billing History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {tenantInvoices.length > 0 ? (
                  tenantInvoices.map((invoice) => (
                    <div key={invoice.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                          invoice.status === 'Paid' ? 'bg-emerald-100 text-emerald-600' :
                          invoice.status === 'Overdue' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {invoice.status === 'Paid' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                        </div>
                        <div>
                          <p className="font-bold text-lg">{invoice.month} Rent</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                            <span className="font-mono">{invoice.invoiceNumber}</span> • 
                            <span>Due {format(new Date(invoice.dueDate), 'MMM d, yyyy')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="text-right">
                          <p className="font-bold text-xl">KSh {invoice.amount.toLocaleString()}</p>
                          <p className="text-sm mt-0.5">
                            {invoice.status === 'Paid' ? 
                              <span className="text-emerald-600 font-semibold">Paid</span> : 
                              <span className={invoice.status === 'Overdue' ? 'text-red-600 font-bold animate-pulse' : 'text-amber-600 font-semibold'}>{invoice.status}</span>
                            }
                          </p>
                        </div>
                        
                        {invoice.status !== 'Paid' && (
                          <Dialog open={payDialogOpen && activeInvoiceId === invoice.id} onOpenChange={(open) => {
                            setPayDialogOpen(open);
                            if(open) setActiveInvoiceId(invoice.id);
                          }}>
                            <DialogTrigger asChild>
                              <Button className="rounded-xl shadow-md shrink-0">Record Payment</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md rounded-2xl">
                              <DialogHeader>
                                <DialogTitle className="font-display">Record Payment</DialogTitle>
                                <DialogDescription>
                                  Mark invoice {invoice.invoiceNumber} for {invoice.month} as paid.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-6 space-y-4">
                                <div className="p-4 bg-slate-50 rounded-xl border border-border flex justify-between items-center">
                                  <span className="font-medium text-muted-foreground">Amount Due:</span>
                                  <span className="text-2xl font-bold">KSh {invoice.amount.toLocaleString()}</span>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-semibold">Payment Method</label>
                                  <Select value={selectedMethod} onValueChange={(v: any) => setSelectedMethod(v)}>
                                    <SelectTrigger className="h-12 rounded-xl">
                                      <SelectValue placeholder="Select method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                      <SelectItem value="Cash">Cash</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button className="w-full h-12 rounded-xl text-md font-bold mt-2" onClick={handlePay}>
                                  Confirm Full Payment
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">No invoices found for this tenant.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
