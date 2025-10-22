import React from "react";

interface VerifiedIconProps {
  size?: number;
  className?: string;
}

export const VerifiedIcon: React.FC<VerifiedIconProps> = ({
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default VerifiedIcon;
