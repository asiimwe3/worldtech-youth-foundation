import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import VisionMission from "@/pages/VisionMission";
import Fundraising from "@/pages/Fundraising";
import Board from "@/pages/Board";
import Register from "@/pages/Register";
import Savings from "@/pages/Savings";
import AuthPage from "@/pages/AuthPage";
import Dashboard from "@/pages/Dashboard";

const queryClient = new QueryClient();

const PAGES_WITHOUT_FOOTER = ["/login", "/dashboard"];

function Router() {
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const hideFooter = PAGES_WITHOUT_FOOTER.some((p) => path.endsWith(p));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/programs" component={Programs} />
          <Route path="/vision-mission" component={VisionMission} />
          <Route path="/fundraising" component={Fundraising} />
          <Route path="/board" component={Board} />
          <Route path="/register" component={Register} />
          <Route path="/savings" component={Savings} />
          <Route path="/login" component={AuthPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
