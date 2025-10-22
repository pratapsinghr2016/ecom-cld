import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ShellLayout from "./layouts/ShellLayout";
import { AppRouter } from "./routes";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

// App content component that has access to auth context
const AppContent = () => {
  const { isAuthenticated } = useAuth();
  return (
    <ShellLayout>
      <AppRouter isAuthenticated={isAuthenticated} />
    </ShellLayout>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
