import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FaqsPage from "./pages/FaqsPage";
import GuidePage from "./pages/GuidePage";
import TeamPage from "./pages/TeamPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import DonatePage from "./pages/DonatePage";
import NotFound from "./pages/NotFound";

// React Query Setup
const queryClient = new QueryClient();

// Wrapper to toggle navbar/footer based on route
const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin-dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
