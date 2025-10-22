import React from "react";
import styled from "styled-components";

// MenuPopup styled component
const StyledMenuPopup = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.xs});
  left: 0;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.md};
  min-width: 200px;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: translateY(${({ $isOpen }) => ($isOpen ? "0" : "-10px")});
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const MenuHeader = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
`;

interface MenuPopupProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const MenuPopup: React.FC<MenuPopupProps> = ({
  isOpen,
  title,
  children,
  className,
}) => {
  return (
    <StyledMenuPopup $isOpen={isOpen} className={className}>
      {title && <MenuHeader>{title}</MenuHeader>}
      {children}
    </StyledMenuPopup>
  );
};

export default MenuPopup;
