import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation } from "wouter";
import { UserPlus, CheckCircle2, AlertCircle, Loader2, CreditCard, Phone, MapPin, BookOpen, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const registrationSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  gender: z.enum(["male", "female", "other"], { required_error: "Please select gender" }),
  dob: z.string().min(1, "Date of birth is required"),
  program: z.string().min(1, "Please select a program"),
  district: z.string().min(2, "District is required"),
});

type RegistrationValues = z.infer<typeof registrationSchema>;

const programs = [
  "Full-Stack Web Design & Development (12 weeks)",
  "Data Analysis & Business Intelligence (10 weeks)",
  "Digital Marketing Mastery (8 weeks)",
  "Advanced Vocational & Skilled Trades (10 weeks)",
];

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location] = useLocation();

  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const paymentStatus = params.get("payment");
  const paymentRef = params.get("ref");

  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      district: "",
      program: "",
    },
  });

  async function onSubmit(data: RegistrationValues) {
    setLoading(true);
    setError(null);

    try {
      const base = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";
      const res = await fetch(`${base}/api/pesapal/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          program: data.program,
          dob: data.dob,
          gender: data.gender,
        }),
      });

      if (!res.ok) {
        const err = await res.json() as { error: string };
        throw new Error(err.error || "Registration failed");
      }

      const { redirectUrl } = await res.json() as { redirectUrl: string };
      window.location.href = redirectUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-muted/20 flex items-center justify-center px-4 py-20">
        <Card className="max-w-lg w-full shadow-xl">
          <CardContent className="p-12 text-center space-y-6">
            <div className="mx-auto w-24 h-24 bg-secondary/10 text-secondary rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Registration Confirmed!</h2>
            <p className="text-lg text-muted-foreground">
              Your registration fee of <strong>UGX 10,000</strong> has been received. Welcome to the WorldTech Youth Foundation family!
            </p>
            {paymentRef && (
              <p className="text-sm text-muted-foreground bg-muted rounded-lg px-4 py-2">
                Reference: <span className="font-mono font-bold text-primary">{paymentRef}</span>
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              You will receive a confirmation email shortly. Our team will be in touch with program schedule details.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
              <MapPin className="h-4 w-4 text-primary" />
              Central Block, Kyenjojo District, Western Uganda
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStatus === "pending") {
    return (
      <div className="min-h-screen bg-muted/20 flex items-center justify-center px-4 py-20">
        <Card className="max-w-lg w-full shadow-xl">
          <CardContent className="p-12 text-center space-y-6">
            <div className="mx-auto w-24 h-24 bg-accent/10 text-accent rounded-full flex items-center justify-center">
              <AlertCircle className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Payment Processing</h2>
            <p className="text-lg text-muted-foreground">
              Your payment is being processed. If you completed the payment on PesaPal, your registration will be confirmed shortly.
            </p>
            {paymentRef && (
              <p className="text-sm text-muted-foreground bg-muted rounded-lg px-4 py-2">
                Reference: <span className="font-mono font-bold text-primary">{paymentRef}</span>
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              Contact us at <a href="mailto:deriick.asimwe849@gmail.com" className="text-primary hover:underline">deriick.asimwe849@gmail.com</a> if you need assistance.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-16 lg:py-20">
        <div className="container px-4 md:px-6 text-center max-w-3xl mx-auto">
          <UserPlus className="h-14 w-14 mx-auto mb-5 text-white/80" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Apply & Register
          </h1>
          <p className="text-xl text-secondary-foreground/90 leading-relaxed mb-4">
            Join the next cohort of the WorldTech Youth Foundation. Complete the form below and pay the one-time registration fee to secure your place.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white font-semibold text-lg">
            <CreditCard className="h-5 w-5 text-accent" />
            Registration Fee: <span className="text-accent ml-1">UGX 10,000</span>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-10 bg-white border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {[
              "Full program access",
              "Hardware & laptop provision",
              "Expert facilitators",
              "Certification upon completion",
              "Career placement assistance",
              "Alumni network access",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-14">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Form */}
            <div className="lg:col-span-8">
              <Card className="shadow-xl border-border">
                <CardHeader className="p-8 border-b bg-muted/30">
                  <CardTitle className="text-2xl">Personal & Program Details</CardTitle>
                  <CardDescription>Fill in your information. You will be redirected to PesaPal to complete your UGX 10,000 registration fee securely.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {error && (
                    <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                      {/* Name row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Amara" {...field} data-testid="input-firstname" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Nakato" {...field} data-testid="input-lastname" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Email + Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="amara@example.com" {...field} data-testid="input-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number (MTN/Airtel)</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+256 7XX XXX XXX" {...field} data-testid="input-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* DOB + Gender */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="dob"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date of Birth</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} data-testid="input-dob" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Gender</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex gap-5"
                                >
                                  {[
                                    { value: "female", label: "Female" },
                                    { value: "male", label: "Male" },
                                    { value: "other", label: "Other" },
                                  ].map((opt) => (
                                    <FormItem key={opt.value} className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value={opt.value} />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">{opt.label}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* District */}
                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>District of Residence</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Kyenjojo" {...field} data-testid="input-district" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Program */}
                      <FormField
                        control={form.control}
                        name="program"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Program Track</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-program">
                                  <SelectValue placeholder="Select a program track" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {programs.map((p) => (
                                  <SelectItem key={p} value={p}>{p}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-2 border-t">
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full h-14 text-lg font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90"
                          disabled={loading}
                          data-testid="submit-registration"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Redirecting to PesaPal…
                            </>
                          ) : (
                            <>
                              <CreditCard className="mr-2 h-5 w-5" />
                              Pay UGX 10,000 & Complete Registration
                            </>
                          )}
                        </Button>
                        <p className="text-center text-xs text-muted-foreground mt-3">
                          Secure payment via PesaPal · Supports MTN Mobile Money, Airtel Money, Visa & Mastercard
                        </p>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="border-border">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-lg text-foreground">Payment Methods Accepted</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    {[
                      { icon: <Phone className="h-4 w-4 text-secondary" />, label: "MTN Mobile Money" },
                      { icon: <Phone className="h-4 w-4 text-primary" />, label: "Airtel Money" },
                      { icon: <CreditCard className="h-4 w-4 text-accent" />, label: "Visa / Mastercard" },
                    ].map((m, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        {m.icon}
                        <span className="font-medium">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/20 bg-secondary/5">
                <CardContent className="p-6 space-y-3">
                  <BookOpen className="h-8 w-8 text-secondary" />
                  <h3 className="font-bold text-foreground">Eligibility</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />Ages 16–30</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />No prior degree required</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />Merit-based selection</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />Open to all genders</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />Childcare available for young mothers</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="text-sm text-muted-foreground bg-white border border-border rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <MapPin className="h-4 w-4 text-primary" />
                  Training Location
                </div>
                <p>Central Block, Kyenjojo District<br />Western Region, Uganda</p>
                <a href="mailto:deriick.asimwe849@gmail.com" className="text-primary hover:underline block mt-2">
                  deriick.asimwe849@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
