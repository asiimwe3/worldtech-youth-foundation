import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Users, PiggyBank, Heart, TrendingUp, LogOut, Settings, BookOpen, MapPin, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

interface SavingsAccount { email:string; name:string; planType:string; monthlyAmount:number; totalSaved:number; enrolledAt:string; }

function getAllSavings(): SavingsAccount[] {
  const accounts: SavingsAccount[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("wtyf_savings_")) {
      try { accounts.push(JSON.parse(localStorage.getItem(key)!)); } catch {}
    }
  }
  return accounts;
}

function getAllMembers() {
  const members: { name:string; email:string; role:string }[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("wtyf_member_")) {
      try {
        const m = JSON.parse(localStorage.getItem(key)!);
        members.push({ name: m.name, email: m.email, role: m.role || "member" });
      } catch {}
    }
  }
  return members;
}

export default function Dashboard() {
  const { user, logout, isAdmin } = useAuth();
  const [, navigate] = useLocation();
  const [savings, setSavings] = useState<SavingsAccount[]>([]);
  const [members, setMembers] = useState<{ name:string; email:string; role:string }[]>([]);
  const [myAccount, setMyAccount] = useState<SavingsAccount|null>(null);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    if (isAdmin) {
      setSavings(getAllSavings());
      setMembers(getAllMembers());
    } else if (user.email) {
      const acc = localStorage.getItem(`wtyf_savings_${user.email}`);
      if (acc) setMyAccount(JSON.parse(acc));
    }
  }, [user, isAdmin, navigate]);

  if (!user) return null;

  const totalSaved = savings.reduce((s, a) => s + a.totalSaved, 0);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container px-4 md:px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-primary">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={isAdmin ? "bg-primary text-white" : "bg-accent text-accent-foreground"}>
              {isAdmin ? "Admin" : "Member"}
            </Badge>
            <Button variant="ghost" size="sm" onClick={async () => { await logout(); navigate("/"); }}>
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-8">
        {isAdmin ? (
          <>
            {/* Admin Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label:"Total Members", value:members.length, icon:<Users className="h-5 w-5 text-primary"/>, color:"text-primary" },
                { label:"Savings Accounts", value:savings.length, icon:<PiggyBank className="h-5 w-5 text-accent"/>, color:"text-accent" },
                { label:"Total Saved", value:`UGX ${totalSaved.toLocaleString()}`, icon:<TrendingUp className="h-5 w-5 text-green-600"/>, color:"text-green-600" },
                { label:"Active Programs", value:"3", icon:<BookOpen className="h-5 w-5 text-secondary"/>, color:"text-secondary" },
              ].map(kpi => (
                <Card key={kpi.label} className="border-0 shadow-md">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-2 mb-2">{kpi.icon}<span className="text-xs text-muted-foreground">{kpi.label}</span></div>
                    <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Savings Accounts */}
            <Card className="border-0 shadow-md mb-6">
              <CardHeader><CardTitle className="flex items-center gap-2"><PiggyBank className="h-5 w-5"/>Savings Accounts ({savings.length})</CardTitle></CardHeader>
              <CardContent>
                {savings.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No savings accounts yet</p>
                ) : (
                  <div className="space-y-3">
                    {savings.map(acc => (
                      <div key={acc.email} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                        <div>
                          <p className="font-semibold text-sm">{acc.name}</p>
                          <p className="text-xs text-muted-foreground">{acc.email} • {acc.planType}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary text-sm">UGX {acc.totalSaved.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">saved</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Members */}
            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/>Registered Members ({members.length})</CardTitle></CardHeader>
              <CardContent>
                {members.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No registered members yet</p>
                ) : (
                  <div className="space-y-3">
                    {members.map(m => (
                      <div key={m.email} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                        <div>
                          <p className="font-semibold text-sm">{m.name}</p>
                          <p className="text-xs text-muted-foreground">{m.email}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{m.role}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Member Dashboard */}
            <div className="max-w-2xl mx-auto space-y-6">
              <Card className="border-0 shadow-md bg-gradient-to-br from-primary to-primary/80 text-white">
                <CardContent className="pt-6 pb-6">
                  <p className="text-white/70 text-sm mb-1">Your Profile</p>
                  <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                  <div className="flex items-center gap-1 text-white/70 text-sm mb-3"><Mail className="h-3 w-3"/>{user.email}</div>
                  {user.phone && <div className="flex items-center gap-1 text-white/70 text-sm"><Phone className="h-3 w-3"/>{user.phone}</div>}
                  <div className="mt-4 flex gap-2">
                    <Badge className="bg-white/20 text-white border-0">{user.planType}</Badge>
                    <Badge className="bg-accent/80 text-accent-foreground border-0">{user.role}</Badge>
                  </div>
                </CardContent>
              </Card>

              {myAccount ? (
                <Card className="border-0 shadow-md">
                  <CardHeader><CardTitle className="flex items-center gap-2"><PiggyBank className="h-5 w-5 text-primary"/>My Savings</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {[["Total Saved",`UGX ${myAccount.totalSaved.toLocaleString()}`],["Plan",myAccount.planType],["Monthly",`UGX ${myAccount.monthlyAmount.toLocaleString()}`],["Enrolled",new Date(myAccount.enrolledAt).toLocaleDateString()]].map(([l,v]) => (
                      <div key={l} className="flex justify-between p-3 bg-muted rounded-xl">
                        <span className="text-muted-foreground text-sm">{l}</span><span className="font-semibold text-sm">{v}</span>
                      </div>
                    ))}
                    <Button asChild className="w-full mt-4"><a href="/savings">Make Contribution</a></Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-md text-center p-8">
                  <PiggyBank className="h-12 w-12 text-muted-foreground mx-auto mb-3"/>
                  <h3 className="font-bold text-lg mb-2">No Savings Account Yet</h3>
                  <p className="text-muted-foreground text-sm mb-4">Join our savings program to start building your future.</p>
                  <Button asChild><a href="/savings">Join Savings Program</a></Button>
                </Card>
              )}

              <Card className="border-0 shadow-md">
                <CardHeader><CardTitle>Quick Links</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  {[["📚 Programs","/programs"],["💰 Savings","/savings"],["🤝 Fundraising","/fundraising"],["📋 About Us","/about"]].map(([l,h]) => (
                    <Button key={h} variant="outline" asChild className="h-12"><a href={h}>{l}</a></Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
