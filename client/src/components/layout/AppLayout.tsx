import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  Building2, 
  Users, 
  FileText, 
  Receipt as ReceiptIcon, 
  LayoutDashboard,
  LogIn,
  Menu,
  X
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
  SidebarTrigger,
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
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-display">
              RentFlow
            </h1>
          </div>
          <SidebarTrigger>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Menu className="w-6 h-6" />
            </Button>
          </SidebarTrigger>
        </div>

        <Sidebar variant="sidebar" className="border-r border-border/50">
          <SidebarContent>
            <div className="p-6 mb-2 hidden lg:block">
              <div className="flex items-center gap-2">
                <Building2 className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-display">
                  RentFlow
                </h1>
              </div>
              <p className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-widest opacity-70">
                Property Management
              </p>
            </div>

            {/* Mobile Sidebar Close Button */}
            <div className="lg:hidden p-6 flex justify-between items-center border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                <span className="font-bold font-display">RentFlow</span>
              </div>
              <SidebarTrigger>
                <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </SidebarTrigger>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2 px-4 pt-4 lg:pt-0">
                Main Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location === item.url || (item.url !== "/dashboard" && location.startsWith(item.url))}
                        className="my-1 rounded-2xl transition-all duration-300 font-semibold h-11 px-4 hover:bg-primary/5 data-[active=true]:bg-primary data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-primary/20"
                      >
                        <Link href={item.url} className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <div className="mt-auto p-4 border-t border-border/50">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 h-11 rounded-2xl text-muted-foreground hover:text-destructive hover:bg-destructive/5"
              onClick={() => setLocation("/")}
            >
              <LogIn className="w-5 h-5 rotate-180" />
              <span className="font-semibold">Sign Out</span>
            </Button>
          </div>
        </Sidebar>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 mt-16 lg:mt-0">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
          
          {/* Mobile Bottom Navigation (Optional but nice for App feel) */}
          <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-full px-6 py-3 flex items-center gap-8 z-50 ring-1 ring-black/5">
            {navItems.slice(0, 4).map((item) => {
              const active = location === item.url || (item.url !== "/dashboard" && location.startsWith(item.url));
              return (
                <Link key={item.title} href={item.url} className={`transition-all ${active ? 'text-primary scale-110' : 'text-slate-400'}`}>
                  <item.icon className="w-6 h-6" />
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
