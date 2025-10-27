import React from "react";
import styled, { keyframes } from "styled-components";

// Animation for the skeleton loading effect
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 12px;
  overflow: hidden;
  animation: none; // Remove hover animations for skeleton
`;

const SkeletonImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background.tertiary} 0%,
    rgba(255, 255, 255, 0.1) 50%,
    ${({ theme }) => theme.colors.background.tertiary} 100%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

const SkeletonBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  width: 60px;
  height: 20px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background.tertiary} 0%,
    rgba(255, 255, 255, 0.1) 50%,
    ${({ theme }) => theme.colors.background.tertiary} 100%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: 12px;
  z-index: 2;
`;

const SkeletonButton = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  width: 40px;
  height: 40px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: 8px;
`;

const ProductItemSkeleton: React.FC = () => {
  return (
    <SkeletonCard>
      <SkeletonImageContainer>
        <SkeletonBadge />
        <SkeletonButton />
      </SkeletonImageContainer>
    </SkeletonCard>
  );
};

export default ProductItemSkeleton;
