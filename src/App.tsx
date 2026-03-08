import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
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
import Shop from "./pages/Shop";
import Membership from "./pages/Membership";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            <Route path="/shop" element={<Shop />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
