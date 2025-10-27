import styled from "styled-components";

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.md} 0;
  text-align: center;
  z-index: ${({ theme }) => theme.zIndex.fixed};
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const FooterText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterText>© 2025 My E-Commerce Site</FooterText>
    </StyledFooter>
  );
};

export default Footer;
