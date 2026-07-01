import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PiggyBank, CheckCircle2, TrendingUp, Calendar, DollarSign, Users, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const enrollSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone required"),
  planType: z.enum(["basic", "standard", "premium"]),
  monthlyAmount: z.string().min(1, "Amount required"),
});

const contributeSchema = z.object({
  email: z.string().email("Valid email required"),
  amount: z.string().min(1, "Amount required"),
});

type EnrollValues = z.infer<typeof enrollSchema>;
type ContributeValues = z.infer<typeof contributeSchema>;

interface SavingsAccount {
  email: string; name: string; phone: string; planType: string;
  monthlyAmount: number; totalSaved: number; enrolledAt: string;
}

const PLANS = [
  { value:"basic", label:"Basic — UGX 20,000/mo", badge:"Starter", color:"bg-green-100 text-green-700" },
  { value:"standard", label:"Standard — UGX 50,000/mo", badge:"Popular", color:"bg-blue-100 text-blue-700" },
  { value:"premium", label:"Premium — UGX 100,000/mo", badge:"Elite", color:"bg-purple-100 text-purple-700" },
];

const MONTHLY: Record<string,number> = { basic:20000, standard:50000, premium:100000 };

export default function Savings() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"enroll"|"contribute"|"check">("enroll");
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [contributeSuccess, setContributeSuccess] = useState(false);
  const [account, setAccount] = useState<SavingsAccount|null>(null);
  const [checkEmail, setCheckEmail] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const enrollForm = useForm<EnrollValues>({
    resolver: zodResolver(enrollSchema),
    defaultValues: { name: user?.name||"", email: user?.email||"", phone: user?.phone||"", planType:"basic", monthlyAmount:"20000" },
  });

  const contribForm = useForm<ContributeValues>({
    resolver: zodResolver(contributeSchema),
    defaultValues: { email: user?.email||"", amount:"" },
  });

  function saveAccount(data: SavingsAccount) {
    localStorage.setItem(`wtyf_savings_${data.email}`, JSON.stringify(data));
  }

  function getAccount(email: string): SavingsAccount|null {
    const s = localStorage.getItem(`wtyf_savings_${email}`);
    return s ? JSON.parse(s) : null;
  }

  async function onEnroll(data: EnrollValues) {
    setLoading(true); setError(null);
    const existing = getAccount(data.email);
    if (existing) { setError("This email already has a savings account."); setLoading(false); return; }
    const acc: SavingsAccount = {
      email: data.email, name: data.name, phone: data.phone,
      planType: data.planType, monthlyAmount: MONTHLY[data.planType],
      totalSaved: 0, enrolledAt: new Date().toISOString(),
    };
    saveAccount(acc);
    setEnrollSuccess(true); setLoading(false);
    // WhatsApp notify
    const msg = encodeURIComponent(`🎉 New WTYF Savings Enrollment!\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nPlan: ${data.planType} (UGX ${MONTHLY[data.planType].toLocaleString()}/mo)`);
    window.open(`https://wa.me/256750414366?text=${msg}`, "_blank");
  }

  async function onContribute(data: ContributeValues) {
    setLoading(true); setError(null);
    const acc = getAccount(data.email);
    if (!acc) { setError("Account not found. Please enroll first."); setLoading(false); return; }
    const amount = parseFloat(data.amount);
    if (isNaN(amount)||amount<=0) { setError("Enter valid amount"); setLoading(false); return; }
    acc.totalSaved += amount;
    saveAccount(acc);
    setContributeSuccess(true); setLoading(false);
    const msg = encodeURIComponent(`💰 WTYF Savings Contribution\nName: ${acc.name}\nEmail: ${acc.email}\nAmount: UGX ${amount.toLocaleString()}\nTotal Saved: UGX ${acc.totalSaved.toLocaleString()}`);
    window.open(`https://wa.me/256750414366?text=${msg}`, "_blank");
  }

  function checkAccount() {
    const acc = getAccount(checkEmail);
    if (acc) { setAccount(acc); setNotFound(false); }
    else { setAccount(null); setNotFound(true); }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary/80 text-white">
        <div className="container px-4 md:px-6 text-center">
          <PiggyBank className="h-14 w-14 mx-auto mb-4 text-accent" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Youth Savings Program</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">Join our community savings program — save consistently, build your future, and support each other's education journey.</p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[["500+","Active Savers"],["UGX 2.4M","Total Saved"],["3","Savings Plans"],["100%","Secure"]]
              .map(([v,l]) => <div key={l} className="bg-white/10 border border-white/20 rounded-xl px-6 py-3 text-center"><p className="text-2xl font-bold text-accent">{v}</p><p className="text-xs text-white/70 mt-1">{l}</p></div>)}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6 max-w-2xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-muted rounded-xl p-1">
            {[["enroll","Enroll"],["contribute","Contribute"],["check","Check Balance"]].map(([k,l]) => (
              <button key={k} onClick={() => { setTab(k as typeof tab); setError(null); setAccount(null); setNotFound(false); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab===k?"bg-white text-primary shadow":"text-muted-foreground hover:text-primary"}`}>
                {l}
              </button>
            ))}
          </div>

          {error && <div className="flex items-center gap-2 bg-destructive/10 text-destructive rounded-lg p-3 mb-4 text-sm"><AlertCircle className="h-4 w-4"/>{error}</div>}

          {/* ENROLL */}
          {tab==="enroll" && !enrollSuccess && (
            <Card className="shadow-xl border-0">
              <CardHeader><CardTitle className="flex items-center gap-2"><PiggyBank className="h-5 w-5 text-primary"/>Enroll in Savings</CardTitle><CardDescription>Join the program and start saving today</CardDescription></CardHeader>
              <CardContent>
                <Form {...enrollForm}>
                  <form onSubmit={enrollForm.handleSubmit(onEnroll)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={enrollForm.control} name="name" render={({field}) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field}/></FormControl><FormMessage/></FormItem>)}/>
                      <FormField control={enrollForm.control} name="email" render={({field}) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field}/></FormControl><FormMessage/></FormItem>)}/>
                    </div>
                    <FormField control={enrollForm.control} name="phone" render={({field}) => (<FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="0750..." {...field}/></FormControl><FormMessage/></FormItem>)}/>
                    <FormField control={enrollForm.control} name="planType" render={({field}) => (
                      <FormItem><FormLabel>Savings Plan</FormLabel>
                        <div className="grid gap-3">
                          {PLANS.map(p => (
                            <div key={p.value} onClick={() => { enrollForm.setValue("planType", p.value as "basic"|"standard"|"premium"); enrollForm.setValue("monthlyAmount", String(MONTHLY[p.value])); }}
                              className={`border-2 rounded-xl p-4 cursor-pointer flex justify-between items-center transition-all ${field.value===p.value?"border-primary bg-primary/5":"border-muted hover:border-primary/40"}`}>
                              <span className="font-medium">{p.label}</span>
                              <Badge className={p.color}>{p.badge}</Badge>
                            </div>
                          ))}
                        </div>
                        <FormMessage/>
                      </FormItem>
                    )}/>
                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Enrolling...</> : "Join Savings Program"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {tab==="enroll" && enrollSuccess && (
            <Card className="shadow-xl border-0 text-center p-8">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4"/>
              <h3 className="text-2xl font-bold text-primary mb-2">Enrolled Successfully!</h3>
              <p className="text-muted-foreground mb-6">Welcome to the WTYF Savings Program. We've sent your details via WhatsApp. Our team will contact you to set up your payment method.</p>
              <Button onClick={() => { setEnrollSuccess(false); enrollForm.reset(); }}>Enroll Another</Button>
            </Card>
          )}

          {/* CONTRIBUTE */}
          {tab==="contribute" && !contributeSuccess && (
            <Card className="shadow-xl border-0">
              <CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary"/>Make a Contribution</CardTitle><CardDescription>Record your monthly savings contribution</CardDescription></CardHeader>
              <CardContent>
                <Form {...contribForm}>
                  <form onSubmit={contribForm.handleSubmit(onContribute)} className="space-y-4">
                    <FormField control={contribForm.control} name="email" render={({field}) => (<FormItem><FormLabel>Your Email</FormLabel><FormControl><Input type="email" {...field}/></FormControl><FormMessage/></FormItem>)}/>
                    <FormField control={contribForm.control} name="amount" render={({field}) => (<FormItem><FormLabel>Amount (UGX)</FormLabel><FormControl><Input type="number" placeholder="e.g. 20000" {...field}/></FormControl><FormMessage/></FormItem>)}/>
                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Processing...</> : "Record Contribution"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {tab==="contribute" && contributeSuccess && (
            <Card className="shadow-xl border-0 text-center p-8">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4"/>
              <h3 className="text-2xl font-bold text-primary mb-2">Contribution Recorded!</h3>
              <p className="text-muted-foreground mb-6">Your contribution has been saved. Our team will confirm via WhatsApp.</p>
              <Button onClick={() => { setContributeSuccess(false); contribForm.reset(); }}>Make Another</Button>
            </Card>
          )}

          {/* CHECK BALANCE */}
          {tab==="check" && (
            <Card className="shadow-xl border-0">
              <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary"/>Check Savings Balance</CardTitle></CardHeader>
              <CardContent>
                <div className="flex gap-3 mb-4">
                  <Input type="email" placeholder="Your email" value={checkEmail} onChange={e=>setCheckEmail(e.target.value)} />
                  <Button onClick={checkAccount}>Check</Button>
                </div>
                {notFound && <div className="text-destructive text-sm text-center py-4">No account found for this email. Please enroll first.</div>}
                {account && (
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between items-center p-4 bg-primary/5 rounded-xl">
                      <span className="text-muted-foreground">Name</span><span className="font-semibold">{account.name}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-accent/10 rounded-xl">
                      <span className="text-muted-foreground">Total Saved</span><span className="font-bold text-xl text-primary">UGX {account.totalSaved.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground">Plan</span><Badge>{account.planType}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground">Monthly</span><span className="font-semibold">UGX {account.monthlyAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground">Enrolled</span><span className="text-sm">{new Date(account.enrolledAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
