import { Link } from "wouter";
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" data-testid="link-footer-logo">
              <Globe className="h-8 w-8 text-accent" />
              <div>
                <span className="text-xl font-bold tracking-tight text-accent block">WorldTech</span>
                <span className="text-primary-foreground/80 text-xs font-semibold uppercase tracking-wider block">Youth Foundation</span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/80 max-w-xs leading-relaxed">
              Equipping the next generation with digital tools to innovate, lead, and thrive in the global tech economy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="Facebook" data-testid="link-social-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="Twitter" data-testid="link-social-twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="Instagram" data-testid="link-social-instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="LinkedIn" data-testid="link-social-linkedin">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold tracking-tight mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="link-footer-about">About Us</Link>
              </li>
              <li>
                <Link href="/programs" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="link-footer-programs">Our Programs</Link>
              </li>
              <li>
                <Link href="/vision-mission" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="link-footer-vision">Vision & Mission</Link>
              </li>
              <li>
                <Link href="/board" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="link-footer-board">Board of Directors</Link>
              </li>
              <li>
                <Link href="/fundraising" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="link-footer-donate">Donate</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold tracking-tight mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-accent shrink-0 mt-0.5" />
                <span>Central Block, Kyenjojo District<br />Western Region, Uganda</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-accent shrink-0" />
                <a href="mailto:deriick.asimwe849@gmail.com" className="hover:text-accent transition-colors">deriick.asimwe849@gmail.com</a>
              </li>
              <li className="flex items-start pt-2 text-primary-foreground/60 text-xs italic">
                <span>Contact: Deriick Asimwe, Strategic Operations Director</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold tracking-tight mb-4 text-white">Stay Updated</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Join our newsletter to hear about our latest impact stories and programs.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Email address" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-white placeholder:text-primary-foreground/50 focus-visible:ring-accent"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" data-testid="button-newsletter-submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} WorldTech Youth Foundation. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors" data-testid="link-privacy">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors" data-testid="link-terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
