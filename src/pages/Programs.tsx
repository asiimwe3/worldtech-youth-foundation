import { motion } from "framer-motion";
import { Link } from "wouter";
import { Clock, Users, Target, ArrowRight, Zap, Wrench, BarChart3, Code2, Megaphone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Programs() {
  const mainPrograms = [
    {
      title: "Full-Stack Web Design & Development",
      description: "Focuses heavily on user interface and user experience (UI/UX) principles, fluid front-end development with HTML5, CSS3, and modern JavaScript frameworks, and responsive content management deployment.",
      duration: "12 weeks",
      ages: "16–30",
      outcomes: [
        "Live portfolio of client-ready prototypes",
        "UI/UX design proficiency",
        "Frontend frameworks (HTML5, CSS3, JS)",
        "Responsive content management",
        "Freelance client acquisition strategies"
      ],
      curriculum: ["UI/UX Fundamentals", "HTML5 & CSS3 Mastery", "JavaScript & Modern Frameworks", "Responsive Design", "CMS & Deployment", "Portfolio Development"],
      image: "/program-web.png",
      tag: "Most Popular",
      icon: <Code2 className="h-6 w-6" />,
      color: "text-primary"
    },
    {
      title: "Data Analysis & Business Intelligence",
      description: "Covers advanced data manipulation, spreadsheet modeling, SQL foundations, and interactive data visualization techniques. Addresses the enormous global demand for administrative, operational, and financial data cleaning professionals.",
      duration: "10 weeks",
      ages: "16–30",
      outcomes: [
        "Advanced spreadsheet modeling",
        "SQL database foundations",
        "Interactive data visualization",
        "Real-world dataset analysis",
        "Business intelligence reporting"
      ],
      curriculum: ["Excel & Google Sheets Mastery", "SQL Foundations", "Data Cleaning & Processing", "Python for Data Analysis", "Visualization Tools", "BI Reporting"],
      image: "/program-data.png",
      tag: "High Demand",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "text-secondary"
    },
    {
      title: "Digital Marketing Mastery",
      description: "Students advance through comprehensive modules covering search engine optimization (SEO), social media monetization, conversion rate optimization, and advanced analytics management. Graduates are trained specifically to service small and medium businesses internationally.",
      duration: "8 weeks",
      ages: "16–30",
      outcomes: [
        "SEO strategy and implementation",
        "Social media monetization",
        "Conversion rate optimization",
        "Advanced analytics management",
        "International SMB client readiness"
      ],
      curriculum: ["SEO & Content Strategy", "Social Media Marketing", "Paid Advertising (Meta & Google)", "Email Marketing", "Analytics & CRO", "Client Management"],
      image: "/program-marketing.png",
      tag: "Global Reach",
      icon: <Megaphone className="h-6 w-6" />,
      color: "text-accent"
    },
    {
      title: "Advanced Vocational & Skilled Trades",
      description: "Acknowledging that physical industries drive local infrastructure, this branch provides certified instruction in electrical installations, sustainable solar grid deployment, mechanical repairs, and agro-tech operations tailored specifically to the regional economic composition of Western Uganda.",
      duration: "10 weeks",
      ages: "16–30",
      outcomes: [
        "Electrical installation certification",
        "Solar grid deployment skills",
        "Mechanical repair competency",
        "Agro-tech operations knowledge",
        "Local enterprise ownership readiness"
      ],
      curriculum: ["Electrical Installation Basics", "Solar Panel & Grid Systems", "Mechanical Maintenance", "Agro-Tech Operations", "Safety & Compliance", "Enterprise Management"],
      image: "/program-vocational.png",
      tag: "Local Impact",
      icon: <Wrench className="h-6 w-6" />,
      color: "text-primary"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Disciplinary Pathways.
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed mb-6">
              Our programs are divided into high-momentum tracks optimized for direct financial monetization. Training combines rigorous technical specialization with core business, professional ethics, and freelance client acquisition strategies.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 font-medium">Target: Ages 16–30</span>
              <span className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 font-medium">Location: Kyenjojo, Uganda</span>
              <span className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 font-medium">Special cohorts for female &amp; disadvantaged youth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Overview Note */}
      <section className="py-10 bg-accent/10 border-b border-accent/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Zap className="h-10 w-10 text-accent shrink-0" />
            <p className="text-foreground font-medium text-lg">
              All programs combine rigorous technical specialization with core business fundamentals, professional ethics, and freelance client acquisition strategies — preparing graduates for international remote work, local employment, or micro-enterprise ownership.
            </p>
          </div>
        </div>
      </section>

      {/* Main Programs */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground">The Four Program Tracks</h2>
            <p className="text-muted-foreground mt-2 text-lg">Intensive, cohort-based learning paths designed for direct employment or freelance monetization.</p>
          </div>

          <div className="space-y-10">
            {mainPrograms.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                data-testid={`program-card-${idx}`}
              >
                <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-4 h-56 lg:h-auto">
                      <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="lg:col-span-8 flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center ${program.color}`}>
                              {program.icon}
                            </div>
                            <CardTitle className="text-2xl leading-tight">{program.title}</CardTitle>
                          </div>
                          <Badge className="bg-accent text-accent-foreground border-none font-bold shrink-0">
                            {program.tag}
                          </Badge>
                        </div>
                        <CardDescription className="text-base mt-3 leading-relaxed">
                          {program.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex gap-4 mb-6 text-sm font-medium text-muted-foreground flex-wrap">
                          <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-md">
                            <Clock className="h-4 w-4 text-primary" />
                            {program.duration}
                          </div>
                          <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-md">
                            <Users className="h-4 w-4 text-primary" />
                            Ages {program.ages}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="font-semibold text-sm text-foreground uppercase tracking-wider flex items-center gap-2 mb-3">
                              <Target className="h-4 w-4 text-secondary" /> Learning Outcomes
                            </p>
                            <ul className="space-y-1.5">
                              {program.outcomes.map((outcome, i) => (
                                <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> {outcome}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground uppercase tracking-wider flex items-center gap-2 mb-3">
                              <Zap className="h-4 w-4 text-accent" /> Curriculum Modules
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {program.curriculum.map((mod, i) => (
                                <span key={i} className="text-xs bg-muted border border-border rounded-full px-3 py-1 font-medium text-muted-foreground">
                                  {mod}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-4 border-t">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" data-testid={`apply-btn-${idx}`}>
                          Apply Now
                        </Button>
                        <Button variant="link" className="ml-4 text-primary" asChild>
                          <Link href="/fundraising">
                            Fund a Cohort <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrolment Strategy */}
      <section className="py-20 bg-muted/30 border-t border-b">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Student Acquisition & Enrolment</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Community radio sensitization campaigns, collaborative leadership outreach, and strictly merit-based, open-source competitive aptitude testing ensure that highly motivated, high-potential youth enter the cohorts regardless of prior financial backgrounds.
              </p>
              <ul className="space-y-3">
                {[
                  "Community radio sensitization campaigns",
                  "Collaborative tribal leadership outreach",
                  "Merit-based open competitive aptitude testing",
                  "No tuition fees — fully funded by donors & social enterprise",
                  "Flexible daily training schedules",
                  "Childcare spaces for young mothers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <Card className="bg-primary text-primary-foreground p-6 rounded-2xl border-0">
                <h3 className="text-xl font-bold mb-2">Year 1 Target</h3>
                <p className="text-4xl font-extrabold text-accent mb-1">200</p>
                <p className="text-primary-foreground/80">Youth trained from pilot hub in Kyenjojo District</p>
              </Card>
              <Card className="bg-secondary text-secondary-foreground p-6 rounded-2xl border-0">
                <h3 className="text-xl font-bold mb-2">Year 3 Goal</h3>
                <p className="text-4xl font-extrabold text-white mb-1">2,500+</p>
                <p className="text-secondary-foreground/80">Certified specialists across multi-spoke East African framework</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container px-4 md:px-6 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            Our career advisors can help you identify the best program based on your interests and goals. Contact us at deriick.asimwe849@gmail.com or visit our hub in Kyenjojo District.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" data-testid="apply-now-cta">
              Apply for a Program
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5" asChild>
              <Link href="/fundraising">Fund a Student</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
