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
import { Users, Mail, Phone, ChevronRight } from "lucide-react";

export default function Tenants() {
  const { tenants, units } = useData();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid": return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Up to date</Badge>;
      case "Due": return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Payment Due</Badge>;
      case "Overdue": return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 shadow-sm animate-pulse">Overdue</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold">Tenants</h2>
          <p className="text-muted-foreground mt-1">Manage your residents and their lease details.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl px-6 h-11">
          <Users className="w-4 h-4 mr-2" /> Add Tenant
        </Button>
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80">
            <TableRow>
              <TableHead className="font-semibold text-muted-foreground">Tenant</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Contact</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Unit Assigned</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Account Status</TableHead>
              <TableHead className="text-right font-semibold text-muted-foreground"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map((tenant) => {
              const unit = units.find(u => u.id === tenant.assignedUnitId);
              
              return (
                <TableRow key={tenant.id} className="hover:bg-slate-50/50 transition-colors group py-3">
                  <TableCell>
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold flex items-center justify-center border border-primary/20">
                        {tenant.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-foreground">{tenant.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {tenant.email}</span>
                      <span className="text-muted-foreground flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {tenant.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {unit ? (
                      <span className="font-medium">{unit.name} <span className="text-muted-foreground font-normal text-sm">({unit.propertyName})</span></span>
                    ) : (
                      <span className="text-muted-foreground italic">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(tenant.paymentStatus)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">
                      <Link href={`/tenants/${tenant.id}`}>
                        Profile <ChevronRight className="w-4 h-4 ml-1" />
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
