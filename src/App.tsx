
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "@/hooks/useDarkMode";
import Index from "./pages/Index";
import Login from "./pages/Login";
import CustomerLogin from "./pages/CustomerLogin";
import Dashboard from "./pages/Dashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AdminB2B from "./pages/AdminB2B";
import Reports from "./pages/Reports";
import CreateTicket from "./pages/CreateTicket";
import AbrirChamado from "./pages/AbrirChamado";
import MeusTickets from "./pages/MeusTickets";
import TicketView from "./pages/TicketView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DarkModeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<AdminB2B />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/create-ticket" element={<CreateTicket />} />
            <Route path="/abrir-chamado" element={<AbrirChamado />} />
            <Route path="/meus-chamados" element={<MeusTickets />} />
            <Route path="/chamados/:id" element={<TicketView />} />
            <Route path="/404" element={<NotFound />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DarkModeProvider>
  </QueryClientProvider>
);

export default App;
