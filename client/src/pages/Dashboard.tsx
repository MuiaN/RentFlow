import { useData } from "@/context/DataContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, AlertCircle, Banknote, Users } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

export default function Dashboard() {
  const { units, tenants, invoices, receipts } = useData();

  const totalUnits = units.length;
  const occupiedUnits = units.filter(u => u.status === "Occupied").length;
  const occupancyRate = Math.round((occupiedUnits / totalUnits) * 100) || 0;
  
  const totalRevenue = receipts.reduce((sum, r) => sum + r.amountPaid, 0);
  const overdueAmount = invoices
    .filter(i => i.status === "Overdue")
    .reduce((sum, i) => sum + i.amount, 0);

  // Mock chart data representing last 6 months
  const chartData = [
    { name: 'Jan', revenue: 4200 },
    { name: 'Feb', revenue: 4800 },
    { name: 'Mar', revenue: 5100 },
    { name: 'Apr', revenue: 4900 },
    { name: 'May', revenue: totalRevenue },
  ];

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-3xl font-display font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-1 text-lg">Welcome back. Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-elevate border-none shadow-md shadow-black/5 bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Total Units
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Building2 className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold">{totalUnits}</div>
              <p className="text-sm text-muted-foreground mt-1 font-medium">
                {occupancyRate}% occupancy rate
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate border-none shadow-md shadow-black/5 bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Active Tenants
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Users className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold">{tenants.length}</div>
              <p className="text-sm text-muted-foreground mt-1 font-medium">
                Across {occupiedUnits} properties
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate border-none shadow-md shadow-black/5 bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Collected Revenue
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Banknote className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-sm text-emerald-600 mt-1 font-medium flex items-center gap-1">
                ↑ 4.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate border-none shadow-md shadow-black/5 bg-gradient-to-br from-white to-red-50/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Overdue Amount
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <AlertCircle className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold text-red-600">
                ${overdueAmount.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mt-1 font-medium">
                Requires attention
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <Card className="lg:col-span-2 border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display">Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13 }} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => [`$${value}`, 'Revenue']}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Action Items List */}
          <Card className="border-border/50 shadow-sm flex flex-col">
            <CardHeader className="border-b border-border/50 bg-slate-50/50">
              <CardTitle className="font-display flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" /> Action Required
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="divide-y divide-border/50">
                {invoices.filter(i => i.status === "Overdue").length > 0 ? (
                  invoices.filter(i => i.status === "Overdue").map((invoice) => {
                    const tenant = tenants.find(t => t.id === invoice.tenantId);
                    return (
                      <div key={invoice.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div>
                          <p className="font-semibold text-foreground">{tenant?.name || "Unknown Tenant"}</p>
                          <p className="text-sm text-muted-foreground">{invoice.month} Rent</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-600">${invoice.amount}</p>
                          <Badge variant="outline" className="mt-1 bg-red-50 text-red-700 border-red-200">Overdue</Badge>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-muted-foreground flex flex-col items-center justify-center h-full">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
                      <Banknote className="w-6 h-6" />
                    </div>
                    <p className="font-medium">All caught up!</p>
                    <p className="text-sm mt-1">No overdue invoices found.</p>
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
