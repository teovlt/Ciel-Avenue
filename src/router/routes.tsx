import { Home } from "@/pages/Home";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";
import { Routes, Route } from "react-router-dom";
import { LayoutWrapper } from "./layout-wrapper";
import Dashboard from "@/pages/Dashboard";
import AboutPage from "@/pages/About";
import HowItWorks from "@/pages/How-it-works";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
