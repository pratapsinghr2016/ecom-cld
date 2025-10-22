import { SVGProps } from "react";

interface CloseIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const CloseIcon = ({
  size = 24,
  color = "currentColor",
  ...props
}: CloseIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    {...props}
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

export default CloseIcon;
