import { SVGProps } from "react";

interface HamburgerIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const HamburgerIcon = ({
  size = 24,
  color = "currentColor",
  ...props
}: HamburgerIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    {...props}
  >
    <path d="M3 12h18" />
    <path d="M3 6h18" />
    <path d="M3 18h18" />
  </svg>
);

export default HamburgerIcon;
