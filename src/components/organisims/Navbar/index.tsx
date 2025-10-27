import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";

export const Navbar: React.FC = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};
