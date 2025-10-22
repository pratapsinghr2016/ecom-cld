import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BellIcon, CloseIcon, HamburgerIcon } from "../../assets/icons";
import LogoImage from "../../assets/logo-sm-screen.png";
import IconButton from "../atoms/IconButton";
import Image from "../atoms/Image";

// Types
interface MobileMenuProps {
  $isOpen: boolean;
}

interface NotificationDotProps {
  count: number;
}

// Styled Components
const MobileNavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  height: 60px;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const LogoSvg = styled.svg`
  width: 40px;
  height: 40px;

  path {
    fill: ${({ theme }) => theme.colors.primary.cyan};
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NotificationDot = styled.span<NotificationDotProps>`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background-color: #ff4444;
  border-radius: 50%;
  display: ${({ count }) => (count > 0 ? "block" : "none")};
`;

const MobileMenu = styled.div<MobileMenuProps>`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.background.primary};
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "100%")});
  transition: transform ${({ theme }) => theme.transitions.normal};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const MobileMenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const MobileMenuItem = styled.li``;

const MobileMenuLink = styled(Link)`
  display: block;
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.cyan};
  }
`;

const MobileMenuButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const MobileSignInButton = styled(Link)`
  display: block;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: 4px;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.secondaryHover};
  }
`;

const MobileSignUpButton = styled(Link)`
  display: block;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  color: ${({ theme }) => theme.colors.background.primary};
  background-color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  border-radius: 4px;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.9;
  }
`;

// Component
export const MobileNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = (): void => {
    setMenuOpen(false);
  };

  return (
    <>
      <MobileNavContainer>
        <LogoLink to="/" onClick={closeMenu}>
          <Image src={LogoImage} alt="Logo" width={24} height={24} />
        </LogoLink>

        <NavActions>
          <IconButton aria-label="Notifications">
            <BellIcon size={24} />
            <NotificationDot count={1} />
          </IconButton>

          <IconButton onClick={toggleMenu} aria-label="Menu">
            {menuOpen ? <CloseIcon size={24} /> : <HamburgerIcon size={24} />}
          </IconButton>
        </NavActions>
      </MobileNavContainer>

      <MobileMenu $isOpen={menuOpen}>
        <MobileMenuList>
          <MobileMenuItem>
            <MobileMenuLink to="/store" onClick={closeMenu}>
              Store
            </MobileMenuLink>
          </MobileMenuItem>
          <MobileMenuItem>
            <MobileMenuLink to="/gallery" onClick={closeMenu}>
              Gallery
            </MobileMenuLink>
          </MobileMenuItem>
          <MobileMenuItem>
            <MobileMenuLink to="/contest" onClick={closeMenu}>
              Contest
            </MobileMenuLink>
          </MobileMenuItem>
          <MobileMenuItem>
            <MobileMenuLink to="/community" onClick={closeMenu}>
              Community
            </MobileMenuLink>
          </MobileMenuItem>
          <MobileMenuItem>
            <MobileMenuLink to="/apps" onClick={closeMenu}>
              Apps
            </MobileMenuLink>
          </MobileMenuItem>
          <MobileMenuItem>
            <MobileMenuLink to="/gamewear" onClick={closeMenu}>
              Gamewear
            </MobileMenuLink>
          </MobileMenuItem>
        </MobileMenuList>

        <MobileMenuButtons>
          <MobileSignInButton to="/signin" onClick={closeMenu}>
            Sign In
          </MobileSignInButton>
          <MobileSignUpButton to="/signup" onClick={closeMenu}>
            Sign Up
          </MobileSignUpButton>
        </MobileMenuButtons>
      </MobileMenu>
    </>
  );
};
