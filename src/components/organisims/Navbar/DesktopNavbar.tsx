import Logo from "@/assets/logo-bg-screen.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NineDotsIcon } from "../../../assets/icons";
import { navigationRoutes } from "../../../routes/routeConfig";
import IconButton from "../../atoms/IconButton";
import Image from "../../atoms/Image";

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
        <NavLink to={"/"}>
          <Image src={Logo} alt="desktop-app-logo" width={80} height={16} />
        </NavLink>

        <NavMenu>
          {navigationRoutes.map((route) => {
            if (route.external) {
              return (
                <NavItem key={route.path}>
                  <ExternalLink
                    href={route.path}
                    target={route.target}
                    rel={route.rel}
                  >
                    {route.label}
                  </ExternalLink>
                </NavItem>
              );
            }

            if (route.label === "Apps") {
              return (
                <NavItem
                  key={route.path}
                  onMouseEnter={() => setAppsDropdownOpen(true)}
                  onMouseLeave={() => setAppsDropdownOpen(false)}
                >
                  <DropdownButton>{route.label}</DropdownButton>
                  <DropdownMenu $isOpen={appsDropdownOpen}>
                    {appsItems.map((item) => (
                      <DropdownItem key={item.path} to={item.path}>
                        {item.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </NavItem>
              );
            }

            return (
              <NavItem key={route.path}>
                <NavLink to={route.path}>{route.label}</NavLink>
              </NavItem>
            );
          })}
        </NavMenu>
      </NavLeft>

      <NavRight>
        <SignInButton to="/signin">Sign In</SignInButton>
        <SignUpButton to="/signup">Sign Up</SignUpButton>
        <IconButton
          color="inherit"
          onClick={handleGridClick}
          aria-label="Open menu"
        >
          <NineDotsIcon />
        </IconButton>
      </NavRight>
    </NavbarContainer>
  );
};
