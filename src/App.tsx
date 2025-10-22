import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import CategoryNavigation from "./components/CategoryNavigation";
import { Navbar } from "./components/Navbar";
import ProductList from "./components/ProductList";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Navbar />
        <CategoryNavigation />
        <ProductList />
        {/* Your routes and content here */}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
