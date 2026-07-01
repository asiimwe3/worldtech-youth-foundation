import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Loader2, Globe, LogIn, UserPlus, Eye, EyeOff, Shield, TrendingUp, PiggyBank } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

// ── Schemas ───────────────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(1, "Password required"),
});
const signupSchema = z.object({
  name: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Minimum 8 characters"),
  confirmPassword: z.string(),
  phone: z.string().optional(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;

function PasswordField({ control, name, label, placeholder }: {
  control: any; name: any; label: string; placeholder: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <FormField control={control} name={name} render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <div className="relative">
            <Input type={show ? "text" : "password"} placeholder={placeholder} {...field} className="pr-10" />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  );
}

export default function AuthPage() {
  const [, navigate] = useLocation();
  const { login, signup, user } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  // Already logged in → redirect
  if (user) {
    navigate("/dashboard");
    return null;
  }

  const loginForm = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });
  const signupForm = useForm<SignupValues>({ resolver: zodResolver(signupSchema), defaultValues: { name: "", email: "", password: "", confirmPassword: "", phone: "" } });

  async function onLogin(data: LoginValues) {
    setLoginError(null);
    setLoginLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoginLoading(false);
    }
  }

  async function onSignup(data: SignupValues) {
    setSignupError(null);
    setSignupLoading(true);
    try {
      await signup(data.name, data.email, data.password, data.phone);
      navigate("/dashboard");
    } catch (err) {
      setSignupError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setSignupLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-secondary flex-col justify-center px-16 text-primary-foreground">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <Globe className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xl font-bold">WorldTech</p>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">Youth Foundation</p>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 leading-tight">Your Gateway to<br />Financial Freedom</h1>
        <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
          Create an account to manage your savings portfolio, track contributions, and unlock exclusive program benefits.
        </p>
        <div className="space-y-5">
          {[
            { icon: <PiggyBank className="h-5 w-5 text-accent" />, title: "Track Your Savings", desc: "Monitor balances, contributions, and interest earned in real time." },
            { icon: <TrendingUp className="h-5 w-5 text-accent" />, title: "Invest & Grow", desc: "Access investment packages with up to 15% annual returns." },
            { icon: <Shield className="h-5 w-5 text-accent" />, title: "Secure & Private", desc: "Your data is encrypted and isolated. Only you see your account." },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-4 bg-white/10 border border-white/20 rounded-xl p-4">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">{f.icon}</div>
              <div>
                <p className="font-semibold">{f.title}</p>
                <p className="text-sm text-primary-foreground/70">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Globe className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-primary">WorldTech Youth Foundation</span>
          </div>

          <Tabs defaultValue="login">
            <TabsList className="w-full mb-6 bg-muted border border-border">
              <TabsTrigger value="login" className="flex-1 gap-2"><LogIn className="h-4 w-4" /> Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="flex-1 gap-2"><UserPlus className="h-4 w-4" /> Create Account</TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login">
              <Card className="border-border shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">Welcome back</CardTitle>
                  <CardDescription>Sign in to access your savings dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  {loginError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{loginError}</div>
                  )}
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                      <FormField control={loginForm.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input type="email" placeholder="you@example.com" autoComplete="email" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <PasswordField control={loginForm.control} name="password" label="Password" placeholder="Your password" />
                      <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground" disabled={loginLoading}>
                        {loginLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in…</> : "Sign In"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Signup */}
            <TabsContent value="signup">
              <Card className="border-border shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">Create your account</CardTitle>
                  <CardDescription>Join WorldTech and start saving today — free to sign up</CardDescription>
                </CardHeader>
                <CardContent>
                  {signupError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{signupError}</div>
                  )}
                  <Form {...signupForm}>
                    <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                      <FormField control={signupForm.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input placeholder="Amara Nakato" autoComplete="name" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={signupForm.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input type="email" placeholder="you@example.com" autoComplete="email" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={signupForm.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone <span className="text-muted-foreground text-xs">(optional)</span></FormLabel>
                          <FormControl><Input type="tel" placeholder="+256 7XX XXX XXX" autoComplete="tel" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <PasswordField control={signupForm.control} name="password" label="Password" placeholder="Min. 8 characters" />
                      <PasswordField control={signupForm.control} name="confirmPassword" label="Confirm Password" placeholder="Repeat password" />
                      <Button type="submit" className="w-full h-11 bg-secondary text-secondary-foreground" disabled={signupLoading}>
                        {signupLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating account…</> : "Create Free Account"}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        By signing up you agree to WorldTech's mission of empowering Uganda's youth through digital skills.
                      </p>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
