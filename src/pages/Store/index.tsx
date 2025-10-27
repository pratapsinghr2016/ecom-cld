import React from "react";
import CategoryNavigation from "../../components/organism/CategoryNavigation";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchFilteredProducts,
  fetchProducts,
  resetFilters,
  setPriceRange,
  setSelectedFilters,
} from "../../slices/productListSlice";
import ProductList from "./ProductList";

const StorePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedFilters, priceRange } = useAppSelector(
    (state) => state.productList
  );

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

  const handleResetFilters = () => {
    dispatch(resetFilters());
    // Refetch original products after resetting filters
    dispatch(fetchProducts());
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    dispatch(setPriceRange(range));
  };

  const hasActiveFilters = Object.keys(selectedFilters).length > 0;

  return (
    <>
      <CategoryNavigation
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        priceRange={priceRange}
        onPriceRangeChange={handlePriceRangeChange}
      />
      <ProductList
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        priceRange={priceRange}
        onPriceRangeChange={handlePriceRangeChange}
      />
    </>
  );
};

export default StorePage;
