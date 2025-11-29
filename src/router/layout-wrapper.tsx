import { Footer } from "@/components/customs/footer";
import { Navbar } from "@/components/customs/navbar";
import { ParticlesBackground } from "@/components/customs/particles-background";
import { Outlet } from "react-router-dom";

interface LayoutWrapperProps {
  withLayout?: boolean;
}

export const LayoutWrapper = ({ withLayout = true }: LayoutWrapperProps) => {
  return (
    <>
      <ParticlesBackground />
      {withLayout && <Navbar />}
      <Outlet />
      {withLayout && <Footer />}
    </>
  );
};
