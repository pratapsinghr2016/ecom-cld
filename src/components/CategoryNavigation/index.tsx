import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  ChevronDownIcon,
  CloseIcon,
  FilterIcon,
  SearchIcon,
} from "../../assets/icons";
import { useAppDispatch, useAppSelector, useDebounce } from "../../hooks";
import {
  fetchProducts,
  fetchSearchedItem,
  setSearchedItem,
} from "../../slices/productListSlice";

// Desktop Styles
const DesktopContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) =>
    `${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.xl}`};

  @media (max-width: ${({ theme }) => (theme.breakpoints as any).tablet}) {
    display: none;
  }
`;

const Heading = styled.h1`
  font-size: 4rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-family: ${({ theme }) => theme.fonts.heading};
  line-height: 1.2;
  margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 3rem;
  }
`;

// Mobile Styles
const MobileContainer = styled.nav`
  display: none;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) =>
    `${theme.spacing.sm} ${theme.spacing.md || "1rem"}`};

  @media (max-width: ${({ theme }) => (theme.breakpoints as any).tablet}) {
    display: block;
  }
`;

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.md || "1rem"};
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md || "1rem"};
`;

const StoreDropdown = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-family: ${({ theme }) => theme.fonts.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs || "0.25rem"};
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.8;
  }
`;

// Shared Styles
const TabsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => (theme.breakpoints as any).tablet}) {
    margin-bottom: 0;
    overflow-x: auto;
    flex-wrap: nowrap;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

interface TabProps {
  $active: boolean;
}

const Tab = styled.button<TabProps>`
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.text.primary : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.background.primary : theme.colors.text.secondary};
  border: none;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: 24px;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  /* transition: all ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0; */

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.text.primary : theme.colors.background.tertiary};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.background.primary : theme.colors.text.primary};
  }

  @media (max-width: ${({ theme }) => (theme.breakpoints as any).tablet}) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    border-radius: 20px;
  }
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border: none;
  border-radius: 28px;
  padding: ${({ theme }) =>
    `${theme.spacing.md} 56px ${theme.spacing.md} 56px`};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.border.primary};
  }

  @media (max-width: ${({ theme }) => (theme.breakpoints as any).tablet}) {
    background-color: ${({ theme }) => theme.colors.border.primary};
    padding: ${({ theme }) =>
      `${theme.spacing.sm} 44px ${theme.spacing.sm} 44px`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    border-radius: 24px;

    &:focus {
      background-color: ${({ theme }) => theme.colors.border.primary};
    }
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => (theme.breakpoints as any).tablet}) {
    left: ${({ theme }) => theme.spacing.md || "1rem"};
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }

  @media (max-width: ${({ theme }) => (theme.breakpoints as any).tablet}) {
    right: ${({ theme }) => theme.spacing.md || "1rem"};
  }
`;

const FilterButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${({ theme }) => (theme.breakpoints as any).tablet}) {
    display: flex;
    align-items: center;
  }
`;

// Drawer Styles
interface DrawerOverlayProps {
  $isOpen: boolean;
}

const DrawerOverlay = styled.div<DrawerOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndex.dropdown || 1000};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity ${({ theme }) => theme.transitions.normal},
    visibility ${({ theme }) => theme.transitions.normal};
`;

interface DrawerProps {
  $isOpen: boolean;
}

const Drawer = styled.div<DrawerProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 400px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  z-index: ${({ theme }) => (theme.zIndex.dropdown || 1000) + 1};
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "100%")});
  transition: transform ${({ theme }) => theme.transitions.normal};
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const DrawerTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes["2xl"] || "1.5rem"};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs || "0.25rem"};
  display: flex;
  align-items: center;
`;

const FilterSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FilterLabel = styled.h3`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin: 0 0 ${({ theme }) => theme.spacing.md || "1rem"} 0;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.sm} 0`};
  cursor: pointer;

  input {
    margin-right: ${({ theme }) => theme.spacing.sm};
    cursor: pointer;
  }
`;

const categories = ["All", "Garment", "Fabric", "Trim", "Avatar", "Scene"];

interface CategoryNavigationProps {
  readonly onStoreChange?: () => void;
}

export default function CategoryNavigation({
  onStoreChange,
}: CategoryNavigationProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const searchedInputStr = useDebounce(searchQuery);
  const { searchedItem } = useAppSelector((state) => state.productList);

  const handleTabClick = (category: string) => {
    setActiveTab(category);
    navigate(`/store/${category.toLowerCase()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    dispatch(setSearchedItem(""));
    dispatch(fetchProducts());
  };

  useEffect(() => {
    if (searchedInputStr && searchedItem !== searchedInputStr) {
      dispatch(fetchSearchedItem(searchedInputStr));
      dispatch(setSearchedItem(searchedInputStr));
    }
  }, [searchedInputStr, dispatch]);

  return (
    <>
      {/* Desktop View */}
      <DesktopContainer>
        <Heading>
          Share your ideas.
          <br />
          Empower your design.
        </Heading>

        <TabsContainer>
          {categories.map((category) => (
            <Tab
              key={category}
              $active={activeTab === category}
              onClick={() => handleTabClick(category)}
            >
              {category}
            </Tab>
          ))}
        </TabsContainer>

        <SearchContainer>
          <SearchIconWrapper>
            <SearchIcon size={20} />
          </SearchIconWrapper>
          <SearchInput
            type="text"
            placeholder="Find the items you're looking for"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <ClearButton onClick={handleClearSearch} aria-label="Clear search">
              <CloseIcon size={16} />
            </ClearButton>
          )}
        </SearchContainer>
      </DesktopContainer>

      {/* Mobile View */}
      <MobileContainer>
        <ContentWrapper>
          <TopRow>
            <StoreDropdown onClick={onStoreChange}>
              Store
              <ChevronDownIcon size={16} />
            </StoreDropdown>
            <TabsContainer>
              {categories.slice(0, 4).map((category) => (
                <Tab
                  key={category}
                  $active={activeTab === category}
                  onClick={() => handleTabClick(category)}
                >
                  {category}
                </Tab>
              ))}
            </TabsContainer>
          </TopRow>

          <SearchRow>
            <SearchContainer>
              <SearchIconWrapper>
                <SearchIcon size={16} />
              </SearchIconWrapper>
              <SearchInput
                type="text"
                placeholder="Find the items you're looking for"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <ClearButton
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  <CloseIcon size={14} />
                </ClearButton>
              )}
            </SearchContainer>
            <FilterButton
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Filter"
            >
              <FilterIcon size={20} />
            </FilterButton>
          </SearchRow>
        </ContentWrapper>
      </MobileContainer>

      {/* Filter Drawer */}
      <DrawerOverlay
        $isOpen={isDrawerOpen}
        onClick={() => setIsDrawerOpen(false)}
      />
      <Drawer $isOpen={isDrawerOpen}>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <CloseButton onClick={() => setIsDrawerOpen(false)}>
            <CloseIcon size={24} />
          </CloseButton>
        </DrawerHeader>

        <FilterSection>
          <FilterLabel>Category</FilterLabel>
          {categories.map((category) => (
            <FilterOption key={category}>
              <input
                type="radio"
                name="category"
                value={category}
                checked={activeTab === category}
                onChange={() => handleTabClick(category)}
              />
              {category}
            </FilterOption>
          ))}
        </FilterSection>

        <FilterSection>
          <FilterLabel>Price Range</FilterLabel>
          <FilterOption>
            <input type="checkbox" /> Under $50
          </FilterOption>
          <FilterOption>
            <input type="checkbox" /> $50 - $100
          </FilterOption>
          <FilterOption>
            <input type="checkbox" /> $100 - $200
          </FilterOption>
          <FilterOption>
            <input type="checkbox" /> Over $200
          </FilterOption>
        </FilterSection>

        <FilterSection>
          <FilterLabel>Availability</FilterLabel>
          <FilterOption>
            <input type="checkbox" /> In Stock
          </FilterOption>
          <FilterOption>
            <input type="checkbox" /> Pre-order
          </FilterOption>
        </FilterSection>
      </Drawer>
    </>
  );
}
