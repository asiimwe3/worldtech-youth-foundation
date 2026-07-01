import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heart, Building2, Calendar, Trophy, CheckCircle2, AlertCircle, Globe, TrendingUp, Handshake, Mail, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const donationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  amount: z.string().min(1, "Please select an amount"),
  customAmount: z.string().optional(),
  type: z.enum(["monthly", "one-time"]),
  currency: z.enum(["USD", "UGX"]),
  message: z.string().max(500).optional(),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const PESAPAL_CONSUMER_KEY = import.meta.env.VITE_PESAPAL_CONSUMER_KEY;
const WHATSAPP_NUMBER = "256750414366";

export default function Fundraising() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const paymentStatus = params.get("payment");

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      name: "", email: "", phone: "", amount: "50",
      customAmount: "", type: "one-time", currency: "USD", message: "",
    },
  });

  const isCustomAmount = form.watch("amount") === "custom";
  const currency = form.watch("currency");

  const amountTiers = currency === "UGX"
    ? [{ val:"50000",label:"UGX 50K",desc:"Friend" },{ val:"100000",label:"UGX 100K",desc:"Supporter" },{ val:"250000",label:"UGX 250K",desc:"Champion" },{ val:"500000",label:"UGX 500K",desc:"Partner" }]
    : [{ val:"25",label:"$25",desc:"Friend" },{ val:"50",label:"$50",desc:"Supporter" },{ val:"100",label:"$100",desc:"Champion" },{ val:"500",label:"$500",desc:"Partner" }];

  async function onSubmit(data: DonationFormValues) {
    setLoading(true); setError(null);
    const finalAmount = data.amount === "custom" ? data.customAmount : data.amount;
    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      setError("Please enter a valid donation amount."); setLoading(false); return;
    }
    // Try PesaPal API via Vercel serverless if available, else WhatsApp fallback
    try {
      const res = await fetch("/api/pesapal/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, amount: parseFloat(finalAmount), currency: data.currency }),
      });
      if (res.ok) {
        const { redirectUrl } = await res.json() as { redirectUrl: string };
        window.location.href = redirectUrl;
        return;
      }
    } catch {}
    // Fallback: WhatsApp donation intent
    const msg = encodeURIComponent(`Hello WorldTech Youth Foundation! I'd like to donate ${currency} ${finalAmount} (${data.type}).\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "N/A"}\n${data.message ? "Message: " + data.message : ""}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
    setLoading(false);
  }

  const fundingStreams = [
    { icon: <Globe className="h-6 w-6 text-primary" />, title: "Philanthropic Donations", desc: "Individual and institutional donors directly fund student cohorts, hardware, and curriculum development." },
    { icon: <Handshake className="h-6 w-6 text-secondary" />, title: "Corporate Sponsorships", desc: "CSR partnerships with tech companies for matching gifts, hardware donations, and employee mentorship programs." },
    { icon: <TrendingUp className="h-6 w-6 text-accent" />, title: "International Development Grants", desc: "Bilateral development grants and foundational donor networks seeking high-yield, verifiable humanitarian returns." },
    { icon: <Building2 className="h-6 w-6 text-primary" />, title: "Social Enterprise Revenue", desc: "Our in-house digital production agency uses senior students to execute paid outsourcing contracts, reinvesting into free cohorts." },
  ];

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
        <Card className="max-w-md w-full text-center p-8 shadow-xl">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">Thank You!</h2>
          <p className="text-muted-foreground mb-6">Your donation is confirmed. You're helping change lives in Kyenjojo, Uganda.</p>
          <Button asChild><a href="/">Back to Home</a></Button>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
        <Card className="max-w-md w-full text-center p-8 shadow-xl">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">Donation Request Sent!</h2>
          <p className="text-muted-foreground mb-2">We've opened WhatsApp to complete your donation. Our team will confirm your payment within 24 hours.</p>
          <p className="text-sm text-muted-foreground mb-6">You can also email us at <span className="font-semibold">info@worldtechfoundation.org</span></p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="mr-2">Make Another</Button>
          <Button asChild><a href="/">Back to Home</a></Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary/90 to-secondary/80 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-10" />
        <div className="container relative px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Heart className="h-4 w-4 text-accent" /> Support Our Mission
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Invest in Africa's <span className="text-accent">Tech Future</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">Your contribution directly funds digital education, vocational training, and entrepreneurship programs for youth in Kyenjojo, Uganda.</p>
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[["$150","trains one student for 3 months"],["$500","funds a full semester cohort"],["$2,000","equips a full computer lab station"],["$10,000","sponsors an entire annual cohort"]].map(([amt,desc]) => (
              <div key={amt} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center min-w-32">
                <p className="text-2xl font-bold text-accent">{amt}</p>
                <p className="text-xs text-white/70 mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-2xl border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2"><Heart className="h-6 w-6 text-accent" /> Make a Donation</CardTitle>
                <CardDescription>All donations go directly to youth training programs in Kyenjojo, Uganda.</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="flex items-center gap-2 bg-destructive/10 text-destructive rounded-lg p-3 mb-4 text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />{error}
                  </div>
                )}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>Phone (optional)</FormLabel><FormControl><Input placeholder="+256..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    {/* Currency */}
                    <FormField control={form.control} name="currency" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="USD" id="usd" /><label htmlFor="usd" className="cursor-pointer font-medium">🇺🇸 USD</label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="UGX" id="ugx" /><label htmlFor="ugx" className="cursor-pointer font-medium">🇺🇬 UGX</label></div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )} />
                    {/* Amount tiers */}
                    <FormField control={form.control} name="amount" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donation Amount</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {amountTiers.map(tier => (
                              <div key={tier.val} onClick={() => field.onChange(tier.val)}
                                className={`border-2 rounded-xl p-3 text-center cursor-pointer transition-all ${field.value===tier.val?'border-primary bg-primary/5':'border-muted hover:border-primary/50'}`}>
                                <p className="font-bold text-primary">{tier.label}</p>
                                <p className="text-xs text-muted-foreground">{tier.desc}</p>
                              </div>
                            ))}
                            <div onClick={() => field.onChange("custom")}
                              className={`border-2 rounded-xl p-3 text-center cursor-pointer transition-all col-span-2 md:col-span-4 ${field.value==="custom"?'border-primary bg-primary/5':'border-muted hover:border-primary/50'}`}>
                              <p className="font-bold text-primary">Custom Amount</p>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {isCustomAmount && (
                      <FormField control={form.control} name="customAmount" render={({ field }) => (
                        <FormItem><FormLabel>Custom Amount ({currency})</FormLabel><FormControl><Input type="number" placeholder="Enter amount" min="1" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    )}
                    {/* Type */}
                    <FormField control={form.control} name="type" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donation Type</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="one-time" id="once" /><label htmlFor="once" className="cursor-pointer">One-time</label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="monthly" id="monthly" /><label htmlFor="monthly" className="cursor-pointer">Monthly</label></div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem><FormLabel>Message (optional)</FormLabel><FormControl><Textarea placeholder="Leave a message of support..." rows={3} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit" size="lg" className="w-full h-14 text-lg bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                      {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Processing...</> : <><Heart className="mr-2 h-5 w-5" />Donate Now</>}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">Payments via PesaPal (Mobile Money & Card) or WhatsApp confirmation.</p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Funding Streams */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-10">How We're Funded</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fundingStreams.map(s => (
              <Card key={s.title} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2"><div className="mb-2">{s.icon}</div><CardTitle className="text-lg">{s.title}</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">{s.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
