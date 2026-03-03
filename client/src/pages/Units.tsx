import { useState } from "react";
import { useData } from "@/context/DataContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Home, Plus, Users } from "lucide-react";

export default function Units() {
  const { units, tenants, assignTenant, addUnit } = useData();
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [selectedTenant, setSelectedTenant] = useState<string>("");
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [addUnitDialogOpen, setAddUnitDialogOpen] = useState(false);

  // New unit form state
  const [newUnit, setNewUnit] = useState({
    name: "",
    propertyName: "",
    type: "1 Bedroom",
    rentAmount: 0,
  });

  const unassignedTenants = tenants.filter(t => !t.assignedUnitId);

  const handleAssign = () => {
    if (selectedUnit && selectedTenant) {
      assignTenant(selectedUnit, selectedTenant);
      setAssignDialogOpen(false);
      setSelectedTenant("");
    }
  };

  const handleAddUnit = (e: React.FormEvent) => {
    e.preventDefault();
    addUnit({
      ...newUnit,
      status: "Vacant",
      assignedTenantId: null,
    });
    setAddUnitDialogOpen(false);
    setNewUnit({ name: "", propertyName: "", type: "1 Bedroom", rentAmount: 0 });
  };

  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold">Properties & Units</h2>
          <p className="text-muted-foreground mt-1">Manage your real estate portfolio.</p>
        </div>
        <Dialog open={addUnitDialogOpen} onOpenChange={setAddUnitDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl px-6 h-11">
              <Plus className="w-4 h-4 mr-2" /> Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-display">Add New Property Unit</DialogTitle>
              <DialogDescription>
                Enter the details for the new rental unit.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddUnit} className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Unit Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Unit A1" 
                  value={newUnit.name} 
                  onChange={e => setNewUnit(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="propertyName">Property Name</Label>
                <Input 
                  id="propertyName" 
                  placeholder="e.g. Riverside Court" 
                  value={newUnit.propertyName} 
                  onChange={e => setNewUnit(prev => ({ ...prev, propertyName: e.target.value }))}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Unit Type</Label>
                  <Select value={newUnit.type} onValueChange={v => setNewUnit(prev => ({ ...prev, type: v }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Studio">Studio</SelectItem>
                      <SelectItem value="1 Bedroom">1 Bedroom</SelectItem>
                      <SelectItem value="2 Bedroom">2 Bedroom</SelectItem>
                      <SelectItem value="3 Bedroom">3 Bedroom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rent">Monthly Rent (KSh)</Label>
                  <Input 
                    id="rent" 
                    type="number" 
                    value={newUnit.rentAmount} 
                    onChange={e => setNewUnit(prev => ({ ...prev, rentAmount: parseInt(e.target.value) }))}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full h-12 rounded-xl font-bold">Create Unit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="hidden lg:block">
        <Card className="border-none lg:border-border/50 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm rounded-xl">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 pl-6">Unit</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14">Property</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14">Type</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14">Rent</TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14">Status</TableHead>
                <TableHead className="text-right font-bold text-muted-foreground uppercase tracking-widest text-[10px] h-14 pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => {
                const assignedTenant = tenants.find(t => t.id === unit.assignedTenantId);
                return (
                  <TableRow key={unit.id} className="hover:bg-slate-50/80 transition-all group">
                    <TableCell className="pl-6 py-5 font-bold text-slate-900">{unit.name}</TableCell>
                    <TableCell className="py-5 font-medium text-slate-600">{unit.propertyName}</TableCell>
                    <TableCell className="py-5 text-muted-foreground font-medium">{unit.type}</TableCell>
                    <TableCell className="py-5 font-bold text-slate-800">KSh {unit.rentAmount.toLocaleString()}/mo</TableCell>
                    <TableCell className="py-5">
                      {unit.status === "Occupied" ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-none shadow-none font-bold rounded-lg px-3 py-1">
                          OCCUPIED
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-50 text-amber-700 border-none shadow-none font-bold rounded-lg px-3 py-1">
                          VACANT
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6 py-5">
                      {unit.status === "Vacant" ? (
                        <Dialog open={assignDialogOpen && selectedUnit === unit.id} onOpenChange={(open) => {
                          setAssignDialogOpen(open);
                          if(open) setSelectedUnit(unit.id);
                        }}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="rounded-xl font-bold shadow-sm border-primary/20 text-primary hover:bg-primary hover:text-white transition-all">
                              <UserPlus className="w-4 h-4 mr-2" /> Assign
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md rounded-2xl">
                            <DialogHeader>
                              <DialogTitle className="font-display text-2xl font-black">Assign Tenant</DialogTitle>
                              <DialogDescription className="font-medium">
                                Select an unassigned tenant for {unit.name} at {unit.propertyName}.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-6">
                              {unassignedTenants.length > 0 ? (
                                <div className="space-y-4">
                                  <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                      <SelectValue placeholder="Select a tenant..." />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                      {unassignedTenants.map(t => (
                                        <SelectItem key={t.id} value={t.id} className="rounded-lg">{t.name}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Button 
                                    className="w-full h-12 rounded-xl text-md font-black bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" 
                                    onClick={handleAssign}
                                    disabled={!selectedTenant}
                                  >
                                    Confirm Assignment
                                  </Button>
                                </div>
                              ) : (
                                <div className="text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                  <p className="text-muted-foreground font-medium">No unassigned tenants available.</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <div className="text-sm font-black text-slate-900 flex items-center justify-end gap-3 transition-transform">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500 shadow-inner">
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
      </div>

      <div className="lg:hidden space-y-4">
        {units.map((unit) => {
          const assignedTenant = tenants.find(t => t.id === unit.assignedTenantId);
          return (
            <Card key={unit.id} className="border-none shadow-xl bg-white rounded-2xl p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-black text-slate-900 text-lg leading-tight">{unit.name}</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{unit.propertyName}</p>
                </div>
                {unit.status === "Occupied" ? (
                  <Badge className="bg-emerald-50 text-emerald-700 border-none font-black text-[8px] rounded-md px-2 py-0.5">OCCUPIED</Badge>
                ) : (
                  <Badge className="bg-amber-50 text-amber-700 border-none font-black text-[8px] rounded-md px-2 py-0.5">VACANT</Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 mb-4">
                <div>
                  <span className="text-[8px] font-black text-muted-foreground uppercase tracking-tighter">Unit Type</span>
                  <p className="text-xs font-bold text-slate-700">{unit.type}</p>
                </div>
                <div>
                  <span className="text-[8px] font-black text-muted-foreground uppercase tracking-tighter">Monthly Rent</span>
                  <p className="text-xs font-black text-primary">KSh {unit.rentAmount.toLocaleString()}</p>
                </div>
              </div>
              {unit.status === "Vacant" ? (
                <Button 
                  onClick={() => {
                    setSelectedUnit(unit.id);
                    setAssignDialogOpen(true);
                  }}
                  className="w-full h-11 rounded-xl font-bold bg-primary shadow-lg shadow-primary/20"
                >
                  Assign Tenant
                </Button>
              ) : (
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-xs font-black text-slate-400 border border-slate-100">
                    {assignedTenant?.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-muted-foreground uppercase tracking-tighter leading-none">Occupied by</span>
                    <p className="text-xs font-bold text-slate-900">{assignedTenant?.name}</p>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}
