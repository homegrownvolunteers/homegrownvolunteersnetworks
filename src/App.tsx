import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Programs from "./pages/Programs";
import SanaaArts from "./pages/SanaaArts";
import Culture from "./pages/Culture";
import Agriculture from "./pages/Agriculture";
import HomegrownTV from "./pages/HomegrownTV";
import Stories from "./pages/Stories";
import GetInvolved from "./pages/GetInvolved";
import Donate from "./pages/Donate";
import Shop from "./pages/Shop";
import Membership from "./pages/Membership";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import AdminLogin from "./pages/admin/Login";
import AdminRegister from "./pages/admin/Register";
import ForgotPassword from "./pages/admin/ForgotPassword";
import AdminLayout from "./pages/admin/AdminLayout";
import Overview from "./pages/admin/Overview";
import Members from "./pages/admin/Members";
import Content from "./pages/admin/Content";
import TVEpisodes from "./pages/admin/TVEpisodes";
import Registrations from "./pages/admin/Registrations";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/sanaa-arts" element={<SanaaArts />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/agriculture" element={<Agriculture />} />
            <Route path="/tv" element={<HomegrownTV />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Admin auth (public) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />

            {/* Admin dashboard (protected) */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<Overview />} />
              <Route path="members" element={<Members />} />
              <Route path="content" element={<Content />} />
              <Route path="tv-episodes" element={<TVEpisodes />} />
              <Route path="registrations" element={<Registrations />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
