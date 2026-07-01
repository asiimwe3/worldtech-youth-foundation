import { motion } from "framer-motion";
import { Link } from "wouter";
import { Target, Eye, Flag, Rocket, ArrowRight, CheckCircle, TrendingUp, Globe2, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VisionMission() {
  const objectives = [
    {
      icon: <Globe2 className="h-6 w-6 text-accent" />,
      title: "State-of-the-Art Tech Hubs",
      desc: "Establish technological hub facilities providing accessible ICT and vocational training in Kyenjojo and surrounding East African regions."
    },
    {
      icon: <Target className="h-6 w-6 text-accent" />,
      title: "Industry-Aligned Curricula",
      desc: "Design and deploy dynamic curricula covering Web Design, Data Analysis, Digital Marketing, and local vocational trades — updated in real-time with global standards."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-accent" />,
      title: "Employment Pipelines & Venture Incubation",
      desc: "Foster regional and international employment pipelines, remote work opportunities, and venture incubation frameworks for certified graduates."
    },
    {
      icon: <Users2 className="h-6 w-6 text-accent" />,
      title: "Gender Parity & Inclusivity",
      desc: "Promote gender parity by actively reserving specialized cohorts and support systems for female and disadvantaged youth."
    }
  ];

  const kpis = [
    { metric: "Graduate Income Growth", desc: "Annualized median income changes tracked per cohort — the absolute standard of metric success." },
    { metric: "Local Job Creation", desc: "Number of new tech and trade positions created in Kyenjojo and surrounding districts." },
    { metric: "Regional Business Growth", desc: "Small business formation and growth metrics within graduate communities." },
    { metric: "Program Completion Rates", desc: "Cohort-by-cohort completion and certification attainment tracked transparently." },
    { metric: "Social Enterprise Revenue", desc: "Target of 40% self-funded operations via in-house digital production agency by Month 36." },
    { metric: "Gender Representation", desc: "Female and disadvantaged youth enrollment ratios across all program cohorts." }
  ];

  const scalingPlan = [
    {
      phase: "Phase 1 — Year 1",
      title: "Pilot Hub Launch",
      goal: "200 youth trained",
      desc: "Launch the flagship Central Tech Hub in Kyenjojo District with all four program tracks. Establish the in-house digital production agency and begin building the Hub & Spoke network.",
      color: "border-primary bg-primary/5"
    },
    {
      phase: "Phase 2 — Year 2",
      title: "Spoke Expansion",
      goal: "800 youth trained",
      desc: "Activate Branch Spoke nodes across surrounding Western Uganda districts. Refine curricula based on Year 1 graduate outcomes. Grow social enterprise revenue toward the 40% target.",
      color: "border-secondary bg-secondary/5"
    },
    {
      phase: "Phase 3 — Year 3",
      title: "East Africa Franchise Blueprint",
      goal: "2,500+ specialists",
      desc: "Following a validated, hyper-profitable social enterprise proof of concept in Kyenjojo, franchise the operational blueprint across rural districts of the wider East African Community (EAC).",
      color: "border-accent bg-accent/5"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary rounded-full opacity-20 blur-3xl" />
        
        <div className="container relative z-10 px-4 md:px-6 max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
          >
            Our North Star.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/90"
          >
            The vision and mission that drive every program, every partnership, and every graduate of the WorldTech Youth Foundation.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission Core */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 bg-muted/40 p-10 rounded-3xl border border-border"
              data-testid="vision-block"
            >
              <div className="h-16 w-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg">
                <Eye className="h-8 w-8 text-accent-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
              <p className="text-xl font-medium leading-relaxed text-muted-foreground">
                "To cultivate a globally interconnected generation of <span className="text-primary font-bold">empowered, digitally proficient, and economically independent youth</span> who lead innovation and sustainable development within their communities."
              </p>
              <p className="text-sm text-muted-foreground italic">— Article II, Section 1, WorldTech Youth Foundation Constitution</p>
            </motion.div>

            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 bg-primary/5 p-10 rounded-3xl border border-primary/10"
              data-testid="mission-block"
            >
              <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-xl font-medium leading-relaxed text-muted-foreground">
                "To democratize access to high-quality digital education, technical competencies, and vocational skills, <span className="text-primary font-bold">bridging the global digital divide</span> and equipping youth in underserved regions with the practical tools necessary for modern workforce integration and entrepreneurial success."
              </p>
              <p className="text-sm text-muted-foreground italic">— Article II, Section 2, WorldTech Youth Foundation Constitution</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Strategic Objectives */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Strategic Objectives</h2>
            <p className="text-muted-foreground text-lg">Four concrete mandates guiding our operations across East Africa.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {objectives.map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-border shadow-sm flex gap-5"
                data-testid={`objective-${i}`}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  {obj.icon}
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{obj.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{obj.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Core Pillars */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Three Foundational Pillars</h2>
            <p className="text-primary-foreground/80 text-lg">
              Our operation rests upon three pillars designed to generate measurable systemic change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Equitable Access",
                desc: "Removing geographic and economic constraints to bring technical training to the grassroots level in Kyenjojo and beyond — targeting youth aged 16-30 regardless of prior financial background."
              },
              {
                num: "02",
                title: "Market Relevancy",
                desc: "Keeping curricula completely dynamic, updated in real-time alongside global industry standards to ensure graduates are competitive in the international digital economy immediately upon graduation."
              },
              {
                num: "03",
                title: "Sustained Independence",
                desc: "Graduating students directly into independent contracting, remote freelance careers, or micro-enterprise ownership — creating true economic self-sufficiency, not dependency."
              }
            ].map((pillar, idx) => (
              <div key={idx} className="bg-white/10 p-8 rounded-2xl border border-white/20 relative overflow-hidden group" data-testid={`pillar-${idx}`}>
                <div className="absolute top-0 right-0 p-6 text-6xl font-bold opacity-10 group-hover:scale-110 transition-transform">
                  {pillar.num}
                </div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">{pillar.title}</h3>
                <p className="text-primary-foreground/80 leading-relaxed relative z-10">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scaling Strategy */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Flag className="h-12 w-12 mx-auto mb-6 text-secondary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">3-Year Scaling Strategy</h2>
            <p className="text-muted-foreground text-xl">
              From a pilot hub serving 200 youth to an integrated multi-spoke East African framework training 2,500+ certified specialists.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {scalingPlan.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`border-l-4 p-6 rounded-r-2xl ${phase.color}`}
                data-testid={`phase-${i}`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="shrink-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{phase.phase}</p>
                    <h3 className="text-xl font-bold text-foreground mt-1">{phase.title}</h3>
                    <p className="text-2xl font-extrabold text-primary mt-1">{phase.goal}</p>
                  </div>
                  <div className="md:border-l md:pl-6 md:border-border">
                    <p className="text-muted-foreground leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="py-24 bg-muted/30 border-t">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">Impact Measurement & KPIs</h2>
            <p className="text-muted-foreground text-lg">
              Our absolute standard of metric success is not just program completion, but a verified increase in graduate income generation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-6 rounded-2xl border border-border shadow-sm"
                data-testid={`kpi-${i}`}
              >
                <CheckCircle className="h-6 w-6 text-secondary mb-3" />
                <h3 className="font-bold text-foreground mb-2">{kpi.metric}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{kpi.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background text-center">
        <div className="container px-4 max-w-2xl mx-auto space-y-8">
          <Rocket className="h-16 w-16 mx-auto text-accent" />
          <h2 className="text-3xl md:text-4xl font-bold">Help Us Reach These Goals</h2>
          <p className="text-lg text-muted-foreground">
            Our mission requires resources, mentorship, and advocacy. Join us in building this future for East African youth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" data-testid="vision-btn-donate">
              <Link href="/fundraising">Fund the Mission</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group border-primary text-primary hover:bg-primary/5" data-testid="vision-btn-programs">
              <Link href="/programs">
                See Our Programs <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
