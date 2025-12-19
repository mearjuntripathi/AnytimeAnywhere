import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import CoachingHome from "@/pages/coaching-home";
import Course from "@/pages/course";
import Projects from "@/pages/projects";
import Instructors from "@/pages/instructors";
import Docs from "@/pages/docs";
import PaymentSuccess from "@/pages/payment-success";
import PaymentCancel from "@/pages/payment-cancel";
import Navigation from "@/components/navigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={CoachingHome} />
      <Route path="/course/:id" component={Course} />
      <Route path="/instructors" component={Instructors} />
      <Route path="/projects" component={Projects} />
      <Route path="/docs" component={Docs} />
      <Route path="/docs/:id" component={Docs} />
      <Route path="/payment/success" component={PaymentSuccess} />
      <Route path="/payment/cancel" component={PaymentCancel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Router />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
