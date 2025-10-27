import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useThrottle } from "../../../hooks";

interface PriceRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
}

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const SliderTrack = styled.div`
  position: relative;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.border.primary};
  border-radius: 2px;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const SliderRange = styled.div<{ $left: number; $width: number }>`
  position: absolute;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary.cyan};
  border-radius: 2px;
  left: ${({ $left }) => $left}%;
  width: ${({ $width }) => $width}%;
`;

const SliderThumb = styled.div<{ $position: number; $isDragging?: boolean }>`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.primary.cyan};
  border: 2px solid ${({ theme }) => theme.colors.background.primary};
  border-radius: 50%;
  cursor: pointer;
  top: 50%;
  left: ${({ $position }) => $position}%;
  transform: translate(-50%, -50%);
  transition: ${({ $isDragging }) => ($isDragging ? "none" : "all 0.2s ease")};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active {
    transform: translate(-50%, -50%) scale(1.2);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 24px;
    height: 24px;
  }
`;

const ValueDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const ValueLabel = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min = 0,
  max = 999,
  step = 1,
  value,
  onChange,
  formatValue = (val) => `$${val}`,
}) => {
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercentage = useCallback(
    (val: number) => {
      return ((val - min) / (max - min)) * 100;
    },
    [min, max]
  );

  const getValueFromPercentage = useCallback(
    (percentage: number) => {
      const val = min + (percentage / 100) * (max - min);
      return Math.round(val / step) * step;
    },
    [min, max, step]
  );

  const handleMouseDown = useCallback(
    (thumb: "min" | "max") => (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(thumb);
    },
    []
  );

  const handleTouchStart = useCallback(
    (thumb: "min" | "max") => (e: React.TouchEvent) => {
      e.preventDefault();
      setIsDragging(thumb);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
      );
      const newValue = getValueFromPercentage(percentage);

      if (isDragging === "min") {
        const newMin = Math.min(newValue, value[1] - step);
        if (newMin !== value[0]) {
          onChange([Math.max(min, newMin), value[1]]);
        }
      } else if (isDragging === "max") {
        const newMax = Math.max(newValue, value[0] + step);
        if (newMax !== value[1]) {
          onChange([value[0], Math.min(max, newMax)]);
        }
      }
    },
    [isDragging, value, onChange, getValueFromPercentage, step, min, max]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const touch = e.touches[0];
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100)
      );
      const newValue = getValueFromPercentage(percentage);

      if (isDragging === "min") {
        const newMin = Math.min(newValue, value[1] - step);
        if (newMin !== value[0]) {
          onChange([Math.max(min, newMin), value[1]]);
        }
      } else if (isDragging === "max") {
        const newMax = Math.max(newValue, value[0] + step);
        if (newMax !== value[1]) {
          onChange([value[0], Math.min(max, newMax)]);
        }
      }
    },
    [isDragging, value, onChange, getValueFromPercentage, step, min, max]
  );

  // Throttled versions of the move handlers for better performance
  const throttledMouseMove = useThrottle(handleMouseMove, 16); // ~60fps
  const throttledTouchMove = useThrottle(handleTouchMove, 16); // ~60fps

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", throttledMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", throttledTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", throttledMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", throttledTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, throttledMouseMove, handleMouseUp, throttledTouchMove]);

  const minPercentage = getPercentage(value[0]);
  const maxPercentage = getPercentage(value[1]);
  const rangeWidth = maxPercentage - minPercentage;

  return (
    <SliderContainer>
      <SliderTrack ref={sliderRef}>
        <SliderRange $left={minPercentage} $width={rangeWidth} />
        <SliderThumb
          $position={minPercentage}
          $isDragging={isDragging === "min"}
          onMouseDown={handleMouseDown("min")}
          onTouchStart={handleTouchStart("min")}
        />
        <SliderThumb
          $position={maxPercentage}
          $isDragging={isDragging === "max"}
          onMouseDown={handleMouseDown("max")}
          onTouchStart={handleTouchStart("max")}
        />
      </SliderTrack>
      <ValueDisplay>
        <ValueLabel>{formatValue(value[0])}</ValueLabel>
        <span>-</span>
        <ValueLabel>
          {value[1] >= max ? `${formatValue(max)}+` : formatValue(value[1])}
        </ValueLabel>
      </ValueDisplay>
    </SliderContainer>
  );
};

export default PriceRangeSlider;
