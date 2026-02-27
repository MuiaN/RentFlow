import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  Building2, 
  Users, 
  FileText, 
  Receipt as ReceiptIcon, 
  LayoutDashboard 
} from "lucide-react";
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
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Units", url: "/units", icon: Building2 },
  { title: "Tenants", url: "/tenants", icon: Users },
  { title: "Invoices", url: "/invoices", icon: FileText },
  { title: "Receipts", url: "/receipts", icon: ReceiptIcon },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-slate-50/50 dark:bg-background overflow-hidden">
        <Sidebar variant="sidebar" className="border-r border-border/50">
          <SidebarContent>
            <div className="p-6 mb-2">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-display">
                Ren
              </h1>
              <p className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-wider">
                Property Management
              </p>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase">
                Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location === item.url || (item.url !== "/" && location.startsWith(item.url))}
                        className="my-1 rounded-xl transition-all duration-200 font-medium"
                      >
                        <Link href={item.url} className="flex items-center gap-3 px-3 py-2.5">
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
