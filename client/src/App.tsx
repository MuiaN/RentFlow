import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DataProvider } from "@/context/DataContext";
import NotFound from "@/pages/not-found";

import Dashboard from "@/pages/Dashboard";
import Units from "@/pages/Units";
import Tenants from "@/pages/Tenants";
import TenantProfile from "@/pages/TenantProfile";
import Invoices from "@/pages/Invoices";
import Receipts from "@/pages/Receipts";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/units" component={Units} />
      <Route path="/tenants" component={Tenants} />
      <Route path="/tenants/:id" component={TenantProfile} />
      <Route path="/invoices" component={Invoices} />
      <Route path="/receipts" component={Receipts} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DataProvider>
          <Toaster />
          <Router />
        </DataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
