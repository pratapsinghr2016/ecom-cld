import { useEffect, useState } from "react";
import styled from "styled-components";
import Filters from "../../../components/molecules/Filters";
import ProductItem from "../../../components/molecules/ProductItem";
import {
  useAppDispatch,
  useAppSelector,
  useInfiniteScroll,
} from "../../../hooks";
import {
  fetchFilteredProducts,
  fetchProducts,
  loadMoreProducts,
  setSelectedFilters,
} from "../../../slices/productListSlice";

// Styled Components
const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const ItemCount = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const SortDropdown = styled.select`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.cyan};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProductList = () => {
  const [sortBy, setSortBy] = useState("featured");

  // Redux state
  const dispatch = useAppDispatch();
  const { products, loading, loadingMore, error, hasMore, currentPage } =
    useAppSelector((state) => state.productList);
  const { selectedFilters } = useAppSelector((state) => state.productList);

  // Use infinite scroll hook for better UX
  useInfiniteScroll({
    onLoadMore: () => {
      if (!loadingMore && hasMore) {
        dispatch(loadMoreProducts());
      }
    },
    hasMore: hasMore,
    threshold: 300,
    isLoading: loading || loadingMore,
  });

  // Fetch data from API on component mount
  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, loading]);

  const handleFilterChange = (filterId: string, value: string | number) => {
    console.log("Filter changed:", filterId, value);
    dispatch(
      fetchFilteredProducts({ ...selectedFilters, [filterId]: [String(value)] })
    );
    dispatch(
      setSelectedFilters({
        ...selectedFilters,
        [filterId]: [String(value)],
      })
    );
  };

  const resetFilters = () => {
    setSelectedFilters({});
    setSortBy("featured");
  };

  const hasActiveFilters = Object.keys(selectedFilters).length > 0;

  const handleCartClick = (productId: string) => {
    console.log("Add to cart clicked for product:", productId);
    // Add cart functionality here
  };

  const handleProductClick = (productId: string) => {
    console.log("Product clicked:", productId);
    // Add navigation to product detail page here
  };
  console.log("Rendering ProductList with products:", products);
  return (
    <Container>
      <Filters
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <HeaderRow>
        <ItemCount>
          {loading ? "Loading..." : `${products.length.toLocaleString()} Items`}
          {error && (
            <span style={{ color: "red", marginLeft: "10px" }}>({error})</span>
          )}
          {products.length > 0 && (
            <span style={{ color: "#00D9FF", marginLeft: "10px" }}>
              Page: {currentPage}{" "}
            </span>
          )}
          {loadingMore && (
            <span style={{ color: "#fbbf24", marginLeft: "10px" }}>
              (Loading more...)
            </span>
          )}
        </ItemCount>
        <SortDropdown
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </SortDropdown>
      </HeaderRow>

      <ProductGrid>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            username={product.username}
            price={product.price}
            views={product.views}
            likes={product.likes}
            pricingOption={product.pricingOption}
            onCartClick={handleCartClick}
            onProductClick={handleProductClick}
          />
        ))}
      </ProductGrid>
    </Container>
  );
};

export default ProductList;
