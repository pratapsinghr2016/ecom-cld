import React from "react";

interface FilterIconProps {
  size?: number;
  className?: string;
  color?: string;
}

const FilterIcon: React.FC<FilterIconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      className={className}
    >
      <line x1="4" y1="6" x2="16" y2="6" />
      <line x1="4" y1="12" x2="10" y2="12" />
      <line x1="4" y1="18" x2="14" y2="18" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  );
};

export default FilterIcon;
