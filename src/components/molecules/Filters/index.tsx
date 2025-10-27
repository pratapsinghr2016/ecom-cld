import React from "react";
import styled from "styled-components";
import {
  ChevronDownIcon,
  FileIcon,
  ResetIcon,
  UsersIcon,
  VerifiedIcon,
} from "../../../assets/icons";
import { useMenu } from "../../../hooks";
import { PricingOption } from "../../../sdk/types";
import { MenuItem, MenuPopup } from "../../atoms";
import PriceRangeSlider from "../PriceRangeSlider";

interface FilterOption {
  label: string | PricingOption;
  value: string | number;
}

interface Filter {
  id: string;
  label: string;
  type: "checkbox" | "dropdown" | "price-range";
  icon?: string;
  options?: FilterOption[];
}

interface FiltersProps {
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, value: string | number) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

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
    id: "pricingOption",
    label: "Price",
    type: "dropdown",
    options: [
      { label: "Paid", value: PricingOption.PAID },
      { label: "Free", value: PricingOption.FREE },
      { label: "View Only", value: PricingOption.VIEW_ONLY },
    ],
  },
  {
    id: "price-range",
    label: "Price Range",
    type: "price-range",
  },
];

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const FilterButtonsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const PriceRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-left: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const PriceRangeSliderWrapper = styled.div`
  min-width: 200px;
  max-width: 300px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    max-width: none;
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

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.secondary};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ResetButton = styled(FilterButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  border-color: ${({ theme }) => theme.colors.border.secondary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.border.secondary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const FilterWrapper = styled.div`
  position: relative;
`;

const Filters: React.FC<FiltersProps> = ({
  selectedFilters,
  onFilterChange,
  onResetFilters,
  hasActiveFilters,
  priceRange,
  onPriceRangeChange,
}) => {
  const [openFilterId, setOpenFilterId] = React.useState<string | null>(null);

  // Use custom hook for menu click-outside functionality
  const { getMenuRef } = useMenu({
    isOpen: openFilterId !== null,
    onClose: () => setOpenFilterId(null),
  });

  const toggleFilter = (filterId: string) => {
    setOpenFilterId(openFilterId === filterId ? null : filterId);
  };

  const renderFilterIcon = (iconType?: string) => {
    switch (iconType) {
      case "verified":
        return <VerifiedIcon size={16} />;
      case "users":
        return <UsersIcon size={16} />;
      case "file":
        return <FileIcon size={16} />;
      default:
        return null;
    }
  };

  const isPriceRangeActive = priceRange[0] > 0 || priceRange[1] < 999;
  console.log("Selected Filters:", selectedFilters);

  // Filter out price-range from the main filter buttons
  const buttonFilters = filters.filter(
    (filter) => filter.type !== "price-range"
  );

  return (
    <FiltersContainer>
      <FilterButtonsRow>
        {buttonFilters.map((filter) => (
          <FilterWrapper
            key={filter.id}
            ref={getMenuRef(openFilterId === filter.id)}
          >
            <FilterButton
              disabled={filter.id !== "pricingOption"}
              $active={
                selectedFilters[filter.id] &&
                selectedFilters[filter.id].length > 0
              }
              onClick={() => toggleFilter(filter.id)}
            >
              {renderFilterIcon(filter.icon)}
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
                        selectedFilters[filter.id]?.includes(
                          String(option.value)
                        ) || false
                      }
                      onChange={() => onFilterChange(filter.id, option.value)}
                    />
                    {option.label}
                  </MenuItem>
                ))}
              </MenuPopup>
            )}
          </FilterWrapper>
        ))}
        <PriceRangeContainer>
          <PriceRangeSliderWrapper>
            <PriceRangeSlider
              value={priceRange}
              onChange={onPriceRangeChange}
              min={0}
              max={999}
              step={1}
            />
          </PriceRangeSliderWrapper>
        </PriceRangeContainer>
        {(hasActiveFilters || isPriceRangeActive) && (
          <ResetButton onClick={onResetFilters}>
            <ResetIcon size={16} />
            RESET
          </ResetButton>
        )}
      </FilterButtonsRow>
    </FiltersContainer>
  );
};

export default Filters;
