import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe, LogIn, LogOut, LayoutDashboard, Crown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout, isPremium, isLoading } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/programs", label: "Programs" },
    { href: "/vision-mission", label: "Vision & Mission" },
    { href: "/savings", label: "Save & Invest" },
    { href: "/board", label: "Board" },
  ];

  async function handleLogout() {
    setUserMenuOpen(false);
    setIsOpen(false);
    await logout();
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Globe className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-accent">
              WorldTech
              <span className="text-primary block text-xs font-semibold uppercase tracking-wider">
                Youth Foundation
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Auth section */}
            {!isLoading && (
              user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border hover:bg-muted transition-colors"
                    data-testid="user-menu-btn"
                  >
                    <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
                    {isPremium && <Crown className="h-3 w-3 text-accent shrink-0" />}
                    <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
                  </button>

                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-border rounded-xl shadow-xl z-20 overflow-hidden">
                        <div className="px-4 py-3 border-b bg-muted/50">
                          <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          <Badge className={`mt-1.5 text-xs font-semibold ${isPremium ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                            {isPremium ? "Premium" : "Free Plan"}
                          </Badge>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                          >
                            <LayoutDashboard className="h-4 w-4 text-primary" /> Dashboard
                          </Link>
                          {!isPremium && (
                            <Link
                              href="/savings"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-accent font-medium"
                            >
                              <Crown className="h-4 w-4" /> Upgrade to Premium
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-red-50 text-red-600 transition-colors border-t mt-1"
                            data-testid="logout-btn"
                          >
                            <LogOut className="h-4 w-4" /> Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Button asChild size="sm" variant="outline" className="gap-2 font-semibold border-primary/30 hover:border-primary">
                  <Link href="/login"><LogIn className="h-4 w-4" /> Sign In</Link>
                </Button>
              )
            )}

            <Button asChild size="sm" variant="outline" className="font-semibold border-secondary text-secondary hover:bg-secondary/10 whitespace-nowrap">
              <Link href="/register">Apply Now</Link>
            </Button>
            <Button asChild size="sm" className="font-semibold bg-accent text-accent-foreground hover:bg-accent/90 whitespace-nowrap">
              <Link href="/fundraising">Donate</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {!isLoading && user && (
              <Link href="/dashboard" className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {user.name.charAt(0).toUpperCase()}
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent/10 hover:text-accent focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-b bg-background">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  location === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent/10 hover:text-accent"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 px-3 flex flex-col gap-2 border-t pt-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{isPremium ? "Premium Member" : "Free Plan"}</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full gap-2">
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}><LayoutDashboard className="h-4 w-4" /> Dashboard</Link>
                  </Button>
                  <Button variant="outline" className="w-full gap-2 text-red-600 border-red-200 hover:bg-red-50" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" /> Sign Out
                  </Button>
                </>
              ) : (
                <Button asChild variant="outline" className="w-full gap-2 border-primary/40 text-primary">
                  <Link href="/login" onClick={() => setIsOpen(false)}><LogIn className="h-4 w-4" /> Sign In / Create Account</Link>
                </Button>
              )}
              <Button asChild variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10">
                <Link href="/register" onClick={() => setIsOpen(false)}>Apply Now</Link>
              </Button>
              <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/fundraising" onClick={() => setIsOpen(false)}>Donate via PesaPal</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
