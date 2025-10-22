import React from "react";

interface ChevronDownIconProps {
  size?: number;
  className?: string;
}

export const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default ChevronDownIcon;
