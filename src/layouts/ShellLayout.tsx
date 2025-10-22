import { ReactNode } from "react";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";

interface ShellLayoutProps {
  children: ReactNode;
}

const ShellLayout = ({ children }: ShellLayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default ShellLayout;
