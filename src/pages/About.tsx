import { motion } from "framer-motion";
import { Link } from "wouter";
import { Users, Globe, Target, Zap, Heart, Award, Shield, TrendingUp, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const values = [
    {
      title: "Institutional Integrity",
      description: "Rigorous annual independent auditing with full reports published to international transparency standards. All financial deployments are documented and accountable.",
      icon: <Shield className="h-8 w-8 text-accent" />
    },
    {
      title: "Gender-Forward Empowerment",
      description: "Actively reserving specialized cohorts and support systems for female and disadvantaged youth, promoting gender parity at every level of our programs.",
      icon: <Zap className="h-8 w-8 text-accent" />
    },
    {
      title: "Data-Driven Accountability",
      description: "We track annualized median income changes, local job creation numbers, and regional small business growth metrics via transparent impact dashboards.",
      icon: <TrendingUp className="h-8 w-8 text-accent" />
    },
    {
      title: "Radical Transparency",
      description: "Full transparency toward our stakeholders, investors, and community leaders. Every funding source and expenditure is disclosed and independently verified.",
      icon: <Globe className="h-8 w-8 text-accent" />
    },
    {
      title: "Community Centricity",
      description: "Hyper-local relevance through tribal leadership alignment and student welfare safety nets via our Community Advisory Council embedded in each region.",
      icon: <Users className="h-8 w-8 text-accent" />
    },
    {
      title: "Market Excellence",
      description: "Curricula completely dynamic and updated in real-time alongside global industry standards, ensuring every graduate is immediately workforce-ready.",
      icon: <Award className="h-8 w-8 text-accent" />
    }
  ];

  const governance = [
    {
      tier: "Tier 1",
      title: "International Board of Directors",
      mandate: "Fiduciary accountability, global compliance, and macro policy authorization. Comprised of 7–11 individuals with expertise in technology, international development, finance, law, and local governance.",
      color: "bg-primary"
    },
    {
      tier: "Tier 2",
      title: "Executive Secretariat (CEO & Directors)",
      mandate: "Daily operational execution, regional program deployments, and partnership development. Manages the in-house digital production agency that generates social enterprise revenue.",
      color: "bg-secondary"
    },
    {
      tier: "Tier 3",
      title: "Community Advisory Council",
      mandate: "Ensuring hyper-local relevance, tribal leadership alignment, and student welfare safety nets. Directly embedded in the communities we serve across Kyenjojo and surrounding districts.",
      color: "bg-accent"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-muted/50 py-20 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <MapPin className="h-4 w-4" /> Kyenjojo District, Western Uganda
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
              Bridging the Digital Divide.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Established in Kyenjojo District, Uganda, the WorldTech Youth Foundation addresses the expanding chasm between traditional educational systems and the highly dynamic requirements of the contemporary global digital economy.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img src="/about-bg.png" alt="Students learning at community center in Kyenjojo" className="w-full h-full object-cover" />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Our Story</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Headquartered in Kyenjojo District, Western Uganda — a country with one of the world's youngest populations — the WorldTech Youth Foundation was established to initiate an agile ecosystem providing technical mastery, professional development, and international marketplace connectivity to marginalized youth.
                </p>
                <p>
                  Uganda's rural areas like Kyenjojo District remain constrained by limited institutional infrastructure, high data connectivity costs, and a lack of skilled practical facilitators. WorldTech fills this physical vacuum through localized technological hubs built to serve the communities directly.
                </p>
                <p>
                  The international outsourcing market for digital services is valued in the hundreds of billions of dollars. Young talent in developing nations is systemically under-utilized due to lack of advanced skills and reliable access points. The Foundation positions itself directly at this intersection to tap into the high momentum of the global remote workforce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-16 lg:py-20 bg-primary/5 border-y border-primary/10">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Executive Summary</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            "The WorldTech Youth Foundation addresses a critical global imbalance: the expanding chasm between rigid, traditional educational paradigms and the highly dynamic, fluid requirements of the contemporary global digital economy. Focusing operations out of Uganda, the Foundation initiates an agile ecosystem providing technical mastery, professional development, and international marketplace connectivity to marginalized youth."
          </p>
        </div>
      </section>

      {/* Target Demographic */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">Who We Serve</h2>
            <p className="text-muted-foreground text-lg">Our educational structures are designed for youth ready to transform their futures.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Age Range", value: "16 – 30", desc: "Youth underemployed or transitioning out of formal secondary systems" },
              { label: "Special Focus", value: "Young Mothers", desc: "Permanently integrated pathways with dedicated child-care spaces and flexible schedules" },
              { label: "Priority Group", value: "Rural Youth", desc: "Marginalized rural youth from Kyenjojo and surrounding West Uganda districts" },
              { label: "Open Access", value: "No Diploma Required", desc: "Strictly merit-based, open-source competitive aptitude testing regardless of financial background" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-testid={`demographic-card-${i}`}
              >
                <Card className="h-full border-border hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{item.label}</p>
                    <p className="text-2xl font-bold text-primary mb-3">{item.value}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Values & Ethical Framework</h2>
            <p className="text-primary-foreground/80 text-lg">
              The culture of the Foundation is dictated by values of complete institutional integrity, gender-forward empowerment, data-driven accountability, and radical transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
                data-testid={`value-card-${idx}`}
              >
                <div className="bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-primary-foreground/70 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Structure */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Organizational Governance</h2>
            <p className="text-muted-foreground text-lg">
              Our operating hierarchy is architected to guarantee rigorous corporate compliance and high-performance execution across international lines.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {governance.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-6 items-start p-6 bg-white border border-border rounded-2xl shadow-sm"
                data-testid={`governance-tier-${i}`}
              >
                <div className={`${tier.color} text-white font-bold text-sm px-4 py-2 rounded-lg shrink-0 min-w-[70px] text-center`}>
                  {tier.tier}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{tier.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{tier.mandate}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Model */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
          <Heart className="h-14 w-14 mx-auto mb-6 text-secondary" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Sustainable Social Enterprise Model</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            To break away from pure donor dependence, the Foundation operates an in-house digital production agency using top-tier senior students to execute paid international outsourcing contracts, feeding profit margins back into funding free cohorts. Administrative overhead is kept strictly below 20% of total financial deployments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground">
              <Link href="/board">Meet Our Leadership</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/vision-mission">Read Our Vision</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <a href="mailto:deriick.asimwe849@gmail.com" className="hover:text-primary transition-colors font-medium">deriick.asimwe849@gmail.com</a>
            </div>
            <div className="hidden md:block h-6 w-px bg-border" />
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <span className="font-medium">Central Block, Kyenjojo District, Western Region, Uganda</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
