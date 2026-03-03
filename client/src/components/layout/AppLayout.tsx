import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  Building2, 
  Users, 
  FileText, 
  Receipt as ReceiptIcon, 
  LayoutDashboard,
  LogIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Units", url: "/units", icon: Building2 },
  { title: "Tenants", url: "/tenants", icon: Users },
  { title: "Invoices", url: "/invoices", icon: FileText },
  { title: "Receipts", url: "/receipts", icon: ReceiptIcon },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-slate-50/50 dark:bg-background overflow-hidden relative">
        {/* Mobile Header - Visible only on mobile */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-display">
              RentFlow
            </h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5"
            onClick={() => setLocation("/")}
          >
            <LogIn className="w-5 h-5 rotate-180" />
          </Button>
        </div>

        {/* Desktop Sidebar - Fixed width, always visible on desktop */}
        <div className="hidden lg:flex w-72 flex-col border-r border-border/50 bg-white dark:bg-card shrink-0">
          <div className="p-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-display leading-none">
                  RentFlow
                </h1>
                <p className="text-[10px] font-black text-muted-foreground mt-1 uppercase tracking-widest opacity-70">
                  Management
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 space-y-8 overflow-y-auto">
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 px-4">
                Main Menu
              </p>
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const active = location === item.url || (item.url !== "/dashboard" && location.startsWith(item.url));
                  return (
                    <Link key={item.title} href={item.url}>
                      <a className={`flex items-center gap-3 px-4 h-12 rounded-2xl font-bold transition-all duration-300 ${
                        active 
                        ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                      }`}>
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </a>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="p-6 border-t border-border/50">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 h-12 rounded-2xl text-slate-500 font-bold hover:text-destructive hover:bg-destructive/5 transition-colors"
              onClick={() => setLocation("/")}
            >
              <LogIn className="w-5 h-5 rotate-180" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 mt-16 lg:mt-0 pb-24 lg:pb-12 bg-slate-50/50">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
          
          {/* Mobile Bottom Navigation - Visible only on mobile */}
          <div className="lg:hidden fixed bottom-6 left-4 right-4 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl px-2 py-3 flex items-center justify-around z-50 ring-1 ring-black/5">
            {navItems.map((item) => {
              const active = location === item.url || (item.url !== "/dashboard" && location.startsWith(item.url));
              return (
                <Link key={item.title} href={item.url} className={`transition-all flex flex-col items-center gap-1.5 flex-1 ${active ? 'text-primary' : 'text-slate-400'}`}>
                  <div className={`p-2 rounded-xl transition-all ${active ? 'bg-primary/10' : ''}`}>
                    <item.icon className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : ''}`} />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-tighter ${active ? 'opacity-100' : 'opacity-70'}`}>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
