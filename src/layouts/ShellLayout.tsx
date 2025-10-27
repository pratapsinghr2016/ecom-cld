import { ReactNode } from "react";
import styled from "styled-components";
import Footer from "../components/organism/Footer";
import { Navbar } from "../components/organism/Navbar";

interface ShellLayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-bottom: 80px; /* Add space for fixed footer */
`;

const ShellLayout = ({ children }: ShellLayoutProps) => {
  return (
    <LayoutContainer>
      <Navbar />
      <MainContent>{children}</MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default ShellLayout;
