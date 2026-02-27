import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("admin@rentflow.com");
  const [password, setPassword] = useState("password123");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Logged in successfully (Demo)",
    });
    setLocation("/");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Left Side: Branding & Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Modern Building" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/90" />
        </div>
        
        <div className="relative z-10 text-white max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-display font-black tracking-tight">RentFlow</h1>
          </div>
          <h2 className="text-5xl font-display font-bold leading-tight mb-6">
            Manage your properties with ease.
          </h2>
          <p className="text-xl text-white/80 font-medium leading-relaxed">
            The all-in-one dashboard for modern property managers and real estate professionals.
          </p>
          
          <div className="mt-12 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <p className="text-sm font-medium italic text-white/90">
              "RentFlow has completely transformed how we handle our 200+ units. The automation is a lifesaver."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20" />
              <div>
                <p className="text-sm font-bold">Sarah Jenkins</p>
                <p className="text-xs text-white/60">Property Director, Urban Living</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-50/50 dark:bg-background">
        <Card className="w-full max-w-md border-none shadow-2xl shadow-black/5 glass-card p-4">
          <CardHeader className="space-y-2 pb-8 text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-6">
               <div className="flex items-center gap-2">
                <Building2 className="w-8 h-8 text-primary" />
                <span className="text-2xl font-black font-display text-primary">RentFlow</span>
              </div>
            </div>
            <CardTitle className="text-3xl font-display font-bold">Welcome back</CardTitle>
            <CardDescription className="text-base">
              Enter your credentials to access the management dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@rentflow.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 focus:ring-primary/20"
                  required 
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="px-0 font-medium text-primary" type="button">
                    Forgot password?
                  </Button>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 focus:ring-primary/20"
                  required 
                />
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all">
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </Button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Button variant="link" className="px-0 font-bold text-primary">
                  Contact Sales
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
