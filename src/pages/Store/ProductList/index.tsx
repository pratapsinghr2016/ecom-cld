import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ChevronDownIcon,
  EyeIcon,
  FileIcon,
  HeartIcon,
  ResetIcon,
  ShoppingCartIcon,
  UsersIcon,
  VerifiedIcon,
} from "../../../assets/icons";
import { MenuItem, MenuPopup } from "../../../components/atoms";
import {
  useAppDispatch,
  useAppSelector,
  useInfiniteScroll,
  useMenu,
} from "../../../hooks";
import { PricingOption } from "../../../sdk/types";
import {
  fetchProducts,
  loadMoreProducts,
} from "../../../slices/productListSlice";

// Utility function to display pricing option
const getPricingOptionLabel = (option: PricingOption): string => {
  switch (option) {
    case PricingOption.FREE:
      return "Free";
    case PricingOption.PAID:
      return "Paid";
    case PricingOption.VIEW_ONLY:
      return "View Only";
    default:
      return "Unknown";
  }
};

interface FilterOption {
  label: string;
  value: string;
}

interface Filter {
  id: string;
  label: string;
  type: "checkbox" | "dropdown";
  icon?: string;
  options?: FilterOption[];
}

// Styled Components
const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  background-color: ${({ $active, theme }) =>
    $active
      ? theme.colors.border.secondary
      : theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border.secondary};
  }
`;

const ResetButton = styled(FilterButton)`
  color: ${({ theme }) => theme.colors.text.secondary};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
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

const ProductCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 12px;
  overflow: hidden;
  transition: transform ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  overflow: hidden;
`;

const PricingBadge = styled.div<{ $pricingOption: PricingOption }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ $pricingOption }) => {
    switch ($pricingOption) {
      case PricingOption.FREE:
        return "#4ade80"; // Green for free
      case PricingOption.PAID:
        return "#00D9FF"; // Cyan for paid
      case PricingOption.VIEW_ONLY:
        return "#fbbf24"; // Yellow for view only
      default:
        return "#808080"; // Gray for unknown
    }
  }};
  color: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  z-index: 2;
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CartButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

const ProductInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const Username = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProductTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Price = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

// Filter Menu Popup
const FilterWrapper = styled.div`
  position: relative;
`;

// Component
const filters: Filter[] = [
  {
    id: "curators-pick",
    label: "Curator's Pick",
    type: "checkbox",
    icon: "verified",
  },
  {
    id: "following",
    label: "Following",
    type: "checkbox",
    icon: "users",
  },
  {
    id: "file-type",
    label: "Fbx / Gltf",
    type: "checkbox",
    icon: "file",
  },
  {
    id: "official",
    label: "Official",
    type: "dropdown",
  },
  {
    id: "price",
    label: "Price",
    type: "dropdown",
    options: [
      { label: "Under $10", value: "0-10" },
      { label: "$10 - $50", value: "10-50" },
      { label: "$50 - $100", value: "50-100" },
      { label: "Over $100", value: "100+" },
    ],
  },
];

const ProductList = () => {
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [sortBy, setSortBy] = useState("featured");

  // Redux state
  const dispatch = useAppDispatch();
  const { products, loading, loadingMore, error, hasMore, currentPage } =
    useAppSelector((state) => state.productList);

  // Use custom hook for menu click-outside functionality
  const { getMenuRef } = useMenu({
    isOpen: openFilterId !== null,
    onClose: () => setOpenFilterId(null),
  });

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

  const toggleFilter = (filterId: string) => {
    setOpenFilterId(openFilterId === filterId ? null : filterId);
  };

  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[filterId] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [filterId]: updated };
    });
  };

  const resetFilters = () => {
    setSelectedFilters({});
    setSortBy("featured");
  };

  const hasActiveFilters = Object.keys(selectedFilters).length > 0;

  return (
    <Container>
      <FiltersContainer>
        {filters.map((filter) => (
          <FilterWrapper
            key={filter.id}
            ref={getMenuRef(filter.id === openFilterId)}
          >
            <FilterButton
              $active={selectedFilters[filter.id]?.length > 0}
              onClick={() => toggleFilter(filter.id)}
            >
              {filter.icon === "verified" && <VerifiedIcon size={16} />}
              {filter.icon === "users" && <UsersIcon size={16} />}
              {filter.icon === "file" && <FileIcon size={16} />}
              {filter.label}
              {filter.options && <ChevronDownIcon size={16} />}
            </FilterButton>

            {filter.options && (
              <MenuPopup
                isOpen={openFilterId === filter.id}
                title={filter.label}
              >
                {filter.options.map((option) => (
                  <MenuItem key={option.value}>
                    <input
                      type="checkbox"
                      checked={
                        selectedFilters[filter.id]?.includes(option.value) ||
                        false
                      }
                      onChange={() =>
                        handleFilterChange(filter.id, option.value)
                      }
                    />
                    {option.label}
                  </MenuItem>
                ))}
              </MenuPopup>
            )}
          </FilterWrapper>
        ))}

        {hasActiveFilters && (
          <ResetButton onClick={resetFilters}>
            <ResetIcon size={16} />
            RESET
          </ResetButton>
        )}
      </FiltersContainer>

      <HeaderRow>
        <ItemCount>
          {loading ? "Loading..." : `${products.length.toLocaleString()} Items`}
          {error && (
            <span style={{ color: "red", marginLeft: "10px" }}>({error})</span>
          )}
          {products.length > 0 && (
            <span style={{ color: "#00D9FF", marginLeft: "10px" }}>
              (Redux Data Loaded - Page {currentPage})
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
          <ProductCard key={product.id}>
            <ProductImageContainer>
              <PricingBadge $pricingOption={product.pricingOption}>
                {getPricingOptionLabel(product.pricingOption)}
              </PricingBadge>
              <ProductImage src={product.image} alt={product.title} />
              <CartButton>
                <ShoppingCartIcon size={20} />
              </CartButton>
            </ProductImageContainer>
            <ProductInfo>
              <Username>{product.username}</Username>
              <ProductTitle>{product.title}</ProductTitle>
              <Price>$ {product.price.toFixed(2)}</Price>
              <Stats>
                <Stat>
                  <EyeIcon size={14} />
                  {product.views}
                </Stat>
                <Stat>
                  <HeartIcon size={14} />
                  {product.likes}
                </Stat>
              </Stats>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
};

export default ProductList;
