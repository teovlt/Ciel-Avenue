import { Home } from "@/pages/Home";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";
import { Routes, Route } from "react-router-dom";
import { LayoutWrapper } from "./layout-wrapper";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import HowItWorks from "@/pages/How-it-works";
import ProfilPage from "@/pages/Profile";
import Journey from "@/pages/Journey";

export const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
