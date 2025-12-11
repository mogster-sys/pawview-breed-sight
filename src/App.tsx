import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SyncQueueProvider } from "@/contexts/SyncQueueContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import OfflineIndicator from "@/components/OfflineIndicator";
import { InstallPrompt } from "@/components/InstallPrompt";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CameraSimulator from "./pages/CameraSimulator";
import LearnPage from "./pages/Learn";
import Gallery from "./pages/Gallery";
import Success from "./pages/Success";
import Premium from "./pages/Premium";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <SubscriptionProvider>
            <SyncQueueProvider>
              <TooltipProvider>
                <OfflineIndicator />
                <InstallPrompt />
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/camera" element={<CameraSimulator />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/learn" element={<LearnPage />} />
                  <Route path="/premium" element={<Premium />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/success" element={<Success />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TooltipProvider>
            </SyncQueueProvider>
          </SubscriptionProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
