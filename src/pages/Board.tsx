import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, ArrowRight, Users, Globe, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Board() {
  const boardMembers = [
    {
      name: "Asiimwe Derick",
      title: "Chief Executive Officer (CEO)",
      role: "Founder & Executive Lead",
      bio: "The visionary behind WorldTech Youth Foundation, Asiimwe Derick established the organization in Kyenjojo District to address the critical digital skills gap affecting Uganda's youth. He oversees all strategic operations, partnership development, and regional program deployments across the region.",
      image: "/derick-asiimwe.jpg",
      mail: "deriick.asimwe849@gmail.com"
    },
    {
      name: "Dr. Sarah Johnson",
      title: "Chair of the Board",
      role: "Technology Education Expert",
      bio: "Brings 20 years of experience designing scalable tech curricula for underserved populations across East and West Africa. Sarah chairs the International Board of Directors and oversees global compliance and macro policy authorization.",
      image: "/board-sarah.png",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Marcus Williams",
      title: "Vice Chair",
      role: "Senior Engineering Manager",
      bio: "A self-taught developer who rose to engineering leadership at a Fortune 500 tech firm. Marcus champions our mentorship and career placement initiatives, helping graduates break into the international remote workforce.",
      image: "/board-marcus.png",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr. Amara Osei",
      title: "Secretary",
      role: "Youth Development Specialist",
      bio: "Amara's research focuses on the intersection of cognitive psychology and digital literacy in African youth populations. She ensures our programs are developmentally appropriate, gender-inclusive, and aligned with community welfare standards.",
      image: "/board-amara.png",
      linkedin: "#",
      mail: "#"
    },
    {
      name: "James Chen",
      title: "Treasurer",
      role: "Financial Advisor & Philanthropist",
      bio: "Managing partner at a leading wealth management firm, James oversees the Foundation's financial health, endowments, and strategic growth fund. He ensures all financial deployments meet international transparency standards with rigorous annual independent auditing.",
      image: "/board-james.png",
      linkedin: "#"
    },
    {
      name: "Dr. Priya Sharma",
      title: "Program Director",
      role: "Data Science & Curriculum Lead",
      bio: "Priya designed our flagship Data Analysis & Business Intelligence curriculum. She bridges the gap between academic theory and practical, industry-ready data skills, ensuring our graduates are competitive in the global analytics market.",
      image: "/board-priya.png",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Michael Torres",
      title: "Director of Community Outreach",
      role: "Community & Regional Relations",
      bio: "Deeply rooted in the communities we serve, Michael coordinates community radio sensitization campaigns, tribal leadership outreach, and builds the vital partnerships with local schools and district councils that make our programs accessible.",
      image: "/board-michael.png",
      linkedin: "#",
      mail: "#"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-muted/30 py-20 lg:py-24 border-b">
        <div className="container px-4 md:px-6 max-w-4xl text-center mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Leadership & Governance
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Our Board of Directors represents a diverse coalition of tech industry veterans, educators, and community leaders united by a single mission: to democratize digital opportunity for East African youth.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>7–11 Member Board</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-secondary" />
              <span>International Expertise</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" />
              <span>Full Fiduciary Accountability</span>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Tier Reminder */}
      <section className="py-8 bg-primary/5 border-b border-primary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="text-center">
              <span className="font-bold text-primary">Tier 1:</span>
              <span className="text-muted-foreground ml-2">International Board of Directors — Fiduciary accountability & global compliance</span>
            </div>
            <div className="text-center">
              <span className="font-bold text-secondary">Tier 2:</span>
              <span className="text-muted-foreground ml-2">Executive Secretariat — Daily operations & partnership development</span>
            </div>
            <div className="text-center">
              <span className="font-bold text-accent">Tier 3:</span>
              <span className="text-muted-foreground ml-2">Community Advisory Council — Local relevance & student welfare</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {boardMembers.map((member, idx) => (
              <motion.div key={idx} variants={item} data-testid={`board-member-${idx}`}>
                <Card className="h-full border-none shadow-none bg-transparent group">
                  <div className="mb-6 overflow-hidden rounded-2xl aspect-square relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" />
                  </div>
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary font-semibold mb-1">{member.title}</p>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">{member.role}</p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {member.bio}
                    </p>
                    <div className="flex gap-4">
                      {member.linkedin && (
                        <a href={member.linkedin} className="text-muted-foreground hover:text-primary transition-colors" aria-label={`LinkedIn for ${member.name}`}>
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} className="text-muted-foreground hover:text-primary transition-colors" aria-label={`Twitter for ${member.name}`}>
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {member.mail && member.mail !== "#" && (
                        <a href={`mailto:${member.mail}`} className="text-muted-foreground hover:text-primary transition-colors" aria-label={`Email for ${member.name}`}>
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                      {member.mail === "#" && (
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label={`Email for ${member.name}`}>
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Membership Categories */}
      <section className="py-16 bg-muted/30 border-t">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Membership Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: "Founding Members", desc: "Original architects of the Foundation's mission and governance structure, contributing to the establishment of strategic policy and organizational culture." },
              { type: "Regular Members", desc: "Active contributors to the advancement of the Foundation's mission, subject to approval by the Executive Board based on expertise and contribution." },
              { type: "Honorary Members", desc: "Distinguished individuals recognized for exceptional contributions to youth empowerment, digital education, or the Foundation's strategic objectives." }
            ].map((m, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-border shadow-sm">
                <h3 className="font-bold text-foreground mb-2">{m.type}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Council CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Community Advisory Council</h2>
          <p className="text-primary-foreground/80 mb-4">
            The Community Advisory Council ensures hyper-local relevance, tribal leadership alignment, and student welfare safety nets across all regions we serve.
          </p>
          <p className="text-primary-foreground/70 mb-8">
            Are you a tech leader or community figure passionate about education equity in East Africa? We actively seek Council members with deep local knowledge and community connections.
          </p>
          <a 
            href="mailto:deriick.asimwe849@gmail.com" 
            className="inline-flex items-center justify-center font-semibold text-accent hover:text-white transition-colors"
            data-testid="contact-board-link"
          >
            Contact: deriick.asimwe849@gmail.com <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
