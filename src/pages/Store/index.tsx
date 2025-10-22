import CategoryNavigation from "../../components/CategoryNavigation";
import ProductList from "./ProductList";

const StorePage: React.FC = () => {
  return (
    <>
      <CategoryNavigation />
      <ProductList />
    </>
  );
};

export default StorePage;
