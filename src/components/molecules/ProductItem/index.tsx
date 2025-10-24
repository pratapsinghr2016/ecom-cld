import React from "react";
import styled from "styled-components";
import { EyeIcon, HeartIcon, ShoppingCartIcon } from "../../../assets/icons";
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

interface ProductItemProps {
  id: string;
  image: string;
  title: string;
  username: string;
  price: number;
  views: number;
  likes: number;
  pricingOption: PricingOption;
  onCartClick?: (productId: string) => void;
  onProductClick?: (productId: string) => void;
}

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

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  image,
  title,
  username,
  price,
  views,
  likes,
  pricingOption,
  onCartClick,
  onProductClick,
}) => {
  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering product click
    onCartClick?.(id);
  };

  const handleProductClick = () => {
    onProductClick?.(id);
  };

  return (
    <ProductCard onClick={handleProductClick}>
      <ProductImageContainer>
        <PricingBadge $pricingOption={pricingOption}>
          {getPricingOptionLabel(pricingOption)}
        </PricingBadge>
        <ProductImage src={image} alt={title} />
        <CartButton onClick={handleCartClick}>
          <ShoppingCartIcon size={20} />
        </CartButton>
      </ProductImageContainer>
      <ProductInfo>
        <Username>{username}</Username>
        <ProductTitle>{title}</ProductTitle>
        <Price>$ {price.toFixed(2)}</Price>
        <Stats>
          <Stat>
            <EyeIcon size={14} />
            {views}
          </Stat>
          <Stat>
            <HeartIcon size={14} />
            {likes}
          </Stat>
        </Stats>
      </ProductInfo>
    </ProductCard>
  );
};

export default ProductItem;
