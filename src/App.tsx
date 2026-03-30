import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import PropertyDetail from "./pages/PropertyDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import { lazy, Suspense } from "react";

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));
const OverviewPage = lazy(() => import("./pages/admin/OverviewPage.tsx"));
const PropertiesPage = lazy(() => import("./pages/admin/PropertiesPage.tsx"));
const BookingsPage = lazy(() => import("./pages/admin/BookingsPage.tsx"));
const AnalyticsPage = lazy(() => import("./pages/admin/AnalyticsPage.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<OverviewPage />} />
              <Route path="properties" element={<PropertiesPage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
