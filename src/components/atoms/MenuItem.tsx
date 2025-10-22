import React from "react";
import styled from "styled-components";

const StyledMenuItem = styled.label`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.sm} 0`};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.cyan};
  }

  input {
    margin-right: ${({ theme }) => theme.spacing.sm};
    cursor: pointer;
    accent-color: ${({ theme }) => theme.colors.primary.cyan};
  }
`;

interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  htmlFor?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onClick,
  className,
  htmlFor,
}) => {
  return (
    <StyledMenuItem onClick={onClick} className={className} htmlFor={htmlFor}>
      {children}
    </StyledMenuItem>
  );
};

export default MenuItem;
