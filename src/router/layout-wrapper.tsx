import { Footer } from "@/components/customs/footer";
import { Navbar } from "@/components/customs/navbar";
import { Outlet } from "react-router-dom";

interface LayoutWrapperProps {
  withLayout?: boolean;
}

export const LayoutWrapper = ({ withLayout = true }: LayoutWrapperProps) => {
  return (
    <>
      {withLayout && <Navbar />}
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      {withLayout && <Footer />}
    </>
  );
};
