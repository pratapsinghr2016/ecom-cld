import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

const HomeContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.section`
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing["2xl"]} 0`};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const AuthButton = styled.button`
  background: ${({ theme }) => theme.colors.button.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.button.primaryHover};
  }
`;

const Home = () => {
  const { isAuthenticated, user, /* login */ logout } = useAuth();
  const navigate = useNavigate();
  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
    } else {
      // Demo login
      // login("demo@example.com", "password");
      navigate("/store");
    }
  };

  return (
    <HomeContainer>
      <Hero>
        <Title>Welcome to our E-commerce Store</Title>
        <Description>
          {isAuthenticated
            ? `Hello, ${user?.name}!`
            : "Lets go to Store and explore our products!"}
        </Description>
        <AuthButton onClick={handleAuth}>
          {isAuthenticated ? "Logout" : "Goto Store"}
        </AuthButton>
      </Hero>
    </HomeContainer>
  );
};

export default Home;
