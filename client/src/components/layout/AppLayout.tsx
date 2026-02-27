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
      <div className="flex h-screen w-full bg-slate-50/50 dark:bg-background overflow-hidden">
        <Sidebar variant="sidebar" className="border-r border-border/50">
          <SidebarContent>
            <div className="p-6 mb-2">
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
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2 px-4">
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
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
