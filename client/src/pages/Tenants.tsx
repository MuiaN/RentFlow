import { useState } from "react";
import { useData } from "@/context/DataContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Users, Mail, Phone, ChevronRight, Plus } from "lucide-react";

export default function Tenants() {
  const { tenants, units, addTenant } = useData();
  const [addTenantDialogOpen, setAddTenantDialogOpen] = useState(false);

  // New tenant form state
  const [newTenant, setNewTenant] = useState({
    name: "",
    email: "",
    phone: "",
    rentAmount: 0,
    leaseStartDate: new Date().toISOString().split("T")[0],
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid": return <Badge className="bg-emerald-50 text-emerald-700 border-none font-bold rounded-lg px-2 text-[10px]">UP TO DATE</Badge>;
      case "Due": return <Badge className="bg-amber-50 text-amber-700 border-none font-bold rounded-lg px-2 text-[10px]">PAYMENT DUE</Badge>;
      case "Overdue": return <Badge className="bg-rose-50 text-rose-700 border-none font-bold rounded-lg px-2 text-[10px] animate-pulse">OVERDUE</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    addTenant({
      ...newTenant,
      assignedUnitId: null,
      paymentStatus: "Paid",
    });
    setAddTenantDialogOpen(false);
    setNewTenant({
      name: "",
      email: "",
      phone: "",
      rentAmount: 0,
      leaseStartDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold">Tenants</h2>
          <p className="text-muted-foreground mt-1">Manage your residents and their lease details.</p>
        </div>
        <Dialog open={addTenantDialogOpen} onOpenChange={setAddTenantDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl px-6 h-11 font-bold">
              <Plus className="w-4 h-4 mr-2" /> Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-display">Add New Tenant</DialogTitle>
              <DialogDescription>
                Onboard a new resident to the system.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddTenant} className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="t-name">Full Name</Label>
                <Input 
                  id="t-name" 
                  placeholder="e.g. John Doe" 
                  value={newTenant.name} 
                  onChange={e => setNewTenant(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="t-email">Email Address</Label>
                  <Input 
                    id="t-email" 
                    type="email" 
                    placeholder="john@example.com" 
                    value={newTenant.email} 
                    onChange={e => setNewTenant(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="t-phone">Phone Number</Label>
                  <Input 
                    id="t-phone" 
                    placeholder="+254 7XX XXX XXX" 
                    value={newTenant.phone} 
                    onChange={e => setNewTenant(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="t-rent">Monthly Rent (KSh)</Label>
                  <Input 
                    id="t-rent" 
                    type="number" 
                    value={newTenant.rentAmount} 
                    onChange={e => setNewTenant(prev => ({ ...prev, rentAmount: parseInt(e.target.value) }))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="t-start">Lease Start Date</Label>
                  <Input 
                    id="t-start" 
                    type="date" 
                    value={newTenant.leaseStartDate} 
                    onChange={e => setNewTenant(prev => ({ ...prev, leaseStartDate: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full h-12 rounded-xl font-bold">Register Tenant</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="hidden lg:block">
        <Card className="border-none lg:border-border/50 shadow-sm overflow-hidden bg-white/80 backdrop-blur-sm rounded-xl">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 pl-6">Tenant</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14">Contact</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14">Unit Assigned</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14">Account Status</TableHead>
                <TableHead className="text-right font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => {
                const unit = units.find(u => u.id === tenant.assignedUnitId);
                return (
                  <TableRow key={tenant.id} className="hover:bg-slate-50/80 transition-all group">
                    <TableCell className="pl-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-black flex items-center justify-center border border-primary/20 shadow-inner">
                          {tenant.name.charAt(0)}
                        </div>
                        <span className="font-black text-slate-900 leading-none">{tenant.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-primary" /> {tenant.email}</span>
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-indigo-500" /> {tenant.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      {unit ? (
                        <div className="flex flex-col">
                          <span className="font-black text-slate-900 leading-none mb-1">{unit.name}</span>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{unit.propertyName}</span>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-slate-400 italic bg-slate-50 px-3 py-1 rounded-lg">UNASSIGNED</span>
                      )}
                    </TableCell>
                    <TableCell className="py-5">
                      {getStatusBadge(tenant.paymentStatus)}
                    </TableCell>
                    <TableCell className="text-right pr-6 py-5">
                      <Button variant="ghost" size="sm" asChild className="rounded-xl font-bold hover:bg-primary/5 hover:text-primary transition-all">
                        <Link href={`/tenants/${tenant.id}`} className="flex items-center gap-2">
                          View Profile <ChevronRight className="w-4 h-4" />
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
        {tenants.map((tenant) => {
          const unit = units.find(u => u.id === tenant.assignedUnitId);
          return (
            <Card key={tenant.id} className="border-none shadow-xl bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary font-black flex items-center justify-center border border-primary/20">
                    {tenant.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 leading-tight">{tenant.name}</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{unit?.name || 'Unassigned'}</p>
                  </div>
                </div>
                {getStatusBadge(tenant.paymentStatus)}
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4 border-y border-slate-50 py-3">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-muted-foreground uppercase tracking-tighter">Email</span>
                  <span className="text-xs font-bold text-slate-600 truncate">{tenant.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-muted-foreground uppercase tracking-tighter">Phone</span>
                  <span className="text-xs font-bold text-slate-600">{tenant.phone}</span>
                </div>
              </div>
              <Button asChild className="w-full h-11 rounded-xl font-bold" variant="secondary">
                <Link href={`/tenants/${tenant.id}`}>View Full Profile</Link>
              </Button>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}
