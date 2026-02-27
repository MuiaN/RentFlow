import { useState } from "react";
import { useData } from "@/context/DataContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  Body,
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
import { UserPlus, Home } from "lucide-react";

export default function Units() {
  const { units, tenants, assignTenant } = useData();
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [selectedTenant, setSelectedTenant] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const unassignedTenants = tenants.filter(t => !t.assignedUnitId);

  const handleAssign = () => {
    if (selectedUnit && selectedTenant) {
      assignTenant(selectedUnit, selectedTenant);
      setDialogOpen(false);
      setSelectedTenant("");
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold">Properties & Units</h2>
          <p className="text-muted-foreground mt-1">Manage your real estate portfolio.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl px-6 h-11">
          <Home className="w-4 h-4 mr-2" /> Add Property
        </Button>
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80">
            <TableRow>
              <TableHead className="font-semibold text-muted-foreground">Unit</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Property</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Type</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Rent</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
              <TableHead className="text-right font-semibold text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units.map((unit) => {
              const assignedTenant = tenants.find(t => t.id === unit.assignedTenantId);
              
              return (
                <TableRow key={unit.id} className="hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="font-medium text-foreground py-4">{unit.name}</TableCell>
                  <TableCell>{unit.propertyName}</TableCell>
                  <TableCell className="text-muted-foreground">{unit.type}</TableCell>
                  <TableCell className="font-semibold">${unit.rentAmount.toLocaleString()}/mo</TableCell>
                  <TableCell>
                    {unit.status === "Occupied" ? (
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm">
                        Occupied
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 shadow-sm">
                        Vacant
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {unit.status === "Vacant" ? (
                      <Dialog open={dialogOpen && selectedUnit === unit.id} onOpenChange={(open) => {
                        setDialogOpen(open);
                        if(open) setSelectedUnit(unit.id);
                      }}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="rounded-lg shadow-sm border-primary/20 text-primary hover:bg-primary/5 hover:text-primary">
                            <UserPlus className="w-4 h-4 mr-2" /> Assign
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md rounded-2xl">
                          <DialogHeader>
                            <DialogTitle className="font-display text-xl">Assign Tenant</DialogTitle>
                            <DialogDescription>
                              Select an unassigned tenant for {unit.name} at {unit.propertyName}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-6">
                            {unassignedTenants.length > 0 ? (
                              <div className="space-y-4">
                                <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                                  <SelectTrigger className="h-12 rounded-xl">
                                    <SelectValue placeholder="Select a tenant..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {unassignedTenants.map(t => (
                                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Button 
                                  className="w-full h-12 rounded-xl text-md font-semibold bg-primary hover:bg-primary/90" 
                                  onClick={handleAssign}
                                  disabled={!selectedTenant}
                                >
                                  Confirm Assignment
                                </Button>
                              </div>
                            ) : (
                              <div className="text-center p-4 bg-slate-50 rounded-xl border border-border">
                                <p className="text-muted-foreground">No unassigned tenants available.</p>
                                <Button variant="link" className="mt-2 text-primary">Add a new tenant first</Button>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <div className="text-sm font-medium text-slate-600 flex items-center justify-end gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                          {assignedTenant?.name.charAt(0)}
                        </div>
                        {assignedTenant?.name}
                      </div>
                    )}
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
