import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContractProvider } from "@/contexts/ContractContext";
import { Homepage } from "./pages/Homepage";
import { UploadPage } from "./pages/UploadPage";
import { ContractList } from "./pages/ContractList";
import { ContractDetail } from "./pages/ContractDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ContractProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/contracts" element={<ContractList />} />
            <Route path="/contract/:id" element={<ContractDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContractProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
