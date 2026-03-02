import { useData } from "@/context/DataContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    { name: 'Jan', revenue: 425000 },
    { name: 'Feb', revenue: 480000 },
    { name: 'Mar', revenue: 510000 },
    { name: 'Apr', revenue: 490000 },
    { name: 'May', revenue: totalRevenue },
  ];

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-1 text-base lg:text-lg">Welcome back. Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="hover-elevate border-none shadow-xl shadow-black/5 bg-white/80 backdrop-blur-sm rounded-2xl p-0 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4 space-y-0">
              <CardTitle className="text-[10px] lg:text-xs font-black text-muted-foreground uppercase tracking-[0.15em]">
                Total Units
              </CardTitle>
              <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                <Building2 className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-4 px-4">
              <div className="text-2xl lg:text-4xl font-display font-black tracking-tighter">{totalUnits}</div>
              <p className="hidden lg:block text-sm text-muted-foreground mt-2 font-semibold">
                <span className="text-blue-600 font-black">{occupancyRate}%</span> occupancy
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate border-none shadow-xl shadow-black/5 bg-white/80 backdrop-blur-sm rounded-2xl p-0 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4 space-y-0">
              <CardTitle className="text-[10px] lg:text-xs font-black text-muted-foreground uppercase tracking-[0.15em]">
                Tenants
              </CardTitle>
              <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                <Users className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-4 px-4">
              <div className="text-2xl lg:text-4xl font-display font-black tracking-tighter">{tenants.length}</div>
              <p className="hidden lg:block text-sm text-muted-foreground mt-2 font-semibold">
                Across <span className="text-indigo-600 font-black">{occupiedUnits}</span> properties
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate border-none shadow-xl shadow-black/5 bg-white/80 backdrop-blur-sm rounded-2xl p-0 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4 space-y-0">
              <CardTitle className="text-[10px] lg:text-xs font-black text-muted-foreground uppercase tracking-[0.15em]">
                Revenue
              </CardTitle>
              <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                <Banknote className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-4 px-4">
              <div className="text-xl lg:text-4xl font-display font-black tracking-tighter">KSh {totalRevenue.toLocaleString()}</div>
              <p className="hidden lg:block text-sm text-emerald-600 mt-2 font-black">
                ↑ 4.2% <span className="text-muted-foreground font-semibold">vs last month</span>
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate border-none shadow-xl shadow-black/5 bg-white/80 backdrop-blur-sm rounded-2xl p-0 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4 space-y-0">
              <CardTitle className="text-[10px] lg:text-xs font-black text-muted-foreground uppercase tracking-[0.15em]">
                Overdue
              </CardTitle>
              <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shadow-inner">
                <AlertCircle className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-4 px-4">
              <div className="text-xl lg:text-4xl font-display font-black tracking-tighter text-rose-600">
                KSh {overdueAmount.toLocaleString()}
              </div>
              <p className="hidden lg:block text-sm text-muted-foreground mt-2 font-semibold">
                Priority attention
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Chart */}
          <Card className="lg:col-span-2 border-none shadow-xl shadow-black/5 bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/30 p-4 lg:p-8">
              <CardTitle className="font-display text-xl lg:text-2xl font-black tracking-tight">Revenue Overview</CardTitle>
              <CardDescription className="text-sm lg:text-base font-medium">Monthly collection trends for 2024</CardDescription>
            </CardHeader>
            <CardContent className="p-4 lg:p-8">
              <div className="h-[250px] lg:h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                    <defs>
                      <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                      dy={15} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                      tickFormatter={(value) => `KSh ${value/1000}k`} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '20px', 
                        border: 'none', 
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                        padding: '16px'
                      }}
                      itemStyle={{ fontWeight: 800, color: 'hsl(var(--primary))' }}
                      labelStyle={{ fontWeight: 600, marginBottom: '4px', color: '#64748b' }}
                      formatter={(value: number) => [`KSh ${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={5} 
                      dot={{ r: 6, fill: 'white', strokeWidth: 3, stroke: 'hsl(var(--primary))' }} 
                      activeDot={{ r: 8, strokeWidth: 0, fill: 'hsl(var(--accent))' }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Action Items List */}
          <Card className="border-none shadow-xl shadow-black/5 bg-white/80 backdrop-blur-sm rounded-3xl flex flex-col overflow-hidden">
            <CardHeader className="border-b border-rose-100 bg-rose-50/30 p-8">
              <CardTitle className="font-display text-2xl font-black tracking-tight flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                Action Required
              </CardTitle>
              <CardDescription className="text-rose-600/70 font-bold">Priority notifications</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="divide-y divide-slate-100">
                {invoices.filter(i => i.status === "Overdue").length > 0 ? (
                  invoices.filter(i => i.status === "Overdue").map((invoice) => {
                    const tenant = tenants.find(t => t.id === invoice.tenantId);
                    return (
                      <div key={invoice.id} className="p-6 flex items-center justify-between hover:bg-rose-50/30 transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-rose-100 group-hover:text-rose-500 transition-colors">
                            {tenant?.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-slate-900 leading-none mb-1">{tenant?.name || "Unknown Tenant"}</p>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{invoice.month} Rent</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-rose-600 text-lg">KSh {invoice.amount.toLocaleString()}</p>
                          <Badge className="mt-1 bg-rose-100 text-rose-700 border-none font-bold rounded-lg px-2 text-[10px]">OVERDUE</Badge>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center h-full">
                    <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6 shadow-inner">
                      <Banknote className="w-10 h-10" />
                    </div>
                    <p className="text-xl font-black text-slate-900 tracking-tight">All caught up!</p>
                    <p className="text-sm font-medium mt-2 max-w-[180px]">No overdue invoices currently require your attention.</p>
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
