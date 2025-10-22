import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Extend DefaultTheme to include your theme structure
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      border: {
        primary: string;
      };
      primary: {
        cyan: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
      button: {
        secondaryHover: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontSizes: {
      sm: string;
      "2xl": string;
    };
    fontWeights: {
      bold: string;
      semibold: string;
    };
    transitions: {
      fast: string;
      normal: string;
    };
    breakpoints: {
      desktop: string;
    };
    shadows: {
      md: string;
      lg: string;
    };
    zIndex: {
      dropdown: number;
    };
  }
}

// Types
interface NavLinkProps {
  $active?: boolean;
}

interface DropdownMenuProps {
  $isOpen: boolean;
}

interface AppItem {
  label: string;
  path: string;
}

// Styled Components
const NavbarContainer = styled.nav`
  display: none;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  padding: 0 ${({ theme }) => theme.spacing.xl};
  height: 70px;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary.cyan};
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.8;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)<NavLinkProps>`
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text.primary : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color ${({ theme }) => theme.transitions.fast};
  padding: ${({ theme }) => theme.spacing.sm} 0;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const DropdownButton = styled.button<NavLinkProps>`
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text.primary : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color ${({ theme }) => theme.transitions.fast};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &::after {
    content: "▾";
    font-size: 10px;
  }
`;

const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: 4px;
  min-width: 200px;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: translateY(${({ $isOpen }) => ($isOpen ? "0" : "-10px")});
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const ExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color ${({ theme }) => theme.transitions.fast};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &::after {
    content: "↗";
    font-size: 12px;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SignInButton = styled(Link)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  transition: all ${({ theme }) => theme.transitions.fast};
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.secondaryHover};
  }
`;

const SignUpButton = styled(Link)`
  color: ${({ theme }) => theme.colors.background.primary};
  background-color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: 4px;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const GridButton = styled.button`
  width: 36px;
  height: 36px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  padding: 6px;
  border-radius: 4px;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.secondaryHover};
  }

  span {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.text.primary};
    border-radius: 1px;
  }
`;

// Component
export const DesktopNavbar: React.FC = () => {
  const [appsDropdownOpen, setAppsDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const appsItems: AppItem[] = [
    { label: "App 1", path: "/apps/app1" },
    { label: "App 2", path: "/apps/app2" },
    { label: "App 3", path: "/apps/app3" },
  ];

  const handleGridClick = (): void => {
    navigate("/menu");
  };

  return (
    <NavbarContainer>
      <NavLeft>
        <Logo to="/">CONNECT</Logo>

        <NavMenu>
          <NavItem>
            <NavLink to="/store">Store</NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/gallery">Gallery</NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/contest">Contest</NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/community">Community</NavLink>
          </NavItem>

          <NavItem
            onMouseEnter={() => setAppsDropdownOpen(true)}
            onMouseLeave={() => setAppsDropdownOpen(false)}
          >
            <DropdownButton>Apps</DropdownButton>
            <DropdownMenu $isOpen={appsDropdownOpen}>
              {appsItems.map((item) => (
                <DropdownItem key={item.path} to={item.path}>
                  {item.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </NavItem>

          <NavItem>
            <ExternalLink
              href="https://connect.clo-set.com/gamewear/inzoi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gamewear
            </ExternalLink>
          </NavItem>
        </NavMenu>
      </NavLeft>

      <NavRight>
        <SignInButton to="/signin">Sign In</SignInButton>
        <SignUpButton to="/signup">Sign Up</SignUpButton>
        <GridButton onClick={handleGridClick} aria-label="Open menu">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </GridButton>
      </NavRight>
    </NavbarContainer>
  );
};
