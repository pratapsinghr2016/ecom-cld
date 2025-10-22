import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { sdk } from "../../../sdk";
import { PricingOption } from "../../../sdk/types";

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

  svg {
    width: 16px;
    height: 16px;
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

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.text.primary};
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

  svg {
    width: 14px;
    height: 14px;
  }
`;

// Filter Menu Popup
const MenuPopup = styled.div<{ $isOpen: boolean }>`
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

const FilterWrapper = styled.div`
  position: relative;
`;

const MenuHeader = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
`;

const MenuItem = styled.label`
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
  const [apiData, setApiData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching data from API...");
        const data = await sdk.products.getProducts();
        console.log("API Response:", data);
        setApiData(data);
      } catch (err: any) {
        console.error("Failed to fetch API data:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenFilterId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            ref={filter.id === openFilterId ? menuRef : null}
          >
            <FilterButton
              $active={selectedFilters[filter.id]?.length > 0}
              onClick={() => toggleFilter(filter.id)}
            >
              {filter.icon === "verified" && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {filter.icon === "users" && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              )}
              {filter.icon === "file" && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <polyline points="13 2 13 9 20 9" />
                </svg>
              )}
              {filter.label}
              {filter.options && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
            </FilterButton>

            {filter.options && (
              <MenuPopup $isOpen={openFilterId === filter.id}>
                <MenuHeader>{filter.label}</MenuHeader>
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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            RESET
          </ResetButton>
        )}
      </FiltersContainer>

      <HeaderRow>
        <ItemCount>
          {loading ? "Loading..." : `${apiData.length.toLocaleString()} Items`}
          {error && (
            <span style={{ color: "red", marginLeft: "10px" }}>({error})</span>
          )}
          {apiData.length > 0 && (
            <span style={{ color: "#00D9FF", marginLeft: "10px" }}>
              (API Data Loaded)
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
        {apiData.map((product) => (
          <ProductCard key={product.id}>
            <ProductImageContainer>
              <PricingBadge $pricingOption={product.pricingOption}>
                {getPricingOptionLabel(product.pricingOption)}
              </PricingBadge>
              <ProductImage src={product.image} alt={product.title} />
              <CartButton>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </CartButton>
            </ProductImageContainer>
            <ProductInfo>
              <Username>{product.username}</Username>
              <ProductTitle>{product.title}</ProductTitle>
              <Price>$ {product.price.toFixed(2)}</Price>
              <Stats>
                <Stat>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {product.views}
                </Stat>
                <Stat>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
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
